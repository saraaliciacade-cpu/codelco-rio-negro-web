import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";

import { AppProviders, AppRoutes } from "./App";
import "./index.css";

export interface RenderResult {
  html: string;
  head: string;
}

export function render(url: string): RenderResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const helmetContext: any = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <AppProviders>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </AppProviders>
      </HelmetProvider>
    </StrictMode>
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return { html, head };
}

/**
 * Pages are code-split with React.lazy, so the first synchronous render only
 * produces the Suspense fallback (no Helmet head). Rendering repeatedly while
 * flushing microtasks lets the lazy modules resolve, after which the real page
 * markup and its head tags are produced.
 */
export async function renderPage(url: string, attempts = 12): Promise<RenderResult> {
  let result = render(url);
  for (let i = 0; i < attempts; i += 1) {
    if (/<title[^>]*>[^<]+<\/title>/.test(result.head)) return result;
    await new Promise((resolve) => setTimeout(resolve, 0));
    result = render(url);
  }
  return result;
}
