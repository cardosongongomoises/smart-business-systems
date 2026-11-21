import {
  MessageSquare,
  CalendarClock,
  NotebookPen,
  Split,
  UserX,
  Clock,
  CopyX,
  Smartphone,
} from "lucide-react";
import { Reveal } from "./Reveal";

const recognitionItems = [
  {
    icon: MessageSquare,
    title: "As mesmas perguntas, todos os dias.",
    text: "Preços dos tratamentos, horários disponíveis, localização e condições de atendimento.",
  },
  {
    icon: CalendarClock,
    title: "Horários consultados e confirmados à mão.",
    text: "Trocas longas de mensagens para verificar a disponibilidade de cada profissional.",
  },
  {
    icon: NotebookPen,
    title: "Marcações que dependem da memória de alguém.",
    text: "Registos espalhados entre telemóvel, papel e conversas abertas.",
  },
  {
    icon: Split,
    title: "Uma recepção que não consegue estar em dois sítios ao mesmo tempo.",
    text: "Quando atende quem entra no espaço, o WhatsApp fica à espera.",
  },
];

const stakesItems = [
  {
    icon: UserX,
    text: "A cliente que não recebe resposta pode escolher outro espaço.",
  },
  {
    icon: Clock,
    text: "A equipa gasta o dia em tarefas que não são cuidar de clientes.",
  },
  {
    icon: CopyX,
    text: "As marcações ficam sujeitas a erros e duplicações.",
  },
  {
    icon: Smartphone,
    text: "O proprietário continua preso ao telemóvel.",
  },
];

export function Problem() {
  return (
    <section
      id="problema"
      className="relative py-14 sm:py-20 lg:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        <Reveal>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="lume-eyebrow text-[#D9531C]">01 · O problema</p>
              <h2 className="mt-3 font-heading text-3xl leading-[1.14] font-bold text-[#101D35] sm:text-4xl text-balance">
                Atender bem quem está presente. Responder bem a quem escreve. Ao mesmo tempo.
              </h2>
            </div>

            <div className="space-y-3 text-base leading-[1.65] text-[#5B6B8C]">
              <p>Num dia movimentado, a recepção atende quem entra e o WhatsApp não pára.</p>
              <p className="text-[#101D35] font-semibold">
                Perguntas sobre preços. Horários por confirmar. Pedidos de marcação.
              </p>
              <p>
                A equipa responde quando pode. Algumas mensagens ficam para depois. E ninguém quer
                que uma cliente espere, nem que outra fique no balcão sem atenção.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Reconhece isto? — Architectural hairline grid */}
        <Reveal delay={100}>
          <div className="mt-14">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#101D35]">
              Reconhece isto?
            </h3>
            <div className="mt-6 grid gap-px bg-[#E7E3D9] rounded-[16px] border border-[#E7E3D9] overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
              {recognitionItems.map((item, i) => (
                <div
                  key={item.title}
                  className="group flex h-full flex-col justify-between bg-[#FFFFFF] p-5 sm:p-6 lg:p-7 transition-colors duration-200 hover:bg-[#F5F3EE]/50"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-10 items-center justify-center rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] text-[#D9531C] transition-transform duration-200 group-hover:scale-105">
                        <item.icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-xs font-bold text-[#5B6B8C] tabular-nums transition-colors duration-200 group-hover:text-[#D9531C]">
                        0{i + 1}
                      </span>
                    </div>
                    <h4 className="mt-6 font-heading text-base font-semibold text-[#101D35] leading-snug">
                      {item.title}
                    </h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#5B6B8C]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Section 3: O que está em jogo — Clean 2-column hairline ledger */}
        <Reveal delay={140}>
          <div className="mt-12 sm:mt-16 pt-10 sm:pt-14 border-t border-[#E7E3D9] grid gap-8 sm:gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div>
              <p className="lume-eyebrow text-[#D9531C]">O que está em jogo</p>
              <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-bold text-[#101D35] leading-[1.2] text-balance">
                Quando o WhatsApp fica à espera, o espaço paga o preço.
              </h3>
              <p className="mt-5 text-sm sm:text-base font-semibold text-[#D9531C] leading-relaxed">
                Não é falta de esforço. É um processo que ainda depende de conversas manuais.
              </p>
            </div>

            <div className="divide-y divide-[#E7E3D9] border-y border-[#E7E3D9]">
              {stakesItems.map((item, idx) => (
                <Reveal key={item.text} delay={idx * 65} variant="left">
                  <div className="group flex items-start gap-4 py-4 sm:py-5 transition-transform duration-200 hover:translate-x-1">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-[#D64545]/30 bg-[#FFFFFF] text-[#D64545] transition-transform duration-200 group-hover:scale-105">
                      <item.icon className="size-4" aria-hidden="true" />
                    </span>
                    <p className="text-sm sm:text-base text-[#101D35] leading-relaxed pt-1">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
