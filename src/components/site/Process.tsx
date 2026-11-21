import { ArrowRight, CalendarCheck, Eye, FileCheck2, Receipt, Users, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { DEMO_CTA_LABEL } from "@/lib/site-config";

const steps = [
  {
    n: "01",
    title: "Diagnóstico do atendimento.",
    text: "Falamos consigo e percebemos como funcionam hoje o WhatsApp e a agenda: quem responde, que perguntas se repetem, como se consultam os horários.",
  },
  {
    n: "02",
    title: "Configuramos, ligamos e testamos.",
    text: "Registamos os seus serviços, preços e horários, ligamos à agenda e testamos consultas, marcações e situações inesperadas antes de ativar.",
  },
  {
    n: "03",
    title: "Ativamos e acompanhamos.",
    text: "Formamos a equipa, ativamos e acompanhamos todos os meses, com ajustes dentro do que ficou contratado.",
  },
];

const trustPillars = [
  {
    icon: Eye,
    title: "Vê a recepção a funcionar.",
    text: "Na demonstração, a marcação é feita e registada numa agenda de teste.",
  },
  {
    icon: FileCheck2,
    title: "Dizemos o que não prometemos.",
    text: "Não garantimos mais marcações nem mais faturação. Não substituímos a sua equipa. Não dispensamos supervisão. Prometemos um atendimento mais organizado e um processo testado.",
  },
  {
    icon: Receipt,
    title: "Os custos externos vêm à parte.",
    text: "Plataformas como o WhatsApp têm custos próprios. Apresentamo-los discriminados.",
  },
  {
    icon: Users,
    title: "Há sempre uma pessoa por perto.",
    text: "A cliente pode pedir atendimento humano a qualquer momento.",
  },
  {
    icon: Lock,
    title: "Cuidamos dos dados.",
    text: "Só se recolhe o necessário para atender e marcar, e a recepção digital não dá aconselhamento clínico.",
    hasPrivacyLink: true,
  },
];

export function Process() {
  return (
    <section
      id="como-funciona"
      className="py-14 sm:py-20 lg:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        {/* Section 7: Como funciona */}
        <Reveal>
          <p className="lume-eyebrow text-[#D9531C]">04 · Como funciona</p>
          <h2 className="mt-3 max-w-3xl font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
            Três passos para ter a recepção a funcionar.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ol className="mt-10 sm:mt-12 grid grid-cols-1 gap-px bg-[#E7E3D9] rounded-[16px] border border-[#E7E3D9] overflow-hidden md:grid-cols-3">
            {steps.map((s) => (
              <li
                key={s.n}
                className="group flex h-full flex-col justify-between bg-[#FFFFFF] p-5 sm:p-6 lg:p-8 transition-colors duration-200 hover:bg-[#F5F3EE]/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-[8px] bg-[#F36B32] font-heading text-xs font-extrabold text-[#101D35] tabular-nums transition-transform duration-200 group-hover:scale-105">
                      <span className="sr-only">Passo </span>
                      {s.n}
                    </span>
                    <span className="font-heading text-xs font-semibold text-[#D9531C] tabular-nums">
                      Passo {s.n}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-bold text-[#101D35] tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#5B6B8C]">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-[14px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 sm:p-6">
            <div className="flex items-center gap-3 text-sm sm:text-base text-[#101D35]">
              <CalendarCheck className="size-5 text-[#2E9E6B] shrink-0" aria-hidden="true" />
              <span>Se a sua agenda não permitir integração, dizemo-lo logo no diagnóstico.</span>
            </div>
            <a
              href="#demonstracao-final"
              className="group lume-btn-primary shrink-0 inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap"
            >
              <span>{DEMO_CTA_LABEL}</span>
              <ArrowRight
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        {/* Section 8: Porque confiar na Agentes Digital */}
        <Reveal delay={150}>
          <div className="mt-14 sm:mt-20 border-t border-[#E7E3D9] pt-12 sm:pt-16">
            <p className="lume-eyebrow text-[#D9531C]">Porque confiar na Agentes Digital</p>
            <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-extrabold text-[#101D35] text-balance">
              Mostramos antes de lhe pedir que contrate.
            </h3>

            <div className="mt-8 grid grid-cols-1 gap-px bg-[#E7E3D9] rounded-[16px] border border-[#E7E3D9] overflow-hidden sm:grid-cols-2 lg:grid-cols-6">
              {trustPillars.map((pillar, idx) => {
                const spanClass =
                  idx < 3
                    ? "lg:col-span-2"
                    : idx === 3
                      ? "lg:col-span-3"
                      : "sm:col-span-2 lg:col-span-3";
                return (
                  <div
                    key={pillar.title}
                    className={`group flex flex-col justify-between bg-[#FFFFFF] p-5 sm:p-6 lg:p-7 transition-colors duration-200 hover:bg-[#F5F3EE]/50 ${spanClass}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex size-9 items-center justify-center rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] text-[#D9531C] transition-transform duration-200 group-hover:scale-105">
                          <pillar.icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="font-heading text-xs font-bold text-[#5B6B8C] tabular-nums transition-colors duration-200 group-hover:text-[#D9531C]">
                          0{idx + 1}
                        </span>
                      </div>
                      <h4 className="mt-5 font-heading text-base font-bold text-[#101D35]">
                        {pillar.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#5B6B8C]">
                        {pillar.text}{" "}
                        {pillar.hasPrivacyLink && (
                          <Link
                            to="/privacidade"
                            className="font-semibold text-[#D9531C] underline underline-offset-4 hover:text-[#101D35]"
                          >
                            Ver Política de Privacidade
                          </Link>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
