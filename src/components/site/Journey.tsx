import { Reveal } from "./Reveal";
import {
  Search,
  Shield,
  MessageCircle,
  Bot,
  Filter,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "ENCONTRAR",
    icon: Search,
    subtitle: "Visibilidade & Tráfego",
    text: "Website + Google + SEO local",
    desc: "Sua empresa é descoberta exatamente quando o potencial cliente procura pelos seus serviços.",
  },
  {
    title: "CONFIAR",
    icon: Shield,
    subtitle: "Autoridade Digital",
    text: "Design profissional + conteúdo + autoridade",
    desc: "Uma presença visual de alto nível que elimina dúvidas e posiciona sua marca como líder.",
  },
  {
    title: "CONTACTAR",
    icon: MessageCircle,
    subtitle: "Canais Diretos",
    text: "WhatsApp + formulário + telefone",
    desc: "Pontos de contacto imediatos e sem atrito nos canais que o seu cliente mais utiliza.",
  },
  {
    title: "ATENDER",
    icon: Bot,
    subtitle: "Disponibilidade Total",
    text: "Agente de IA",
    desc: "Resposta instantânea em segundos, 24 horas por dia, 7 dias por semana, sem filas de espera.",
  },
  {
    title: "QUALIFICAR",
    icon: Filter,
    subtitle: "Filtro Inteligente",
    text: "IA identifica necessidade e perfil",
    desc: "A IA compreende a demanda real, filtra curiosos e identifica clientes com perfil ideal.",
  },
  {
    title: "AGENDAR",
    icon: Calendar,
    subtitle: "Compromisso Marcado",
    text: "Calendário integrado",
    desc: "Agendamento automático sincronizado com a disponibilidade da sua equipa e lembretes automáticos.",
  },
  {
    title: "CONVERTER",
    icon: TrendingUp,
    subtitle: "Fecho Comercial",
    text: "CRM + follow-up + equipa comercial",
    desc: "Oportunidade pronta entregue à sua equipa com histórico completo para fechar negócio.",
  },
];

export function Journey() {
  return (
    <section
      id="jornada"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-border/40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 bg-primary/5 blur-3xl" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Pipeline Integrado
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
              Transformamos o caminho do cliente{" "}
              <span className="text-gradient">em um sistema.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Cada etapa é conectada com precisão para guiar o visitante desde a primeira pesquisa
              até a conversão em cliente real.
            </p>
          </Reveal>
        </div>

        {/* Pipeline Stepper / Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="glass-card group relative flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:bg-surface-2/60">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors">
                      <s.icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-primary/80">0{i + 1}</span>
                  </div>

                  <h3 className="mt-5 text-sm font-bold tracking-[0.16em] uppercase text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-xs font-semibold text-primary mt-1">{s.subtitle}</p>
                  <div className="mt-3 rounded-lg border border-border/70 bg-surface/80 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
                    {s.text}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="group-hover:text-foreground transition-colors">
                    Etapa automatizada
                  </span>
                  {i < steps.length - 1 ? (
                    <ArrowRight className="size-3.5 text-primary/70 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <span className="text-[10px] font-bold text-primary uppercase">Conversão</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Supporting Quote Banner */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center max-w-3xl mx-auto">
            <p className="text-base sm:text-lg font-medium text-foreground">
              “Do primeiro contacto ao agendamento, transformamos processos manuais em experiências
              digitais inteligentes.”
            </p>
            <p className="mt-2 text-xs font-semibold tracking-wider text-primary uppercase">
              Agentes Digital • Arquitetura de Conversão
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
