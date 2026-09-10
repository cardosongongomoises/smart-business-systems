import { useState, useEffect } from "react";
import {
  ArrowRight,
  PlayCircle,
  Circle,
  Bot,
  CheckCircle2,
  Sparkles,
  Activity,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

const flow = [
  {
    label: "NOVO CLIENTE",
    detail: "Mensagem recebida de visitante interessado",
    tag: "INBOUND",
    desc: "“Olá, gostaria de informações sobre os serviços”",
  },
  {
    label: "WhatsApp",
    detail: "Canal oficial da empresa conectado",
    tag: "CANAL",
    desc: "Sincronização imediata via API Cloud",
  },
  {
    label: "AGENTE IA",
    detail: "Atendimento imediato em linguagem natural",
    tag: "IA ATIVA",
    desc: "Análise de intenção e tom de voz",
  },
  {
    label: "QUALIFICAÇÃO",
    detail: "Identificação de necessidade e perfil",
    tag: "FILTRO",
    desc: "Serviço, orçamento e prioridade",
  },
  {
    label: "AGENDAMENTO",
    detail: "Calendário e horários integrados",
    tag: "AGENDA",
    desc: "Horário reservado e link enviado",
  },
  {
    label: "CRM",
    detail: "Oportunidade registada na base comercial",
    tag: "CONVERSÃO",
    desc: "Alerta em tempo real para a equipa",
  },
];

export function Hero() {
  const [activeStep, setActiveStep] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flow.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#080A0F]"
    >
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -top-40 left-1/3 size-[36rem] -translate-x-1/2 rounded-full bg-[#3B82F6]/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-20 right-1/4 size-[32rem] rounded-full bg-[#8B5CF6]/10 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-[#3B82F6] uppercase">
              Websites • Inteligência Artificial • Automação Comercial
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-[#F5F7FA] sm:text-6xl">
              Sua empresa pode trabalhar <span className="text-gradient">enquanto você dorme.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A7B0BF] sm:text-lg">
              Criamos websites profissionais, agentes de Inteligência Artificial e automações
              comerciais em Angola. Ajudamos a sua empresa a ser encontrada no Google, atender
              clientes 24/7 no WhatsApp, qualificar oportunidades e agendar reuniões
              automaticamente.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#3B82F6] px-6 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] active:scale-[0.98]"
              >
                Falar com especialista <ArrowRight className="size-4" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] border border-[#252C38] bg-transparent px-6 text-sm font-semibold text-[#F5F7FA] transition-colors hover:bg-[#151A23] hover:border-[#3B82F6]"
              >
                <PlayCircle className="size-4 text-[#A7B0BF]" /> Ver como funciona
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#A7B0BF]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#22C55E]" />
                </span>
                <span className="font-semibold text-[#F5F7FA]">Atendimento digital 24/7</span>
              </div>
              <span className="hidden sm:inline text-[#252C38]">•</span>
              <span>WhatsApp • Web • CRM integrado</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="ai-card relative overflow-hidden rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-5 sm:p-6 shadow-[0_0_32px_-8px_rgba(139,92,246,0.25)]">
            {/* Console Telemetry Topbar */}
            <div className="flex items-center justify-between border-b border-[#252C38] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-[6px] bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  <Bot className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#F5F7FA] uppercase">
                    AI AGENT SYSTEM
                  </p>
                  <p className="text-[10px] font-mono text-[#A7B0BF]">AGENTES_CORE_v3.2</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-1">
                <span className="size-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
                  ONLINE
                </span>
              </div>
            </div>

            {/* Software Flow */}
            <div className="mt-4 space-y-2">
              {flow.map((step, i) => {
                const isCurrent = activeStep === i;
                const isAI = step.label === "AGENTE IA";

                return (
                  <div key={step.label} className="group">
                    <div
                      onClick={() => setActiveStep(i)}
                      className={`cursor-pointer transition-all duration-200 rounded-[10px] border p-3 ${
                        isCurrent
                          ? isAI
                            ? "border-[#8B5CF6] bg-[#8B5CF6]/15 shadow-sm shadow-[#8B5CF6]/20"
                            : "border-[#3B82F6] bg-[#3B82F6]/15 shadow-sm shadow-[#3B82F6]/20"
                          : "border-[#252C38] bg-[#0E121A] hover:border-[#3B82F6]/40 hover:bg-[#151A23]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex size-6 items-center justify-center rounded-[6px] font-mono text-[11px] font-bold transition-colors ${
                              isCurrent
                                ? isAI
                                  ? "bg-[#8B5CF6] text-white"
                                  : "bg-[#3B82F6] text-white"
                                : "border border-[#252C38] bg-[#151A23] text-[#A7B0BF]"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-xs font-bold tracking-wider uppercase ${
                                  isAI ? "text-[#C084FC]" : "text-[#F5F7FA]"
                                }`}
                              >
                                {step.label}
                              </p>
                              {isCurrent && (
                                <span
                                  className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase ${
                                    isAI
                                      ? "bg-[#8B5CF6]/20 text-[#C084FC]"
                                      : "bg-[#3B82F6]/20 text-[#93C5FD]"
                                  }`}
                                >
                                  <Sparkles className="size-2.5" /> EM EXECUÇÃO
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#A7B0BF]">{step.detail}</p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider text-[#667085] uppercase">
                          {step.tag}
                        </span>
                      </div>

                      {isCurrent && (
                        <div className="mt-2.5 border-t border-[#252C38] pt-2 text-xs font-mono flex items-center justify-between text-[#F5F7FA]">
                          <span className="text-[#A7B0BF]">{step.desc}</span>
                          <span className="text-[10px] text-[#3B82F6]">42ms</span>
                        </div>
                      )}
                    </div>

                    {i < flow.length - 1 && (
                      <div className="mx-auto flex h-2.5 items-center justify-center">
                        <div
                          className={`h-full w-0.5 transition-colors duration-200 ${
                            isCurrent ? (isAI ? "bg-[#8B5CF6]" : "bg-[#3B82F6]") : "bg-[#252C38]"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sub-bar */}
            <div className="mt-4 flex items-center justify-between border-t border-[#252C38] pt-3 text-[11px] text-[#A7B0BF]">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#22C55E]" />
                Automação contínua 24/7
              </span>
              <span className="font-mono text-[#3B82F6]">Disponibilidade 99.9%</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
