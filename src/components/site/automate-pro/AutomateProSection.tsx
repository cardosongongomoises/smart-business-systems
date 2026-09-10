import { useEffect, useRef } from "react";
import { AutomateHero } from "./AutomateHero";
import { AutomationSystemFlow } from "./AutomationSystemFlow";
import { AutomateProblem } from "./AutomateProblem";
import { AutomateTransformation } from "./AutomateTransformation";
import { AutomateNoNewSite } from "./AutomateNoNewSite";
import { AutomateFeatures } from "./AutomateFeatures";
import { AutomateInteractiveDemo } from "./AutomateInteractiveDemo";
import { AutomateTimeline } from "./AutomateTimeline";
import { AutomateArchitecture } from "./AutomateArchitecture";
import { AutomateBenefits } from "./AutomateBenefits";
import { AutomatePricing } from "./AutomatePricing";
import { AutomateCTA } from "./AutomateCTA";
import { trackAutomateProEvent } from "./automateAnalytics";

export function AutomateProSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            trackAutomateProEvent("automate_pro_view", {
              section: "automate-pro",
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="automate-pro"
      ref={sectionRef}
      className="relative bg-[#080A0F] text-[#F5F7FA] overflow-hidden scroll-mt-20 border-t border-[#252C38]/80"
    >
      {/* Hero Block with Eyebrow, Headline, Subheadline and CTAs */}
      <AutomateHero />

      {/* Main Connected Technological Flow Composition (System Operational View) */}
      <div id="automate-sistema" className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 pb-16">
        <AutomationSystemFlow />
      </div>

      {/* O Problema: "Seu site recebe visitantes. Mas o que acontece depois?" */}
      <AutomateProblem />

      {/* Transformação: Antes vs. Com Automate Pro */}
      <AutomateTransformation />

      {/* Não Precisa de um Novo Website: "Você não precisa começar do zero." */}
      <AutomateNoNewSite />

      {/* Recursos do Automate Pro: 8 Pilares */}
      <AutomateFeatures />

      {/* Demonstração Interativa da IA e Automação */}
      <AutomateInteractiveDemo />

      {/* Fluxo do Automate Pro: Timeline 01 a 08 */}
      <AutomateTimeline />

      {/* Arquitetura Visual Tecnológica */}
      <AutomateArchitecture />

      {/* Benefícios e Resultados */}
      <AutomateBenefits />

      {/* Pricing Dedicado Automate Pro */}
      <AutomatePricing />

      {/* Final Section CTA */}
      <AutomateCTA />
    </section>
  );
}
