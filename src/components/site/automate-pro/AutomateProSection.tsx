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
      className="relative bg-[#101D35] text-[#F5F3EE] overflow-hidden scroll-mt-20 border-t border-[#2A3D63]"
    >
      <AutomateHero />

      <div
        id="automate-sistema"
        className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 pb-16"
      >
        <AutomationSystemFlow />
      </div>

      <AutomateProblem />
      <AutomateTransformation />
      <AutomateNoNewSite />
      <AutomateFeatures />
      <AutomateInteractiveDemo />
      <AutomateTimeline />
      <AutomateArchitecture />
      <AutomateBenefits />
      <AutomatePricing />
      <AutomateCTA />
    </section>
  );
}
