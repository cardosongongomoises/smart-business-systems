import { Globe, Bot, Workflow, LayoutDashboard, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const services = [
  {
    n: "01",
    icon: Globe,
    title: "Websites",
    desc: "Websites rápidos, responsivos e construídos para transformar visitantes em contactos.",
    items: [
      "Landing Pages",
      "Websites institucionais",
      "Websites comerciais",
      "Websites personalizados",
      "Páginas de serviços",
      "Sites otimizados para conversão",
    ],
  },
  {
    n: "02",
    icon: Bot,
    title: "Agentes de IA",
    desc: "Canais: WhatsApp + Website + E-mail.",
    items: [
      "Responder perguntas",
      "Atender clientes",
      "Qualificar leads",
      "Consultar informações",
      "Encaminhar pedidos",
      "Agendar e reagendar reuniões",
      "Confirmar compromissos",
      "Fazer follow-up",
      "Transferir conversas para humanos",
    ],
  },
  {
    n: "03",
    icon: Workflow,
    title: "Automação",
    desc: "Transformamos tarefas repetitivas em processos que funcionam automaticamente.",
    items: [
      "Captação de leads",
      "WhatsApp",
      "E-mail",
      "Agendamento",
      "Follow-up",
      "CRM",
      "Notificações",
      "Processos internos",
      "Tarefas repetitivas",
    ],
  },
  {
    n: "04",
    icon: LayoutDashboard,
    title: "Sistemas Digitais",
    desc: "Software feito à medida da operação da sua empresa.",
    items: [
      "Dashboards",
      "Aplicações web",
      "Sistemas empresariais",
      "Portais",
      "CRM",
      "Integrações",
      "Sistemas personalizados",
    ],
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Tudo o que sua empresa precisa para operar melhor no digital.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="glass-card h-full rounded-3xl p-7 transition-colors hover:border-primary/40">
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
                    <s.icon className="size-6" />
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">{s.n}</span>
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
