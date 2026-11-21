import { Reveal } from "./Reveal";
import { DEMO_CTA_LABEL } from "@/lib/site-config";
import { ArrowRight, MessageSquare, CalendarCheck, Users, Smile, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

const successCards = [
  {
    icon: MessageSquare,
    title: "Cada pergunta tem resposta.",
    text: "Serviços, preços e horários que o seu espaço autorizou, apresentados com clareza.",
  },
  {
    icon: CalendarCheck,
    title: "Cada marcação fica registada.",
    text: "A cliente escolhe um horário disponível e a marcação entra na sua agenda.",
  },
  {
    icon: Users,
    title: "Há sempre uma pessoa quando é preciso.",
    text: "A conversa passa para a sua equipa sempre que a situação o exige.",
  },
  {
    icon: Smile,
    title: "A equipa volta a cuidar de quem está presente.",
    text: "Menos perguntas repetidas, menos interrupções, mais tranquilidade nos dias cheios.",
  },
];

const guidePillars = [
  "Um sistema ligado à agenda do espaço para consultar horários e registar a marcação.",
  "Testes antes de ativar: preços corretos, sem marcações duplicadas, passagem para uma pessoa.",
  "Acompanhamento mensal e ajustes.",
];

export function Benefits() {
  return (
    <section
      id="como-fica"
      className="relative bg-[#F5F3EE] text-[#101D35] py-14 sm:py-20 lg:py-28 scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        {/* Section 4: Como fica a sua recepção */}
        <Reveal>
          <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="lume-eyebrow text-[#D9531C]">02 · Como fica a sua recepção</p>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-[#101D35] leading-[1.15] text-balance">
                Uma recepção organizada, mesmo quando a equipa está ocupada.
              </h2>
            </div>

            <a
              href="#demonstracao-final"
              className="lume-btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              <span>{DEMO_CTA_LABEL}</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-10 sm:mt-12 grid gap-px bg-[#E7E3D9] rounded-[16px] border border-[#E7E3D9] overflow-hidden sm:grid-cols-2">
            {successCards.map((card, i) => (
              <div
                key={card.title}
                className="group flex flex-col justify-between bg-[#FFFFFF] p-5 sm:p-7 lg:p-9 transition-colors duration-200 hover:bg-[#F5F3EE]/50"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F4C542] shrink-0 transition-transform duration-200 group-hover:scale-105">
                    <card.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-xs font-bold text-[#5B6B8C] tabular-nums transition-colors duration-200 group-hover:text-[#D9531C]">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-heading text-lg font-bold text-[#101D35]">{card.title}</h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#5B6B8C] max-w-[46ch]">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Section 5: O guia — Hairline split inside Navy panel, zero nested boxes */}
        <Reveal delay={140}>
          <div className="mt-10 sm:mt-14 overflow-hidden rounded-[16px] border border-[#2A3D63] bg-[#101D35] text-[#F5F3EE]">
            <div className="grid md:grid-cols-[1.1fr_0.9fr] divide-y md:divide-y-0 md:divide-x divide-[#2A3D63]">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="lume-eyebrow text-[#F4C542]">O guia</p>
                <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-bold text-[#F5F3EE] text-balance">
                  Sabemos como é um dia de recepção cheia.
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-[1.68] text-[#B8C0D0] max-w-[58ch]">
                  A Agentes Digital implementa recepções digitais para espaços de estética. Não lhe
                  vendemos uma ferramenta para configurar sozinho. Montamos o atendimento à medida
                  do seu espaço: serviços, preços, horários, profissionais e regras. Ligamo-lo à sua
                  agenda, testamos tudo e acompanhamos o resultado.
                </p>
                <div className="mt-5">
                  <Link
                    to="/implementacao-ia-empresas-angola"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#F4C542] underline-offset-4 hover:underline"
                  >
                    <span>Guia de implementação de IA para empresas em Angola</span>
                    <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="bg-[#1A2A4A]/65 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <ul className="divide-y divide-[#2A3D63]">
                  {guidePillars.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0 text-sm text-[#F5F3EE] leading-relaxed"
                    >
                      <CheckCircle2
                        className="size-4 mt-1 shrink-0 text-[#2E9E6B]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
