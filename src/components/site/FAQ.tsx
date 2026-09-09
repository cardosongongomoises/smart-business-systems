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
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqItems.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <div className="glass-card overflow-hidden rounded-2xl">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-base font-semibold">{item.q}</span>
                  <Plus
                    className={`size-5 shrink-0 text-primary transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {open === i && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
