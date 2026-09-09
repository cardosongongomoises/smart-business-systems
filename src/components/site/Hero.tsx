import { ArrowRight, PlayCircle, Circle } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

const flow = [
  { label: "Novo cliente", detail: "Mensagem recebida", tone: "muted" },
  { label: "WhatsApp", detail: "Canal de entrada", tone: "muted" },
  { label: "Agente IA", detail: "Atendimento imediato", tone: "primary" },
  { label: "Qualificação", detail: "Necessidade e perfil", tone: "muted" },
  { label: "Agendamento", detail: "Calendário integrado", tone: "muted" },
  { label: "CRM", detail: "Oportunidade registada", tone: "primary" },
];

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Tecnologia • IA • Automação
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
              Sua empresa pode trabalhar <span className="text-gradient">enquanto você dorme.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Criamos websites, agentes de Inteligência Artificial e automações que ajudam sua
              empresa a ser encontrada, atender clientes, qualificar oportunidades e agendar
              reuniões automaticamente.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-primary shadow-elegant inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Falar com um especialista <ArrowRight className="size-4" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/50 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                <PlayCircle className="size-4" /> Ver como funciona
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              Atendimento digital 24/7
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="glass-card shadow-elegant rounded-3xl p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Circle className="size-2.5 fill-destructive text-destructive" />
                <Circle className="size-2.5 fill-muted-foreground text-muted-foreground" />
                <Circle className="size-2.5 fill-primary text-primary" />
              </div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Fluxo em execução
              </span>
            </div>

            <ol className="mt-5 space-y-2">
              {flow.map((step, i) => (
                <li key={step.label}>
                  <div
                    className={`flex items-center justify-between rounded-xl border px-4 py-3.5 ${
                      step.tone === "primary"
                        ? "border-primary/40 bg-primary/10"
                        : "border-border bg-surface-2/50"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.detail}</p>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  {i < flow.length - 1 && (
                    <div className="mx-auto h-4 w-px bg-gradient-to-b from-primary/60 to-transparent" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
