import { Reveal } from "./Reveal";
import { CTA, site } from "@/lib/site-config";
import { ArrowRight, Check, Star, Zap, Shield, Rocket } from "lucide-react";

const plans = [
  {
    name: "Presença",
    icon: Star,
    implementation: "125.000",
    monthly: "20.000",
    tagline: "Presença digital que transmite credibilidade",
    result: "Mais visitas qualificadas ao site e mais pedidos de orçamento",
    popular: false,
    href: CTA.planPresenca,
    features: [
      "Site institucional profissional",
      "SEO básico para Google",
      "Integração WhatsApp",
      "Formulário de contacto",
      "Suporte técnico",
    ],
  },
  {
    name: "Profissional",
    icon: Zap,
    implementation: "250.000",
    monthly: "50.000",
    tagline: "Atendimento automático + presença + gestão",
    result: "Resposta em <10s, +40% agendamentos, zero leads perdidos",
    popular: true,
    href: CTA.planProfissional,
    features: [
      "Tudo do plano Presença",
      "Motor ATQA activo",
      "Atendimento 24/7 via WhatsApp",
      "Agendamento automático de reuniões",
      "CRM com gestão de leads",
      "Dashboard de métricas",
    ],
  },
  {
    name: "Autoridade",
    icon: Shield,
    implementation: "450.000",
    monthly: "85.000",
    tagline: "Máxima conversão + IA avançada + Automação",
    result: "Funil totalmente automatizado e presença premium no Google",
    popular: false,
    href: CTA.planAutoridade,
    features: [
      "Tudo do plano Profissional",
      "Landing pages otimizadas para conversão",
      "Automação de follow-ups",
      "Lembretes automáticos de reunião",
      "Relatórios semanais automáticos",
      "Suporte prioritário 24/7",
    ],
  },
  {
    name: "Domínio IA",
    icon: Rocket,
    implementation: "700.000",
    monthly: "150.000",
    tagline: "Máximo domínio + IA completa + Consultoria",
    result: "Máximo domínio de mercado e operação totalmente automatizada",
    popular: false,
    href: CTA.planDominioIA,
    features: [
      "Tudo do plano Autoridade",
      "Landing pages e funis completos",
      "Sistema de pagamento integrado",
      "Automação avançada com IA",
      "Consultoria estratégica mensal",
      "Suporte VIP 24/7",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="planos"
      className="py-20 sm:py-28 bg-[#FFFFFF] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="lume-eyebrow text-[#D9531C]">Investimento</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
              O investimento que se paga no <span className="text-[#D9531C]">primeiro mês</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
              Cada plano é um investimento com retorno mensurável — não um custo. Se o sistema
              fechar 2-3 negócios adicionais por mês, já pagou o investimento.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-[16px] border p-6 transition-colors ${
                  p.popular
                    ? "border-[#2A3D63] bg-[#101D35] text-[#F5F3EE]"
                    : "border-[#E7E3D9] bg-[#F5F3EE] text-[#101D35] hover:border-[#101D35]/40"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#F4C542] px-4 py-1 font-heading text-[11px] font-bold text-[#101D35] tracking-wider uppercase whitespace-nowrap">
                      Mais escolhido
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2.5">
                    <p.icon
                      className={`size-5 ${p.popular ? "text-[#F36B32]" : "text-[#D9531C]"}`}
                      aria-hidden="true"
                    />
                    <h3
                      className={`font-heading text-xl font-bold tracking-tight ${
                        p.popular ? "text-[#F5F3EE]" : "text-[#101D35]"
                      }`}
                    >
                      {p.name}
                    </h3>
                  </div>
                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      p.popular ? "text-[#B8C0D0]" : "text-[#5B6B8C]"
                    }`}
                  >
                    {p.tagline}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-5 border-t ${
                    p.popular ? "border-[#2A3D63]" : "border-[#E7E3D9]"
                  }`}
                >
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-wider ${
                        p.popular ? "text-[#B8C0D0]" : "text-[#5B6B8C]"
                      }`}
                    >
                      Implementação
                    </p>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span
                        className={`font-heading text-3xl font-extrabold tracking-[-0.02em] tabular-nums ${
                          p.popular ? "text-[#F4C542]" : "text-[#101D35]"
                        }`}
                      >
                        {p.implementation}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          p.popular ? "text-[#F4C542]" : "text-[#101D35]"
                        }`}
                      >
                        Kz
                      </span>
                    </div>
                  </div>
                  <p
                    className={`mt-2 text-xs tabular-nums ${
                      p.popular ? "text-[#B8C0D0]" : "text-[#5B6B8C]"
                    }`}
                  >
                    Mensalidade:{" "}
                    <strong className={p.popular ? "text-[#F5F3EE]" : "text-[#101D35]"}>
                      {p.monthly} Kz
                    </strong>{" "}
                    ao mês
                  </p>

                  {/* Resultado */}
                  <div
                    className={`mt-3 rounded-[8px] border p-2.5 ${
                      p.popular
                        ? "border-[#2A3D63] bg-[#1A2A4A] text-[#F5F3EE]"
                        : "border-[#E7E3D9] bg-[#FFFFFF] text-[#101D35]"
                    }`}
                  >
                    <p className="text-[11px] font-semibold leading-snug">Resultado: {p.result}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-[13px] ${
                        p.popular ? "text-[#F5F3EE]" : "text-[#101D35]"
                      }`}
                    >
                      <Check
                        className={`size-4 mt-0.5 shrink-0 ${
                          p.popular ? "text-[#F4C542]" : "text-[#2E9E6B]"
                        }`}
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap ${
                    p.popular ? "lume-btn-primary" : "lume-btn-secondary-light"
                  }`}
                >
                  <span>{site.ctaSecond.label}</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Cálculo de ROI */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-8 text-center text-[#F5F3EE]">
            <h3 className="font-heading text-xl font-extrabold text-[#F5F3EE]">
              Quanto vale cada reunião que perde hoje?
            </h3>
            <p className="mt-2 text-sm text-[#B8C0D0] max-w-xl mx-auto">
              Se cada reunião que o sistema agendar valer Kz 200.000 ou mais em receita, basta{" "}
              <strong className="text-[#F4C542]">2-3 reuniões adicionais por mês</strong> para o
              sistema se pagar sozinho. No plano Profissional, isso são apenas 2 reuniões — o resto
              é lucro.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4">
                <p className="text-xs text-[#B8C0D0]">Reunião vale</p>
                <p className="mt-1 font-heading text-lg font-extrabold text-[#F5F3EE] tabular-nums">
                  Kz 200k
                </p>
              </div>
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4">
                <p className="text-xs text-[#B8C0D0]">Investimento</p>
                <p className="mt-1 font-heading text-lg font-extrabold text-[#F5F3EE] tabular-nums">
                  Kz 250k
                </p>
              </div>
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4">
                <p className="text-xs text-[#B8C0D0]">Para cobrir</p>
                <p className="mt-1 font-heading text-lg font-extrabold text-[#F4C542] tabular-nums">
                  ~1.3
                </p>
              </div>
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4">
                <p className="text-xs text-[#B8C0D0]">Reuniões/mês</p>
                <p className="mt-1 font-heading text-lg font-extrabold text-[#2E9E6B] tabular-nums">
                  +8 a 12
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Testimonial */}
        <Reveal delay={200}>
          <div className="mt-10 rounded-[16px] border border-[#E7E3D9] bg-[#F5F3EE] p-6 sm:p-8 text-center max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-[#101D35] italic leading-relaxed">
              &ldquo;O sistema pagou-se no primeiro mês — com 4 reuniões que antes teriam sido leads
              perdidos. Agora é o meu melhor vendedor, e nem precisa de férias.&rdquo;
            </p>
            <p className="mt-4 font-heading text-sm font-bold text-[#101D35]">
              — CEO, Empresa de Consultoria
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
