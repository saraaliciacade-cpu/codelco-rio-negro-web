import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import whatsappLogo from "@/assets/whatsapp-logo.png";
import codelcoProfile from "@/assets/codelco-whatsapp-profile.png.asset.json";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const playNotificationSound = () => {
    try {
      const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {}
  };

  // Auto-open after 20s (once per session, scoped per route)
  useEffect(() => {
    const key = `wa_auto_opened_${window.location.pathname}`;
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(key, "1");
      playNotificationSound();
    }, 20000);
    return () => clearTimeout(t);
  }, []);

  // Show quick replies 6s after open
  useEffect(() => {
    if (!isOpen) {
      setShowQuickReplies(false);
      return;
    }
    const t = setTimeout(() => setShowQuickReplies(true), 6000);
    return () => clearTimeout(t);
  }, [isOpen]);

  const quickReplies = language === "es"
    ? [
        { label: "🏭 Módulos y Viviendas", text: "¡Hola! Estoy interesado en consultar por módulos habitacionales y viviendas para mi proyecto." },
        { label: "⚙️ Tanques y Equipos", text: "¡Hola! Quería consultar por la fabricación de tanques, piletas o equipos metalúrgicos a medida." },
        { label: "🚗 Rental de Vehículos", text: "¡Hola! Necesito información sobre alquiler de vehículos, trailers o equipos para mi operación." },
        { label: "⚡ Grupos Electrógenos", text: "¡Hola! Me interesa el alquiler o mantenimiento de grupos electrógenos industriales." },
      ]
    : [
        { label: "🏭 Modules & Housing", text: "Hi! I'm interested in modular housing and residential modules for my project." },
        { label: "⚙️ Tanks & Equipment", text: "Hi! I'd like to inquire about custom tanks, pools or metallurgical equipment." },
        { label: "🚗 Vehicle Rental", text: "Hi! I need information about vehicle, trailer or equipment rental for my operation." },
        { label: "⚡ Generator Sets", text: "Hi! I'm interested in rental or maintenance of industrial generator sets." },
      ];

  const handleSend = () => {
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/5492994136453?text=${encodedMessage}`, "_blank");
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const welcomeText = language === "es"
    ? "¡Hola! Somos Codelco S.A. 👋\n¿Necesitás módulos habitacionales, equipos metalúrgicos, rental de vehículos o grupos electrógenos?\nConsultá sin compromiso y te asesoramos."
    : "Hello! We are Codelco S.A. 👋\nDo you need residential modules, metallurgical equipment, vehicle rental or generator sets?\nAsk us with no obligation and we'll advise you.";

  const placeholderText = language === "es" ? "Escribe tu mensaje..." : "Write your message...";
  const onlineText = language === "es" ? "En línea" : "Online";

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
        {!isOpen && (
          <button
            onClick={handleButtonClick}
            className="relative group bg-primary hover:bg-primary/90 text-white rounded-full p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Open WhatsApp chat"
            style={{ backgroundColor: '#25D366' }}
          >
            <img src={whatsappLogo} alt="WhatsApp" className="w-10 h-10 sm:w-12 sm:h-12" width="577" height="583" />
            {/* Red notification badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>
        )}

        {/* WhatsApp Chat Window */}
        {isOpen && (
          <div className="animate-scale-in origin-bottom-right fixed bottom-16 right-4 sm:bottom-20 sm:right-5">
            <div
              className="w-[280px] sm:w-[300px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-border flex flex-col"
              style={{ maxHeight: 'calc(100dvh - 6rem)' }}
            >
              {/* Header */}
              <div className="text-white px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ backgroundColor: '#e65b2a' }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-white flex-shrink-0 ring-2 ring-white/30">
                    <img src={codelcoProfile} alt="Codelco S.A." className="w-full h-full object-cover" loading="eager" fetchPriority="high" width="96" height="96" decoding="async" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base leading-tight">Codelco S.A.</h3>
                    <p className="text-xs text-white/85 leading-tight mt-0.5">{onlineText}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/15 rounded-full p-1.5 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 min-h-0 px-4 py-4 overflow-y-auto bg-white">
                {/* Welcome Message Bubble */}
                <div className="animate-fade-in">
                  <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-100 shadow-sm">
                    <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                      {welcomeText}
                    </p>
                    <span className="text-[11px] text-muted-foreground block mt-1.5">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Quick Reply Chat Bubbles */}
                {showQuickReplies && (
                  <div className="flex flex-col items-end gap-2 mt-3 animate-fade-in">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => setMessage(qr.text)}
                        className="text-left text-sm bg-[#ffe5d9] hover:bg-[#ffccb3] text-foreground rounded-2xl rounded-tr-sm px-3.5 py-2 shadow-sm transition-colors max-w-[92%]"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="px-3 py-3 bg-white border-t border-border flex-shrink-0">
                <div className="flex items-center gap-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    rows={1}
                    placeholder={placeholderText}
                    className="flex-1 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none leading-snug min-h-[42px] max-h-24"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="rounded-full w-10 h-10 p-0 text-white disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    style={{ backgroundColor: '#e65b2a' }}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
