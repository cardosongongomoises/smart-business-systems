import { Reveal } from "./Reveal";
import {
  ArrowRight,
  MessageSquare,
  CalendarCheck,
  BellRing,
  Users,
  ShieldCheck,
} from "lucide-react";
import { DEMO_CTA_LABEL } from "@/lib/site-config";

const solutions = [
  {
    icon: MessageSquare,
    problem: "Perguntas repetidas.",
    description:
      "Registamos os seus serviços, preços e horários. A recepção digital responde apenas com o que o espaço autorizou. A equipa deixa de repetir as mesmas respostas.",
  },
  {
    icon: CalendarCheck,
    problem: "Marcações feitas à mão.",
    description:
      "Liga-se à sua agenda, mostra os horários disponíveis e regista a marcação escolhida. Menos conversas para marcar uma sessão e menos erros de registo.",
  },
  {
    icon: BellRing,
    problem: "Clientes sem confirmação.",
    description: "Confirma a marcação depois de registada, para a cliente saber que ficou marcada.",
  },
  {
    icon: Users,
    problem: "Atendimento que depende de uma só pessoa.",
    description:
      "Definimos as regras de atendimento e a passagem para a equipa, e formamos as pessoas que vão trabalhar com ele.",
  },
  {
    icon: ShieldCheck,
    problem: "Receio de respostas erradas.",
    description:
      "Testamos preços, horários, marcações e situações inesperadas antes de ativar. Não dá aconselhamento clínico e passa a conversa a uma pessoa quando necessário.",
  },
];

export function Services() {
  return (
    <section
      id="servicos"
      className="relative bg-[#F5F3EE] text-[#101D35] py-24 sm:py-32 border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="lume-eyebrow text-[#D9531C]">03 · A solução</p>
              <h2 className="mt-3 font-heading text-3xl leading-[1.15] font-bold text-[#101D35] sm:text-4xl text-balance">
                Recepção Inteligente: o atendimento do seu WhatsApp, organizado.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#5B6B8C] leading-relaxed">
              Para espaços de estética não médica com pedidos frequentes pelo WhatsApp, vários
              serviços e uma agenda digital ou compatível.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item, i) => {
            const isWideSafeguard = i === 4;
            return (
              <Reveal
                key={item.problem}
                delay={i * 60}
                className={isWideSafeguard ? "md:col-span-2" : ""}
              >
                <div
                  className={`group flex h-full flex-col justify-between rounded-[16px] border p-7 sm:p-8 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 ${
                    isWideSafeguard
                      ? "border-[#2A3D63] bg-[#101D35] text-[#F5F3EE] hover:border-[#F36B32]/70"
                      : "border-[#E7E3D9] bg-[#FFFFFF] text-[#101D35] hover:border-[#101D35]/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`flex size-11 items-center justify-center rounded-[10px] shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                        isWideSafeguard
                          ? "bg-[#1A2A4A] border border-[#2A3D63] text-[#F4C542]"
                          : "bg-[#101D35] text-[#F36B32]"
                      }`}
                    >
                      <item.icon className="size-5" aria-hidden="true" />
                    </div>
                    <span
                      className={`font-heading text-xs font-extrabold tabular-nums ${
                        isWideSafeguard ? "text-[#F4C542]" : "text-[#5B6B8C]"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <div
                    className={
                      isWideSafeguard
                        ? "mt-6 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:items-center"
                        : "mt-6"
                    }
                  >
                    <h3
                      className={`font-heading text-lg sm:text-xl font-bold ${
                        isWideSafeguard ? "text-[#F5F3EE]" : "text-[#101D35]"
                      }`}
                    >
                      {item.problem}
                    </h3>

                    <p
                      className={`mt-2.5 text-sm sm:text-base leading-relaxed ${
                        isWideSafeguard ? "text-[#B8C0D0] lg:mt-0" : "text-[#5B6B8C]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={160}>
          <div className="mt-12 flex justify-start">
            <a
              href="#demonstracao-final"
              className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <span>{DEMO_CTA_LABEL}</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
