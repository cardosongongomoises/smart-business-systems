import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

export const faqItems = [
  {
    q: "A IA responde meus clientes sozinha?",
    a: "Sim, dentro dos fluxos e do conhecimento configurados para a sua empresa. Tudo o que sair desse âmbito é encaminhado para a sua equipa.",
  },
  {
    q: "A IA funciona no WhatsApp?",
    a: "Sim, mediante integração com a infraestrutura apropriada de WhatsApp.",
  },
  {
    q: "A IA pode agendar reuniões?",
    a: "Sim, quando integrada ao calendário ou sistema de agendamento da sua empresa.",
  },
  {
    q: "Posso continuar atendendo manualmente?",
    a: "Sim. A conversa pode ser encaminhada para um atendente humano a qualquer momento.",
  },
  { q: "A IA pode responder e-mails?", a: "Sim, com respostas, classificação e encaminhamento." },
  {
    q: "Posso começar apenas com um website?",
    a: "Sim. Muitas empresas começam pelo pacote Presença.",
  },
  {
    q: "Posso adicionar IA depois?",
    a: "Sim. Os sistemas são projetados para permitir evolução por etapas.",
  },
  {
    q: "A mensalidade inclui domínio e hospedagem?",
    a: "Sim, conforme o pacote contratado.",
  },
  {
    q: "A IA funciona 24 horas?",
    a: "O sistema pode operar continuamente, sujeito à disponibilidade dos serviços e integrações utilizadas.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#0E121A] border-t border-[#252C38] scroll-mt-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase mb-4">
              Esclarecimentos Técnicos & Comerciais
            </span>
            <h2 className="text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
              Perguntas frequentes
            </h2>
            <p className="mt-4 text-base text-[#A7B0BF]">
              Respostas claras sobre implementação, segurança e operação dos agentes digitais.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            const questionId = `faq-q-${i}`;
            const answerId = `faq-a-${i}`;
            return (
              <Reveal key={item.q} delay={i * 40}>
                <div
                  className={`overflow-hidden rounded-[12px] border transition-all duration-200 ${
                    isOpen
                      ? "border-[#3B82F6]/40 bg-[#151A23] shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
                      : "border-[#252C38] bg-[#151A23] hover:border-[#3B82F6]/30"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-[#F5F7FA] hover:text-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-inset touch-manipulation"
                    >
                      <span className="text-sm sm:text-base">{item.q}</span>
                      <Plus
                        aria-hidden="true"
                        className={`size-4 shrink-0 text-[#3B82F6] transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-[#A7B0BF]"
                    >
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
