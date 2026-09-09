import { MessageSquare, Clock, LogOut } from "lucide-react";
import { Reveal } from "./Reveal";

const cards = [
  {
    icon: MessageSquare,
    title: "Cliente envia mensagem",
    text: "“Olá, gostaria de saber mais sobre o serviço.”",
  },
  {
    icon: Clock,
    title: "Ninguém responde imediatamente",
    text: "O potencial cliente espera.",
  },
  {
    icon: LogOut,
    title: "O cliente procura outra empresa",
    text: "A oportunidade é perdida.",
  },
];

export function Problem() {
  return (
    <section id="problema" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Enquanto sua equipa trabalha, quantas oportunidades ficam esperando?
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-6 max-w-2xl space-y-3 text-muted-foreground">
            <p>
              Muitas empresas já têm bons serviços, bons profissionais e clientes interessados.
            </p>
            <p>
              O problema é que o atendimento depende constantemente de alguém estar disponível.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 100}>
              <div className="glass-card h-full rounded-2xl p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
                  <c.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-12 text-xl font-semibold sm:text-2xl">
            A Agentes Digital <span className="text-gradient">transforma esse processo.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
