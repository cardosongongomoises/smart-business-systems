import { Reveal } from "./Reveal";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site-config";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  Star,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";

const plans = [
  {
    name: "Presença",
    icon: Star,
    price: "125.000",
    period: "/mês",
    build: "20.000",
    tagline: "Presença digital que transmite credibilidade",
    description:
      "Ideal para empresas que querem ser encontradas no Google e terem um site profissional — o primeiro passo para não depender apenas de indicações.",
    result: "Mais visitas qualificadas ao site, mais pedidos de orçamento",
    popular: false,
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
    price: "250.000",
    period: "/mês",
    build: "50.000",
    tagline: "Atendimento automático + presença + gestão",
    description:
      "Para empresas que querem fechar negócios automaticamente — atendimento 24/7 via WhatsApp, qualificação de leads e agendamento de reuniões sem depender de ninguém.",
    result: "Resposta em <10s, +40% agendamentos, zero leads perdidos",
    popular: true,
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
    price: "450.000",
    period: "/mês",
    build: "85.000",
    tagline: "Máxima conversão + IA avançada +Automação",
    description:
      "Para empresas que querem dominar o seu mercado — presença premium, automação completa de funil, e IA avançada que optimiza continuamente a taxa de conversão.",
    result: "Funil totalmente automatizado, presença premium no Google",
    popular: false,
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
    price: "700.000",
    period: "/mês",
    build: null,
    tagline: "Máximo domínio + IA completa + Consultoria",
    description:
      "Solução completa para empresas que querem ser a referência no mercado — tudo automatizado, presença dominante, e consultoria estratégica contínua para optimizar resultados.",
    result: "Máximo domínio de mercado, presença imparável, resultados optimizados",
    popular: false,
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
      id="precos"
      className="relative overflow-hidden bg-gradient-to-b from-[#111827] via-[#111827] to-[#0E121A] py-20 sm:py-28 scroll-mt-20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <Badge className="mb-4 border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#60A5FA]">
              Investimento
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] tracking-tight">
              O investimento que se paga no{" "}
              <span className="text-[#22C55E]">primeiro mês</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#A7B0BF] leading-relaxed">
              Cada plano é um investimento com retorno mensurável — não um custo. Se o
              sistema fechar 2-3 negócios adicionais por mês, já pagou o investimento.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-[18px] border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  p.popular
                    ? "border-[#22C55E]/40 bg-[#22C55E]/5 shadow-[0_0_40px_rgba(34,197,94,0.08)]"
                    : "border-[#252C38] bg-[#151A23]/80 hover:border-[#22C5CE]/30"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#22C55E] px-4 py-1.5 text-[11px] font-bold text-white tracking-wider uppercase shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      Mais escolhido
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <p.icon
                        className={`size-5 ${
                          p.popular ? "text-[#22C55E]" : "text-[#A7B0BF]"
                        }`}
                      />
                      <h3
                        className={`text-xl font-bold tracking-tight ${
                          p.popular ? "text-[#22C55E]" : "text-[#F5F7FA]"
                        }`}
                      >
                        {p.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[#A7B0BF] leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-5 border-t border-[#252C38]/60">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[11px] font-semibold text-[#A7B0BF]">
                      Kz
                    </span>
                    <span
                      className={`text-3xl font-extrabold tracking-[-0.03em] font-mono ${
                        p.popular ? "text-[#22C55E]" : "text-[#F5F7FA]"
                      }`}
                    >
                      {p.price}
                    </span>
                    <span className="text-xs text-[#A7B0BF]">{p.period}</span>
                  </div>
                  {p.build && (
                    <p className="mt-1.5 text-[11px] text-[#A7B0BF]">
                      Setup: Kz {p.build} (pagamento único)
                    </p>
                  )}

                  {/* Resultado */}
                  <div className="mt-3 rounded-[8px] border border-[#22C55E]/20 bg-[#22C55E]/5 p-2.5">
                    <p className="text-[11px] font-semibold text-[#22C55E]">
                      Resultado: {p.result}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[13px] text-[#A7B0BF]"
                    >
                      <Check
                        className={`size-4 mt-0.5 shrink-0 ${
                          p.popular ? "text-[#22C55E]" : "text-[#A7B0BF]"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to={site.ctaSecond.href}
                  className={`mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] text-sm font-semibold transition-all ${
                    p.popular
                      ? "bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                      : "border border-[#252C38] bg-[#0E121A] text-[#F5F7FA] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5"
                  }`}
                >
                  {site.ctaSecond.label}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Cálculo de ROI */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-[16px] border border-[#8B5CF6]/30 bg-[#151A23] p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-[#F5F7FA]">Quanto vale cada reunião que você perde hoje?</h3>
            <p className="mt-2 text-sm text-[#A7B0BF] max-w-xl mx-auto">
              Se cada reunião que o sistema agendar valer Kz 200.000 ou mais em receita,
              basta <strong className="text-[#22C55E]">2-3 reuniões adicionais por mês</strong> para o
              sistema se pagar sozinho. No plano Profissional, isso são apenas 2 reuniões — o
              resto é lucro.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
              <div className="rounded-[10px] border border-[#252C38] bg-[#0E121A] p-3">
                <p className="text-xs text-[#A7B0BF]">Reunião vale</p>
                <p className="text-lg font-bold text-[#F5F7FA] font-mono">Kz 200k</p>
              </div>
              <div className="rounded-[10px] border border-[#252C38] bg-[#0E121A] p-3">
                <p className="text-xs text-[#A7B0BF]">Investimento</p>
                <p className="text-lg font-bold text-[#F5F7FA] font-mono">Kz 250k</p>
              </div>
              <div className="rounded-[10px] border border-[#22C55E]/30 bg-[#22C55E]/5 p-3">
                <p className="text-xs text-[#22C55E]">Para cobrir</p>
                <p className="text-lg font-bold text-[#22C55E] font-mono">~1.3</p>
              </div>
              <div className="rounded-[10px] border border-[#22C55E]/30 bg-[#22C55E]/5 p-3">
                <p className="text-xs text-[#22C55E]">Reuniões/mês</p>
                <p className="text-lg font-bold text-[#22C55E] font-mono">+8 a 12</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Testimonial */}
        <Reveal delay={240}>
          <div className="mt-12 rounded-[16px] border border-[#252C38] bg-[#151A23]/80 p-6 sm:p-8 text-center max-w-2xl mx-auto">
            <p className="text-sm text-[#A7B0BF] italic leading-relaxed">
              "O sistema pagou-se no primeiro mês — com 4 reuniões que antes teriam sido leads
              perdidos. Agora é o meu melhor vendedor, e nem precisa de férias."
            </p>
            <p className="mt-4 text-sm font-bold text-[#F5F7FA]">— CEO, Empresa de Consultoria</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
