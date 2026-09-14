import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";
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
    <div className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Background glow flares */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 size-[44rem] rounded-full bg-gradient-to-tr from-[#3B82F6]/10 to-[#8B5CF6]/10 blur-[150px]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-[#60A5FA] uppercase shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <span className="size-2 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>AUTOMATE PRO</span>
              <span className="text-[#A7B0BF]">•</span>
              <span className="text-[10px] text-[#A7B0BF]">Automação sobre Website Existente</span>
            </div>
          </Reveal>

          {/* Subtitle tag */}
          <Reveal delay={60}>
            <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#A7B0BF]">
              Adicione IA ao Seu Website Actual — Sem Reconstruir Nada
            </p>
          </Reveal>

          {/* Headline */}
          <Reveal delay={120}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#F5F7FA] leading-[1.12]">
              Seu website já existe. Agora faça ele{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#8B5CF6] bg-clip-text text-transparent underline decoration-[#3B82F6]/40 decoration-4 underline-offset-8">
                ATENDER, QUALIFICAR E VENDER
              </span>{" "}
              por você.
            </h2>
          </Reveal>

          {/* Core messages */}
          <Reveal delay={180}>
            <div className="mt-6 max-w-2xl space-y-3 text-base sm:text-lg text-[#A7B0BF] leading-relaxed">
              <p className="font-medium text-[#F5F7FA]">
                Não reconstruímos o que já funciona. Adicionamos inteligência ao que você já tem.
              </p>
              <p className="text-sm sm:text-base text-[#A7B0BF]">
                Um fluxo completo: visitante entra no site → IA atende em &lt;8 segundos → qualifica o lead → agenda reunião → faz follow-up automático. Tudo no seu website actual, sem código invasivo.
              </p>
            </div>
          </Reveal>

          {/* Microcopy Badges Pills */}
          <Reveal delay={240}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#252C38] bg-[#0E121A] px-3 py-1 text-[#A7B0BF]">
                <span className="size-1.5 rounded-full bg-[#22C55E]" /> AI ONLINE
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#252C38] bg-[#0E121A] px-3 py-1 text-[#A7B0BF]">
                <CheckCircle2 className="size-3 text-[#3B82F6]" /> LEAD QUALIFIED
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#252C38] bg-[#0E121A] px-3 py-1 text-[#A7B0BF]">
                <CheckCircle2 className="size-3 text-[#8B5CF6]" /> CRM UPDATED
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#252C38] bg-[#0E121A] px-3 py-1 text-[#A7B0BF]">
                <CheckCircle2 className="size-3 text-[#22C55E]" /> MEETING BOOKED
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#252C38] bg-[#0E121A] px-3 py-1 text-[#A7B0BF]">
                <Zap className="size-3 text-[#F59E0B]" /> AUTOMATION RUNNING
              </span>
            </div>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <a
                href={CTA.automatePro}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePrimaryClick}
                className="w-full sm:w-auto inline-flex h-[50px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-8 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.3)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Quero automatizar meu atendimento</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href="#automate-fluxo"
                onClick={handleSecondaryClick}
                className="w-full sm:w-auto inline-flex h-[50px] items-center justify-center gap-2 rounded-xl border border-[#252C38] bg-[#151A23] px-7 text-sm font-semibold text-[#F5F7FA] transition-colors hover:border-[#3B82F6] hover:bg-[#151A23]/90"
              >
                <span>Ver como funciona</span>
                <ChevronDown className="size-4 text-[#A7B0BF]" />
              </a>
            </div>
          </Reveal>

          {/* Security & Non-disruptive guarantee */}
          <Reveal delay={340}>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#667085]">
              <ShieldCheck className="size-4 text-[#22C55E]" />
              <span>
                Sem downtime. Integração direta com WordPress, Webflow, custom code e qualquer CMS.
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
