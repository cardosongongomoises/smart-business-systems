import { Bot, MessageSquare, CalendarCheck, Database, UserCog } from "lucide-react";
import { Reveal } from "./Reveal";

const branches = [
  {
    icon: MessageSquare,
    from: "Pergunta frequente / catálogo",
    to: "Resposta imediata via IA",
    human: false,
  },
  {
    icon: CalendarCheck,
    from: "Solicitação de reunião",
    to: "Agendamento no calendário",
    human: false,
  },
  {
    icon: Database,
    from: "Lead comercial qualificado",
    to: "Registo e aviso no CRM",
    human: false,
  },
  {
    icon: UserCog,
    from: "Negociação complexa ou exceção",
    to: "Encaminhamento ao consultor",
    human: true,
  },
];

export function HumanControl() {
  return (
    <section
      id="controlo"
      className="py-20 sm:py-28 bg-[#080A0F] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase mb-4">
            Governança & Supervisão Humana
          </span>
          <h2 className="text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Operação automatizada com total controlo humano.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#A7B0BF]">
            A Inteligência Artificial atua com parâmetros corporativos definidos: responde o que é
            pré-autorizado e transfere imediatamente para a equipa sempre que necessário.
            Você mantém o controlo total — a IA não decide por si. Pode rever todas as conversas a qualquer momento.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 rounded-[16px] p-7 border border-[#252C38] bg-[#151A23]">
            <div className="flex items-center justify-between border-b border-[#252C38] pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#3B82F6] text-white">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#F5F7FA]">
                    Roteamento Inteligente de Decisões
                  </p>
                  <p className="text-xs text-[#A7B0BF]">
                    Regras de triagem e encaminhamento seguro
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#22C55E]">
                <span className="size-2 rounded-full bg-[#22C55E]" /> SUPERVISÃO ATIVA
              </span>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {branches.map((b, i) => (
                <Reveal as="li" key={b.from} delay={i * 80}>
                  <div
                    className={`h-full rounded-[12px] border p-5 transition-[border-color,background-color] ${
                      b.human
                        ? "border-[#3B82F6]/40 bg-[#3B82F6]/10"
                        : "border-[#252C38] bg-[#0E121A] hover:border-[#3B82F6]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <b.icon
                        className={`size-5 ${b.human ? "text-[#3B82F6]" : "text-[#A7B0BF]"}`}
                        aria-hidden="true"
                      />
                      {b.human && (
                        <span className="text-[10px] font-mono font-bold text-[#3B82F6] tracking-wider uppercase">
                          ↗ ATENDENTE
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-xs font-semibold text-[#F5F7FA]">{b.from}</p>
                    <div className="mt-4 pt-3 border-t border-[#252C38]/60 flex items-center gap-1 text-[11px] text-[#A7B0BF]">
                      <span className="text-[#3B82F6] font-bold">→</span>
                      <span>{b.to}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-[#A7B0BF]">
              A IA filtra e resolve <strong className="text-[#F5F7FA]">80% do fluxo repetitivo</strong> —
              sem atrasos, sem esquecimentos, sem horário de expediente.{" "}
              <span className="font-semibold text-[#F5F7FA]">
                A sua equipa recebe os leads prontos para fechar contrato.
              </span>
            </p>
            <a
              href="#contacto"
              className="shrink-0 text-xs font-semibold text-[#3B82F6] hover:underline"
            >
              Configurar regras da sua empresa →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
