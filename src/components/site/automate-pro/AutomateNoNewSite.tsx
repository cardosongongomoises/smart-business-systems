import { Layers, Shield, Cpu, Zap } from "lucide-react";
import { Reveal } from "../Reveal";

export function AutomateNoNewSite() {
  return (
    <div className="py-16 sm:py-20 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-8 sm:p-12">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column */}
            <div>
              <Reveal>
                <p className="lume-eyebrow text-[#F36B32]">Sem refazer o site</p>
              </Reveal>

              <Reveal delay={60}>
                <h3 className="mt-4 font-heading text-3xl font-extrabold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
                  Não precisa de descartar o website que já pagou.
                </h3>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-5 text-base text-[#B8C0D0] leading-relaxed">
                  Se a sua empresa já tem website ativo, aproveitamos a estrutura atual e{" "}
                  <strong className="text-[#F5F3EE]">
                    ligamos o atendimento com IA, qualificação e marcação de reuniões sem tirar a
                    página do ar.
                  </strong>
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-8 rounded-[12px] border border-[#2A3D63] bg-[#101D35] p-5">
                  <p className="text-xs font-semibold text-[#B8C0D0] mb-3">
                    Como funciona na prática:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 font-heading text-xs font-bold">
                    <span className="rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] px-3 py-1.5 text-[#F5F3EE]">
                      O seu site atual
                    </span>
                    <span className="text-[#F36B32]">+</span>
                    <span className="rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] px-3 py-1.5 text-[#F36B32]">
                      Atendimento com IA
                    </span>
                    <span className="text-[#F36B32]">+</span>
                    <span className="rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] px-3 py-1.5 text-[#F4C542]">
                      WhatsApp e Agenda
                    </span>
                    <span className="text-[#2E9E6B]">=</span>
                    <span className="rounded-[8px] bg-[#2E9E6B] px-3 py-1.5 text-[#101D35]">
                      Mais organização comercial
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-6 border-t border-[#2A3D63] pt-5">
                  <p className="font-heading font-bold text-sm sm:text-base text-[#F4C542]">
                    “Mantém o seu site intacto e adiciona atendimento, registo e seguimento.”
                  </p>
                  <p className="mt-1.5 text-xs text-[#B8C0D0]">
                    Sem migrações desnecessárias nem interrupção do seu endereço atual.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Layered Visual Representation */}
            <Reveal delay={160}>
              <div className="flex flex-col gap-4">
                <div className="rounded-[16px] border border-[#F36B32] bg-[#101D35] p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#F36B32] text-[#101D35]">
                        <Cpu className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-heading text-sm font-bold text-[#F5F3EE] uppercase">
                          Camada de IA &amp; Processos
                        </h4>
                        <p className="text-xs text-[#B8C0D0]">
                          Atendimento · Qualificação · Marcação · Follow-up
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#F4C542] px-2.5 py-0.5 font-heading text-[11px] font-bold text-[#101D35]">
                      Integrado
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-medium">
                    <div className="rounded-[8px] bg-[#1A2A4A] p-2 border border-[#2A3D63] text-[#F5F3EE]">
                      WhatsApp
                    </div>
                    <div className="rounded-[8px] bg-[#1A2A4A] p-2 border border-[#2A3D63] text-[#F5F3EE]">
                      Registo CRM
                    </div>
                    <div className="rounded-[8px] bg-[#1A2A4A] p-2 border border-[#2A3D63] text-[#F5F3EE]">
                      Calendário
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4C542]">
                    <Zap className="size-3.5" aria-hidden="true" /> Integração sem tirar o site do
                    ar
                  </span>
                </div>

                <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#1A2A4A] border border-[#2A3D63] text-[#B8C0D0]">
                        <Layers className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-heading text-sm font-bold text-[#F5F3EE] uppercase">
                          O Seu Website Existente
                        </h4>
                        <p className="text-xs text-[#B8C0D0]">
                          Design · Conteúdo · Domínio · Estrutura atual
                        </p>
                      </div>
                    </div>
                    <Shield className="size-4 text-[#2E9E6B]" aria-hidden="true" />
                  </div>

                  <p className="mt-3 text-xs text-[#B8C0D0] leading-relaxed">
                    Mantemos todo o trabalho que já possui e ligamos o atendimento inteligente e os
                    fluxos de acompanhamento diretamente ao seu site.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
