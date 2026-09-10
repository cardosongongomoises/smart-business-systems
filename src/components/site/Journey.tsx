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
      className="relative py-20 sm:py-28 overflow-hidden bg-[#080A0F] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 bg-[#3B82F6]/5 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
              Pipeline Integrado
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
              Transformamos o caminho do cliente{" "}
              <span className="text-gradient">em um sistema contínuo.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base text-[#A7B0BF] sm:text-lg">
              Cada etapa é conectada com precisão para guiar o visitante desde a primeira pesquisa
              até a conversão em cliente real.
            </p>
          </Reveal>
        </div>

        {/* Pipeline Stepper / Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="glass-card group relative flex h-full flex-col justify-between rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 transition-[border-color,transform] hover:border-[#3B82F6]/50 hover:-translate-y-0.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-[8px] border border-[#252C38] bg-[#0E121A] text-[#3B82F6] group-hover:border-[#3B82F6]/40 group-hover:bg-[#3B82F6]/10 transition-colors">
                      <s.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-bold text-[#3B82F6]">0{i + 1}</span>
                  </div>

                  <h3 className="mt-5 text-xs font-bold tracking-[0.18em] uppercase text-[#F5F7FA]">
                    {s.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#3B82F6] mt-1">{s.subtitle}</p>
                  <div className="mt-3 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 py-1.5 font-mono text-[11px] text-[#A7B0BF]">
                    {s.text}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#A7B0BF]">{s.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#252C38]/60 flex items-center justify-between text-[11px] text-[#667085]">
                  <span className="group-hover:text-[#F5F7FA] transition-colors">
                    Etapa automatizada
                  </span>
                  {i < steps.length - 1 ? (
                    <ArrowRight
                      className="size-3.5 text-[#3B82F6] group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-[#22C55E] uppercase flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-[#22C55E]" /> Conversão
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Supporting Quote Banner */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-[16px] border border-[#252C38] bg-[#0E121A] p-6 sm:p-8 text-center max-w-3xl mx-auto">
            <p className="text-base sm:text-lg font-medium text-[#F5F7FA]">
              “Não construímos apenas presença digital. Construímos sistemas que trabalham para o
              seu negócio.”
            </p>
            <p className="mt-2 text-xs font-semibold tracking-wider text-[#3B82F6] uppercase">
              Agentes Digital • Sistemas Digitais & Inteligência Artificial
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
