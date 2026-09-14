import { Bot, User, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const timeline = [
  {
    tag: "09:41 • Novo contacto",
    text: "“Boa tarde, gostaria de marcar uma reunião com a direção comercial.”",
    ia: false,
  },
  {
    tag: "Agente Digital IA",
    text: "“Olá! Com certeza. Será um prazer auxiliá-lo. Qual solução ou serviço da Agentes Digital procura?”",
    ia: true,
  },
  {
    tag: "Cliente",
    text: "“Consultoria de automação e implantação de website com IA.”",
    ia: false,
  },
  {
    tag: "Agente Digital IA",
    text: "“Excelente escolha. Consultei a disponibilidade dos nossos especialistas e temos vagas amanhã às 10h ou às 15h. Qual horário é mais conveniente?”",
    ia: true,
  },
];

export function LiveDemo() {
  return (
    <section
      id="demonstracao"
      className="relative py-20 sm:py-28 bg-[#0E121A] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
              Demonstração Operacional
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
              Veja a <span className="text-gradient">Agentes Digital</span> trabalhando na prática
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base text-[#A7B0BF]">
              Fluxo real de qualificação e agendamento — sem simulação. Assim o seu cliente seria atendido amanhã de manhã.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          {/* Timing Callout */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-3 py-1 rounded-full">
              Tempo total: &lt;30 segundos
            </span>
          </div>

          {timeline.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div>
                <div
                  className={`rounded-[16px] p-5 border transition-all duration-200 ${
                    t.ia
                      ? "ml-auto max-w-xl border-[#3B82F6]/30 bg-[#151A23] shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                      : "mr-auto max-w-xl border-[#252C38] bg-[#151A23]"
                  }`}
                >
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase">
                    {t.ia ? (
                      <span className="flex items-center gap-1.5 text-[#3B82F6]">
                        <Bot className="size-3.5" aria-hidden="true" /> {t.tag}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[#A7B0BF]">
                        <User className="size-3.5" aria-hidden="true" /> {t.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#F5F7FA]">{t.text}</p>
                </div>
                {i < timeline.length - 1 && (
                  <div className="mx-auto my-1.5 h-4 w-px bg-[#252C38]" />
                )}
              </div>
            </Reveal>
          ))}

          <Reveal delay={450}>
            <div className="mt-4 mx-auto flex max-w-md items-center justify-center gap-2.5 rounded-[12px] border border-[#22C55E]/30 bg-[#22C55E]/10 px-6 py-4">
              <CheckCircle2 className="size-4 text-[#22C55E]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#22C55E]">
                Reunião agendada & confirmada no CRM
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <p className="mt-12 flex items-center justify-center gap-2 text-center text-xs sm:text-sm text-[#A7B0BF]">
            <Bot className="size-4 text-[#3B82F6]" aria-hidden="true" />
            Não construímos apenas presença digital. Construímos sistemas que trabalham 24/7 para o seu
            negócio — enquanto a sua equipa foca em fechar negócios. Cada conversa é uma oportunidade capturada.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
