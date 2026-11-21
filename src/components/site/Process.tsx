import {
  ShieldCheck,
  CheckCircle2,
  Wrench,
  GitBranch,
  ClipboardCheck,
  Headphones,
} from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Diagnóstico e mapeamento",
    text: "Analisamos os seus canais de atendimento, tarefas repetitivas e ferramentas atuais para definir o que faz mais sentido resolver primeiro.",
  },
  {
    n: "02",
    title: "Configuração e integração",
    text: "Configuramos o assistente de IA e os fluxos de automatização com as regras, horários, serviços e ligações da sua empresa.",
  },
  {
    n: "03",
    title: "Testes e validação conjunta",
    text: "Antes de publicar, simulamos conversas reais, validamos follow-ups e ajustamos respostas com a sua equipa até tudo ficar alinhado.",
  },
  {
    n: "04",
    title: "Acompanhamento técnico",
    text: "Após o arranque, monitorizamos o funcionamento, realizamos ajustes necessários e damos apoio contínuo conforme o plano escolhido.",
  },
];

const authorityCapabilities = [
  {
    icon: Wrench,
    title: "Implementação adaptada ao negócio",
    text: "Cada fluxo parte dos serviços, regras e canais reais da empresa em Angola.",
  },
  {
    icon: GitBranch,
    title: "Integração com ferramentas existentes",
    text: "Ligamos WhatsApp, e-mail, calendário, formulários e folhas ou CRM sem complicações.",
  },
  {
    icon: ClipboardCheck,
    title: "Critérios de validação antes do lançamento",
    text: "Cada etapa é testada consigo antes de entrar em funcionamento com clientes reais.",
  },
  {
    icon: Headphones,
    title: "Suporte e orientação humana",
    text: "Equipa disponível para ajustes, documentação e apoio direto no dia a dia.",
  },
];

export function Process() {
  return (
    <section
      id="como-funciona"
      className="py-20 sm:py-28 bg-[#101D35] text-[#F5F3EE] border-t border-[#2A3D63] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#F4C542]">05 · Como trabalhamos e metodologia</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#F5F3EE] sm:text-4xl text-balance">
            Implementação organizada em 4 etapas, com testes e acompanhamento claro.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#B8C0D0] leading-[1.65]">
            Não precisa de conhecimento técnico nem de parar a operação atual. Tratamos da
            configuração, explicamos à equipa e validamos cada entrega consigo.
          </p>
        </Reveal>

        {/* 4 Delivery Steps */}
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 transition-colors hover:border-[#F36B32]">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-[8px] bg-[#F36B32] font-heading text-xs font-extrabold text-[#101D35] tabular-nums">
                    <span className="sr-only">Etapa </span>
                    {s.n}
                  </span>
                  <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-[#F4C542] tabular-nums">
                    Etapa {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-[#F5F3EE] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#B8C0D0]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Honest Technical Authority (Section 14) */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {authorityCapabilities.map((item) => (
              <div
                key={item.title}
                className="rounded-[14px] border border-[#2A3D63] bg-[#1A2A4A]/70 p-5"
              >
                <item.icon className="size-5 text-[#F4C542]" aria-hidden="true" />
                <h3 className="mt-3.5 font-heading text-sm font-bold text-[#F5F3EE]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#B8C0D0]">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Honest Risk Reduction & Validation Card (Section 18 - replaces unapproved 30-day refund) */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] border border-[#2E9E6B]/60 bg-[#1A2A4A] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="flex size-11 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#101D35] text-[#2E9E6B] shrink-0">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="lume-eyebrow text-[#2E9E6B]">Transparência e redução de risco</p>
                  <h3 className="mt-1.5 font-heading text-xl font-bold text-[#F5F3EE]">
                    Proposta clara, escopo definido e validação antes do lançamento
                  </h3>
                  <p className="mt-2 text-sm text-[#B8C0D0] leading-relaxed">
                    Antes de avançar, apresentamos exatamente o que será implementado, os prazos
                    estimados, as responsabilidades de cada parte e o alcance do suporte contínuo,
                    sem promessas irreais.
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#F5F3EE] shrink-0 lg:min-w-[300px]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#2E9E6B] shrink-0" aria-hidden="true" />
                  <span>Escopo e entregáveis por escrito antes de começar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#2E9E6B] shrink-0" aria-hidden="true" />
                  <span>Testes conjuntos e validação antes da publicação</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#2E9E6B] shrink-0" aria-hidden="true" />
                  <span>Correção técnica de desvios no escopo contratado</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
