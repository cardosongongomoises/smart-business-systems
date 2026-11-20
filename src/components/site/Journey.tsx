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
    title: "Encontra",
    icon: Search,
    subtitle: "Pesquisa no Google",
    text: "Website + Google + SEO local",
    desc: "O cliente encontra a sua empresa no momento exato em que procura pelo serviço.",
  },
  {
    title: "Confia",
    icon: Shield,
    subtitle: "Primeira Impressão",
    text: "Site claro + prova + oferta directa",
    desc: "Em vez de um site genérico, vê provas reais e percebe por que razão deve escolher a sua empresa.",
  },
  {
    title: "Contacta",
    icon: MessageCircle,
    subtitle: "Sem Atrito",
    text: "WhatsApp directo + formulário",
    desc: "Envia mensagem no canal que já usa todos os dias, sem formulários longos nem esperas.",
  },
  {
    title: "É atendido",
    icon: Bot,
    subtitle: "Em menos de 10s",
    text: "Resposta automática 24h",
    desc: "Recebe resposta imediata, mesmo à noite ou ao fim de semana, antes de pensar na concorrência.",
  },
  {
    title: "É qualificado",
    icon: Filter,
    subtitle: "Triagem Útil",
    text: "Necessidade, prazo e perfil",
    desc: "Dúvidas comuns ficam resolvidas logo ali e só quem tem interesse real segue para a sua equipa.",
  },
  {
    title: "Marca",
    icon: Calendar,
    subtitle: "Sem Vai-e-Vem",
    text: "Agenda integrada + lembretes",
    desc: "O próprio cliente escolhe o horário da reunião e recebe confirmação para não faltar.",
  },
  {
    title: "Fecha",
    icon: TrendingUp,
    subtitle: "Venda Acompanhada",
    text: "Histórico + seguimento + equipa",
    desc: "O seu vendedor recebe o contacto pronto com todo o contexto e ninguém cai no esquecimento.",
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
            <p className="lume-eyebrow text-[#D9531C]">03 · Do pedido ao fecho</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-bold text-[#101D35] sm:text-4xl text-balance">
              O caminho completo para nenhum contacto se perder pelo meio.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-[65ch] text-base text-[#5B6B8C] sm:text-lg">
              Desde o momento em que o cliente procura pelo seu serviço até se sentar consigo na
              reunião, cada passo fica ligado.
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
                  <span>Passo acompanhado</span>
                  {i < steps.length - 1 ? (
                    <ArrowRight
                      className="size-3.5 text-[#101D35] group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-[#2E9E6B]">
                      <CheckCircle2 className="size-3.5" aria-hidden="true" />
                      Cliente fechado
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
              &ldquo;Como fazemos: um assistente automático, treinado com a informação da sua
              empresa, atende e qualifica. Quando a conversa exige uma pessoa, passa para a sua
              equipa.&rdquo;
            </p>
            <p className="mt-3 lume-eyebrow text-[#F4C542]">Agentes Digital · Luanda, Angola</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
