import { Bot, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const timeline = [
  { tag: "09:41 • Novo contacto", text: "“Boa tarde, gostaria de marcar uma reunião.”", ia: false },
  { tag: "🤖 Agente Digital", text: "“Olá! Será um prazer ajudá-lo. Qual serviço você procura?”", ia: true },
  { tag: "Cliente", text: "“Consultoria.”", ia: false },
  {
    tag: "🤖 Agente Digital",
    text: "“Perfeito. Tenho disponibilidade amanhã às 10h ou 15h.”",
    ia: true,
  },
];

export function LiveDemo() {
  return (
    <section id="demonstracao" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Veja a <span className="text-gradient">Agentes Digital</span> trabalhando
          </h2>
        </Reveal>

        <div className="mt-14 space-y-3">
          {timeline.map((t, i) => (
            <Reveal key={i} delay={i * 120}>
              <div>
                <div
                  className={`glass-card rounded-2xl p-5 ${
                    t.ia ? "border-primary/40" : ""
                  } ${t.ia ? "ml-auto max-w-xl" : "mr-auto max-w-xl"}`}
                >
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    {t.tag}
                  </p>
                  <p className="mt-2 text-base">{t.text}</p>
                </div>
                <div className="mx-auto my-1 h-5 w-px bg-gradient-to-b from-primary/60 to-transparent" />
              </div>
            </Reveal>
          ))}

          <Reveal delay={520}>
            <div className="shadow-elegant mx-auto flex max-w-md items-center justify-center gap-2 rounded-2xl border border-primary/50 bg-primary/15 px-6 py-5">
              <CheckCircle2 className="size-5 text-primary" />
              <p className="text-sm font-bold tracking-[0.16em] uppercase">Reunião agendada</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <p className="mt-12 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Bot className="size-4 text-primary" />
            Não construímos apenas presença digital. Construímos sistemas que trabalham para o seu
            negócio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
