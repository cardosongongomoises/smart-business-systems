import { useState } from "react";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./MotionPrimitives";
import { whatsappLink } from "@/lib/site-config";
import { ArrowRight, Settings2, CalendarCheck, Receipt, Clock } from "lucide-react";

const investmentPillars = [
  {
    icon: Settings2,
    title: "Implementação",
    text: "Diagnóstico, configuração, ligação à agenda, testes, ativação e formação da equipa.",
  },
  {
    icon: CalendarCheck,
    title: "Acompanhamento mensal",
    text: "Ajustes e suporte dentro do que foi contratado.",
  },
  {
    icon: Receipt,
    title: "Custos de plataformas externas",
    text: "Apresentados à parte, discriminados sem surpresas.",
  },
];

const minuteOptions = [3, 5, 8];

export function Pricing() {
  const [dailyMessages, setDailyMessages] = useState(25);
  const [minutesPerChat, setMinutesPerChat] = useState(5);

  const weeklyChats = dailyMessages * 6;
  const monthlyHours = Math.round((dailyMessages * minutesPerChat * 26) / 60);

  const proposalHref = whatsappLink(
    `Olá, vi o site da Agentes Digital. Estimo cerca de ${dailyMessages} pedidos por dia no WhatsApp (~${monthlyHours} horas por mês) e gostaria de pedir uma proposta para o meu espaço.`,
  );

  return (
    <section
      id="investimento"
      className="py-14 sm:py-20 lg:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div className="min-w-0">
              <p className="lume-eyebrow text-[#D9531C]">06 · Investimento</p>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
                Antes de falar de preço, medimos o que o WhatsApp consome hoje no seu espaço.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
              Medimos o tempo e o trabalho que o atendimento exige agora. O investimento só faz
              sentido se esse valor estiver claro para si.
            </p>
          </div>
        </Reveal>

        {/* Interactive Arithmetic Estimator (Zero fake claims, purely user's own numbers) */}
        <Reveal delay={70}>
          <div className="mt-8 sm:mt-10 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 sm:p-7 lg:p-8">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#101D35] text-[#F4C542] shrink-0">
                    <Clock className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#101D35]">
                      Quanto tempo o WhatsApp ocupa hoje à sua equipa?
                    </h3>
                    <p className="text-xs text-[#5B6B8C]">
                      Ajuste os dois valores para estimar a carga atual antes do diagnóstico.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#101D35]">
                    <label htmlFor="daily-messages-range">
                      Pedidos de informação e marcação por dia
                    </label>
                    <span className="font-heading font-extrabold text-[#D9531C] tabular-nums">
                      {dailyMessages} / dia
                    </span>
                  </div>
                  <input
                    id="daily-messages-range"
                    type="range"
                    min={10}
                    max={80}
                    step={5}
                    value={dailyMessages}
                    onChange={(e) => setDailyMessages(Number(e.target.value))}
                    className="mt-2.5 h-2 w-full cursor-pointer accent-[#F36B32] rounded-lg bg-[#E7E3D9]"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-[#5B6B8C] tabular-nums">
                    <span>10 pedidos/dia</span>
                    <span>45 pedidos/dia</span>
                    <span>80 pedidos/dia</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#101D35]">
                    Tempo médio por atendimento manual (responder, ver agenda e confirmar)
                  </p>
                  <div
                    className="mt-2.5 grid grid-cols-3 gap-2.5"
                    role="group"
                    aria-label="Minutos médios por atendimento"
                  >
                    {minuteOptions.map((mins) => {
                      const active = minutesPerChat === mins;
                      return (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setMinutesPerChat(mins)}
                          aria-pressed={active}
                          className={`min-h-[40px] rounded-[8px] border px-3 py-2 font-heading text-xs sm:text-sm font-bold tabular-nums transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] ${
                            active
                              ? "border-[#101D35] bg-[#101D35] text-[#F5F3EE]"
                              : "border-[#E7E3D9] bg-[#F5F3EE] text-[#101D35] hover:border-[#101D35]/50"
                          }`}
                        >
                          {mins} min
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-[12px] border border-[#E7E3D9] bg-[#F5F3EE] p-6">
                <p className="font-heading text-xs font-bold text-[#5B6B8C]">
                  Leitura estimada para 26 dias de atendimento
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 border-y border-[#E7E3D9] py-5">
                  <div>
                    <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tabular-nums">
                      <AnimatedCounter value={monthlyHours} suffix="h" />
                    </p>
                    <p className="mt-1 text-xs text-[#5B6B8C]">por mês no WhatsApp</p>
                  </div>
                  <div>
                    <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#D9531C] tabular-nums">
                      <AnimatedCounter value={weeklyChats} />
                    </p>
                    <p className="mt-1 text-xs text-[#5B6B8C]">atendimentos por semana</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[#5B6B8C]">
                  Estimativa aritmética calculada apenas com os valores acima. Validamos o número
                  real do seu espaço durante o diagnóstico.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 grid grid-cols-1 gap-px bg-[#E7E3D9] rounded-[16px] border border-[#E7E3D9] overflow-hidden md:grid-cols-3">
            {investmentPillars.map((item, i) => (
              <div
                key={item.title}
                className="group flex h-full flex-col justify-between bg-[#FFFFFF] p-5 sm:p-6 lg:p-8 transition-colors duration-200 hover:bg-[#F5F3EE]/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F4C542] shrink-0 transition-transform duration-200 group-hover:scale-105">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-xs font-bold text-[#5B6B8C] tabular-nums transition-colors duration-200 group-hover:text-[#D9531C]">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-heading text-lg font-bold text-[#101D35]">{item.title}</h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#5B6B8C]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-8 lg:p-10 text-[#F5F3EE] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#F4C542]">
                Quando há várias unidades, várias agendas ou integrações especiais, o valor é
                ajustado.
              </p>
              <h3 className="mt-2 font-heading text-xl sm:text-2xl font-extrabold text-[#F5F3EE]">
                Receba uma proposta com os valores para o seu espaço.
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#B8C0D0] leading-relaxed">
                Após avaliarmos a sua agenda, os serviços e o volume de pedidos no diagnóstico,
                enviamos uma proposta clara com implementação, mensalidade e custos externos à
                parte.
              </p>
            </div>

            <a
              href={proposalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="lume-btn-secondary-dark shrink-0 inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap"
            >
              <span>Pedir proposta para o meu espaço</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
