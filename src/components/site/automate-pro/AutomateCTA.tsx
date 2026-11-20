import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { Reveal } from "../Reveal";
import { CTA } from "@/lib/site-config";
import { trackAutomateProEvent } from "./automateAnalytics";

export function AutomateCTA() {
  const handleDemoClick = () => {
    trackAutomateProEvent("automate_demo_click", {
      location: "section_cta_footer",
      label: "Agendar uma demonstração",
    });
  };

  const handleSpecialistClick = () => {
    trackAutomateProEvent("automate_whatsapp_click", {
      location: "section_cta_footer",
      label: "Falar com um especialista",
    });
  };

  return (
    <div className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-8 sm:p-14 text-center max-w-4xl mx-auto">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Próximo passo</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-2xl font-extrabold text-[#F5F3EE] sm:text-4xl lg:text-5xl leading-tight text-balance">
              Cada dia sem resposta rápida é um cliente que vai para a concorrência.{" "}
              <span className="text-[#F4C542]">Comece hoje sem refazer o site.</span>
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl mx-auto text-base text-[#B8C0D0] leading-relaxed">
              Peça uma demonstração gratuita e veja como o seu website atual pode responder em menos
              de 10 segundos, qualificar interessados e marcar reuniões, enquanto a sua equipa foca
              em fechar.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CTA.automateDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDemoClick}
                className="lume-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                <Calendar className="size-4" aria-hidden="true" />
                <span>Quero o meu diagnóstico gratuito</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>

              <a
                href={CTA.automatePro}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSpecialistClick}
                className="lume-btn-secondary-dark w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                <MessageSquare className="size-4 text-[#2E9E6B]" aria-hidden="true" />
                <span>Quero parar de perder clientes</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 pt-8 border-t border-[#2A3D63] text-center">
              <p className="text-sm text-[#B8C0D0]">
                30 dias de garantia. Se não entregarmos o que prometemos, devolvemos 100% do valor.
              </p>
              <p className="mt-2 lume-eyebrow text-[#F4C542]">Automate Pro · Agentes Digital</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
