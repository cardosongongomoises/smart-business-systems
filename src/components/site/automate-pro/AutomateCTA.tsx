import { ArrowRight, Calendar, MessageSquare, Sparkles } from "lucide-react";
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
    <div className="py-20 sm:py-28 relative overflow-hidden bg-[#0E121A] border-t border-[#252C38]">
      {/* Blue and Violet Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 size-96 rounded-full bg-[#3B82F6]/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 size-96 rounded-full bg-[#8B5CF6]/15 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="rounded-3xl border border-[#252C38] bg-[#151A23]/80 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm relative overflow-hidden">
          {/* Subtle top accent bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6]" />

          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#60A5FA] uppercase">
              <Sparkles className="size-3.5 text-[#8B5CF6]" /> Próximo Passo
            </span>
          </Reveal>

          {/* Headline 2 lines */}
          <Reveal delay={80}>
            <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[#F5F7FA] sm:text-4xl lg:text-5xl leading-tight">
              Seu website já trabalha para sua empresa.
              <br />
              <span className="text-gradient">Agora faça ele trabalhar de forma inteligente.</span>
            </h3>
          </Reveal>

          {/* Supporting Text */}
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl mx-auto text-base text-[#A7B0BF] leading-relaxed">
              Descubra como podemos transformar o seu website existente em um sistema inteligente de
              atendimento e automação.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={200}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CTA.automateDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDemoClick}
                className="w-full sm:w-auto inline-flex h-[50px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-8 text-sm font-bold text-white shadow-[0_12px_30px_rgba(59,130,246,0.3)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <Calendar className="size-4" />
                <span>Agendar uma demonstração</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href={CTA.automatePro}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSpecialistClick}
                className="w-full sm:w-auto inline-flex h-[50px] items-center justify-center gap-2.5 rounded-xl border border-[#252C38] bg-[#0E121A] px-7 text-sm font-semibold text-[#F5F7FA] transition-colors hover:border-[#3B82F6] hover:bg-[#0E121A]/90"
              >
                <MessageSquare className="size-4 text-[#22C55E]" />
                <span>Falar com um especialista</span>
              </a>
            </div>
          </Reveal>

          {/* Closing Brand Statement (Item 31) */}
          <Reveal delay={260}>
            <div className="mt-10 pt-8 border-t border-[#252C38]/80 text-center">
              <p className="font-mono text-xs text-[#A7B0BF] tracking-wide">
                "Não construímos apenas presença digital. Construímos sistemas que trabalham para o
                seu negócio."
              </p>
              <p className="mt-2 text-[11px] font-bold text-[#60A5FA] tracking-wider uppercase">
                AUTOMATE PRO • Agentes Digital
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
