import { useState, useEffect } from "react";
import { ArrowRight, CalendarCheck, MessageSquare, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { HighlightWipe } from "./MotionPrimitives";
import { DEMO_CTA_LABEL } from "@/lib/site-config";

const bookingFlow = [
  {
    label: "Cliente envia mensagem",
    detail: "Pergunta sobre limpeza de pele ou horários no WhatsApp",
    tag: "21h45",
    desc: '"Olá! Gostaria de saber o preço de uma limpeza de pele."',
    badge: "Recebida",
  },
  {
    label: "Recepção digital responde",
    detail: "Apresenta os serviços, preços e regras que o espaço autorizou",
    tag: "Serviços",
    desc: '"Temos limpeza de pele. Posso apresentar as opções e ajudar a marcar."',
    badge: "Informada",
  },
  {
    label: "Consulta à agenda real",
    detail: "Mostra os horários disponíveis dos profissionais",
    tag: "Agenda",
    desc: '"Tenho disponível amanhã às 14h00, 15h30 e 17h00. Qual prefere?"',
    badge: "Horários reais",
  },
  {
    label: "Marcação registada e confirmada",
    detail: "A cliente escolhe 15h30 e o horário entra na agenda",
    tag: "Confirmada",
    desc: '"Marcação registada para amanhã às 15h30. Obrigada!"',
    badge: "Na agenda",
  },
];

export function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % bookingFlow.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-20 lg:pb-24 bg-[#F5F3EE] text-[#101D35]"
    >
      <img
        src="/assets/aistudio/Profissional_Multitarefa_num_Escrit_rio_Moderno_bb546f5b.png"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        referrerPolicy="no-referrer"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F5F3EE]/95 via-[#F5F3EE]/86 to-[#F5F3EE]/62" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F5F3EE] to-transparent" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-stretch gap-8 sm:gap-10 px-4 sm:px-8 lg:gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <Reveal>
            <h1 className="font-heading text-[clamp(1.85rem,5vw,3.35rem)] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#101D35] text-balance">
              Cliente à sua frente.{" "}
              <span className="text-[#D9531C]">
                <HighlightWipe highlightColor="#FDE3D6" delay={180}>
                  Mensagens por responder no WhatsApp.
                </HighlightWipe>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-6 max-w-[58ch] text-base leading-[1.65] text-[#101D35]/90 font-medium sm:text-lg">
              Para donos e gestores de espaços de estética em Angola: implementamos uma recepção
              digital que responde às perguntas frequentes, apresenta os serviços e regista as
              marcações na sua agenda, para a equipa se concentrar em quem está presente.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#demonstracao-final"
                className="group lume-btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap shrink-0"
              >
                <span>{DEMO_CTA_LABEL}</span>
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#avaliacao-whatsapp"
                className="lume-btn-secondary-light inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap shrink-0"
              >
                <MessageSquare className="size-4 shrink-0" aria-hidden="true" />
                <span>Avaliar o atendimento do meu WhatsApp</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 text-xs font-medium text-[#5B6B8C]">
              Demonstração sem custo, com dados de teste e marcação feita numa agenda de teste.
            </p>
          </Reveal>
        </div>

        {/* Interactive Swiss Navy Showcase Card: WhatsApp to Registered Booking */}
        <Reveal delay={140} variant="scale">
          <TiltCard>
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="overflow-hidden rounded-[16px] border border-[#2A3D63] bg-[#101D35] text-[#F5F3EE] shadow-[0_24px_60px_-15px_rgba(16,29,53,0.28)]"
            >
              {/* Interactive Step Progress Indicator */}
              <div className="grid grid-cols-4 gap-1.5 bg-[#1A2A4A] px-4 sm:px-6 pt-4 sm:pt-5 pb-3.5 sm:pb-4 border-b border-[#2A3D63]">
                {bookingFlow.map((step, i) => (
                  <button
                    key={step.label}
                    type="button"
                    aria-label={`Ver etapa ${i + 1}: ${step.label}`}
                    onClick={() => setActiveStep(i)}
                    className="group py-1.5 cursor-pointer focus-visible:outline-none"
                  >
                    <span className="relative block h-1.5 w-full overflow-hidden rounded-full bg-[#2A3D63] group-hover:bg-[#5B6B8C]/70 transition-colors">
                      {i < activeStep && <span className="block h-full w-full bg-[#F4C542]" />}
                      {i === activeStep && (
                        <span
                          key={`progress-${activeStep}-${paused ? "paused" : "play"}`}
                          className={`block h-full w-full origin-left bg-[#F36B32] ${
                            paused ? "" : "animate-[lume-step-progress_3.4s_linear_forwards]"
                          }`}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 sm:gap-4 border-b border-[#2A3D63] px-4 sm:px-6 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F36B32]">
                    <CalendarCheck className="size-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-xs font-bold tracking-[0.04em] text-[#F5F3EE] truncate">
                      Recepção Digital no WhatsApp
                    </p>
                    <p className="text-xs text-[#B8C0D0] truncate">
                      Conversa de demonstração · Dados fictícios
                    </p>
                  </div>
                </div>
                <span className="shrink-0 font-heading text-xs font-semibold text-[#F4C542] whitespace-nowrap">
                  Agenda
                </span>
              </div>

              <div
                className="divide-y divide-[#2A3D63]/70"
                role="list"
                aria-label="Etapas da marcação pelo WhatsApp"
              >
                {bookingFlow.map((step, i) => {
                  const isCurrent = activeStep === i;
                  return (
                    <button
                      key={step.label}
                      type="button"
                      onClick={() => setActiveStep(i)}
                      className={`w-full text-left transition-colors duration-200 px-4 sm:px-6 py-3.5 sm:py-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F36B32] ${
                        isCurrent ? "bg-[#1A2A4A]" : "bg-[#101D35] hover:bg-[#1A2A4A]/55"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span
                            className={`flex size-7 shrink-0 items-center justify-center rounded-[8px] font-heading text-xs font-bold tabular-nums transition-all duration-200 ${
                              isCurrent
                                ? "bg-[#F36B32] text-[#101D35] scale-105"
                                : "border border-[#2A3D63] bg-[#1A2A4A] text-[#B8C0D0]"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <div className="min-w-0">
                            <p
                              className={`font-heading text-xs font-bold tracking-wide transition-colors duration-200 ${
                                isCurrent ? "text-[#F5F3EE]" : "text-[#B8C0D0]"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-[#B8C0D0] truncate">{step.detail}</p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-block shrink-0 font-heading text-[11px] font-semibold text-[#F4C542] tabular-nums">
                          {step.tag}
                        </span>
                      </div>

                      {isCurrent && (
                        <div
                          key={`quote-${i}`}
                          className="mt-3 border-t border-[#2A3D63]/80 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs animate-[lume-slide-up_260ms_cubic-bezier(0.22,1,0.36,1)]"
                        >
                          <span className="text-[#F5F3EE] leading-relaxed">{step.desc}</span>
                          <span className="inline-flex items-center gap-1 shrink-0 text-[#2E9E6B] font-semibold">
                            <CheckCircle2 className="size-3.5" aria-hidden="true" />
                            {step.badge}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#2A3D63] bg-[#1A2A4A]/60 px-4 sm:px-6 py-3.5 text-xs text-[#B8C0D0]">
                <span>Preços e horários reais vêm do seu espaço</span>
                <span className="font-heading font-bold text-[#F36B32] tabular-nums">
                  0{activeStep + 1} / 04
                </span>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
