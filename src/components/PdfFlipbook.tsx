import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
} from "lucide-react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";

// pdf.js y page-flip se cargan solo en el navegador, cuando se monta el
// componente: así no rompen el prerenderizado (SSR/SSG) ni pesan en el resto del sitio.
type Libs = { pdfjs: typeof import("pdfjs-dist"); PageFlip: any };

// pdf.js 6 usa Map.getOrInsertComputed (propuesta ES todavía sin soporte nativo
// en la mayoría de los navegadores estables). Sin este polyfill el render de
// páginas falla con "getOrInsertComputed is not a function".
function ensureMapUpsertPolyfill() {
  const mp = Map.prototype as any;
  if (typeof mp.getOrInsert !== "function") {
    mp.getOrInsert = function (key: unknown, value: unknown) {
      if (this.has(key)) return this.get(key);
      this.set(key, value);
      return value;
    };
  }
  if (typeof mp.getOrInsertComputed !== "function") {
    mp.getOrInsertComputed = function (key: unknown, callback: (k: unknown) => unknown) {
      if (this.has(key)) return this.get(key);
      const value = callback(key);
      this.set(key, value);
      return value;
    };
  }
}

let libsPromise: Promise<Libs> | null = null;
function loadLibs(): Promise<Libs> {
  if (!libsPromise) {
    ensureMapUpsertPolyfill();
    libsPromise = Promise.all([
      import("pdfjs-dist"),
      import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
      // @ts-ignore — page-flip no incluye tipos de TypeScript
      import("page-flip"),
    ]).then(([pdfjs, worker, pf]: any[]) => {
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      return { pdfjs, PageFlip: pf.PageFlip ?? pf.default?.PageFlip };
    });
  }
  return libsPromise;
}

