import { useState, useEffect } from "react";
import { ArrowRight, PlayCircle, Bot, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

const flow = [
  {
    label: "O cliente escreve",
    detail: "Manda mensagem no WhatsApp às 19h ou ao sábado",
    tag: "Contacto",
    desc: '"Boa noite, quanto custa o vosso serviço?"',
  },
  {
    label: "Resposta em menos de 10s",
    detail: "Atendimento imediato a qualquer hora, sem ninguém parar",
    tag: "<10s",
    desc: "Responde dúvidas iniciais e recolhe o que o cliente precisa",
  },
  {
    label: "Filtro de interessados",
    detail: "Separa curiosos de clientes prontos a avançar",
    tag: "Triagem",
    desc: "A sua equipa só fala com quem quer mesmo comprar",
  },
  {
    label: "Reunião marcada",
    detail: "Horário escolhido no próprio chat, sem vai-e-vem",
    tag: "Agenda",
    desc: "Cada contacto fica registado e confirmado no calendário",
  },
];

export function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flow.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 bg-[#F5F3EE] text-[#101D35]"
    >
      <div className="lume-grid-light pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <h1 className="font-heading text-[38px] leading-[1.06] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-[50px] lg:text-[56px] text-balance">
              O cliente escreve no WhatsApp. Ninguém responde.{" "}
              <span className="text-[#D9531C]">Vai comprar à concorrência.</span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-6 max-w-[60ch] text-base leading-[1.65] text-[#101D35] font-medium sm:text-lg">
              Para empresas em Angola (clínicas, construtoras, escritórios de advocacia,
              consultoras) que recebem pedidos por WhatsApp e pelo website e não conseguem responder
              a todos a tempo.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-3 max-w-[60ch] text-sm leading-[1.65] text-[#5B6B8C] sm:text-base">
              O seu atendimento passa a responder em{" "}
              <strong className="font-semibold text-[#101D35]">menos de 10 segundos</strong>, a
              qualquer hora, marca a reunião e acompanha cada contacto até ao fecho. A sua equipa só
              fala com quem quer mesmo comprar.
            </p>
          </Reveal>

          <Reveal delay={170}>
            <ul className="mt-6 space-y-2 text-sm text-[#101D35]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>Resposta a todos os contactos, também à noite e ao fim de semana</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>Reunião marcada no próprio chat, sem vai-e-vem de mensagens</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>Nenhum contacto esquecido: cada um fica registado e acompanhado</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
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
                href="#como-funciona"
                className="lume-btn-secondary-light inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap shrink-0"
              >
                <PlayCircle className="size-4" aria-hidden="true" />
                <span>Ver como funciona</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 pt-6 border-t border-[#E7E3D9]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#5B6B8C]">
                <span className="font-heading font-bold text-[#101D35] tabular-nums">
                  +50 empresas atendidas
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">Resposta em menos de 10 segundos</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#2E9E6B] font-semibold">
                  Diagnóstico gratuito (5 vagas por mês)
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Interactive Swiss Navy Showcase Card */}
        <Reveal delay={160}>
          <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 text-[#F5F3EE]">
            {/* Lume Studio Accent Bar */}
            <div className="flex gap-2 mb-5">
              <span className="h-1.5 flex-1 rounded-full bg-[#2A3D63]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#F36B32]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#F4C542]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#F5F3EE]" />
            </div>

            <div className="flex items-center justify-between border-b border-[#2A3D63] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F36B32]">
                  <Bot className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold tracking-[0.06em] uppercase text-[#F5F3EE]">
                    Quando um cliente escreve
                  </p>
                  <p className="text-xs text-[#B8C0D0]">Do contacto à reunião marcada</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4C542] px-3 py-1 font-heading text-[11px] font-bold text-[#101D35] uppercase tracking-wider">
                24/7
              </span>
            </div>

            <div
              className="mt-5 space-y-2.5"
              role="list"
              aria-label="Etapas do atendimento automático"
            >
              {flow.map((step, i) => {
                const isCurrent = activeStep === i;
                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`w-full text-left transition-all duration-200 rounded-[12px] border p-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] ${
                      isCurrent
                        ? "border-[#F36B32] bg-[#1A2A4A]"
                        : "border-[#2A3D63] bg-[#101D35] hover:border-[#5B6B8C]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`flex size-7 shrink-0 items-center justify-center rounded-[8px] font-heading text-xs font-bold tabular-nums transition-colors ${
                            isCurrent
                              ? "bg-[#F36B32] text-[#101D35]"
                              : "border border-[#2A3D63] bg-[#1A2A4A] text-[#B8C0D0]"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`font-heading text-xs font-bold uppercase tracking-wide ${
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
                      <div className="mt-3 border-t border-[#2A3D63] pt-2.5 flex items-center justify-between gap-2 text-xs">
                        <span className="text-[#F5F3EE]">{step.desc}</span>
                        <span className="inline-flex items-center gap-1 shrink-0 text-[#2E9E6B] font-semibold tabular-nums">
                          <CheckCircle2 className="size-3.5" aria-hidden="true" />
                          &lt;10s
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#2A3D63] pt-3.5 text-xs text-[#B8C0D0]">
              <span>Clique em qualquer etapa para inspecionar</span>
              <span className="font-heading font-bold text-[#F36B32] tabular-nums">
                0{activeStep + 1} / 04
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
