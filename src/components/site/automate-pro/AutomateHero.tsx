import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { Reveal } from "../Reveal";
import { CTA } from "@/lib/site-config";
import { trackAutomateProEvent } from "./automateAnalytics";

export function AutomateHero() {
  const handlePrimaryClick = () => {
    trackAutomateProEvent("automate_pro_cta_click", {
      location: "hero_primary",
      label: "Quero automatizar meu atendimento",
    });
  };

  const handleSecondaryClick = () => {
    trackAutomateProEvent("automate_demo_click", {
      location: "hero_secondary",
      label: "Ver como funciona",
    });
  };

  return (
    <div className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
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
            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-[-0.02em] sm:text-5xl lg:text-[54px] text-[#F5F3EE] leading-[1.1] text-balance">
              Já tem website? Não o refazemos. Fazemos ele{" "}
              <span className="text-[#F4C542]">responder e marcar reuniões</span> por si.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 max-w-[65ch] space-y-3 text-base sm:text-lg text-[#B8C0D0] leading-relaxed">
              <p className="font-medium text-[#F5F3EE]">
                Juntamos o atendimento imediato ao site que já tem, em dias e sem o tirar do ar.
              </p>
              <p className="text-sm sm:text-base text-[#B8C0D0]">
                O visitante entra no site → recebe resposta em menos de 10 segundos → tira dúvidas →
                marca a reunião no WhatsApp ou no próprio site → tudo fica registado para a sua
                equipa fechar.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#B8C0D0]">
              <span className="text-[#F5F3EE]">Resposta em &lt;10 segundos</span>
              <span aria-hidden="true">·</span>
              <span>WhatsApp oficial ligado ao site</span>
              <span aria-hidden="true">·</span>
              <span>Marcação automática</span>
              <span aria-hidden="true">·</span>
              <span>Sem refazer o site</span>
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
                <span>Quero parar de perder clientes</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>

              <a
                href="#automate-fluxo"
                onClick={handleSecondaryClick}
                className="lume-btn-secondary-dark inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                <span>Ver como funciona</span>
                <ChevronDown className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-6 flex items-center gap-2 text-xs text-[#B8C0D0]">
              <ShieldCheck className="size-4 text-[#2E9E6B] shrink-0" aria-hidden="true" />
              <span>
                Sem tirar o site do ar. Funciona com WordPress, Webflow, código próprio e qualquer
                plataforma.
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
