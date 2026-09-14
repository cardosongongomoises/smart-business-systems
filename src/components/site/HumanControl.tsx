import { Bot, MessageSquare, CalendarCheck, Database, UserCog } from "lucide-react";
import { Reveal } from "./Reveal";

const branches = [
  {
    icon: MessageSquare,
    from: "Pergunta frequente / catálogo",
    to: "Resposta em 8 segundos",
    result: "Lead satisfeito, curiosidade despertada",
    human: false,
  },
  {
    icon: CalendarCheck,
    from: "Solicitação de reunião",
    to: "Reunião agendada automaticamente",
    result: "Agendamento sem tocar no telemóvel",
    human: false,
  },
  {
    icon: Database,
    from: "Lead comercial qualificado",
    to: "Registo no CRM + alerta à equipa",
    result: "Zero leads perdos, rastreabilidade total",
    human: false,
  },
  {
    icon: UserCog,
    from: "Negociação complexa ou exceção",
    to: "Encaminhamento ao consultor",
    result: "Equip focada no que fecha negócios",
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
            Controlo Humano Total
          </span>
          <h2 className="text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            A IA fecha negócios. A sua equipa{" "}
            <span className="text-[#22C55E]">foca no que importa</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#A7B0BF]">
            O sistema resolve 80% do fluxo repetitivo — sem atrasos, sem esquecimentos, sem
            horário de expediente. A sua equipa recebe apenas leads qualificados, prontos para
            fechar contrato. E mantém controlo total sobre cada conversa.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 rounded-[16px] p-7 border border-[#252C38] bg-[#151A23]">
            <div className="flex items-center justify-between border-b border-[#252C38] pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#22C55E] text-white">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#F5F7FA]">
                    Roteamento Inteligente de Decisões
                  </p>
                  <p className="text-xs text-[#A7B0BF]">
                    Cada lead segue o caminho certo — automaticamente
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
                        ? "border-[#22C55E]/40 bg-[#22C55E]/10"
                        : "border-[#252C38] bg-[#0E121A] hover:border-[#22C55E]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <b.icon
                        className={`size-5 ${b.human ? "text-[#22C55E]" : "text-[#A7B0BF]"}`}
                        aria-hidden="true"
                      />
                      {b.human && (
                        <span className="text-[10px] font-mono font-bold text-[#22C55E] tracking-wider uppercase">
                          ↗ CONSULTOR
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-xs font-semibold text-[#F5F7FA]">{b.from}</p>
                    <div className="mt-2 pt-2 border-t border-[#252C38]/60">
                      <div className="flex items-center gap-1 text-[11px] text-[#A7B0BF]">
                        <span className="text-[#22C55E] font-bold">→</span>
                        <span>{b.to}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-[#22C55E] font-medium">
                        Resultado: {b.result}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 rounded-[12px] border border-[#22C55E]/30 bg-[#22C55E]/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-[#A7B0BF]">
              A IA filtra e resolve <strong className="text-[#F5F7FA]">80% do fluxo repetitivo</strong> —
              sem atrasos, sem esquecimentos, sem horário de expediente.{" "}
              <span className="font-semibold text-[#22C55E]">
                A sua equipa recebe os leads prontos para fechar contrato.
              </span>
            </p>
            <a
              href="#contacto"
              className="shrink-0 text-xs font-semibold text-[#22C55E] hover:underline"
            >
              Configurar regras da sua empresa →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
