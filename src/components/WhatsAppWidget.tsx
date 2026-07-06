import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import whatsappLogo from "@/assets/whatsapp-logo.png";
import codelcoProfile from "@/assets/codelco-profile.png";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const { language } = useLanguage();

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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {!isOpen && (
          <button
            onClick={handleButtonClick}
            className="relative group text-white rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16"
            aria-label="Open WhatsApp chat"
            style={{ backgroundColor: '#25D366' }}
          >
            <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8 sm:w-9 sm:h-9" width="577" height="583" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse ring-2 ring-white" />
          </button>
        )}

        {/* WhatsApp Chat Window */}
        {isOpen && (
          <div className="animate-scale-in origin-bottom-right fixed bottom-16 right-3 sm:bottom-20 sm:right-6">
            <div
              className="w-[360px] max-w-[calc(100vw-1.5rem)] bg-[#0b141a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70dvh] sm:max-h-[560px]"
            >
              {/* Header - Green like Organic Design */}
              <div className="text-white px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-white flex-shrink-0 ring-2 ring-white/40">
                    <img src={codelcoProfile} alt="Codelco S.A." className="w-full h-full object-cover" loading="eager" fetchPriority="high" width="96" height="96" decoding="async" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">Codelco S.A.</h3>
                    <p className="text-xs text-white/90 leading-tight mt-0.5">{onlineText}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/15 rounded-full p-1 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Body - Dark WhatsApp style */}
              <div
                className="flex-1 min-h-0 px-3 py-4 overflow-y-auto"
                style={{
                  backgroundColor: '#0b141a',
                  backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='%23ffffff' stroke-opacity='0.04' stroke-width='1'><circle cx='20' cy='20' r='6'/><path d='M50 30 l6 6 l-6 6 l-6 -6z'/><circle cx='90' cy='25' r='4'/><path d='M15 70 q10 -10 20 0 t20 0'/><circle cx='75' cy='75' r='8'/><path d='M100 90 l6 -6 l6 6 l-6 6z'/><circle cx='40' cy='100' r='5'/></g></svg>\")",
                }}
              >
                {/* Welcome Message Bubble */}
                <div className="animate-fade-in">
                  <div className="bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2 shadow-sm max-w-[85%] relative">
                    <p className="text-[14px] text-white/95 whitespace-pre-line leading-[1.5]">
                      {welcomeText}
                    </p>
                    <span className="text-[10px] text-white/50 block mt-1 text-right">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Quick Reply Bubbles - Right aligned green */}
                {showQuickReplies && (
                  <div className="flex flex-col items-end gap-2 mt-3 animate-fade-in">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => setMessage(qr.text)}
                        className="text-left text-[13px] bg-[#005c4b] hover:bg-[#00755f] text-white rounded-lg rounded-tr-none px-3 py-2 shadow-sm transition-colors max-w-[85%]"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="px-3 py-2.5 bg-[#1f2c34] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    rows={1}
                    placeholder={placeholderText}
                    className="flex-1 px-4 py-2.5 rounded-full bg-[#2a3942] text-white placeholder:text-white/50 border-none focus:ring-2 focus:ring-[#25D366]/40 outline-none transition-all text-sm resize-none leading-snug min-h-[42px] max-h-24"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="rounded-full w-10 h-10 p-0 text-white disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 hover:opacity-90"
                    style={{ backgroundColor: '#25D366' }}
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
