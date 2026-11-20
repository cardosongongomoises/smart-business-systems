import { CheckCircle2, XCircle, ArrowDown } from "lucide-react";
import { Reveal } from "../Reveal";

const ANTES_STEPS = [
  { label: "Website", detail: "Visitante acessa a página" },
  { label: "Visitante", detail: "Envia mensagem ou formulário" },
  { label: "Mensagem", detail: "Cai numa caixa sem alerta prioritário" },
  { label: "Atendimento manual", detail: "Equipa tenta responder quando disponível" },
  { label: "Espera", detail: "Horas ou dias de atraso no retorno" },
  { label: "Possível perda", detail: "Lead esfria ou contrata concorrente" },
];

const COM_STEPS = [
  { label: "Website", detail: "Visitante recebido instantaneamente" },
  { label: "Atendimento", detail: "Resposta em menos de 10 segundos, 24h" },
  { label: "Triagem", detail: "Avalia necessidade, orçamento e prazo" },
  { label: "Registo (CRM)", detail: "Guarda nome, contacto e histórico" },
  { label: "Marcação", detail: "Cliente escolhe o horário da reunião" },
  { label: "Lembretes", detail: "Confirmações para reduzir faltas" },
  { label: "Equipa", detail: "Recebe o contacto pronto para fechar" },
  { label: "Cliente", detail: "Atendido a tempo e convertido" },
];

export function AutomateTransformation() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Antes e depois no seu site</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-2xl font-bold text-[#F5F3EE] sm:text-4xl text-balance">
              O que muda quando o seu site passa a responder na hora.
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-3 max-w-[65ch] text-sm sm:text-base text-[#B8C0D0]">
              Enquanto o formulário normal deixa o cliente à espera durante horas, o seu atendimento
              responde em menos de 10 segundos,{" "}
              <strong className="text-[#F5F3EE]">
                sem férias, sem esquecimentos, sem horário de fecho.
              </strong>
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* ANTES */}
          <Reveal delay={150}>
            <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-[#2A3D63] pb-4">
                  <div className="flex items-center gap-2.5">
                    <XCircle className="size-5 text-[#D64545]" aria-hidden="true" />
                    <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-[#F5F3EE]">
                      Antes
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-[#D64545]">
                    Processo manual e frágil
                  </span>
                </div>

                <p className="mt-4 text-xs text-[#B8C0D0]">
                  Fluxo dependente de disponibilidade imediata e sujeito a falhas:
                </p>

                <div className="mt-5 space-y-2.5">
                  {ANTES_STEPS.map((step, idx) => (
                    <div
                      key={step.label}
                      className="flex items-center gap-3 rounded-[10px] border border-[#2A3D63] bg-[#101D35] p-3"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-[6px] bg-[#1A2A4A] font-heading text-xs font-bold text-[#B8C0D0] tabular-nums">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-heading text-xs font-bold text-[#F5F3EE]">
                            {step.label}
                          </p>
                          {idx === ANTES_STEPS.length - 1 && (
                            <span className="text-[11px] font-bold text-[#D64545] uppercase">
                              Perda
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#B8C0D0] truncate">{step.detail}</p>
                      </div>
                      {idx < ANTES_STEPS.length - 1 && (
                        <ArrowDown
                          className="size-3.5 text-[#5B6B8C] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2A3D63] text-xs text-[#D64545] font-semibold">
                Cada hora sem automação significa leads que vão para a concorrência.
              </div>
            </div>
          </Reveal>

          {/* COM AUTOMATE PRO */}
          <Reveal delay={200}>
            <div className="rounded-[16px] border border-[#F36B32] bg-[#1A2A4A] p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-[#2A3D63] pb-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-5 text-[#2E9E6B]" aria-hidden="true" />
                    <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-[#F5F3EE]">
                      Com Automate Pro
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-[#F4C542]">Operação ativa 24/7</span>
                </div>

                <p className="mt-4 text-xs text-[#B8C0D0]">
                  Operação contínua que qualifica, organiza e agenda sem atrito:
                </p>

                <div className="mt-5 space-y-2">
                  {COM_STEPS.map((step, idx) => (
                    <div
                      key={step.label}
                      className="flex items-center gap-3 rounded-[10px] border border-[#2A3D63] bg-[#101D35] p-2.5"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-[6px] bg-[#F36B32] font-heading text-xs font-bold text-[#101D35] tabular-nums">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-heading text-xs font-bold text-[#F5F3EE]">
                            {step.label}
                          </p>
                          {idx === COM_STEPS.length - 1 && (
                            <span className="text-[11px] font-bold text-[#2E9E6B] uppercase">
                              Conversão
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#B8C0D0] truncate">{step.detail}</p>
                      </div>
                      {idx < COM_STEPS.length - 1 && (
                        <ArrowDown
                          className="size-3.5 text-[#F36B32] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2A3D63] text-xs font-semibold text-[#F4C542]">
                Lead qualificado em segundos. Reunião agendada na hora. Zero perdas.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
