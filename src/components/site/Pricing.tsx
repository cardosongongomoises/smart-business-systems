import { Check, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

const plans = [
  {
    name: "Presença",
    n: "01",
    setup: "Kz 125.000",
    monthly: "Kz 20.000/mês",
    pitch: "Ideal para empresas que precisam começar.",
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
    badge: "Mais escolhido",
    setup: "Kz 250.000",
    monthly: "Kz 50.000/mês",
    pitch: "Ideal para empresas que querem transformar presença digital em geração de contactos.",
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
    pitch: "Para empresas que querem autoridade, automação e crescimento.",
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
    pitch: "Para empresas que querem uma operação digital completa.",
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
    <section id="planos" className="py-24 sm:py-32 relative border-t border-border/40">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[42rem] rounded-full bg-primary/5 blur-[160px]" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Investimento Estruturado
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
              Escolha o nível de transformação{" "}
              <span className="text-gradient">da sua empresa.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Comece com uma presença digital profissional ou construa uma operação comercial
              inteligente.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article
                className={`glass-card relative flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-primary/60 ${
                  p.highlight
                    ? "shadow-elegant border-primary/50 bg-surface-2/60 ring-1 ring-primary/30"
                    : ""
                }`}
              >
                <div>
                  {p.badge && (
                    <span className="bg-gradient-primary absolute -top-3.5 left-6 rounded-full px-3.5 py-1 text-[10px] font-extrabold tracking-[0.18em] text-primary-foreground uppercase shadow-md flex items-center gap-1.5">
                      <Sparkles className="size-3" /> {p.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs text-primary font-semibold">{p.n}</p>
                    <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                      PACOTE
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-tight uppercase text-foreground">
                    {p.name}
                  </h3>

                  <div className="mt-5 border-y border-border/60 py-4">
                    <p className="text-2xl font-extrabold text-foreground tracking-tight">
                      {p.setup}
                    </p>
                    <p className="text-xs text-muted-foreground">Implementação única</p>
                    <p className="mt-2 text-sm font-bold text-primary">{p.monthly}</p>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{p.pitch}</p>

                  <ul className="mt-6 space-y-2 border-t border-border/40 pt-4">
                    {p.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-2.5 text-xs text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-3.5 shrink-0 text-primary" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                    p.highlight
                      ? "bg-gradient-primary shadow-elegant text-primary-foreground"
                      : "border border-border bg-surface-2 text-foreground hover:bg-surface"
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
