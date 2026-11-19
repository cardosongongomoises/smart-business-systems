import { Layers, Shield, Cpu, Zap } from "lucide-react";
import { Reveal } from "../Reveal";

export function AutomateNoNewSite() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-8 sm:p-12 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column */}
            <div>
              <Reveal>
                <p className="lume-eyebrow text-[#F36B32]">Compatibilidade total</p>
              </Reveal>

              <Reveal delay={60}>
                <h3 className="mt-4 font-heading text-3xl font-extrabold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
                  Você não precisa começar do zero.
                </h3>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-5 text-base text-[#B8C0D0] leading-relaxed">
                  Se a sua empresa já possui um website, não precisa de desperdiçar o investimento
                  que já fez.{" "}
                  <strong className="text-[#F5F3EE]">
                    Adicionamos a camada inteligente por cima.
                  </strong>
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-8 rounded-[12px] border border-[#2A3D63] bg-[#101D35] p-5">
                  <p className="text-xs font-semibold text-[#B8C0D0] mb-3">
                    A fórmula do Automate Pro:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 font-heading text-xs font-bold">
                    <span className="rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] px-3 py-1.5 text-[#F5F3EE]">
                      Website
                    </span>
                    <span className="text-[#F36B32]">+</span>
                    <span className="rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] px-3 py-1.5 text-[#F36B32]">
                      IA
                    </span>
                    <span className="text-[#F36B32]">+</span>
                    <span className="rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] px-3 py-1.5 text-[#F4C542]">
                      Automação
                    </span>
                    <span className="text-[#F36B32]">+</span>
                    <span className="rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] px-3 py-1.5 text-[#F5F3EE]">
                      Integrações
                    </span>
                    <span className="text-[#2E9E6B]">=</span>
                    <span className="rounded-[8px] bg-[#2E9E6B] px-3 py-1.5 text-[#101D35]">
                      Sistema de atendimento
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-6 border-t border-[#2A3D63] pt-5">
                  <p className="font-heading font-bold text-sm sm:text-base text-[#F4C542]">
                    “Não substituímos o que já construiu — fazemos isso trabalhar 10x melhor.”
                  </p>
                  <p className="mt-1.5 text-xs text-[#B8C0D0]">
                    Sem migração dolorosa. Sem downtime. Sem perder o que já funciona.
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
                          Camada de Inteligência
                        </h4>
                        <p className="text-xs text-[#B8C0D0]">
                          Agentes IA · Triagem · Agendamento · Follow-up
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#F4C542] px-2.5 py-0.5 font-heading text-[11px] font-bold text-[#101D35]">
                      Nova
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-medium">
                    <div className="rounded-[8px] bg-[#1A2A4A] p-2 border border-[#2A3D63] text-[#F5F3EE]">
                      WhatsApp API
                    </div>
                    <div className="rounded-[8px] bg-[#1A2A4A] p-2 border border-[#2A3D63] text-[#F5F3EE]">
                      CRM Sync
                    </div>
                    <div className="rounded-[8px] bg-[#1A2A4A] p-2 border border-[#2A3D63] text-[#F5F3EE]">
                      Calendar AI
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4C542]">
                    <Zap className="size-3.5" aria-hidden="true" /> Ligação direta sem downtime
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
                          Website Existente
                        </h4>
                        <p className="text-xs text-[#B8C0D0]">
                          Design · Conteúdo · Domínio · Estrutura atual
                        </p>
                      </div>
                    </div>
                    <Shield className="size-4 text-[#2E9E6B]" aria-hidden="true" />
                  </div>

                  <p className="mt-3 text-xs text-[#B8C0D0] leading-relaxed">
                    Mantemos o seu investimento intacto. Integramos scripts e webhooks seguros que
                    habilitam o atendimento inteligente sem alterar o seu site atual.
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
