import { useEffect, useRef, useState } from "react";
import { Bot, User, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const conversation = [
  { from: "cliente", text: "Olá, gostaria de agendar uma reunião." },
  { from: "ia", text: "Claro. Posso ajudar. Qual serviço você procura?" },
  { from: "cliente", text: "Consultoria empresarial." },
  {
    from: "ia",
    text: "Perfeito. Tenho disponibilidade amanhã às 10h ou às 15h. Qual horário prefere?",
  },
  { from: "cliente", text: "15h." },
  {
    from: "ia",
    text: "Reunião agendada para amanhã às 15h. Enviarei a confirmação por WhatsApp e e-mail.",
  },
];

export function AIAgent() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          let i = 0;
          const tick = () => {
            i += 1;
            setShown(i);
            if (i < conversation.length) window.setTimeout(tick, 900);
          };
          window.setTimeout(tick, 300);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="agente-ia" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/3 right-0 size-[30rem] rounded-full bg-primary/10 blur-[130px]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
              Seu próximo funcionário pode ser uma{" "}
              <span className="text-gradient">Inteligência Artificial.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Um agente digital capaz de conversar com seus clientes 24 horas por dia, responder
              perguntas, qualificar oportunidades e agendar atendimentos.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              <ShieldCheck className="size-4" /> Automatizado
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="glass-card shadow-elegant rounded-3xl p-5 sm:p-7">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="bg-gradient-primary flex size-9 items-center justify-center rounded-full text-primary-foreground">
              <Bot className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Agente Digital</p>
              <p className="text-xs text-primary">online agora</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {conversation.slice(0, shown).map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.from === "ia" ? "" : "flex-row-reverse"}`}
                style={{ animation: "fadeIn .5s ease both" }}
              >
                <span className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground">
                  {m.from === "ia" ? <Bot className="size-4" /> : <User className="size-4" />}
                </span>
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "ia"
                      ? "border border-primary/30 bg-primary/10"
                      : "border border-border bg-surface-2"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {shown < conversation.length && (
              <div className="flex gap-1.5 pl-10">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${d * 120}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
