import { useState } from "react";
import { Reveal } from "./Reveal";
import { MessageSquare, ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { site, CTA } from "@/lib/site-config";

const faqs = [
  {
    q: "Preciso de saber programar para usar o Motor ATQA?",
    a: "Não. Nós tratamos de tudo: configuração, integração com WhatsApp, CRM e dashboard. Você apenas usa como qualquer outra ferramenta do dia a dia — como usa o WhatsApp. A sua equipa não precisa de formação técnica complexa.",
  },
  {
    q: "Quanto tempo demora a ver resultados?",
    a: "A maioria dos nossos clientes vê resultados nas primeiras 48 horas — leads a receberem respostas imediatas. A qualificação automática e o agendamento começam a funcionar desde o primeiro dia activo.",
  },
  {
    q: "Funciona com o WhatsApp que já uso?",
    a: "Sim. O Motor ATQA integra-se ao seu WhatsApp Business existente — não precisa de mudar de número nem de criar uma conta nova. A integração segue as diretrizes oficiais da Meta.",
  },
  {
    q: "O que acontece se houver um problema?",
    a: "Temos suporte técnico dedicado. Cada cliente tem um ponto de contacto directo. Além disso, o sistema é monitorizado continuamente — se algo exigir ajuste, a nossa equipa actua rapidamente.",
  },
  {
    q: "Quanto custa realmente?",
    a: "Os pacotes começam em Kz 125.000/mês para presença digital básica, até Kz 700.000/mês para domínio total com IA avançada. Se cada reunião que o sistema agendar valer Kz 200.000+, basta 2 a 3 reuniões adicionais por mês para cobrir o investimento.",
  },
  {
    q: "Preciso de mudar tudo o que já tenho?",
    a: "Não. Trabalhamos com o que já tem — site actual, WhatsApp e ferramentas existentes. O Motor ATQA e o Automate Pro integram-se e complementam a operação sem precisar de reconstruir tudo.",
  },
  {
    q: "E se eu não gostar do resultado?",
    a: "Oferecemos garantia de satisfação nos primeiros 30 dias. Se o sistema não entregar o que foi acordado, devolvemos 100% do investimento sem burocracia.",
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
            Resultados rápidos, sem surpresas
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
            Todas as respostas de que precisa para tomar a decisão certa — com total transparência.
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
                  Ainda tem dúvidas?
                </h3>
                <p className="mt-2 text-sm text-[#5B6B8C] leading-relaxed">
                  Fale directamente com um especialista. Sem compromisso, sem pressão — apenas
                  respostas claras para o seu caso.
                </p>
                <a
                  href={site.ctaSecond.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lume-btn-secondary-light mt-5 inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>{site.ctaSecond.label}</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 text-[#F5F3EE]">
                <div className="flex size-10 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F4C542]">
                  <MessageSquare className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-[#F5F3EE]">
                  Diagnóstico gratuito
                </h3>
                <p className="mt-2 text-sm text-[#B8C0D0] leading-relaxed">
                  Apenas 5 empresas/mês recebem um diagnóstico personalizado — análise do seu funil
                  de vendas, identificação de gargalos e plano de acção concreto.
                </p>
                <a
                  href={CTA.diagnostic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lume-btn-primary mt-5 inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>Pedir diagnóstico gratuito</span>
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
