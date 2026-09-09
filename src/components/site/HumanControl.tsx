import { Bot, MessageSquare, CalendarCheck, Database, UserCog } from "lucide-react";
import { Reveal } from "./Reveal";

const branches = [
  { icon: MessageSquare, from: "Pergunta simples", to: "Responde" },
  { icon: CalendarCheck, from: "Agendamento", to: "Agenda" },
  { icon: Database, from: "Lead qualificado", to: "CRM" },
  { icon: UserCog, from: "Situação complexa", to: "Humano", human: true },
];

export function HumanControl() {
  return (
    <section id="controlo" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Automatizado não significa descontrolado.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A IA deve saber quando responder e quando encaminhar para uma pessoa.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="glass-card mt-12 rounded-3xl p-7">
            <div className="flex items-center gap-3">
              <span className="bg-gradient-primary flex size-10 items-center justify-center rounded-xl text-primary-foreground">
                <Bot className="size-5" />
              </span>
              <p className="font-semibold">Agente de IA</p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {branches.map((b, i) => (
                <Reveal as="li" key={b.from} delay={i * 80}>
                  <div
                    className={`h-full rounded-2xl border p-5 ${
                      b.human ? "border-primary/50 bg-primary/10" : "border-border bg-surface-2/50"
                    }`}
                  >
                    <b.icon className="size-5 text-primary" />
                    <p className="mt-4 text-sm font-semibold">{b.from}</p>
                    <p className="mt-3 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                      ↓ {b.to}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            A IA cuida do repetitivo.{" "}
            <span className="font-semibold text-foreground">
              Sua equipa cuida do que realmente precisa de pessoas.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
