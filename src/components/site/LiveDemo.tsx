import { Bot, User, CheckCircle2, XCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const timeline = [
  {
    tag: "09:41 · Novo contacto",
    text: "Boa tarde, gostaria de marcar uma reunião com a direção comercial.",
    ia: false,
  },
  {
    tag: "Agente Digital IA",
    text: "Olá! Com certeza. Será um prazer auxiliá-lo. Qual solução ou serviço da Agentes Digital procura?",
    ia: true,
  },
  {
    tag: "Cliente",
    text: "Consultoria de automação e implantação de website com IA.",
    ia: false,
  },
  {
    tag: "Agente Digital IA",
    text: "Excelente escolha. Consultei a disponibilidade dos nossos especialistas e temos vagas amanhã às 10h ou às 15h. Qual horário é mais conveniente?",
    ia: true,
  },
];

export function LiveDemo() {
  return (
    <section
      id="demonstracao"
      className="py-20 sm:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="lume-eyebrow text-[#D9531C]">Demonstração ao Vivo</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
              Assim o seu cliente seria <span className="text-[#2E9E6B]">atendido e agendado</span>{" "}
              amanhã de manhã
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-base text-[#5B6B8C] leading-[1.65]">
              Este não é um exemplo fictício — é exactamente o que acontece no seu WhatsApp quando
              um lead entra. Resposta em 8 segundos. Qualificação automática. Reunião agendada sem
              ninguém tocar no telemóvel.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          <Reveal>
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2E9E6B]/30 bg-[#FFFFFF] px-4 py-1.5 font-heading text-xs font-bold text-[#2E9E6B] tabular-nums">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Tempo total: &lt;30 segundos · Reunião confirmada
              </span>
            </div>
          </Reveal>

          {timeline.map((t, i) => (
            <Reveal key={i} delay={i * 70}>
              <div>
                <div
                  className={`rounded-[16px] p-5 border ${
                    t.ia
                      ? "ml-auto max-w-xl border-[#2A3D63] bg-[#101D35] text-[#F5F3EE]"
                      : "mr-auto max-w-xl border-[#E7E3D9] bg-[#FFFFFF] text-[#101D35]"
                  }`}
                >
                  <div className="flex items-center gap-2 text-[11px] font-heading font-bold tracking-[0.12em] uppercase">
                    {t.ia ? (
                      <span className="flex items-center gap-1.5 text-[#F4C542]">
                        <Bot className="size-3.5" aria-hidden="true" /> {t.tag}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[#5B6B8C]">
                        <User className="size-3.5" aria-hidden="true" /> {t.tag}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      t.ia ? "text-[#F5F3EE]" : "text-[#101D35]"
                    }`}
                  >
                    {t.text}
                  </p>
                </div>
                {i < timeline.length - 1 && (
                  <div className="mx-auto my-1.5 h-4 w-px bg-[#E7E3D9]" />
                )}
              </div>
            </Reveal>
          ))}

          <Reveal delay={280}>
            <div className="mt-4 mx-auto flex max-w-md items-center justify-center gap-2.5 rounded-[12px] border border-[#2E9E6B] bg-[#FFFFFF] px-6 py-4">
              <CheckCircle2 className="size-4 text-[#2E9E6B] shrink-0" aria-hidden="true" />
              <p className="font-heading text-xs font-bold tracking-[0.1em] uppercase text-[#101D35]">
                Reunião agendada &amp; confirmada no CRM
              </p>
            </div>
          </Reveal>
        </div>

        {/* Comparison Callout */}
        <Reveal delay={180}>
          <div className="mt-12 max-w-3xl mx-auto rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="lume-eyebrow text-[#D64545]">Sem o Motor ATQA</p>
                <ul className="mt-4 space-y-2.5 text-sm text-[#5B6B8C]">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Lead envia mensagem → ninguém responde</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Passam 2h → lead já foi para a concorrência</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Ninguém sabe que o lead existiu</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-[#E7E3D9] sm:pt-0 sm:border-t-0 sm:border-l sm:pl-6">
                <p className="lume-eyebrow text-[#2E9E6B]">Com o Motor ATQA</p>
                <ul className="mt-4 space-y-2.5 text-sm text-[#101D35]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>Lead envia mensagem → resposta em 8 segundos</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>Qualificado automaticamente → reunião agendada</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>Cada lead rastreável no CRM — zero perdas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-[#5B6B8C]">
            <Bot className="size-4 text-[#D9531C]" aria-hidden="true" />
            Cada conversa é uma oportunidade capturada — não um lead perdido.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
