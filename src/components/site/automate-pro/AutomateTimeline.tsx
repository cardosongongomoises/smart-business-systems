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
    name: "ENTRAR",
    icon: Compass,
    desc: "O cliente encontra o website.",
    detail: "Acesso via Google, redes sociais, anúncios ou indicação direta.",
  },
  {
    n: "02",
    name: "CONVERSAR",
    icon: MessageCircle,
    desc: "A IA inicia o atendimento.",
    detail: "Interação instantânea com mensagem amigável e contextual.",
  },
  {
    n: "03",
    name: "ENTENDER",
    icon: BrainCircuit,
    desc: "A IA identifica a necessidade.",
    detail: "Compreensão da dor, volume e segmento do negócio.",
  },
  {
    n: "04",
    name: "QUALIFICAR",
    icon: Filter,
    desc: "O sistema coleta as informações importantes.",
    detail: "Telefone, e-mail, interesse específico e orçamento disponível.",
  },
  {
    n: "05",
    name: "ORGANIZAR",
    icon: Layers,
    desc: "O lead é registrado no CRM.",
    detail: "Histórico completo catalogado e classificado com score de venda.",
  },
  {
    n: "06",
    name: "AGENDAR",
    icon: CalendarCheck,
    desc: "Quando aplicável, a reunião é marcada.",
    detail: "Data e hora selecionadas diretamente no calendário integrado.",
  },
  {
    n: "07",
    name: "ACOMPANHAR",
    icon: Send,
    desc: "O sistema executa o follow-up.",
    detail: "Disparo programado de lembretes para garantir a presença.",
  },
  {
    n: "08",
    name: "CONVERTER",
    icon: Trophy,
    desc: "A equipa assume quando necessário.",
    detail: "Negociação final focada em fechar o contrato com o lead quente.",
  },
];

export function AutomateTimeline() {
  return (
    <div id="automate-fluxo" className="py-20 sm:py-28 relative">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#60A5FA] uppercase">
              Ciclo Completo de Atendimento
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#F5F7FA] sm:text-4xl leading-tight">
              O fluxo estruturado do <span className="text-gradient">Automate Pro</span>
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-3 text-sm sm:text-base text-[#A7B0BF]">
              Cada etapa é automatizada. Do clique do visitante ao contrato assinado —{" "}
              <span className="text-[#F5F7FA] font-semibold">o sistema nunca para.</span>
            </p>
          </Reveal>
        </div>

        {/* 8-Step Timeline Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.n} delay={idx * 60}>
                <div className="glass-card group relative h-full rounded-2xl border border-[#252C38] bg-[#0E121A] p-5 sm:p-6 transition-all duration-300 hover:border-[#3B82F6]/50 hover:bg-[#151A23]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#3B82F6]">{step.n}</span>
                    <span className="flex size-8 items-center justify-center rounded-lg border border-[#252C38] bg-[#151A23] text-[#A7B0BF] transition-colors group-hover:text-[#F5F7FA]">
                      <Icon className="size-4" />
                    </span>
                  </div>

                  <h4 className="mt-4 text-sm font-extrabold uppercase tracking-wider text-[#F5F7FA]">
                    {step.name}
                  </h4>

                  <p className="mt-1.5 text-xs font-semibold text-[#60A5FA]">{step.desc}</p>

                  <p className="mt-2 text-[11px] text-[#A7B0BF] leading-relaxed">{step.detail}</p>

                  {/* Visual connector line indicator */}
                  <div className="mt-4 pt-3 border-t border-[#252C38]/60 flex items-center justify-between text-[10px] font-mono text-[#667085]">
                    <span>FASE 0{idx + 1}</span>
                    <span className="text-[#22C55E]">AUTOMATIZADO</span>
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
