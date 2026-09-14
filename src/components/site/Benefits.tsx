import { Reveal } from "./Reveal";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site-config";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  Users,
  BarChart3,
} from "lucide-react";

const beforeItems = [
  "Leads que enviam WhatsApp e nunca recebem resposta",
  "Equipa sobrecarregada com perguntas repetitivas",
  "Reuniões marcadas que o cliente não confirma",
  "Zero visibilidade sobre quantos leads existem",
  "Concorrência a fechar negócios que eram seus",
];

const afterItems = [
  "Cada lead atendido em menos de 10 segundos",
  "Equipa focada em negócios que fecham contratos",
  "Reuniões agendadas automaticamente com confirmação",
  "Dashboard com cada lead rastreado no CRM",
  "Presença digital que converte visitantes em clientes",
];

const metrics = [
  {
    icon: Clock,
    label: "Tempo de resposta",
    before: "2-24h",
    after: "<10 segundos",
    improvement: "500x mais rápido",
  },
  {
    icon: Users,
    label: "Leads processados/dia",
    before: "5-10",
    after: "Ilimitados",
    improvement: "Sem teto",
  },
  {
    icon: BarChart3,
    label: "Taxa de conversão",
    before: "2-5%",
    after: "15-25%",
    improvement: "+400%",
  },
  {
    icon: TrendingUp,
    label: "Reuniões agendadas/mês",
    before: "3-5",
    after: "15-25",
    improvement: "+400%",
  },
];

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden bg-gradient-to-b from-[#111827] via-[#111827] to-[#0E121A] py-20 sm:py-28 scroll-mt-20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#22C55E]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <Badge className="mb-4 border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]">
              A Transformação
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] tracking-tight">
              O que muda quando o seu negócio{" "}
              <span className="text-[#22C55E]">começa a fechar negócios 24/7</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#A7B0BF] leading-relaxed">
              Não vendemos ferramentas — entregamos resultados. Veja a diferença entre um negócio
              que perde leads e um que os converte automaticamente.
            </p>
          </div>
        </Reveal>

        {/* Before / After */}
        <Reveal delay={80}>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Before */}
            <div className="rounded-[16px] border border-[#EF4444]/30 bg-[#EF4444]/5 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="size-5 text-[#EF4444]" />
                <span className="text-xs font-bold tracking-wider text-[#EF4444] uppercase">
                  Antes do Sistema
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#F5F7FA]">
                Enquanto a sua equipa dorme, os seus leads fogem
              </h3>
              <ul className="mt-6 space-y-3">
                {beforeItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#A7B0BF]">
                    <XCircle className="size-4 mt-0.5 shrink-0 text-[#EF4444]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-3 rounded-[8px] border border-[#EF4444]/20 bg-[#EF4444]/5">
                <p className="text-xs text-[#EF4444] font-medium">
                  Resultado: receita que vai para a concorrência todos os meses
                </p>
              </div>
            </div>

            {/* After */}
            <div className="rounded-[16px] border border-[#22C55E]/30 bg-[#22C55E]/5 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="size-5 text-[#22C55E]" />
                <span className="text-xs font-bold tracking-wider text-[#22C55E] uppercase">
                  Depois do Sistema
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#F5F7FA]">
                O seu negócio trabalha enquanto você descansa
              </h3>
              <ul className="mt-6 space-y-3">
                {afterItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#F5F7FA]">
                    <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-[#22C55E]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-3 rounded-[8px] border border-[#22C55E]/20 bg-[#22C55E]/5">
                <p className="text-xs text-[#22C55E] font-medium">
                  Resultado: leads convertidos, reuniões agendadas, receita a crescer
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Metrics */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#F5F7FA] text-center">
              Números que falam por si
            </h3>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]">
                    <m.icon className="size-5" />
                  </div>
                  <p className="mt-3 text-xs text-[#A7B0BF]">{m.label}</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="text-sm text-[#EF4444] line-through">{m.before}</span>
                    <ArrowRight className="size-3 text-[#A7B0BF]" />
                    <span className="text-lg font-bold text-[#22C55E]">{m.after}</span>
                  </div>
                  <p className="mt-1 text-[11px] font-mono text-[#22C55E] font-medium">
                    {m.improvement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={240}>
          <div className="mt-12 text-center">
            <a
              href={site.ctaSecond.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#22C55E] px-8 text-sm font-semibold text-white transition-all hover:bg-[#16A34A] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              Quero estes resultados
              <ArrowRight className="size-4" />
            </a>
            <p className="mt-3 text-xs text-[#667085]">
              Diagnóstico gratuito • Apenas 5 empresas/mês
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
