import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Descoberta", text: "Analisamos sua empresa, público e processo atual." },
  { n: "02", title: "Estratégia", text: "Definimos o que deve ser automatizado." },
  { n: "03", title: "Construção", text: "Criamos website, IA e automações." },
  {
    n: "04",
    title: "Integração",
    text: "Conectamos WhatsApp, e-mail, calendário, CRM e demais ferramentas.",
  },
  { n: "05", title: "Evolução", text: "Monitoramos e melhoramos continuamente o sistema." },
];

export function Process() {
  return (
    <section id="como-funciona" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Do primeiro contacto ao cliente.
          </h2>
        </Reveal>

        <ol className="relative mt-14 space-y-4 border-l border-border pl-6 sm:pl-10">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80}>
              <div className="glass-card relative rounded-2xl p-6">
                <span className="bg-gradient-primary absolute top-8 -left-[1.9rem] size-3 rounded-full sm:-left-[2.9rem]" />
                <p className="font-mono text-xs text-primary">{s.n}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
