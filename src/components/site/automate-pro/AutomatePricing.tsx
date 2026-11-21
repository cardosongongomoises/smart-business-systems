import { Check, Clock, ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { CTA } from "@/lib/site-config";
import { trackAutomateProEvent } from "./automateAnalytics";

const pricingItems = [
  "Atendimento automático no site e no WhatsApp oficial",
  "Base de conhecimento configurada para a sua empresa",
  "Qualificação automática de interessados",
  "Registo e organização de contactos (CRM)",
  "Marcação automática de reuniões na agenda",
  "Follow-up automático pós-atendimento",
  "Confirmações e lembretes antes da reunião",
  "Passagem com histórico completo para a equipa",
  "Monitorização técnica de estabilidade",
  "Ajustes mensais e suporte técnico incluído",
];

export function AutomatePricing() {
  const handlePricingClick = () => {
    trackAutomateProEvent("automate_pro_cta_click", {
      location: "pricing_card",
      label: "Quero o AUTOMATE PRO",
    });
  };

  return (
    <div id="automate-pricing" className="py-16 sm:py-24 relative border-t border-[#2A3D63]">
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Investimento claro</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-3xl font-extrabold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              Plano Dedicado Automate Pro
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-3 text-sm sm:text-base text-[#B8C0D0]">
              Solução pensada para empresas que já possuem website e querem integrar IA, marcação de
              reuniões e acompanhamento sem reconstruir o site.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-[16px] border border-[#F36B32] bg-[#1A2A4A] p-7 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="inline-block rounded-full bg-[#F4C542] px-3 py-1 font-heading text-[11px] font-bold text-[#101D35] uppercase tracking-wider">
                    Sem refazer o seu site
                  </span>
                  <h4 className="mt-3 font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#F5F3EE]">
                    Automate Pro
                  </h4>
                </div>

                <div className="rounded-[12px] border border-[#2A3D63] bg-[#101D35] px-4 py-2.5 text-left sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-[#2E9E6B]">
                    <Clock className="size-3.5" aria-hidden="true" />
                    <span>4 horas/mês incluídas</span>
                  </div>
                  <p className="text-xs text-[#B8C0D0] mt-0.5">Ajustes, melhorias e alterações</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[#B8C0D0] leading-relaxed">
                Para quem já tem website e quer atendimento imediato, marcação de reuniões e
                acompanhamento de contactos sem o refazer.
              </p>

              {/* Price Breakdown - Preserved centered layout without subtitles */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 rounded-[12px] border border-[#2A3D63] bg-[#101D35] p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-semibold text-[#B8C0D0] uppercase tracking-wider">
                    Implementação
                  </p>
                  <div className="mt-1.5 flex items-baseline justify-center gap-1.5 tabular-nums">
                    <span className="font-heading text-3xl font-extrabold text-[#F5F3EE]">
                      300.000
                    </span>
                    <span className="text-sm font-bold text-[#F5F3EE]">Kz</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center border-t border-[#2A3D63] pt-6 sm:border-t-0 sm:pt-0 sm:border-l sm:border-[#2A3D63]">
                  <p className="text-xs font-semibold text-[#F4C542] uppercase tracking-wider">
                    Mensalidade
                  </p>
                  <div className="mt-1.5 flex items-baseline justify-center gap-1.5 tabular-nums">
                    <span className="font-heading text-3xl font-extrabold text-[#F36B32]">
                      65.000
                    </span>
                    <span className="text-sm font-bold text-[#F36B32]">Kz</span>
                    <span className="text-xs font-normal text-[#B8C0D0]">ao mês</span>
                  </div>
                </div>
              </div>

              {/* Inclusions List */}
              <div className="mt-8">
                <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#F5F3EE] mb-4">
                  O que está incluído no Automate Pro:
                </p>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {pricingItems.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-[#F5F3EE]">
                      <Check className="size-4 shrink-0 text-[#F36B32] mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-10 pt-6 border-t border-[#2A3D63]">
                <a
                  href={CTA.automatePro}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handlePricingClick}
                  className="lume-btn-primary w-full inline-flex items-center justify-center gap-2 text-sm"
                >
                  <span>Quero o Automate Pro</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <p className="mt-4 text-center px-4 text-xs text-[#B8C0D0] leading-relaxed">
              Custos externos de plataformas de terceiros, como APIs de IA, WhatsApp, CRM ou
              serviços de e-mail, variam conforme a utilização e a arquitetura escolhida.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
