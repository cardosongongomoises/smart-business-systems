import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { Reveal } from "../Reveal";
import { CTA } from "@/lib/site-config";
import { trackAutomateProEvent } from "./automateAnalytics";

export function AutomateHero() {
  const handlePrimaryClick = () => {
    trackAutomateProEvent("automate_pro_cta_click", {
      location: "hero_primary",
      label: "Solicitar diagnóstico Automate Pro",
    });
  };

  const handleSecondaryClick = () => {
    trackAutomateProEvent("automate_demo_click", {
      location: "hero_secondary",
      label: "Ver plano Automate Pro",
    });
  };

  return (
    <div className="relative pt-20 pb-16 sm:pt-28 sm:pb-20">
      <div className="lume-grid-dark pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col items-start max-w-4xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 lume-eyebrow text-[#F36B32]">
              <span>Já tem website?</span>
              <span aria-hidden="true" className="text-[#B8C0D0]">
                ·
              </span>
              <span className="text-[#B8C0D0]">Automate Pro</span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-[-0.02em] sm:text-5xl lg:text-[50px] text-[#F5F3EE] leading-[1.1] text-balance">
              Já tem website? Não precisa de o refazer. Ligamos a{" "}
              <span className="text-[#F4C542]">IA e a automatização</span> sobre o que já existe.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 max-w-[65ch] space-y-3 text-base sm:text-lg text-[#B8C0D0] leading-relaxed">
              <p className="font-medium text-[#F5F3EE]">
                Aproveitamos o investimento que já fez no seu website, sem o tirar do ar e sem
                reconstruções desnecessárias.
              </p>
              <p className="text-sm sm:text-base text-[#B8C0D0]">
                O visitante entra no site, tira dúvidas com atendimento imediato, agenda reunião ou
                segue para o WhatsApp e fica registado com follow-up organizado para a sua equipa.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#B8C0D0]">
              <span className="text-[#F5F3EE]">Atendimento no site e WhatsApp</span>
              <span aria-hidden="true">·</span>
              <span>Qualificação e marcação de reuniões</span>
              <span aria-hidden="true">·</span>
              <span>Follow-up automatizado</span>
              <span aria-hidden="true">·</span>
              <span>Sem refazer o website</span>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href={CTA.automatePro}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePrimaryClick}
                className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                <span>Quero integrar no meu site</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>

              <a
                href="#automate-pricing"
                onClick={handleSecondaryClick}
                className="lume-btn-secondary-dark inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                <span>Ver investimento Automate Pro</span>
                <ChevronDown className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-6 flex items-center gap-2 text-xs text-[#B8C0D0]">
              <ShieldCheck className="size-4 text-[#2E9E6B] shrink-0" aria-hidden="true" />
              <span>
                Compatível com websites institucionais, WordPress, lojas e projetos próprios sem
                interromper a operação.
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
