import { useState } from "react";
import { Reveal } from "./Reveal";
import { MessageSquare, ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { CTA } from "@/lib/site-config";

const faqs = [
  {
    q: "O que faz a Agentes Digital?",
    a: "Ajudamos empresas em Angola a atender clientes mais rápido, acompanhar oportunidades comerciais e reduzir tarefas repetitivas através da implementação de inteligência artificial e da automatização de processos empresariais.",
  },
  {
    q: "Qual é a diferença entre os dois serviços?",
    a: "A implementação de inteligência artificial foca-se no atendimento: responder a perguntas frequentes, recolher e qualificar contactos, marcar reuniões e encaminhar para a equipa. A automatização de processos foca-se na operação comercial e interna: follow-ups automáticos, lembretes, notificações, relatórios automáticos e integração entre ferramentas.",
  },
  {
    q: "A solução substitui funcionários?",
    a: "Não. O objetivo é retirar o peso das respostas repetitivas e das tarefas manuais para que a sua equipa se concentre na negociação, no atendimento humano de qualidade e no fecho de negócios.",
  },
  {
    q: "É possível encaminhar conversas para pessoas?",
    a: "Sim. Sempre que o pedido exige análise humana, negociação ou decisão da sua equipa, a conversa é encaminhada para um colaborador com o resumo e o histórico completo.",
  },
  {
    q: "É possível utilizar ferramentas existentes?",
    a: "Sim. Trabalhamos sobre o WhatsApp, e-mail, calendário, CRM e website que a empresa já utiliza, evitando reconstruções desnecessárias sempre que possível.",
  },
  {
    q: "É possível automatizar apenas um processo?",
    a: "Sim. Os dois serviços funcionam individualmente ou em conjunto. Pode começar apenas pelo atendimento no WhatsApp, pela marcação de reuniões ou por um fluxo específico de follow-up.",
  },
  {
    q: "Quanto tempo demora a implementação?",
    a: "O prazo depende da complexidade das integrações e dos fluxos definidos no diagnóstico. Na proposta apresentamos o calendário realista de planeamento, configuração, testes e entrada em funcionamento.",
  },
  {
    q: "Como funciona o suporte?",
    a: "Os planos com mensalidade incluem acompanhamento técnico, monitorização e ajustes conforme o plano contratado, com contacto direto com a nossa equipa.",
  },
  {
    q: "Quais são os custos?",
    a: "Temos planos definidos a partir de 125.000 Kz de implementação e 20.000 Kz ao mês, o Automate Pro (300.000 Kz de implementação e 65.000 Kz ao mês) para quem já tem website, e propostas personalizadas sob diagnóstico. Custos externos de plataformas de terceiros variam consoante a utilização.",
  },
  {
    q: "É necessário conhecimento técnico?",
    a: "Não. Tratamos do diagnóstico, configuração, integrações, testes e documentação, e orientamos a sua equipa para utilizar tudo no dia a dia com simplicidade.",
  },
  {
    q: "Como saber se a solução é adequada à empresa?",
    a: "Basta solicitar um diagnóstico. Avaliamos o seu fluxo de atendimento e processos atuais para indicar com transparência o que faz sentido implementar primeiro.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-[#FFFFFF] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#D9531C]">Perguntas Frequentes</p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
            Dúvidas comuns antes de começar
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
            Respostas diretas e transparentes sobre implementação, suporte, ferramentas e custos.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* FAQ List */}
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={`rounded-[14px] border overflow-hidden transition-colors ${
                      isOpen
                        ? "border-[#101D35] bg-[#F5F3EE]"
                        : "border-[#E7E3D9] bg-[#F5F3EE] hover:border-[#101D35]/40"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32]"
                    >
                      <span className="font-heading text-sm font-bold text-[#101D35]">{f.q}</span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-[#5B6B8C] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#D9531C]" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm leading-relaxed text-[#5B6B8C] border-t border-[#E7E3D9] pt-4 bg-[#FFFFFF]">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[16px] border border-[#E7E3D9] bg-[#F5F3EE] p-6">
                <div className="flex size-10 items-center justify-center rounded-[10px] border border-[#E7E3D9] bg-[#FFFFFF] text-[#D9531C]">
                  <HelpCircle className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-[#101D35]">
                  Ainda tem alguma dúvida?
                </h3>
                <p className="mt-2 text-sm text-[#5B6B8C] leading-relaxed">
                  Converse diretamente com a nossa equipa no WhatsApp para avaliar o seu cenário sem
                  compromisso.
                </p>
                <a
                  href={CTA.specialist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lume-btn-secondary-light mt-5 inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>Conversar no WhatsApp</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 text-[#F5F3EE]">
                <div className="flex size-10 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F4C542]">
                  <MessageSquare className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-[#F5F3EE]">
                  Diagnóstico da operação
                </h3>
                <p className="mt-2 text-sm text-[#B8C0D0] leading-relaxed">
                  Analisamos os seus canais e processos atuais para indicar exatamente o que faz
                  sentido implementar primeiro.
                </p>
                <a
                  href="#contacto"
                  className="lume-btn-primary mt-5 inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>Solicitar diagnóstico</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
