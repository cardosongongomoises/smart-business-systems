import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";
import { ArrowRight, Check, Star, Zap, Shield, Rocket, Sliders } from "lucide-react";

const plans = [
  {
    name: "Presença",
    icon: Star,
    implementation: "125.000",
    monthly: "20.000",
    tagline: "Para quem precisa de um website estruturado para gerar contactos diretos",
    outcome: "Site profissional rápido ligado ao WhatsApp e formulário organizado",
    popular: false,
    href: CTA.planPresenca,
    features: [
      "Site profissional rápido e claro",
      "SEO base para pesquisas no Google",
      "Ligação direta ao WhatsApp",
      "Formulário de contacto organizado",
      "Suporte técnico incluído",
    ],
  },
  {
    name: "Profissional",
    icon: Zap,
    implementation: "250.000",
    monthly: "50.000",
    tagline: "Para quem quer website, atendimento com IA e marcação de reuniões",
    outcome: "Atendimento inicial automatizado, agendamento e registo de contactos",
    popular: true,
    href: CTA.planProfissional,
    features: [
      "Site até 5 páginas (tudo do Presença)",
      "Atendimento automático no WhatsApp",
      "Marcação automática de reuniões",
      "Registo e gestão de contactos (CRM)",
      "Painel com acompanhamento de pedidos",
      "Suporte técnico prioritário",
    ],
  },
  {
    name: "Autoridade",
    icon: Shield,
    implementation: "450.000",
    monthly: "85.000",
    tagline: "Para quem quer automatizar follow-ups, lembretes e acompanhamento",
    outcome: "Menos oportunidades esquecidas e processos comerciais integrados",
    popular: false,
    href: CTA.planAutoridade,
    features: [
      "Tudo do plano Profissional",
      "Landing pages para captação de pedidos",
      "Follow-ups automáticos de propostas",
      "Lembretes automáticos de reunião",
      "Relatórios automáticos semanais",
      "Suporte técnico dedicado",
    ],
  },
  {
    name: "Operação Completa",
    icon: Rocket,
    implementation: "700.000",
    monthly: "150.000",
    tagline: "Para quem quer atendimento com IA e operação comercial totalmente integrada",
    outcome: "Fluxos completos do primeiro contacto à gestão e acompanhamento",
    popular: false,
    href: CTA.planDominioIA,
    features: [
      "Tudo do plano Autoridade",
      "Funis comerciais completos",
      "Integração de processos e pagamentos",
      "Automação comercial avançada",
      "Acompanhamento estratégico mensal",
      "Suporte técnico dedicado",
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
              Escolha o formato adequado ao <span className="text-[#D9531C]">seu momento</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
              Temos pacotes completos para quem precisa de site + IA + automatização, além do{" "}
              <a href="#automate-pricing" className="font-semibold text-[#D9531C] hover:underline">
                Automate Pro
              </a>{" "}
              para quem já tem website e de propostas personalizadas por processo.
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

                  {/* Foco do plano */}
                  <div
                    className={`mt-3 rounded-[8px] border p-2.5 ${
                      p.popular
                        ? "border-[#2A3D63] bg-[#1A2A4A] text-[#F5F3EE]"
                        : "border-[#E7E3D9] bg-[#FFFFFF] text-[#101D35]"
                    }`}
                  >
                    <p className="text-[11px] font-semibold leading-snug">{p.outcome}</p>
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
                  <span>Solicitar diagnóstico</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-[#5B6B8C]">
            Custos externos de plataformas de terceiros (WhatsApp oficial, APIs de IA, serviço de
            e-mail ou CRM externo) variam conforme a utilização e a arquitetura escolhida.
          </p>
        </Reveal>

        {/* Custom Proposal Card */}
        <Reveal delay={160}>
          <div className="mt-10 rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-8 text-[#F5F3EE] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="flex size-11 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F4C542] shrink-0">
                <Sliders className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="lume-eyebrow text-[#F4C542]">Proposta Personalizada</p>
                <h3 className="mt-1.5 font-heading text-xl font-extrabold text-[#F5F3EE]">
                  Precisa apenas de IA no WhatsApp ou de automatizar um processo específico?
                </h3>
                <p className="mt-2 text-sm text-[#B8C0D0] leading-relaxed">
                  Quando a empresa precisa de um escopo sob medida (por exemplo, apenas follow-up
                  comercial, relatórios automáticos ou integração com ferramentas internas),
                  preparamos uma proposta ajustada após o diagnóstico.
                </p>
              </div>
            </div>

            <a
              href={CTA.proposal}
              target="_blank"
              rel="noopener noreferrer"
              className="lume-btn-primary shrink-0 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <span>Pedir proposta personalizada</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* Transparency note */}
        <Reveal delay={200}>
          <div className="mt-8 rounded-[16px] border border-[#E7E3D9] bg-[#F5F3EE] p-6 sm:p-7 text-center max-w-3xl mx-auto">
            <p className="lume-eyebrow text-[#2E9E6B]">Como funciona o investimento</p>
            <h3 className="mt-2 font-heading text-lg font-extrabold text-[#101D35]">
              Implementação inicial para estruturar e ligar; mensalidade para manter e evoluir
            </h3>
            <p className="mt-2.5 text-sm text-[#5B6B8C] leading-relaxed">
              A implementação cobre o levantamento, configuração, integrações, testes e orientação
              da equipa. A mensalidade assegura monitorização técnica, suporte e melhorias contínuas
              para manter tudo estável no dia a dia.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
