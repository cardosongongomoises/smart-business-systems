import { Layers, CheckCircle2, ArrowRight, Sparkles, Shield, Cpu, Zap } from "lucide-react";
import { Reveal } from "../Reveal";
import { CTA } from "@/lib/site-config";
import { trackAutomateProEvent } from "./automateAnalytics";

export function AutomateNoNewSite() {
  return (
    <div className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#080A0F] via-[#0E121A] to-[#080A0F]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="relative rounded-3xl border border-[#252C38] bg-[#0E121A]/80 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle luminous background glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[#3B82F6]/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-[#8B5CF6]/15 blur-[120px]" />

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column: Text and Concept */}
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#60A5FA] uppercase">
                  <Layers className="size-3.5" /> Compatibilidade Total
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[#F5F7FA] sm:text-5xl leading-tight">
                  Você não precisa <span className="text-gradient">começar do zero.</span>
                </h3>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-5 text-base sm:text-lg text-[#A7B0BF] leading-relaxed">
                  Se a sua empresa já possui um website, não precisa de desperdiçar o investimento
                  que já fez.{" "}
                  <span className="text-[#F5F7FA] font-semibold">
                    Nós adicionamos a camada inteligente por cima.
                  </span>
                </p>
              </Reveal>

              {/* Formula representation */}
              <Reveal delay={200}>
                <div className="mt-8 rounded-2xl border border-[#252C38] bg-[#151A23] p-5">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#667085] mb-3">
                    A Fórmula do Automate Pro:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold font-mono">
                    <span className="rounded-lg border border-[#252C38] bg-[#0E121A] px-3 py-1.5 text-[#F5F7FA]">
                      WEBSITE
                    </span>
                    <span className="text-[#3B82F6] font-extrabold">+</span>
                    <span className="rounded-lg border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-3 py-1.5 text-[#60A5FA]">
                      IA
                    </span>
                    <span className="text-[#8B5CF6] font-extrabold">+</span>
                    <span className="rounded-lg border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-3 py-1.5 text-[#C084FC]">
                      AUTOMAÇÃO
                    </span>
                    <span className="text-[#3B82F6] font-extrabold">+</span>
                    <span className="rounded-lg border border-[#252C38] bg-[#0E121A] px-3 py-1.5 text-[#F5F7FA]">
                      INTEGRAÇÕES
                    </span>
                    <span className="text-[#22C55E] font-extrabold">=</span>
                    <span className="rounded-lg border border-[#22C55E]/40 bg-[#22C55E]/10 px-3.5 py-1.5 text-[#4ADE80] shadow-[0_0_12px_rgba(34,197,94,0.2)]">
                      SISTEMA DE ATENDIMENTO
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={260}>
                <div className="mt-7 rounded-xl border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-4 text-xs sm:text-sm text-[#F5F7FA] font-medium leading-relaxed">
                  <p className="text-gradient font-bold text-sm sm:text-base">
                    "Não substituímos o que você já construiu — fazemos isso trabalhar 10x melhor."
                  </p>
                  <p className="mt-2 text-[11px] text-[#A7B0BF] font-normal">
                    Sem migração dolorosa. Sem downtime. Sem perder o que já funciona.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Layered Visual Representation */}
            <Reveal delay={200}>
              <div className="relative flex flex-col gap-4">
                {/* Layer 3: Camada Superior Inteligente (Brilhante) */}
                <div className="relative rounded-2xl border border-[#8B5CF6]/50 bg-[#151A23] p-6 shadow-[0_12px_36px_rgba(139,92,246,0.25)] ring-1 ring-[#8B5CF6]/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-[#8B5CF6]/20 text-[#C084FC]">
                        <Cpu className="size-5" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#F5F7FA]">
                            CAMADA DE INTELIGÊNCIA
                          </h4>
                          <span className="rounded-full bg-[#8B5CF6]/20 px-2 py-0.5 font-mono text-[9px] font-bold text-[#C084FC]">
                            NOVA
                          </span>
                        </div>
                        <p className="text-xs text-[#A7B0BF]">
                          Agentes IA • Triagem • Agendamento • Follow-up
                        </p>
                      </div>
                    </div>
                    <Sparkles className="size-5 text-[#C084FC]" />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
                    <div className="rounded-lg bg-[#0E121A] p-2 border border-[#252C38]">
                      <span className="text-[#60A5FA]">WhatsApp API</span>
                    </div>
                    <div className="rounded-lg bg-[#0E121A] p-2 border border-[#252C38]">
                      <span className="text-[#C084FC]">CRM Sync</span>
                    </div>
                    <div className="rounded-lg bg-[#0E121A] p-2 border border-[#252C38]">
                      <span className="text-[#4ADE80]">Calendar AI</span>
                    </div>
                  </div>
                </div>

                {/* Integration Connector */}
                <div className="flex justify-center -my-1 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/50 bg-[#080A0F] px-3 py-1 font-mono text-[10px] font-bold text-[#60A5FA] shadow-md">
                    <Zap className="size-3 text-[#3B82F6]" /> CONEXÃO DIRETA SEM DOWNTIME
                  </span>
                </div>

                {/* Layer 2: Camada Existente (Website da Empresa) */}
                <div className="relative rounded-2xl border border-[#252C38] bg-[#0E121A] p-6 transition-all hover:border-[#3B82F6]/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-[#252C38] text-[#A7B0BF]">
                        <Layers className="size-5" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#F5F7FA]">WEBSITE EXISTENTE</h4>
                          <span className="rounded-full bg-[#252C38] px-2 py-0.5 font-mono text-[9px] font-bold text-[#A7B0BF]">
                            PRESERVADO
                          </span>
                        </div>
                        <p className="text-xs text-[#667085]">
                          Design • Conteúdo • Domínio • Estrutura Atual
                        </p>
                      </div>
                    </div>
                    <Shield className="size-4 text-[#22C55E]" />
                  </div>

                  <p className="mt-3 text-xs text-[#A7B0BF] leading-relaxed">
                    Mantemos o seu investimento intacto — design, conteúdo, domínio.{" "}
                    <span className="text-[#4ADE80] font-semibold">
                      Integramos scripts e webhooks
                    </span>{" "}
                    que habilitam o atendimento inteligente sem alterar uma única vírgula do seu
                    site atual.
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
