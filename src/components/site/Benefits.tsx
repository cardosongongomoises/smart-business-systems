import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  MessageSquare,
  TrendingUp,
  Settings2,
  BarChart3,
} from "lucide-react";

const benefitGroups = [
  {
    icon: MessageSquare,
    title: "Atendimento",
    subtitle: "Respostas consistentes sem atrasos",
    items: [
      "Resposta mais rápida ao primeiro contacto",
      "Menos clientes à espera em horas de pico",
      "Mais consistência nas respostas iniciais",
      "Atendimento fora do horário tradicional",
    ],
  },
  {
    icon: TrendingUp,
    title: "Vendas e acompanhamento",
    subtitle: "Oportunidades com seguimento real",
    items: [
      "Menos oportunidades esquecidas após o primeiro contacto",
      "Follow-ups comerciais consistentes e programados",
      "Contacto pré-qualificado antes de chegar ao comercial",
      "Reuniões marcadas e confirmadas com mais facilidade",
    ],
  },
  {
    icon: Settings2,
    title: "Operação",
    subtitle: "Menos trabalho repetitivo na rotina",
    items: [
      "Redução de tarefas manuais repetitivas",
      "Menos erros ao copiar dados entre ferramentas",
      "Processos comerciais e internos mais organizados",
      "Equipa focada em tarefas de maior valor",
    ],
  },
  {
    icon: BarChart3,
    title: "Gestão",
    subtitle: "Visibilidade e organização diária",
    items: [
      "Informação centralizada num único histórico",
      "Relatórios automáticos de acompanhamento",
      "Maior visibilidade sobre pedidos e estados",
      "Base mais sólida para o negócio crescer sem caos",
    ],
  },
];

const forWhoItems = [
  "A empresa recebe pedidos no WhatsApp, e-mail ou website e perde tempo a responder tudo à mão",
  "A equipa repete diariamente as mesmas informações sobre serviços, horários e requisitos",
  "Contactos e orçamentos acabam esquecidos por falta de um sistema de acompanhamento",
  "Quer organizar atendimento e processos internos com controlo e supervisão humana",
];

const notForWhoItems = [
  "Ainda não tem uma oferta, serviço ou processo mínimo definidos",
  "Procura fórmulas milagrosas sem disponibilidade para validar o fluxo da empresa",
  "Não tem equipa ou responsável para dar seguimento aos clientes encaminhados",
];

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="relative bg-[#FFFFFF] text-[#101D35] py-24 sm:py-32 border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="lume-eyebrow text-[#D9531C]">03 · Benefícios reais para a empresa</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-[#101D35] leading-[1.15] text-balance">
              O que muda no atendimento, nas vendas, na operação e na gestão do seu negócio.
            </h2>
            <p className="mt-4 max-w-[65ch] text-base sm:text-lg text-[#5B6B8C] leading-relaxed">
              Não implementamos tecnologia pela tecnologia. Estruturamos fluxos para poupar horas da
              sua equipa e dar continuidade a cada contacto comercial.
            </p>
          </div>
        </Reveal>

        {/* 4 Benefit Groups */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefitGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[16px] border border-[#E7E3D9] bg-[#F5F3EE] p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F4C542] shrink-0">
                    <group.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#101D35]">
                      {group.title}
                    </h3>
                    <p className="text-[11px] font-medium text-[#5B6B8C]">{group.subtitle}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-[#E7E3D9] pt-4 flex-1">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#101D35]">
                      <CheckCircle2
                        className="size-3.5 mt-0.5 shrink-0 text-[#2E9E6B]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Qualification: For who / Not for who */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[16px] border border-[#101D35] bg-[#101D35] p-6 sm:p-8 text-[#F5F3EE] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="size-5 text-[#2E9E6B]" aria-hidden="true" />
                  <span className="font-heading text-xs font-bold tracking-wider text-[#F4C542] uppercase">
                    Faz sentido para a sua empresa se
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#F5F3EE]">
                  Já existe procura, mas o atendimento e o acompanhamento dependem de esforço manual
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {forWhoItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#F5F3EE]">
                      <CheckCircle2
                        className="size-4 mt-0.5 shrink-0 text-[#2E9E6B]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2A3D63]">
                <p className="text-xs font-semibold text-[#F4C542]">
                  Objetivo: atendimento ágil, histórico centralizado e menos tarefas repetitivas.
                </p>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#F5F3EE] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="size-5 text-[#D64545]" aria-hidden="true" />
                  <span className="font-heading text-xs font-bold tracking-wider text-[#D64545] uppercase">
                    Não é o momento ideal se
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#101D35]">
                  Preferimos ser transparentes antes de qualquer proposta
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {notForWhoItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#5B6B8C]">
                      <XCircle
                        className="size-4 mt-0.5 shrink-0 text-[#D64545]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E7E3D9]">
                <p className="text-xs font-semibold text-[#5B6B8C]">
                  A tecnologia organiza e acelera o atendimento, mas precisa de uma equipa para
                  atender casos complexos e fechar negócios.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={160}>
          <div className="mt-12 text-center">
            <a
              href={CTA.diagnostic}
              target="_blank"
              rel="noopener noreferrer"
              className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm"
            >
              <span>Solicitar diagnóstico da minha operação</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
