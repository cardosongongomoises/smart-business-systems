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
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Encontrar",
    icon: Search,
    subtitle: "Visibilidade & Tráfego",
    text: "Website + Google + SEO local",
    desc: "Sua empresa é descoberta exatamente quando o potencial cliente procura pelos seus serviços.",
  },
  {
    title: "Confiar",
    icon: Shield,
    subtitle: "Autoridade Digital",
    text: "Design profissional + conteúdo + autoridade",
    desc: "Uma presença visual de alto nível que elimina dúvidas e posiciona sua marca como referência.",
  },
  {
    title: "Contactar",
    icon: MessageCircle,
    subtitle: "Canais Diretos",
    text: "WhatsApp + formulário + telefone",
    desc: "Pontos de contacto imediatos e sem atrito nos canais que o seu cliente mais utiliza.",
  },
  {
    title: "Atender",
    icon: Bot,
    subtitle: "Disponibilidade Total",
    text: "Agente de IA",
    desc: "Resposta instantânea em segundos, 24 horas por dia, 7 dias por semana, sem filas de espera.",
  },
  {
    title: "Qualificar",
    icon: Filter,
    subtitle: "Filtro Inteligente",
    text: "IA identifica necessidade e perfil",
    desc: "A IA compreende a demanda real, filtra curiosos e identifica clientes com perfil ideal.",
  },
  {
    title: "Agendar",
    icon: Calendar,
    subtitle: "Compromisso Marcado",
    text: "Calendário integrado",
    desc: "Agendamento automático sincronizado com a disponibilidade da sua equipa e lembretes.",
  },
  {
    title: "Converter",
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
      className="relative py-24 sm:py-32 bg-[#FFFFFF] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#D9531C]">03 · Pipeline integrado</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-bold text-[#101D35] sm:text-4xl text-balance">
              Transformamos o caminho do cliente num sistema contínuo.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-[65ch] text-base text-[#5B6B8C] sm:text-lg">
              Cada etapa é conectada com precisão para guiar o visitante desde a primeira pesquisa
              até a conversão em cliente real.
            </p>
          </Reveal>
        </div>

        {/* Pipeline Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <div className="group flex h-full flex-col justify-between rounded-[16px] border border-[#E7E3D9] bg-[#F5F3EE] p-6 transition-colors duration-200 hover:border-[#101D35]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-[8px] border border-[#E7E3D9] bg-[#FFFFFF] text-[#101D35] transition-colors group-hover:bg-[#101D35] group-hover:text-[#F5F3EE]">
                      <s.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-xs font-bold text-[#D9531C] tabular-nums">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-base font-bold uppercase tracking-wide text-[#101D35]">
                    {s.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#5B6B8C] mt-0.5">{s.subtitle}</p>
                  <p className="mt-3 text-xs font-medium text-[#101D35] border-t border-[#E7E3D9] pt-3">
                    {s.text}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#5B6B8C]">{s.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E7E3D9] flex items-center justify-between text-xs text-[#5B6B8C]">
                  <span>Etapa automatizada</span>
                  {i < steps.length - 1 ? (
                    <ArrowRight
                      className="size-3.5 text-[#101D35] group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-[#2E9E6B]">
                      <CheckCircle2 className="size-3.5" aria-hidden="true" />
                      Conversão
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Supporting Quote Banner */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] bg-[#101D35] p-7 sm:p-9 text-center text-[#F5F3EE]">
            <p className="font-heading text-base sm:text-xl font-semibold max-w-3xl mx-auto">
              “Não construímos apenas presença digital. Construímos sistemas que trabalham para o
              seu negócio.”
            </p>
            <p className="mt-3 lume-eyebrow text-[#F4C542]">
              Agentes Digital · Sistemas Digitais &amp; Inteligência Artificial
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
