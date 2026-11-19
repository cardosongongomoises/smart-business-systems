import { Reveal } from "./Reveal";
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
    after: "<10 seg",
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
      className="relative bg-[#F5F3EE] text-[#101D35] py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="lume-eyebrow text-[#D9531C]">02 · A transformação</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-[#101D35] leading-[1.15] text-balance">
              O que muda quando o seu negócio passa a atender e fechar 24/7
            </h2>
            <p className="mt-4 max-w-[65ch] text-base sm:text-lg text-[#5B6B8C] leading-relaxed">
              Não vendemos ferramentas soltas — entregamos operação previsível. Veja a diferença
              entre perder oportunidades por demora e convertê-las automaticamente.
            </p>
          </div>
        </Reveal>

        {/* Before / After */}
        <Reveal delay={80}>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Before */}
            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="size-5 text-[#D64545]" aria-hidden="true" />
                  <span className="font-heading text-xs font-bold tracking-wider text-[#D64545] uppercase">
                    Antes do sistema
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#101D35]">
                  Enquanto a sua equipa dorme, os seus leads fogem
                </h3>
                <ul className="mt-6 space-y-3">
                  {beforeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#5B6B8C]">
                      <XCircle
                        className="size-4 mt-0.5 shrink-0 text-[#D64545]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E7E3D9]">
                <p className="text-xs font-semibold text-[#D64545]">
                  Resultado: receita que vai para a concorrência todos os meses
                </p>
              </div>
            </div>

            {/* After */}
            <div className="rounded-[16px] border border-[#101D35] bg-[#101D35] p-6 sm:p-8 text-[#F5F3EE] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="size-5 text-[#2E9E6B]" aria-hidden="true" />
                  <span className="font-heading text-xs font-bold tracking-wider text-[#F4C542] uppercase">
                    Depois do sistema
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#F5F3EE]">
                  O seu negócio trabalha enquanto você descansa
                </h3>
                <ul className="mt-6 space-y-3">
                  {afterItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#F5F3EE]">
                      <CheckCircle2
                        className="size-4 mt-0.5 shrink-0 text-[#2E9E6B]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2A3D63]">
                <p className="text-xs font-semibold text-[#F4C542]">
                  Resultado: leads convertidos, reuniões agendadas, receita a crescer
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Metrics */}
        <Reveal delay={140}>
          <div className="mt-10 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-8">
            <h3 className="font-heading text-xl font-bold text-[#101D35] text-center">
              Números comparativos da operação
            </h3>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="text-center rounded-[12px] border border-[#E7E3D9] bg-[#F5F3EE] p-5"
                >
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#101D35] text-[#F4C542]">
                    <m.icon className="size-5" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-xs font-medium text-[#5B6B8C]">{m.label}</p>
                  <div className="mt-2 flex items-center justify-center gap-2 tabular-nums">
                    <span className="text-sm text-[#D64545] line-through">{m.before}</span>
                    <ArrowRight className="size-3 text-[#5B6B8C]" aria-hidden="true" />
                    <span className="font-heading text-lg font-extrabold text-[#101D35]">
                      {m.after}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-[#2E9E6B] tabular-nums">
                    {m.improvement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={180}>
          <div className="mt-12 text-center">
            <a
              href={site.ctaSecond.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm"
            >
              <span>Quero estes resultados</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <p className="mt-3 text-xs text-[#5B6B8C]">
              Diagnóstico gratuito · Apenas 5 empresas/mês
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
