import { Reveal } from "./Reveal";

const steps = [
  { title: "Encontrar", text: "Website + Google + SEO local" },
  { title: "Confiar", text: "Design profissional + conteúdo + autoridade" },
  { title: "Contactar", text: "WhatsApp + formulário + telefone" },
  { title: "Atender", text: "Agente de IA" },
  { title: "Qualificar", text: "IA identifica necessidade e perfil" },
  { title: "Agendar", text: "Calendário integrado" },
  { title: "Converter", text: "CRM + follow-up + equipa comercial" },
];

export function Journey() {
  return (
    <section id="jornada" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 bg-primary/5 blur-3xl" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Transformamos o caminho do cliente em um sistema.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70}>
              <div className="glass-card relative h-full rounded-2xl p-6">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight uppercase">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                <div className="bg-gradient-primary mt-5 h-px w-10 rounded-full" />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
