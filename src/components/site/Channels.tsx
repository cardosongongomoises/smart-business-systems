import { MessageCircle, Mail, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    items: [
      "Resposta automática",
      "Perguntas frequentes",
      "Qualificação",
      "Agendamento",
      "Confirmação",
      "Follow-up",
    ],
  },
  {
    icon: Mail,
    title: "E-mail",
    items: [
      "Respostas automáticas",
      "Classificação",
      "Encaminhamento",
      "Follow-up",
      "Notificações",
    ],
  },
];

export function Channels() {
  return (
    <section id="canais" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Um atendimento que não dorme.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="glass-card h-full rounded-3xl p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
                  <c.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
                <ul className="mt-5 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-primary" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-12 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Enquanto sua equipa está em reunião, trabalhando ou fora do escritório,{" "}
            <span className="font-semibold text-foreground">
              seu agente digital continua atendendo.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
