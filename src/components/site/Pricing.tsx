import { Check, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

const plans = [
  {
    name: "Presença",
    n: "01",
    setup: "Kz 125.000",
    monthly: "Kz 20.000/mês",
    pitch: "Presença digital profissional sem enorme investimento. Uma landing page que converte visitantes em contactos — ideal para quem precisa de um website agora.",
    cta: "Começar agora",
    link: CTA.planPresenca,
    highlight: false,
    items: [
      "Landing Page",
      "Domínio",
      "Hospedagem",
      "SSL",
      "Backup",
      "WhatsApp",
      "Google Maps",
      "Formulário",
      "Redes sociais",
      "SEO básico",
      "Manutenção",
    ],
  },
  {
    name: "Profissional",
    n: "02",
    badge: "Mais escolhido · Pagou-se no 1º mês",
    setup: "Kz 250.000",
    monthly: "Kz 50.000/mês",
    pitch: "Este plano pagou-se a si mesmo no 1º mês com apenas 3 reuniões adicionais. Website + WhatsApp + IA que atende, qualifica e agenda — transformando visitantes em clientes enquanto dorme.",
    cta: "Quero este plano",
    link: CTA.planProfissional,
    highlight: true,
    items: [
      "Website até 5 páginas",
      "Domínio",
      "Hospedagem",
      "SSL",
      "Backup",
      "WhatsApp",
      "Agendamento",
      "Google Business Profile",
      "SEO local",
      "Google Analytics",
      "Search Console",
      "IA básica",
      "Respostas automáticas",
      "Qualificação inicial",
      "E-mail automatizado",
      "Manutenção",
      "Suporte prioritário",
    ],
  },
  {
    name: "Autoridade",
    n: "03",
    setup: "Kz 450.000",
    monthly: "Kz 85.000/mês",
    pitch: "Website + Blog + SEO + IA + Automação completa. Para empresas que querem dominar o Google e converter tráfego em reuniões automaticamente.",
    cta: "Construir minha estrutura",
    link: CTA.planAutoridade,
    highlight: false,
    items: [
      "Website até 10 páginas",
      "Blog",
      "SEO avançado",
      "IA avançada",
      "WhatsApp automatizado",
      "E-mail automatizado",
      "Qualificação de leads",
      "Agendamento automático",
      "Follow-up",
      "CRM",
      "Analytics",
      "Search Console",
      "Automação de processos",
      "Optimização contínua",
      "Relatórios",
      "Suporte prioritário",
    ],
  },
  {
    name: "Domínio IA",
    n: "04",
    setup: "Kz 700.000",
    monthly: "Kz 150.000/mês",
    pitch: "Operação digital completa — website, IA, automação, CRM, dashboards e consultoria. Para empresas que querem escalar sem limites.",
    cta: "Falar com especialista",
    link: CTA.planDominioIA,
    highlight: false,
    items: [
      "Website personalizado",
      "UX/UI personalizado",
      "Agentes de IA",
      "WhatsApp",
      "E-mail",
      "CRM",
      "Agendamento",
      "Automação",
      "Follow-up",
      "SEO avançado",
      "Landing Pages",
      "Analytics",
      "Dashboards",
      "Integrações",
      "Sistemas personalizados",
      "Segurança",
      "Backup",
      "Monitorização",
      "Consultoria",
      "Suporte premium",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="planos"
      className="py-20 sm:py-28 relative bg-[#080A0F] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[42rem] rounded-full bg-[#3B82F6]/5 blur-[160px]" />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
              Pacotes de Websites & Automação em Angola
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
              Quanto custa perder um cliente{" "}
              <span className="text-gradient">por demora no atendimento?</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-2xl mx-auto text-base text-[#A7B0BF]">
              Cada plano pagou-se a si mesmo com apenas poucas reuniões adicionais fechadas pelo sistema.
              Preços em Kwanzas (Kz). Sem surpresas. Sem taxas ocultas. Aimplementação é única e os valores mensais incluem tudo: hospedagem, domínio, SSL, manutenção e suporte.
            </p>
          </Reveal>

          {/* ROI Callout */}
          <Reveal delay={240}>
            <div className="mt-6 inline-flex items-center gap-3 rounded-[10px] border border-[#22C55E]/30 bg-[#22C55E]/5 px-5 py-3">
              <span className="text-lg font-bold text-[#22C55E]">1 reunião/mês</span>
              <span className="text-xs text-[#A7B0BF]">→ o plano Profissional já se paga. Duas reuniões e você lucra. Quatro reuniões e o ROI é 4x.</span>
            </div>
          </Reveal>

          {/* Trust Signals Below Pricing */}
          <Reveal delay={320}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#667085]">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#22C55E]" />
                Sem fidelidade — cancele quando quiser
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#3B82F6]" />
                Suporte técnico garantido
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#8B5CF6]" />
                Dados protegidos com SSL
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-stretch">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article
                className={`relative flex h-full flex-col justify-between rounded-[16px] p-6 sm:p-7 transition-all duration-200 ${
                  p.highlight
                    ? "border-2 border-[#3B82F6] bg-[#151A23] shadow-[0_8px_30px_rgba(59,130,246,0.18)]"
                    : "border border-[#252C38] bg-[#151A23] hover:border-[#3B82F6]/40 hover:-translate-y-0.5"
                }`}
              >
                <div>
                  {p.badge && (
                    <span className="absolute -top-3 left-6 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6] px-3 py-0.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase shadow-sm flex items-center gap-1">
                      <Sparkles className="size-2.5" aria-hidden="true" /> {p.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs text-[#3B82F6] font-bold">0{i + 1}</p>
                    <span className="text-[10px] font-mono tracking-wider text-[#667085] uppercase">
                      PACOTE
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold tracking-tight uppercase text-[#F5F7FA]">
                    {p.name}
                  </h3>

                  <div className="mt-5 border-y border-[#252C38] py-4">
                    <p className="text-2xl font-bold text-[#F5F7FA] tracking-tight tabular-nums">
                      {p.setup}
                    </p>
                    <p className="text-xs text-[#A7B0BF]">Implementação única</p>
                    <p className="mt-2 text-sm font-bold text-[#3B82F6] tabular-nums">
                      {p.monthly}
                    </p>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-[#A7B0BF] min-h-[36px]">
                    {p.pitch}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-[#252C38]/60 pt-4">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-xs text-[#A7B0BF]">
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-[#3B82F6]"
                          aria-hidden="true"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex h-[44px] items-center justify-center rounded-[8px] px-5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    p.highlight
                      ? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
                      : "border border-[#252C38] bg-[#0E121A] text-[#F5F7FA] hover:bg-[#151A23] hover:border-[#3B82F6]"
                  }`}
                >
                  {p.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
