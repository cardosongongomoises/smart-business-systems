import { Check } from "lucide-react";
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
    <section id="planos" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Escolha o nível de transformação da sua empresa.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Comece com uma presença digital profissional ou construa uma operação comercial
            inteligente.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article
                className={`glass-card relative flex h-full flex-col rounded-3xl p-6 ${
                  p.highlight ? "shadow-elegant border-primary/50" : ""
                }`}
              >
                {p.badge && (
                  <span className="bg-gradient-primary absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-primary-foreground uppercase">
                    {p.badge}
                  </span>
                )}
                <p className="font-mono text-xs text-muted-foreground">{p.n}</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight uppercase">{p.name}</h3>
                <div className="mt-5">
                  <p className="text-2xl font-extrabold">{p.setup}</p>
                  <p className="text-xs text-muted-foreground">Implementação</p>
                  <p className="mt-2 text-sm font-semibold text-primary">{p.monthly}</p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{p.pitch}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={CTA.specialist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                    p.highlight
                      ? "bg-gradient-primary text-primary-foreground"
                      : "border border-border bg-surface-2 text-foreground"
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
