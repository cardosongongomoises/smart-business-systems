import { Check, Sparkles, Shield, Clock, ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { CTA } from "@/lib/site-config";
import { trackAutomateProEvent } from "./automateAnalytics";

const pricingItems = [
  "Agente IA configurado para a empresa",
  "Chat inteligente integrado ao site existente",
  "Base de conhecimento personalizada",
  "Qualificação automática de leads",
  "Integração oficial WhatsApp",
  "CRM para organização de oportunidades",
  "Sistema de agendamento automático",
  "Automação de follow-up pós-atendimento",
  "Confirmações e lembretes por e-mail",
  "Transferência transparente para atendente humano",
  "Monitoramento contínuo de estabilidade",
  "Manutenção preventiva de rotinas",
  "Otimizações periódicas de respostas",
];

export function AutomatePricing() {
  const handlePricingClick = () => {
    trackAutomateProEvent("automate_pro_cta_click", {
      location: "pricing_card",
      label: "Quero o AUTOMATE PRO",
    });
  };

  return (
    <div
      id="automate-pricing"
      className="py-20 sm:py-28 relative border-t border-[#252C38]/60 bg-[#080A0F]"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-gradient-to-tr from-[#3B82F6]/10 to-[#8B5CF6]/10 blur-[150px]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#C084FC] uppercase">
              Investimento Claro
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[#F5F7FA] sm:text-5xl leading-tight">
              Plano Dedicado <span className="text-gradient">Automate Pro</span>
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-3 text-sm sm:text-base text-[#A7B0BF]">
              Estruturado especialmente para empresas que já possuem website e precisam transformar
              tráfego em oportunidades concretas.
            </p>
          </Reveal>
        </div>

        {/* Premium Pricing Card */}
        <Reveal delay={180}>
          <div className="mt-14 max-w-3xl mx-auto">
            <div className="relative rounded-3xl border border-[#3B82F6]/60 bg-[#0E121A] p-7 sm:p-10 shadow-[0_20px_60px_rgba(59,130,246,0.2)] ring-1 ring-[#3B82F6]/40 overflow-hidden">
              {/* Top gradient bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6]" />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8B5CF6]/20 px-3 py-1 font-mono text-[10px] font-bold text-[#C084FC] uppercase tracking-wider">
                    <Sparkles className="size-3" /> INFRAESTRUTURA COMPLETA
                  </span>
                  <h4 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase text-[#F5F7FA]">
                    AUTOMATE PRO
                  </h4>
                </div>

                {/* Hours Included Badge */}
                <div className="rounded-xl border border-[#22C55E]/40 bg-[#22C55E]/10 px-3.5 py-2 text-left sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-[#4ADE80]">
                    <Clock className="size-3.5" />
                    <span>4 horas/mês incluídas</span>
                  </div>
                  <p className="text-[10px] text-[#A7B0BF]">Ajustes, melhorias e alterações</p>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#A7B0BF] leading-relaxed">
                Implementação personalizada da infraestrutura de atendimento e automação sobre o
                website existente.
              </p>

              {/* Price Breakdown */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 rounded-2xl border border-[#252C38] bg-[#151A23] p-5 sm:p-6">
                <div>
                  <p className="text-[11px] font-mono text-[#A7B0BF] uppercase tracking-wider">
                    Implementação Única
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-[#F5F7FA] tracking-tight">
                    Kz 300.000
                  </p>
                  <p className="mt-1 text-xs text-[#667085]">
                    Setup, engenharia de prompt e integrações
                  </p>
                </div>

                <div className="sm:border-l sm:border-[#252C38] sm:pl-6">
                  <p className="text-[11px] font-mono text-[#60A5FA] uppercase tracking-wider">
                    Operação e Gestão
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-[#3B82F6] tracking-tight">
                    Kz 65.000 <span className="text-sm font-normal text-[#A7B0BF]">/ mês</span>
                  </p>
                  <p className="mt-1 text-xs text-[#667085]">
                    Manutenção, monitoramento e suporte contínuo
                  </p>
                </div>
              </div>

              {/* Inclusions List */}
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA] mb-4">
                  O que está incluído no Automate Pro:
                </p>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {pricingItems.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-[#A7B0BF]">
                      <Check className="size-4 shrink-0 text-[#3B82F6] mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-10 pt-6 border-t border-[#252C38]">
                <a
                  href={CTA.automatePro}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handlePricingClick}
                  className="w-full inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-8 text-sm font-bold text-white shadow-[0_12px_32px_rgba(59,130,246,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Quero o AUTOMATE PRO</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            {/* Third party costs disclaimer (Item 16) */}
            <div className="mt-4 text-center px-4">
              <p className="text-[11px] text-[#667085] leading-relaxed">
                Custos de plataformas de terceiros, como APIs de IA, WhatsApp, CRM, e-mail ou outros
                serviços externos, podem variar conforme utilização e arquitetura escolhida.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