type PdfFlipbookProps = {
  /** URL del PDF (por ejemplo "/revistas/octubre.pdf") */
  src: string;
  /** Texto accesible para lectores de pantalla */
  title?: string;
  /** Muestra un botón para descargar el PDF original */
  downloadable?: boolean;
  className?: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function pageLabel(index: number, total: number, portrait: boolean) {
  if (portrait || index === 0) return `${index + 1}`;
  const left = index % 2 === 1 ? index : index - 1;
  const right = Math.min(left + 1, total - 1);
  return left === right ? `${left + 1}` : `${left + 1}–${right + 1}`;
}

/**
 * Desplazamiento horizontal del libro (en % del ancho) para que, cerrado,
 * quede centrado: la tapa sola está en la mitad derecha y la contratapa sola
 * en la mitad izquierda.
 */
function bookShift(index: number, total: number, portrait: boolean) {
  if (portrait || total === 0) return 0;
  if (index === 0) return -25;
  if (total % 2 === 0 && index >= total - 1) return 25;
  return 0;
}

export default function PdfFlipbook({
  src,
  title = "Revista",
  downloadable = false,
  className = "",
}: PdfFlipbookProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<any>(null);
  const hiResRef = useRef<(indices: number[]) => void>(() => {});

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [ratio, setRatio] = useState(1 / Math.SQRT2);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsMaxWidth, setFsMaxWidth] = useState<number | null>(null);
  const [shift, setShift] = useState(-25);

  // Al terminar cada vuelta de página, el libro se acomoda (cerrado = centrado)
  useEffect(() => {
    setShift(bookShift(index, total, portrait));
  }, [index, total, portrait]);

  // ── Carga del PDF y armado del libro ─────────────────────────────
  useEffect(() => {
    const book = bookRef.current;
    if (!book) return;

    let cancelled = false;
    const urls: string[] = [];
    const host = document.createElement("div");
    book.appendChild(host);
    let flip: any = null;
    let pdf: PDFDocumentProxy | null = null;
    let loadingTask: PDFDocumentLoadingTask | null = null;

    setStatus("loading");
    setIndex(0);

    const renderPage = async (n: number, targetWidth: number) => {
      const page = await pdf!.getPage(n);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: targetWidth / base.width });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      await page.render({ canvas, viewport }).promise;
      const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.9));
      canvas.width = canvas.height = 0;
      if (!blob) return null;
      const url = URL.createObjectURL(blob);
      urls.push(url);
      return url;
    };

    (async () => {
      try {
        const { pdfjs, PageFlip } = await loadLibs();
        if (cancelled) return;
        loadingTask = pdfjs.getDocument({ url: src });
        pdf = await loadingTask.promise;
        if (cancelled) return;

        const first = await pdf.getPage(1);
        const vp = first.getViewport({ scale: 1 });
        const pageRatio = vp.width / vp.height;
        const count = pdf.numPages;
        setRatio(pageRatio);
        setTotal(count);

        const imgs: HTMLImageElement[] = [];
        const pages = Array.from({ length: count }, (_, i) => {
          const el = document.createElement("div");
          el.className = "pfb-page";
          const img = document.createElement("img");
          img.alt = `${title} — página ${i + 1}`;
          img.draggable = false;
          img.decoding = "async";
          el.appendChild(img);
          imgs.push(img);
          return el;
        });
        pages.forEach((p) => host.appendChild(p));

        flip = new PageFlip(host, {
          width: Math.round(vp.width),
          height: Math.round(vp.height),
          size: "stretch",
          minWidth: 220,
          maxWidth: 1400,
          minHeight: 300,
          maxHeight: 2400,
          showCover: true,
          usePortrait: true,
          drawShadow: true,
          maxShadowOpacity: 0.35,
          flippingTime: 800,
          mobileScrollSupport: true,
          disableFlipByClick: true,
          showPageCorners: true,
        });
        flip.loadFromHTML(pages);
        flip.on("flip", (e: { data: number }) => setIndex(e.data));
        // Si estaba cerrada (tapa o contratapa), se corre al centro apenas empieza a abrirse
        flip.on("changeState", (e: { data: string }) => {
          if (e.data !== "flipping") return;
          const i = flip.getCurrentPageIndex();
          const isPortrait = flip.getOrientation() === "portrait";
          if (bookShift(i, count, isPortrait) !== 0) setShift(0);
        });
        flip.on("changeOrientation", (e: { data: string }) => setPortrait(e.data === "portrait"));
        setPortrait(flip.getOrientation() === "portrait");
        flipRef.current = flip;

        // Resolución base: suficiente para zoom ×2 sin perder nitidez
        const dpr = window.devicePixelRatio || 1;
        const baseWidth = clamp(Math.ceil(book.clientWidth * dpr), 1000, 2200);
        const hiResWidth = clamp(Math.ceil(book.clientWidth * dpr * 1.8), 1800, 3200);
        const done = new Set<number>(); // páginas con alta resolución pedida
        const hiApplied = new Set<number>(); // páginas que ya muestran la alta resolución

        hiResRef.current = (indices) => {
          indices.forEach(async (i) => {
            if (i < 0 || i >= count || done.has(i)) return;
            done.add(i);
            const url = await renderPage(i + 1, hiResWidth);
            if (!url || cancelled) return;
            // Se decodifica antes de reemplazar, para que la página no parpadee en blanco
            const pre = new Image();
            pre.src = url;
            await pre.decode().catch(() => {});
            if (cancelled) return;
            imgs[i].src = url;
            hiApplied.add(i);
          });
        };

        for (let i = 0; i < count; i++) {
          if (cancelled) return;
          const url = await renderPage(i + 1, baseWidth);
          if (cancelled) return;
          if (url && !hiApplied.has(i)) imgs[i].src = url;
          if (i === 0) setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          console.error("PdfFlipbook:", err);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      hiResRef.current = () => {};
      flipRef.current = null;
      try {
        flip?.destroy();
      } catch {
        /* ya destruido */
      }
      host.remove();
      loadingTask?.destroy();
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [src, title]);

  // El libro se recalcula cuando cambia el ancho del contenedor
  useEffect(() => {
    const book = bookRef.current;
    if (!book) return;
    const ro = new ResizeObserver(() => flipRef.current?.update());
    ro.observe(book);
    return () => ro.disconnect();
  }, []);

  // ── Zoom y desplazamiento ────────────────────────────────────────
  const clampPan = useCallback((p: { x: number; y: number }, z: number) => {
    const el = viewportRef.current;
    if (!el) return p;
    const mx = ((z - 1) * el.clientWidth) / 2;
    const my = ((z - 1) * el.clientHeight) / 2;
    return { x: clamp(p.x, -mx, mx), y: clamp(p.y, -my, my) };
  }, []);

  const applyZoom = useCallback(
    (next: number) => {
      const z = clamp(Math.round(next * 100) / 100, MIN_ZOOM, MAX_ZOOM);
      setZoom(z);
      setPan((p) => (z === 1 ? { x: 0, y: 0 } : clampPan({ x: (p.x * z) / zoom, y: (p.y * z) / zoom }, z)));
    },
    [clampPan, zoom],
  );

  // Páginas en alta resolución cuando se hace zoom
  useEffect(() => {
    if (zoom >= 1.75) hiResRef.current([index - 1, index, index + 1, index + 2]);
  }, [zoom, index]);

  // Pellizcar (táctil) y Ctrl/⌘ + rueda o pellizco del trackpad
  const zoomRef = useRef(zoom);
  const applyZoomRef = useRef(applyZoom);
  zoomRef.current = zoom;
  applyZoomRef.current = applyZoom;

  // Zoom ×2 hacia el punto tocado (o vuelve a 100% si ya hay zoom)
  const toggleZoomAt = useCallback(
    (clientX: number, clientY: number) => {
      const el = viewportRef.current;
      if (!el || status !== "ready") return;
      if (zoomRef.current > 1) return applyZoom(1);
      const r = el.getBoundingClientRect();
      const px = clientX - (r.left + r.width / 2);
      const py = clientY - (r.top + r.height / 2);
      const z = 2;
      setZoom(z);
      setPan(clampPan({ x: px * (1 - z), y: py * (1 - z) }, z));
    },
    [applyZoom, clampPan, status],
  );
  const toggleZoomAtRef = useRef(toggleZoomAt);
  toggleZoomAtRef.current = toggleZoomAt;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let startDist = 0;
    let startZoom = 1;
    const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

    // Doble clic / doble toque. Se detecta en fase de captura para que el
    // segundo toque no llegue al efecto de página (que si no, lo interpreta como arrastre).
    let last = { t: 0, x: 0, y: 0 };
    const isDoubleTap = (x: number, y: number) => {
      const now = performance.now();
      const hit = now - last.t < 320 && Math.hypot(x - last.x, y - last.y) < 30;
      last = hit ? { t: 0, x: 0, y: 0 } : { t: now, x, y };
      return hit;
    };
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (isDoubleTap(e.clientX, e.clientY)) {
        e.stopPropagation();
        toggleZoomAtRef.current(e.clientX, e.clientY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        if (isDoubleTap(t.clientX, t.clientY)) {
          e.stopPropagation();
          toggleZoomAtRef.current(t.clientX, t.clientY);
        }
      } else if (e.touches.length === 2) {
        e.stopPropagation();
        startDist = dist(e.touches);
        startZoom = zoomRef.current;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && startDist) {
        e.preventDefault();
        e.stopPropagation();
        applyZoomRef.current(startZoom * (dist(e.touches) / startDist));
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) startDist = 0;
    };
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      applyZoomRef.current(zoomRef.current * Math.exp(-e.deltaY * 0.01));
    };

    el.addEventListener("mousedown", onMouseDown, { capture: true });
    el.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
    el.addEventListener("touchmove", onTouchMove, { capture: true, passive: false });
    el.addEventListener("touchend", onTouchEnd, { capture: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("mousedown", onMouseDown, { capture: true });
      el.removeEventListener("touchstart", onTouchStart, { capture: true });
      el.removeEventListener("touchmove", onTouchMove, { capture: true });
      el.removeEventListener("touchend", onTouchEnd, { capture: true });
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Arrastrar para moverse con zoom activo
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const onPanDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  const onPanMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setPan(clampPan({ x: d.px + e.clientX - d.x, y: d.py + e.clientY - d.y }, zoom));
  };
  const onPanUp = () => {
    drag.current = null;
  };

  // ── Navegación ───────────────────────────────────────────────────
  // Con los botones ya sabemos hacia dónde va, así que el libro se corre
  // al mismo tiempo que la página gira (abrir y cerrar se ven fluidos).
  const prev = () => {
    applyZoom(1);
    if (!portrait && index > 0 && index <= 2) setShift(-25);
    else if (shift !== 0) setShift(0);
    flipRef.current?.flipPrev();
  };
  const next = () => {
    applyZoom(1);
    const nextIndex =
      index === 0 ? 1 : portrait ? index + 1 : (index % 2 === 1 ? index : index - 1) + 2;
    if (nextIndex < total) setShift(bookShift(Math.min(nextIndex, total - 1), total, portrait));
    flipRef.current?.flipNext();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "+" || e.key === "=") applyZoom(zoom + ZOOM_STEP);
    else if (e.key === "-") applyZoom(zoom - ZOOM_STEP);
    else if (e.key === "Escape" && zoom > 1) applyZoom(1);
    else return;
    e.preventDefault();
  };

  // ── Pantalla completa ────────────────────────────────────────────
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen?.();
  };

  useEffect(() => {
    const update = () => {
      const fs = document.fullscreenElement === rootRef.current;
      setIsFullscreen(fs);
      setFsMaxWidth(fs ? Math.floor((window.innerHeight - 120) * ratio * (portrait ? 1 : 2)) : null);
    };
    update();
    document.addEventListener("fullscreenchange", update);
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("fullscreenchange", update);
      window.removeEventListener("resize", update);
    };
  }, [ratio, portrait]);

  useEffect(() => {
    applyZoom(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  const atStart = index <= 0;
  const lastVisible =
    portrait || index === 0 ? index : Math.min((index % 2 === 1 ? index : index - 1) + 1, total - 1);
  const atEnd = total === 0 || lastVisible >= total - 1;
  const progress = total > 1 ? index / (total - 1) : 0;

  return (
    <figure
      ref={rootRef}
      role="region"
      aria-label={title}
      aria-roledescription="revista"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`pfb not-prose group/pfb relative my-8 w-full outline-none ${
        isFullscreen ? "flex flex-col items-center justify-center bg-background px-6 py-6" : ""
      } ${className}`}
    >
      <style>{FLIPBOOK_CSS}</style>

      <div
        ref={viewportRef}
        className="relative mx-auto w-full overflow-hidden"
        style={{
          maxWidth: fsMaxWidth ?? undefined,
          touchAction: zoom > 1 ? "none" : "pan-y",
        }}
      >
        <div
          className="pfb-stage"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transition: drag.current ? "none" : "transform 260ms cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <div
            className="pfb-shift"
            style={{ transform: `translateX(${shift}%)` }}
          >
            <div ref={bookRef} className={status === "ready" ? "" : "invisible"} />
          </div>
        </div>

        {zoom > 1 && (
          <div
            className="pfb-pan absolute inset-0 cursor-grab active:cursor-grabbing"
            onPointerDown={onPanDown}
            onPointerMove={onPanMove}
            onPointerUp={onPanUp}
            onPointerCancel={onPanUp}
          />
        )}

        {status !== "ready" && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ aspectRatio: `${ratio * 2}` }}
          >
            {status === "loading" ? (
              <div className="flex select-none items-center gap-2 text-xs tracking-wide text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                Cargando
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No se pudo cargar la revista.</p>
            )}
          </div>
        )}
        {status !== "ready" && <div style={{ aspectRatio: `${ratio * 2}` }} />}
      </div>

      {/* Controles */}
      <figcaption className="mx-auto mt-5 w-full max-w-md">
        <div className="relative mx-auto mb-3 h-px w-full overflow-hidden bg-border">
          <div
            className="absolute inset-y-0 left-0 bg-foreground/50 transition-[width] duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-0.5 text-muted-foreground">
          <IconButton label="Página anterior" onClick={prev} disabled={status !== "ready" || atStart}>
            <ChevronLeft />
          </IconButton>
          <span className="min-w-[5.5rem] select-none text-center text-xs tabular-nums tracking-wider">
            {total ? (
              <>
                <span className="text-foreground">{pageLabel(index, total, portrait)}</span>
                <span className="opacity-50"> / {total}</span>
              </>
            ) : (
              "—"
            )}
          </span>
          <IconButton label="Página siguiente" onClick={next} disabled={status !== "ready" || atEnd}>
            <ChevronRight />
          </IconButton>

          <span className="mx-2 h-4 w-px bg-border" aria-hidden />

          <IconButton label="Alejar" onClick={() => applyZoom(zoom - ZOOM_STEP)} disabled={zoom <= MIN_ZOOM}>
            <Minus />
          </IconButton>
          <button
            type="button"
            onClick={() => applyZoom(1)}
            className="w-11 select-none rounded-full py-1 text-center text-xs tabular-nums tracking-wider transition-colors hover:text-foreground"
            aria-label="Restablecer zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <IconButton label="Acercar" onClick={() => applyZoom(zoom + ZOOM_STEP)} disabled={zoom >= MAX_ZOOM}>
            <Plus />
          </IconButton>

          <span className="mx-2 h-4 w-px bg-border" aria-hidden />

          {downloadable && (
            <a
              href={src}
              download
              aria-label="Descargar PDF"
              title="Descargar PDF"
              className={ICON_BTN}
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
            </a>
          )}
          <IconButton
            label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 /> : <Maximize2 />}
          </IconButton>
        </div>
      </figcaption>
    </figure>
  );
}

