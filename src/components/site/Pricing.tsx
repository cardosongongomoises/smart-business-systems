import { Reveal } from "./Reveal";
import { CTA, site } from "@/lib/site-config";
import { ArrowRight, Check, Star, Zap, Shield, Rocket } from "lucide-react";

const plans = [
  {
    name: "Presença",
    icon: Star,
    implementation: "125.000",
    monthly: "20.000",
    tagline: "Para quem não tem site, ou tem um que não gera contactos",
    result: "Mais visitas qualificadas ao site e mais pedidos de orçamento",
    popular: false,
    href: CTA.planPresenca,
    features: [
      "Site profissional rápido e claro",
      "SEO básico para Google",
      "Ligação directa ao WhatsApp",
      "Formulário de contacto",
      "Suporte técnico incluído",
    ],
  },
  {
    name: "Profissional",
    icon: Zap,
    implementation: "250.000",
    monthly: "50.000",
    tagline: "Para quem quer site, atendimento 24h e reuniões marcadas",
    result: "Resposta em <10s, +40% agendamentos, zero contactos esquecidos",
    popular: true,
    href: CTA.planProfissional,
    features: [
      "Site até 5 páginas (tudo do Presença)",
      "Atendimento automático 24h no WhatsApp",
      "Marcação automática de reuniões",
      "Registo e gestão de contactos (CRM)",
      "Painel com métricas de atendimento",
      "Suporte técnico prioritário",
    ],
  },
  {
    name: "Autoridade",
    icon: Shield,
    implementation: "450.000",
    monthly: "85.000",
    tagline: "Para quem quer acompanhar e fechar mais contactos",
    result: "Seguimento automático, menos faltas e presença forte no Google",
    popular: false,
    href: CTA.planAutoridade,
    features: [
      "Tudo do plano Profissional",
      "Landing pages para gerar mais pedidos",
      "Follow-ups automáticos de propostas",
      "Lembretes automáticos de reunião",
      "Relatórios semanais automáticos",
      "Suporte técnico dedicado",
    ],
  },
  {
    name: "Operação Completa",
    icon: Rocket,
    implementation: "700.000",
    monthly: "150.000",
    tagline: "Para quem quer a operação comercial toda organizada",
    result: "Do primeiro contacto ao pagamento e fecho num único processo",
    popular: false,
    href: CTA.planDominioIA,
    features: [
      "Tudo do plano Autoridade",
      "Funis comerciais completos",
      "Sistema de pagamento integrado",
      "Automação comercial avançada",
      "Consultoria estratégica mensal",
      "Suporte técnico VIP dedicado",
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
            <p className="lume-eyebrow text-[#D9531C]">Planos e Investimento</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
              Escolha por onde <span className="text-[#D9531C]">começar</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
              Cada plano paga-se logo com as primeiras reuniões recuperadas. Já tem website e não o
              quer refazer? Veja acima o{" "}
              <a href="#automate-pricing" className="font-semibold text-[#D9531C] hover:underline">
                Automate Pro
              </a>
              .
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
          <p className="mt-5 text-center text-xs text-[#5B6B8C]">
            Custos de plataformas de terceiros (WhatsApp, serviços de IA, e-mail e outros) podem
            variar conforme a utilização.
          </p>
        </Reveal>

        {/* Cálculo de ROI */}
        <Reveal delay={160}>
          <div className="mt-10 rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-8 text-center text-[#F5F3EE]">
            <h3 className="font-heading text-xl font-extrabold text-[#F5F3EE]">
              Quanto vale cada reunião que hoje perde?
            </h3>
            <p className="mt-2 text-sm text-[#B8C0D0] max-w-xl mx-auto">
              Se cada reunião valer Kz 200.000 ou mais, o plano Profissional (Kz 250.000 de
              implementação) cobre-se com cerca de{" "}
              <strong className="text-[#F4C542]">1,3 reuniões</strong>. Com +8 a 12 reuniões
              adicionais por mês, o resto é lucro.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4">
                <p className="text-xs text-[#B8C0D0]">Reunião vale</p>
                <p className="mt-1 font-heading text-lg font-extrabold text-[#F5F3EE] tabular-nums">
                  Kz 200k
                </p>
              </div>
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4">
                <p className="text-xs text-[#B8C0D0]">Implementação</p>
                <p className="mt-1 font-heading text-lg font-extrabold text-[#F5F3EE] tabular-nums">
                  Kz 250k
                </p>
              </div>
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4">
                <p className="text-xs text-[#B8C0D0]">Para cobrir</p>
                <p className="mt-1 font-heading text-lg font-extrabold text-[#F4C542] tabular-nums">
                  ~1,3
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

        {/* Garantia 30 dias */}
        <Reveal delay={200}>
          <div className="mt-10 rounded-[16px] border border-[#2E9E6B]/50 bg-[#F5F3EE] p-6 sm:p-8 text-center max-w-3xl mx-auto">
            <p className="lume-eyebrow text-[#2E9E6B]">Garantia sem risco</p>
            <h3 className="mt-2 font-heading text-xl font-extrabold text-[#101D35]">
              30 dias. Se não entregarmos o que prometemos, devolvemos 100%.
            </h3>
            <p className="mt-3 text-sm text-[#5B6B8C] leading-relaxed">
              Se nos primeiros 30 dias o sistema não entregar o que combinámos, devolvemos todo o
              investimento. Sem perguntas, sem burocracia. O risco é nosso, não seu.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
