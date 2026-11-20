import { useState } from "react";
import { Reveal } from "./Reveal";
import { MessageSquare, ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { site, CTA } from "@/lib/site-config";

const faqs = [
  {
    q: "Preciso de saber programar?",
    a: "Não. Tratamos da configuração, do WhatsApp, do registo de contactos e do painel. A sua equipa usa como usa o WhatsApp.",
  },
  {
    q: "Quanto tempo demora a ver resultados?",
    a: "O sistema arranca em dias. No primeiro mês mede-se o tempo de resposta em menos de 10 segundos e quantos contactos passaram a reunião marcada.",
  },
  {
    q: "Funciona com o WhatsApp que já uso?",
    a: "Ligamos ao WhatsApp da empresa através da API oficial da Meta para responder automaticamente, qualificar contactos e marcar reuniões.",
  },
  {
    q: "E se houver um problema?",
    a: "Monitorizamos o sistema de forma contínua e tem suporte técnico incluído. Quando uma conversa exige uma pessoa, passa para a sua equipa com o histórico completo.",
  },
  {
    q: "Quanto custa realmente?",
    a: "Os valores estão na secção de planos: desde 125.000 Kz de implementação (20.000 Kz ao mês) no plano Presença até 700.000 Kz (150.000 Kz ao mês) na Operação Completa, além do Automate Pro (300.000 Kz e 65.000 Kz ao mês) para quem já tem site. Só os custos de plataformas de terceiros variam com a utilização.",
  },
  {
    q: "Preciso de mudar tudo o que já tenho?",
    a: "Não. Se já tem website, acrescentamos o atendimento automático por cima com o Automate Pro, sem migração e sem o tirar do ar.",
  },
  {
    q: "E se não gostar do resultado?",
    a: "Tem 30 dias de garantia. Se não entregarmos o que prometemos, devolvemos 100% do investimento.",
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
            Respostas diretas, sem rodeios nem letra pequena.
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
                  Fale directamente com um especialista. Sem compromisso e sem pressão, apenas
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
                  Em 24 horas recebe um plano com os seus números: quantos contactos perde, quanto
                  isso vale e como os recuperar.
                </p>
                <a
                  href={CTA.diagnostic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lume-btn-primary mt-5 inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>Quero o meu diagnóstico gratuito</span>
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
