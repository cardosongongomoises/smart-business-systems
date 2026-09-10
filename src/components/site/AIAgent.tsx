import { useState, useEffect } from "react";
import {
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Send,
  Calendar,
  MessageSquare,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

interface Message {
  from: "cliente" | "ia";
  text: string;
  time: string;
  badge?: string;
}

const scenarioConsultoria: Message[] = [
  { from: "cliente", text: "Olá, gostaria de agendar uma reunião.", time: "14:20" },
  {
    from: "ia",
    text: "Claro. Posso ajudar. Qual serviço você procura?",
    time: "14:20",
    badge: "Resposta em 0.8s",
  },
  { from: "cliente", text: "Consultoria empresarial.", time: "14:21" },
  {
    from: "ia",
    text: "Perfeito. Tenho disponibilidade amanhã às 10h ou às 15h. Qual horário prefere?",
    time: "14:21",
    badge: "Calendário consultado",
  },
  { from: "cliente", text: "15h.", time: "14:21" },
  {
    from: "ia",
    text: "Reunião agendada para amanhã às 15h. Enviarei a confirmação por WhatsApp e e-mail.",
    time: "14:22",
    badge: "Sincronizado com CRM & Google Calendar",
  },
];

const scenarioAutomacao: Message[] = [
  { from: "cliente", text: "Vocês conseguem automatizar nosso WhatsApp comercial?", time: "10:04" },
  {
    from: "ia",
    text: "Sim! Integramos agentes inteligentes para qualificar leads, responder dúvidas e agendar reuniões diretamente no seu número oficial.",
    time: "10:04",
    badge: "Detecção de intenção",
  },
  { from: "cliente", text: "E se o cliente quiser falar com um atendente?", time: "10:05" },
  {
    from: "ia",
    text: "O agente transfere a conversa imediatamente com o resumo de tudo o que foi falado.",
    time: "10:05",
    badge: "Encaminhamento Humano",
  },
];

export function AIAgent() {
  const [selectedScenario, setSelectedScenario] = useState<"consultoria" | "automacao">(
    "consultoria",
  );
  const [shownCount, setShownCount] = useState<number>(2);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activeMessages =
    selectedScenario === "consultoria" ? scenarioConsultoria : scenarioAutomacao;

  useEffect(() => {
    setShownCount(1);
    let current = 1;
    const interval = setInterval(() => {
      if (current < activeMessages.length) {
        setIsTyping(true);
        setTimeout(() => {
          current += 1;
          setShownCount(current);
          setIsTyping(false);
        }, 800);
      } else {
        clearInterval(interval);
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [selectedScenario, activeMessages.length]);

  return (
    <section
      id="agente-ia"
      className="relative py-20 sm:py-28 overflow-hidden bg-[#0E121A] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-[#8B5CF6]/5 blur-[140px]" />
      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#8B5CF6] uppercase">
              <Bot className="size-3.5" aria-hidden="true" /> Agentes de Inteligência Artificial
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
              Seu próximo colaborador corporativo pode ser uma{" "}
              <span className="text-gradient">Inteligência Artificial.</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A7B0BF]">
              Um agente virtual corporativo treinado exclusivamente com as diretrizes e dados da sua
              empresa. Ele atende no WhatsApp e na web, responde dúvidas com precisão, qualifica
              oportunidades e agenda reuniões no calendário da sua equipa.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
              <div className="rounded-[12px] border border-[#252C38] bg-[#151A23] p-4">
                <div className="flex items-center gap-2 text-[#3B82F6]">
                  <Zap className="size-4" aria-hidden="true" />
                  <span className="font-mono text-sm font-bold tabular-nums">0.8s</span>
                </div>
                <p className="mt-1.5 text-xs text-[#A7B0BF]">Tempo médio de resposta</p>
              </div>
              <div className="rounded-[12px] border border-[#252C38] bg-[#151A23] p-4">
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <Calendar className="size-4" aria-hidden="true" />
                  <span className="font-mono text-sm font-bold tabular-nums">24 / 7 / 365</span>
                </div>
                <p className="mt-1.5 text-xs text-[#A7B0BF]">Disponibilidade ininterrupta</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#3B82F6] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
              >
                Falar com um especialista
              </a>
              <a
                href="#canais"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] border border-[#252C38] bg-transparent px-6 text-sm font-semibold text-[#F5F7FA] transition-colors hover:bg-[#151A23] hover:border-[#3B82F6]"
              >
                Ver canais de atendimento
              </a>
            </div>
          </Reveal>
        </div>

        {/* Live Chat Simulator */}
        <Reveal delay={180}>
          <div className="ai-card relative overflow-hidden rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-5 sm:p-6 shadow-[0_0_32px_-8px_rgba(139,92,246,0.20)]">
            {/* Header Simulator */}
            <div className="flex items-center justify-between border-b border-[#252C38] pb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex size-9 items-center justify-center rounded-[8px] bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  <Bot className="size-4" aria-hidden="true" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-[#22C55E]" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">
                      Agente Digital IA
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#22C55E] tracking-wider uppercase">
                      ● ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A7B0BF]">
                    Atendimento corporativo • Agentes Digital
                  </p>
                </div>
              </div>

              {/* Scenarios switch */}
              <div className="flex items-center gap-1 rounded-[8px] border border-[#252C38] bg-[#0E121A] p-1">
                <button
                  type="button"
                  onClick={() => setSelectedScenario("consultoria")}
                  className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    selectedScenario === "consultoria"
                      ? "bg-[#3B82F6] text-white"
                      : "text-[#A7B0BF] hover:text-[#F5F7FA]"
                  }`}
                >
                  Agendamento
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScenario("automacao")}
                  className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    selectedScenario === "automacao"
                      ? "bg-[#3B82F6] text-white"
                      : "text-[#A7B0BF] hover:text-[#F5F7FA]"
                  }`}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="mt-5 space-y-3 min-h-[280px] flex flex-col justify-end">
              {activeMessages.slice(0, shownCount).map((m, i) => {
                const isAI = m.from === "ia";
                return (
                  <div
                    key={i}
                    className={`flex flex-col gap-1 transition-all duration-300 ${
                      isAI ? "items-start" : "items-end"
                    }`}
                  >
                    <div
                      className={`flex gap-2.5 max-w-[86%] sm:max-w-[78%] ${
                        isAI ? "" : "flex-row-reverse"
                      }`}
                    >
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[#252C38] bg-[#0E121A] text-[#A7B0BF]">
                        {isAI ? (
                          <Bot className="size-3.5 text-[#3B82F6]" aria-hidden="true" />
                        ) : (
                          <User className="size-3.5" aria-hidden="true" />
                        )}
                      </span>
                      <div>
                        <div
                          className={`rounded-[12px] px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                            isAI
                              ? "border border-[#3B82F6]/25 bg-[#3B82F6]/10 text-[#F5F7FA]"
                              : "border border-[#252C38] bg-[#252C38] text-[#F5F7FA]"
                          }`}
                        >
                          {m.text}
                        </div>
                        <div className="mt-1 flex items-center gap-2 px-1 text-[10px] text-[#667085]">
                          <span>{m.time}</span>
                          {m.badge && (
                            <span className="inline-flex items-center gap-1 font-mono text-[#3B82F6]">
                              • <CheckCircle2 className="size-2.5" aria-hidden="true" /> {m.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 pl-8 pt-1">
                  <span className="text-[11px] font-mono text-[#8B5CF6]">
                    ••• Agente processando
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-1.5 animate-bounce rounded-full bg-[#8B5CF6]"
                        style={{ animationDelay: `${d * 140}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-[#252C38] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setShownCount(activeMessages.length)}
                className="inline-flex items-center gap-1.5 text-[#A7B0BF] hover:text-[#F5F7FA] transition-colors"
              >
                <RotateCcw className="size-3" aria-hidden="true" /> Ver conversa completa
              </button>
              <span className="inline-flex items-center gap-1 text-[#22C55E] font-semibold text-[11px]">
                <CheckCircle2 className="size-3.5" aria-hidden="true" /> Atendimento Ativo
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
