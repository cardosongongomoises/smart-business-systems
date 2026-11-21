import { useState } from "react";
import { Reveal } from "./Reveal";
import { MessageSquare, ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CTA, DEMO_CTA_LABEL } from "@/lib/site-config";

const faqs = [
  {
    q: "Já tenho recepcionista. Isto vem substituí-la?",
    a: "Não. A recepção digital trata das tarefas repetitivas e a sua equipa continua a atender.",
  },
  {
    q: "Já tenho uma agenda. Funciona com ela?",
    a: "Primeiro verificamos se é possível ligar ao sistema que usa. Dizemo-lo no diagnóstico.",
  },
  {
    q: "E se responder mal a uma cliente?",
    a: "Só responde com informação que o seu espaço autorizou. Testamos antes de ativar e definimos quando a conversa passa para uma pessoa.",
  },
  {
    q: "As minhas clientes preferem falar com pessoas.",
    a: "A cliente pode pedir atendimento humano. A recepção digital trata das tarefas simples.",
  },
  {
    q: "Quanto custa?",
    a: "Há uma implementação inicial e uma mensalidade de acompanhamento, mais os custos das plataformas externas. Enviamos uma proposta para o seu espaço depois do diagnóstico.",
  },
  {
    q: "Quanto tempo demora a ficar a funcionar?",
    a: "Depende da agenda e do número de serviços. Indicamos o prazo no diagnóstico.",
  },
  {
    q: "Como sei se vale a pena?",
    a: "Medimos o tempo de resposta, o trabalho manual e as marcações registadas durante um período de teste, e vemos os números consigo.",
  },
  {
    q: "O que acontece aos dados das minhas clientes?",
    a: "Só se recolhe o necessário para atender e marcar, conforme a nossa Política de Privacidade.",
    hasPrivacyLink: true,
  },
  {
    q: "E se o meu negócio não for de estética?",
    a: "Neste momento, a Recepção Inteligente é feita para espaços de estética não médica. Se tem outro negócio de serviços com o mesmo problema, fale connosco.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#D9531C]">07 · Dúvidas frequentes</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
            Respostas diretas às dúvidas mais comuns
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Unified Editorial FAQ Ledger */}
            <div className="overflow-hidden rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] divide-y divide-[#E7E3D9]">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} className={isOpen ? "bg-[#F5F3EE]/40" : "bg-[#FFFFFF]"}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors hover:bg-[#F5F3EE]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F36B32]"
                    >
                      <div className="flex items-baseline gap-3.5 min-w-0">
                        <span className="font-heading text-xs font-bold text-[#5B6B8C] tabular-nums shrink-0">
                          0{i + 1}
                        </span>
                        <span className="font-heading text-sm sm:text-base font-bold text-[#101D35]">
                          {f.q}
                        </span>
                      </div>
                      <ChevronDown
                        className={`size-5 shrink-0 text-[#5B6B8C] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#D9531C]" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-12 sm:pl-14 text-sm sm:text-base leading-relaxed text-[#5B6B8C]">
                          {f.a}{" "}
                          {f.hasPrivacyLink && (
                            <Link
                              to="/privacidade"
                              className="font-semibold text-[#D9531C] underline underline-offset-4"
                            >
                              Consultar Política de Privacidade
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-7">
                <div className="flex size-10 items-center justify-center rounded-[10px] border border-[#E7E3D9] bg-[#F5F3EE] text-[#D9531C]">
                  <HelpCircle className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-[#101D35]">
                  Quer avaliar o seu atendimento?
                </h3>
                <p className="mt-2 text-sm text-[#5B6B8C] leading-relaxed">
                  Veja primeiro a demonstração de 7 minutos e depois analisamos o funcionamento real
                  do seu espaço.
                </p>
                <a
                  href="#demonstracao-final"
                  className="lume-btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>{DEMO_CTA_LABEL}</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-7 text-[#F5F3EE]">
                <div className="flex size-10 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F4C542]">
                  <MessageSquare className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-[#F5F3EE]">
                  Outro tipo de negócio?
                </h3>
                <p className="mt-2 text-sm text-[#B8C0D0] leading-relaxed">
                  Se tem outro negócio de serviços com muitas perguntas e marcações no WhatsApp,
                  converse connosco.
                </p>
                <a
                  href={CTA.otherBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lume-btn-secondary-dark mt-6 inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>Falar no WhatsApp</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <Link
                  to="/implementacao-ia-empresas-angola"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4C542] underline-offset-4 hover:underline"
                >
                  <span>Ver guia de IA para empresas em Angola</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
