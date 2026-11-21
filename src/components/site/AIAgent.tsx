import { useState, useEffect } from "react";
import { Bot, User, CheckCircle2, RotateCcw, Users, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

interface Message {
  from: "cliente" | "ia";
  text: string;
  time: string;
  badge?: string;
}

const scenarioWhatsApp: Message[] = [
  {
    from: "cliente",
    text: "Olá, gostaria de agendar uma avaliação para a nossa equipa.",
    time: "14:20",
  },
  {
    from: "ia",
    text: "Olá! Com certeza. Para encaminhar melhor, qual é o tamanho aproximado da equipa e o serviço que procura?",
    time: "14:20",
    badge: "Resposta inicial",
  },
  { from: "cliente", text: "Somos 12 pessoas e procuramos acompanhamento mensal.", time: "14:21" },
  {
    from: "ia",
    text: "Obrigado. Temos disponibilidade amanhã às 10h ou às 15h. Qual dos horários prefere?",
    time: "14:21",
    badge: "Agenda verificada",
  },
  { from: "cliente", text: "Prefiro amanhã às 15h.", time: "14:21" },
  {
    from: "ia",
    text: "Reunião confirmada para amanhã às 15h. Enviámos a confirmação e lembrete, e o nosso responsável já tem o resumo do seu pedido.",
    time: "14:22",
    badge: "Registado e encaminhado",
  },
];

const scenarioHumano: Message[] = [
  {
    from: "cliente",
    text: "Boa noite, temos um contrato com condições específicas e preciso de falar com um responsável.",
    time: "20:14",
  },
  {
    from: "ia",
    text: "Boa noite! Já registei o seu pedido. Pode indicar o nome da sua empresa e o tema principal para que o responsável lhe dê continuidade com todo o contexto?",
    time: "20:14",
    badge: "Recolha de contexto",
  },
  {
    from: "cliente",
    text: "Empresa Horizonte, integração entre o nosso sistema interno e o comercial.",
    time: "20:15",
  },
  {
    from: "ia",
    text: "Registado. Encaminhei este resumo para a nossa equipa comercial dar seguimento direto logo no início do atendimento humano.",
    time: "20:15",
    badge: "Passagem para colaborador",
  },
];

const practicalFlowSteps = [
  "1. O cliente envia uma mensagem no WhatsApp ou preenche o formulário.",
  "2. O sistema responde de imediato e esclarece dúvidas frequentes.",
  "3. Recolhe informações importantes do contacto e do pedido.",
  "4. Encaminha para um colaborador ou agenda uma reunião disponível.",
  "5. Regista os dados num painel ou folha organizada.",
  "6. Envia lembretes e confirmações antes da hora marcada.",
  "7. Realiza follow-up automático nos dias definidos se não houver retorno.",
  "8. Mantém a equipa notificada com o resumo completo da conversa.",
];

export function AIAgent() {
  const [selectedScenario, setSelectedScenario] = useState<"whatsapp" | "humano">("whatsapp");
  const [shownCount, setShownCount] = useState<number>(2);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activeMessages = selectedScenario === "whatsapp" ? scenarioWhatsApp : scenarioHumano;

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
      <div className="mx-auto grid w-full max-w-[1200px] items-start gap-12 lg:gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="lume-eyebrow text-[#D9531C]">04 · Demonstração prática</p>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
              Veja como funciona na prática do primeiro contacto ao{" "}
              <span className="text-[#D9531C]">encaminhamento para a sua equipa.</span>
            </h2>
          </Reveal>

          <Reveal delay={110}>
            <p className="mt-4 max-w-xl text-base leading-[1.65] text-[#5B6B8C]">
              Um fluxo simples que liga o atendimento automático no WhatsApp, website e e-mail à
              agenda e aos colaboradores da sua empresa, mantendo sempre o controlo humano quando a
              decisão exige uma pessoa.
            </p>
          </Reveal>

          {/* 8-step sequence */}
          <Reveal delay={160}>
            <div className="mt-7 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 sm:p-6">
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#D9531C]">
                Sequência prática do fluxo
              </p>
              <ol className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {practicalFlowSteps.map((step) => (
                  <li key={step} className="flex items-start gap-2 text-xs text-[#101D35]">
                    <CheckCircle2
                      className="size-3.5 mt-0.5 text-[#2E9E6B] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-6 flex items-center gap-3 rounded-[12px] border border-[#E7E3D9] bg-[#FFFFFF] p-4 text-xs text-[#5B6B8C]">
              <Users className="size-5 text-[#101D35] shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-[#101D35]">A IA não substitui a equipa:</strong> trata do
                primeiro atendimento e das rotinas repetitivas; quando o cliente precisa de
                negociação humana, passa tudo organizado para o colaborador certo.
              </span>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <a
                href="#contacto"
                className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap shrink-0"
              >
                <span>Solicitar diagnóstico</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={CTA.meeting}
                target="_blank"
                rel="noopener noreferrer"
                className="lume-btn-secondary-light inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap shrink-0"
              >
                <span>Agendar demonstração no WhatsApp</span>
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
                      Simulação Ilustrativa
                    </p>
                    <span className="rounded-full bg-[#F4C542] px-2 py-0.5 font-heading text-[10px] font-bold text-[#101D35] tracking-wider uppercase">
                      DEMO
                    </span>
                  </div>
                  <p className="text-[11px] text-[#B8C0D0]">
                    Atendimento, agendamento e passagem para colaborador
                  </p>
                </div>
              </div>

              {/* Scenario Switch */}
              <div className="flex items-center gap-1 rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] p-1">
                <button
                  type="button"
                  onClick={() => setSelectedScenario("whatsapp")}
                  className={`rounded-[6px] px-2.5 py-1 font-heading text-[11px] font-bold transition-colors cursor-pointer ${
                    selectedScenario === "whatsapp"
                      ? "bg-[#F36B32] text-[#101D35]"
                      : "text-[#B8C0D0] hover:text-[#F5F3EE]"
                  }`}
                >
                  Marcação
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScenario("humano")}
                  className={`rounded-[6px] px-2.5 py-1 font-heading text-[11px] font-bold transition-colors cursor-pointer ${
                    selectedScenario === "humano"
                      ? "bg-[#F36B32] text-[#101D35]"
                      : "text-[#B8C0D0] hover:text-[#F5F3EE]"
                  }`}
                >
                  Passagem humana
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
                    A preparar resposta...
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
                Exemplo interativo
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
