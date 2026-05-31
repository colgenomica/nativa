import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Brain, User, Calendar, RefreshCw, AlertCircle, Heart } from "lucide-react";
import { ChatMessage, Treatment } from "../types";

const QUICK_PROMPTS = [
  { text: "Tengo arrugas en la frente y entrecejo, ¿qué me recomiendan?", label: "Arrugas faciales" },
  { text: "Busco levantar y tonificar mis glúteos de forma natural.", label: "Tratamiento de Glúteos" },
  { text: "Quiero recuperar la firmeza facial y combatir la flacidez.", label: "Firmeza y Colágeno" },
  { text: "Me interesa tratar manchas oscuras y unificar el tono.", label: "Manchas y Melasma" },
  { text: "Busco disolver grasa en papada para perfilar mi rostro.", label: "Perfilación de Papada" }
];

interface AIAdvisorProps {
  onQuickBook: (treatmentId: string) => void;
}

export default function AIAdvisor({ onQuickBook }: AIAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from Dra. Sofía
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: "¡Hola! Un placer saludarte. Soy la Dra. Sofía, asesora dermoestética e investigadora en NATÍVA CLINIC, sede Mixy Mall Los Colores, Medellín.\n\nMi propósito es guiarte con rigor científico de forma cercana y empática a encontrar los protocolos de estética regenerativa idóneos para ti, respetando la expresividad e identidad de tu rostro y cuerpo.\n\nDime, ¿cuáles son tus objetivos estéticos actuales? ¿Te gustaría mejorar la elasticidad de tu piel, suavizar líneas gestuales, unificar el tono de tu rostro, o moldear tu silueta?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages]);

  // Infinite scroll tracking
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setErrorMsg("");

    const userMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Build chat history context in format server expects
    const historyPayload = messages.map((m) => ({
      role: m.role,
      text: m.text
    }));

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      const data = await response.json();

      if (data && data.response) {
        setMessages((prev) => [
          ...prev,
          {
            id: "resp-" + Date.now(),
            role: "model",
            text: data.response,
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg("Conexión inestable. Dra. Sofía de NATÍVA se encuentra offline.");
      setMessages((prev) => [
        ...prev,
        {
          id: "resp-err-" + Date.now(),
          role: "model",
          text: "¡Hola! Te pido una disculpa, en este instante estamos presentando una congestión técnica en nuestro servidor inteligente de consulta. No te preocupes: puedes ver nuestra gama de tratamientos estelares (Exosomas Celulares, Toxina Botulínica, Bioestimuladores, BioGlúteos) en la pestaña 'Tratamientos' o agendar directamente tu valoración médica gratuita en 'Agendar Cita' para que nuestro grupo de expertos evalúe tu caso en Medellín.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSubmit = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const handleClearHistory = () => {
    if (!window.confirm("¿Deseas reiniciar la consulta con la Dra. Sofía?")) return;
    setMessages([]);
  };

  // Helper parser to render text blocks with bold markdown and linebreaks cleanly without react-markdown overhead
  const formatAdvisorResponse = (rawText: string) => {
    return rawText.split("\n\n").map((paragraph, pIdx) => {
      // Check for bullet lists
      if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
        return (
          <ul key={pIdx} className="list-disc list-inside space-y-1.5 my-3 pl-2 text-slate-800 font-medium">
            {paragraph.split("\n").map((line, lIdx) => {
              const cleanedLine = line.replace(/^[\s*-]+/, "").trim();
              return <li key={lIdx} dangerouslySetInnerHTML={{ __html: parseBold(cleanedLine) }}></li>;
            })}
          </ul>
        );
      }

      // Standard paragraph
      return (
        <p
          key={pIdx}
          className="leading-relaxed text-sm text-slate-800 font-medium mb-4"
          dangerouslySetInnerHTML={{ __html: parseBold(paragraph) }}
        />
      );
    });
  };

  // Simple formatter replacing **bold** with <strong>bold</strong>
  const parseBold = (text: string) => {
    let formatted = text;
    const boldReg = /\*\*([^*]+)\*\*/g;
    formatted = formatted.replace(boldReg, "<strong class='text-nativa-gold-light font-bold'>$1</strong>");
    return formatted;
  };

  // Detect treatment matches in text block to render helpful scheduling guides
  const getSuggestedTreatments = (text: string) => {
    const treatmentsConfig = [
      { id: "exosomas", name: "Exosomas Celulares", keywords: ["exosoma", "exosomas", "regeneraci", "cicatriz", "acne"] },
      { id: "toxina", name: "Toxina Botulínica", keywords: ["toxina", "botulinic", "botox", "arruga", "entrecejo", "gallo"] },
      { id: "bioestimuladores", name: "Bioestimuladores de Soporte", keywords: ["bioestimula", "sculptra", "radiesse", "colagen", "flacidez"] },
      { id: "skinboosters", name: "Skinboosters", keywords: ["skinbooster", "hidratacion", "hialuronic", "turgencia", "brillo", "poro"] },
      { id: "melasma", name: "Aclaramiento de Melasma", keywords: ["melasma", "mancha", "aclaramiento", "hiperpigment", "tono"] },
      { id: "lipopapada", name: "Reducción de Lipopapada", keywords: ["papada", "menton", "perfil", "mandibul"] },
      { id: "biogluteos", name: "BioGlúteos Premium", keywords: ["gluteo", "biogluteo", "glúteo", "nalga", "proyeccion", "cola"] },
      { id: "bodyshape", name: "BodyShape", keywords: ["bodyshape", "grasa", "celulitis", "muslo", "abdomen"] },
      { id: "remodelacion", name: "Remodelación Corporal", keywords: ["remodelacion", "corporal", "silueta", "redefinicion"] }
    ];

    const matched: typeof treatmentsConfig = [];
    treatmentsConfig.forEach(t => {
      const normalized = text.toLowerCase();
      const hasMatch = t.keywords.some(k => normalized.includes(k));
      if (hasMatch) {
         matched.push(t);
      }
    });
    return matched;
  };

  return (
    <div className="space-y-8 select-none">
      {/* Title block */}
      <div className="pb-6 border-b border-nativa-green-accent flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-nativa-gold-warm flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5" /> Inteligencia Artificial Aplicada a la Estética
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold text-nativa-green-deep">
            Asesor Médico Virtual
          </h2>
          <p className="text-sm text-slate-650 max-w-lg font-medium">
            Plantea tus dudas o metas de autocuidado a la Dra. Sofía y recibe al instante un análisis de los procedimientos regenerativos alineados con tu tipo de piel.
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="self-start sm:self-end px-4 py-2 text-xs font-bold rounded-xl bg-white border border-nativa-green-accent text-slate-700 hover:bg-nativa-green-accent/10 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm animate-fade-in"
          title="Reiniciar chat"
        >
          <RefreshCw className="w-3.5 h-3.5 text-nativa-gold-warm" />
          Reiniciar Consulta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Chat window panel */}
        <div className="lg:col-span-8 flex flex-col h-[550px] rounded-2xl bg-white border border-nativa-green-accent overflow-hidden shadow-sm">
          {/* Custom chat header */}
          <div className="p-4 bg-[#fafaf6] border-b border-nativa-green-accent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-nativa-gold-warm/15 border border-nativa-gold-warm text-nativa-gold-warm flex items-center justify-center font-serif-elegant font-bold text-base">
                  DS
                </div>
                <span className="absolute bottom-px right-px block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-nativa-green-deep">Dra. Sofía</h4>
                <p className="text-[10px] text-nativa-green-deep/90 font-bold">Líder en Medicina Estética • Medellín</p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-nativa-gold-warm/20 border border-nativa-gold-warm/50 text-[9px] font-bold text-slate-800 uppercase tracking-widest font-mono">
              GEMINI 3.5 FLASH
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#fbfbf8]">
            {messages.map((m) => {
              const isUser = m.role === "user";
              const matches = !isUser ? getSuggestedTreatments(m.text) : [];

              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-3`}
                >
                  {/* Left avatar for Assistant */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-nativa-gold-warm/15 border border-nativa-gold-warm/40 text-nativa-gold-warm text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1">
                      DS
                    </div>
                  )}

                  <div className="space-y-3 max-w-[85%]">
                    {/* Message Bubble Container */}
                    <div
                      className={`p-4 sm:p-5 rounded-2xl shadow-sm leading-relaxed ${
                        isUser
                          ? "bg-nativa-green-deep text-white rounded-tr-none font-medium"
                          : "bg-white text-slate-850 border border-nativa-green-accent rounded-tl-none"
                      }`}
                    >
                      {isUser ? (
                        <p className="text-sm font-medium">{m.text}</p>
                      ) : (
                        formatAdvisorResponse(m.text)
                      )}

                      <span className={`block text-[9px] mt-2 text-right ${isUser ? "text-white/75" : "text-slate-500"} font-mono`}>
                        {m.timestamp.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    {/* Associated Recommended Treatments Widget directly inside assistant responses */}
                    {!isUser && matches.length > 0 && (
                      <div className="p-4 rounded-xl bg-nativa-bg border border-nativa-green-accent space-y-3">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-nativa-gold-warm flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> PROCEDIMIENTO SUGERIDO POR LA CONSULTA:
                        </div>
                        <div className="space-y-2">
                          {matches.slice(0, 2).map((t) => (
                            <div
                              key={t.id}
                              className="flex items-center justify-between gap-3 p-2 rounded-lg bg-white border border-nativa-green-accent"
                            >
                              <span className="text-xs font-bold text-nativa-green-deep">{t.name}</span>
                              <button
                                onClick={() => onQuickBook(t.id)}
                                className="px-3.5 py-1.5 rounded-lg bg-nativa-green-deep text-white text-[10px] font-bold hover:bg-opacity-95 transition-all cursor-pointer"
                              >
                                Agendar
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right avatar for User */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-nativa-green-deep text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Loading indicators */}
            {isLoading && (
              <div className="flex justify-start items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-nativa-gold-warm/10 border border-nativa-gold-warm/30 text-nativa-gold-warm text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1 animate-spin">
                  DS
                </div>
                <div className="p-4 rounded-2xl bg-white text-slate-800 border border-nativa-green-accent rounded-tl-none">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-nativa-gold-warm animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="inline-block w-2 h-2 rounded-full bg-nativa-gold-warm animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="inline-block w-2 h-2 rounded-full bg-nativa-gold-warm animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    <span className="text-xs text-slate-500 font-semibold font-mono ml-2">La Dra. Sofía está analizando tu perfil...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Anchor point to scroll to */}
            <div ref={chatEndRef} />
          </div>

          {/* Input control field */}
          <div className="p-4 bg-[#fafaf6] border-t border-nativa-green-accent space-y-3">
            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-250 text-[10px] text-red-800 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span className="font-semibold">{errorMsg}</span>
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tus inquietudes (ej: ¿Cómo tratar flacidez de cuello?)..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-full bg-white border border-nativa-green-accent text-xs text-slate-800 placeholder-slate-500 font-semibold focus:outline-none focus:border-nativa-gold-warm"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-3 rounded-full bg-nativa-green-deep text-white hover:bg-opacity-95 disabled:opacity-40 transition-colors cursor-pointer shadow-sm"
                title="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Clinical guides & Quick recommendations sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          {/* Quick prompts catalog */}
          <div className="p-5 rounded-2xl bg-white border border-nativa-green-accent space-y-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-nativa-gold-warm flex items-center gap-1.5">
              <Heart className="w-4 h-4" /> Consultas de Mayor Interés
            </h4>
            <div className="flex flex-col gap-2.5">
              {QUICK_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickSubmit(p.text)}
                  disabled={isLoading}
                  className="w-full text-left p-3.5 rounded-xl bg-nativa-bg/40 border border-nativa-green-accent/60 text-xs text-slate-700 hover:text-nativa-green-deep hover:border-nativa-gold-warm hover:bg-nativa-green-accent/10 transition-all text-ellipsis overflow-hidden disabled:opacity-50 cursor-pointer"
                >
                  <div className="font-bold text-[10px] text-nativa-gold-light uppercase tracking-wider mb-1">
                    {p.label}
                  </div>
                  "{p.text}"
                </button>
              ))}
            </div>
          </div>

          {/* Privacy statement safety banner */}
          <div className="p-4 rounded-2xl bg-nativa-green-accent/25 border border-nativa-green-accent text-[11px] text-slate-705 space-y-2 shadow-inner">
            <h5 className="font-bold text-nativa-green-deep uppercase text-[9px] tracking-wider flex items-center gap-1">
              🛡️ Rigor y Resguardo Clínico
            </h5>
            <p className="font-medium leading-relaxed">
              La consejería brindada en este módulo interactivo representa un pre-análisis estimativo conducido por Inteligencia Artificial de grado dermoestético y no sustituye la supervisión médica presencial obligatoria realizada con escáner cutáneo. Todas las consultas son estrictamente confidenciales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