const ICON_BTN =
  "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-30 [&_svg]:h-4 [&_svg]:w-4";

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled} className={ICON_BTN}>
      <span className="contents [&_svg]:stroke-[1.5]">{children}</span>
    </button>
  );
}

const FLIPBOOK_CSS = `
.pfb-stage { transform-origin: center center; will-change: transform; }
.pfb-shift { transition: transform 700ms cubic-bezier(.45,.05,.25,1); }
.pfb-stage .stf__parent { margin: 0 auto; }
.pfb .pfb-page { background: #fff; overflow: hidden; }
.pfb .pfb-page img { display: block; width: 100%; height: 100%; object-fit: cover; user-select: none; -webkit-user-drag: none; }
.pfb .stf__block { filter: drop-shadow(0 12px 28px rgb(0 0 0 / 0.10)) drop-shadow(0 2px 6px rgb(0 0 0 / 0.06)); }
.pfb .pfb-page.--left::after, .pfb .pfb-page.--right::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
}
.pfb .pfb-page.--left::after { background: linear-gradient(to left, rgb(0 0 0 / 0.07), transparent 3.5%); }
.pfb .pfb-page.--right::after { background: linear-gradient(to right, rgb(0 0 0 / 0.07), transparent 3.5%); }
.pfb .stf__wrapper.--portrait .pfb-page::after { background: none; }
`;
