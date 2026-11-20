import { useState, useEffect } from "react";
import { Bot, User, CheckCircle2, RotateCcw, Calendar, Zap, ArrowRight } from "lucide-react";
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
    text: "Olá! Com certeza. Qual serviço da nossa empresa procura neste momento?",
    time: "14:20",
    badge: "Resposta em <10s",
  },
  { from: "cliente", text: "Consultoria empresarial.", time: "14:21" },
  {
    from: "ia",
    text: "Perfeito. Temos horários livres amanhã às 10h ou às 15h. Qual prefere?",
    time: "14:21",
    badge: "Agenda verificada",
  },
  { from: "cliente", text: "15h.", time: "14:21" },
  {
    from: "ia",
    text: "Reunião marcada para amanhã às 15h. Já enviei a confirmação no WhatsApp e e-mail.",
    time: "14:22",
    badge: "Registado e confirmado",
  },
];

const scenarioAutomacao: Message[] = [
  {
    from: "cliente",
    text: "Boa noite, quanto custa o atendimento automático para o nosso WhatsApp?",
    time: "21:14",
  },
  {
    from: "ia",
    text: "Boa noite! Posso ajudar já. Depende se já têm website ou se precisam de um site novo. Já têm website ativo?",
    time: "21:14",
    badge: "Ativo fora do expediente",
  },
  { from: "cliente", text: "Sim, já temos site, mas quero falar com um comercial.", time: "21:15" },
  {
    from: "ia",
    text: "Sem problema. Passei o seu pedido e o resumo desta conversa para um especialista continuar consigo.",
    time: "21:15",
    badge: "Passagem para a equipa",
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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      if (current < activeMessages.length) {
        setIsTyping(true);
        timeoutId = setTimeout(() => {
          current += 1;
          setShownCount(current);
          setIsTyping(false);
        }, 700);
      } else {
        clearInterval(interval);
      }
    }, 2200);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [selectedScenario, activeMessages.length]);

  return (
    <section
      id="agente-ia"
      className="py-20 sm:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="lume-eyebrow text-[#D9531C]">Como fazemos</p>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
              Atendimento que responde, qualifica e{" "}
              <span className="text-[#D9531C]">marca a reunião por si.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-base leading-[1.65] text-[#5B6B8C]">
              Um assistente automático, treinado com a informação da sua empresa, atende no WhatsApp
              e no website a qualquer hora, responde às dúvidas comuns e marca a reunião na agenda.
              Quando a conversa exige uma pessoa, passa para a sua equipa com o histórico completo.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
              <div className="rounded-[12px] border border-[#E7E3D9] bg-[#FFFFFF] p-5">
                <div className="flex items-center gap-2 text-[#D9531C]">
                  <Zap className="size-4" aria-hidden="true" />
                  <span className="font-heading text-xl font-extrabold text-[#101D35] tabular-nums">
                    &lt;10s
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[#5B6B8C]">Resposta ao primeiro contacto</p>
              </div>
              <div className="rounded-[12px] border border-[#E7E3D9] bg-[#FFFFFF] p-5">
                <div className="flex items-center gap-2 text-[#2E9E6B]">
                  <Calendar className="size-4" aria-hidden="true" />
                  <span className="font-heading text-xl font-extrabold text-[#101D35] tabular-nums">
                    24 / 7 / 365
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[#5B6B8C]">Noites, fins de semana e feriados</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap shrink-0"
              >
                <span>Quero parar de perder clientes</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#canais"
                className="lume-btn-secondary-light inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap shrink-0"
              >
                <span>Ver canais atendidos</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Live Chat Simulator in Lume Navy */}
        <Reveal delay={140}>
          <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-5 sm:p-6 text-[#F5F3EE]">
            {/* Lume Accent Bar */}
            <div className="flex gap-2 mb-5">
              <span className="h-1.5 flex-1 rounded-full bg-[#2A3D63]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#F36B32]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#F4C542]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#F5F3EE]" />
            </div>

            {/* Header Simulator */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A3D63] pb-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F36B32]">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#F5F3EE]">
                      Atendimento Automático
                    </p>
                    <span className="rounded-full bg-[#F4C542] px-2 py-0.5 font-heading text-[10px] font-bold text-[#101D35] tracking-wider uppercase">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#B8C0D0]">Exemplo real de resposta e marcação</p>
                </div>
              </div>

              {/* Scenario Switch */}
              <div className="flex items-center gap-1 rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] p-1">
                <button
                  type="button"
                  onClick={() => setSelectedScenario("consultoria")}
                  className={`rounded-[6px] px-2.5 py-1 font-heading text-[11px] font-bold transition-colors cursor-pointer ${
                    selectedScenario === "consultoria"
                      ? "bg-[#F36B32] text-[#101D35]"
                      : "text-[#B8C0D0] hover:text-[#F5F3EE]"
                  }`}
                >
                  Marcação
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScenario("automacao")}
                  className={`rounded-[6px] px-2.5 py-1 font-heading text-[11px] font-bold transition-colors cursor-pointer ${
                    selectedScenario === "automacao"
                      ? "bg-[#F36B32] text-[#101D35]"
                      : "text-[#B8C0D0] hover:text-[#F5F3EE]"
                  }`}
                >
                  Fora de hora
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
                    className={`flex flex-col gap-1 transition-all duration-200 ${
                      isAI ? "items-start" : "items-end"
                    }`}
                  >
                    <div
                      className={`flex gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                        isAI ? "" : "flex-row-reverse"
                      }`}
                    >
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[#2A3D63] bg-[#1A2A4A] text-[#B8C0D0]">
                        {isAI ? (
                          <Bot className="size-3.5 text-[#F36B32]" aria-hidden="true" />
                        ) : (
                          <User className="size-3.5" aria-hidden="true" />
                        )}
                      </span>
                      <div>
                        <div
                          className={`rounded-[12px] px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                            isAI
                              ? "border border-[#2A3D63] bg-[#1A2A4A] text-[#F5F3EE]"
                              : "border border-[#F5F3EE] bg-[#F5F3EE] text-[#101D35] font-medium"
                          }`}
                        >
                          {m.text}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 px-1 text-[11px] text-[#B8C0D0]">
                          <span className="tabular-nums">{m.time}</span>
                          {m.badge && (
                            <span className="inline-flex items-center gap-1 font-medium text-[#F4C542]">
                              <CheckCircle2 className="size-3" aria-hidden="true" />
                              {m.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 pl-8 pt-1">
                  <span className="font-heading text-[11px] font-semibold text-[#F4C542]">
                    Agente a responder...
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3.5 border-t border-[#2A3D63] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsTyping(false);
                  setShownCount(activeMessages.length);
                }}
                className="inline-flex items-center gap-1.5 text-[#B8C0D0] hover:text-[#F5F3EE] transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                <span>Ver conversa completa</span>
              </button>
              <span className="inline-flex items-center gap-1.5 text-[#2E9E6B] font-semibold text-xs">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Atendimento Ativo
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
