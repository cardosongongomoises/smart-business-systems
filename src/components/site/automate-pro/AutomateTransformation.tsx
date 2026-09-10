import { ArrowRight, CheckCircle2, XCircle, Sparkles, ArrowDown } from "lucide-react";
import { Reveal } from "../Reveal";

const ANTES_STEPS = [
  { label: "Website", detail: "Visitante acessa a página" },
  { label: "Visitante", detail: "Envia mensagem ou formulário" },
  { label: "Mensagem", detail: "Cai numa caixa sem alerta prioritário" },
  { label: "Atendimento manual", detail: "Equipa tenta responder quando disponível" },
  { label: "Espera", detail: "Horas ou dias de atraso no retorno" },
  { label: "Possível perda da oportunidade", detail: "Lead esfria ou contrata concorrente" },
];

const COM_STEPS = [
  { label: "Website", detail: "Visitante recebido instantaneamente" },
  { label: "IA", detail: "Agente inteligente saúda e orienta" },
  { label: "Atendimento", detail: "Tira dúvidas em menos de 1 segundo" },
  { label: "Qualificação", detail: "Avalia necessidade, orçamento e prazos" },
  { label: "CRM", detail: "Registra e organiza os dados no funil" },
  { label: "Agendamento", detail: "Marca a reunião nos horários livres" },
  { label: "Follow-up", detail: "Ativa lembretes automáticos multicanal" },
  { label: "Equipa", detail: "Recebe o lead pronto para fechar" },
  { label: "Cliente", detail: "Experiência ágil, moderna e convertida" },
];

export function AutomateTransformation() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#252C38]/60 bg-[#080A0F]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#C084FC] uppercase">
              Transformação Operacional
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#F5F7FA] sm:text-4xl">
              A evolução do atendimento:{" "}
              <span className="text-gradient">Antes vs. Com Automate Pro</span>
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-3 text-sm sm:text-base text-[#A7B0BF]">
              Compare o modelo tradicional de dependência manual com um fluxo digital contínuo e
              inteligente.
            </p>
          </Reveal>
        </div>

        {/* Comparison columns */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* ANTES */}
          <Reveal delay={180}>
            <div className="rounded-3xl border border-[#252C38] bg-[#0E121A]/70 p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-[#252C38] pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-[#EF4444]/10 text-[#EF4444]">
                      <XCircle className="size-4" />
                    </span>
                    <h4 className="text-lg font-bold uppercase tracking-wider text-[#F5F7FA]">
                      Antes
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-[#EF4444] bg-[#EF4444]/10 px-2.5 py-0.5 rounded-full border border-[#EF4444]/20">
                    Processo Manual e Frágil
                  </span>
                </div>

                <p className="mt-4 text-xs text-[#A7B0BF]">
                  Fluxo dependente de tempo humano imediato e sujeito a falhas operacionais:
                </p>

                {/* Steps List */}
                <div className="mt-6 space-y-3">
                  {ANTES_STEPS.map((step, idx) => (
                    <div
                      key={step.label}
                      className="group relative flex items-center gap-3 rounded-xl border border-[#252C38]/60 bg-[#151A23]/50 p-3 transition-colors hover:border-[#EF4444]/30"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#252C38] text-[11px] font-mono text-[#667085]">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#F5F7FA]">{step.label}</p>
                          {idx === ANTES_STEPS.length - 1 && (
                            <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider">
                              Perda
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#A7B0BF] truncate">{step.detail}</p>
                      </div>
                      {idx < ANTES_STEPS.length - 1 && (
                        <ArrowDown className="size-3 text-[#667085] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#252C38] text-center text-xs text-[#667085]">
                Resultado: Oportunidades perdidas por lentidão e falta de acompanhamento ativo.
              </div>
            </div>
          </Reveal>

          {/* COM AUTOMATE PRO */}
          <Reveal delay={240}>
            <div className="rounded-3xl border border-[#3B82F6]/50 bg-[#0E121A] p-6 sm:p-8 shadow-[0_12px_40px_rgba(59,130,246,0.15)] flex flex-col justify-between h-full relative overflow-hidden ring-1 ring-[#3B82F6]/30">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#8B5CF6]/10 blur-[50px] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between border-b border-[#252C38] pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
                      <CheckCircle2 className="size-4" />
                    </span>
                    <h4 className="text-lg font-bold uppercase tracking-wider text-[#F5F7FA]">
                      Com Automate Pro
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-[#60A5FA] bg-[#3B82F6]/10 px-2.5 py-0.5 rounded-full border border-[#3B82F6]/30 flex items-center gap-1">
                    <Sparkles className="size-3 text-[#8B5CF6]" /> Sistema Inteligente Ativo
                  </span>
                </div>

                <p className="mt-4 text-xs text-[#A7B0BF]">
                  Operação contínua 24/7 que qualifica, organiza e agenda sem atrito:
                </p>

                {/* Steps List */}
                <div className="mt-6 space-y-2.5">
                  {COM_STEPS.map((step, idx) => (
                    <div
                      key={step.label}
                      className="group relative flex items-center gap-3 rounded-xl border border-[#252C38] bg-[#151A23] p-2.5 transition-all hover:border-[#3B82F6]/50 hover:translate-x-1"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[11px] font-mono text-[#60A5FA]">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#F5F7FA]">{step.label}</p>
                          {idx === COM_STEPS.length - 1 && (
                            <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
                              Conversão
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#A7B0BF] truncate">{step.detail}</p>
                      </div>
                      {idx < COM_STEPS.length - 1 && (
                        <ArrowDown className="size-3 text-[#3B82F6]/70 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#252C38] text-center text-xs font-semibold text-[#60A5FA] flex items-center justify-center gap-1.5">
                <Sparkles className="size-3.5 text-[#8B5CF6]" />
                Resultado: Resposta em segundos, lead no CRM e reunião agendada na hora.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
