import {
  Compass,
  MessageCircle,
  BrainCircuit,
  Filter,
  Layers,
  CalendarCheck,
  Send,
  Trophy,
} from "lucide-react";
import { Reveal } from "../Reveal";

const timelineSteps = [
  {
    n: "01",
    name: "Entrar",
    icon: Compass,
    desc: "O cliente encontra o website.",
    detail: "Acesso via Google, redes sociais, anúncios ou indicação direta.",
  },
  {
    n: "02",
    name: "Conversar",
    icon: MessageCircle,
    desc: "A IA inicia o atendimento.",
    detail: "Interação instantânea com mensagem contextual.",
  },
  {
    n: "03",
    name: "Entender",
    icon: BrainCircuit,
    desc: "A IA identifica a necessidade.",
    detail: "Compreensão da necessidade, volume e segmento do negócio.",
  },
  {
    n: "04",
    name: "Qualificar",
    icon: Filter,
    desc: "Coleta informações chave.",
    detail: "Telefone, e-mail, interesse específico e orçamento disponível.",
  },
  {
    n: "05",
    name: "Organizar",
    icon: Layers,
    desc: "O lead é registado no CRM.",
    detail: "Histórico completo catalogado e classificado.",
  },
  {
    n: "06",
    name: "Agendar",
    icon: CalendarCheck,
    desc: "A reunião é marcada.",
    detail: "Data e hora selecionadas diretamente no calendário integrado.",
  },
  {
    n: "07",
    name: "Acompanhar",
    icon: Send,
    desc: "O sistema executa o follow-up.",
    detail: "Disparo programado de lembretes para garantir a presença.",
  },
  {
    n: "08",
    name: "Converter",
    icon: Trophy,
    desc: "A equipa assume o fecho.",
    detail: "Negociação final focada em fechar o contrato com o lead qualificado.",
  },
];

export function AutomateTimeline() {
  return (
    <div id="automate-fluxo" className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Ciclo completo de atendimento</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-2xl font-bold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              O fluxo estruturado do Automate Pro
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-3 max-w-[65ch] text-sm sm:text-base text-[#B8C0D0]">
              Cada etapa é automatizada. Do clique do visitante ao contrato assinado —{" "}
              <strong className="text-[#F5F3EE]">o sistema nunca para.</strong>
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.n} delay={idx * 45}>
                <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 transition-colors duration-200 hover:border-[#F36B32]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-bold text-[#F36B32] tabular-nums">
                        {step.n}
                      </span>
                      <span className="flex size-8 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#F5F3EE]">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                    </div>

                    <h4 className="mt-4 font-heading text-sm font-bold uppercase tracking-wider text-[#F5F3EE]">
                      {step.name}
                    </h4>

                    <p className="mt-1.5 text-xs font-semibold text-[#F4C542]">{step.desc}</p>

                    <p className="mt-2 text-xs text-[#B8C0D0] leading-relaxed">{step.detail}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#2A3D63] flex items-center justify-between text-[11px] text-[#B8C0D0]">
                    <span className="tabular-nums">Fase {step.n}</span>
                    <span className="font-semibold text-[#2E9E6B]">Automatizado</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
