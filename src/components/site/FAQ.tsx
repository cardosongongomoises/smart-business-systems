import { useState } from "react";
import { Reveal } from "./Reveal";
import { MessageSquare, ArrowUpRight, ChevronDown, HelpCircle } from "lucide-react";
import { site } from "@/lib/site-config";

const faqs = [
  {
    q: "Preciso de saber programar para usar o Motor ATQA?",
    a: "Não. Nós tratamos de tudo: configuração, integração com WhatsApp, CRM e dashboard. Você apenas usa como qualquer outro ferramenta — como usa o WhatsApp. A sua equipa não precisa de nenhuma formação técnica.",
  },
  {
    q: "Quanto tempo demora a ver resultados?",
    a: "A maioria dos nossos clientes vê resultados nas primeiras 48 horas — leads a receberem respostas imediatas. A qualificação automática e agendamento começam a funcionar no primeiro dia. A subida na taxa de conversão ao longo do primeiro mês é progressiva.",
  },
  {
    q: "Funciona com o WhatsApp que já uso?",
    a: "Sim. O Motor ATQA integra-se ao seu WhatsApp Business existente — não precisa de mudar número nem de criar uma conta nova. A integração é feita via API oficial da Meta, sem risco de banimento.",
  },
  {
    q: "O que acontece se houver um problema?",
    a: "Temos suporte técnico dedicado. Cada cliente tem um ponto de contacto directo. Além disso, o sistema é monitorizado automaticamente — se algo falhar, a nossa equipa é notificada antes mesmo de você perceber.",
  },
  {
    q: "Quanto custa realmente?",
    a: "Os pacotes começam em Kz 125.000/mês para presença digital básica, até Kz 700.000/mês para domínio total com IA avançada. O investimento paga-se no primeiro mês — se cada reunião que o sistema agendar valer Kz 200.000+, basta 2-3 reuniões adicionais por mês para cobrir o custo.",
  },
  {
    q: "Preciso de mudar tudo o que já tenho?",
    a: "Não. Trabalhamos com o que você já tem — site actual, WhatsApp, ferramentas existentes. O Motor ATQA integra-se e complementa. Não é preciso demolir para construir melhor.",
  },
  {
    q: "E se eu não gostar do resultado?",
    a: "Oferecemos garantia de satisfação nos primeiros 30 dias. Se o sistema não entregar o que prometemos, devolvemos 100% do investimento. Sem perguntas, sem burocracia.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-[#0E121A] via-[#0E121A] to-[#111827] py-20 sm:py-28 scroll-mt-20"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#8B5CF6]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge className="mb-4 border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#60A5FA]">
                Perguntas Frequentes
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] tracking-tight">
                Resultados rápidos, sem surpresas
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#A7B0BF] leading-relaxed">
            Todas as respostas que precisa para tomar a decisão certa — sem enrolação.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* FAQ List */}
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="rounded-[14px] border border-[#252C38] bg-[#151A23]/80 backdrop-blur-sm overflow-hidden transition-colors hover:border-[#3B82F6]/30"
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-[#F5F7FA]">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-[#A7B0BF] transition-transform duration-200 ${
                        open === i ? "rotate-180 text-[#60A5FA]" : ""
                      }`}
                    />
                  </button>
                  {open === i && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-[#A7B0BF] border-t border-[#252C38] pt-4">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[14px] border border-[#252C38] bg-[#151A23]/80 backdrop-blur-sm p-6">
                <div className="flex size-10 items-center justify-center rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#60A5FA]">
                  <HelpCircle className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#F5F7FA]">
                  Ainda tem dúvidas?
                </h3>
                <p className="mt-2 text-sm text-[#A7B0BF] leading-relaxed">
                  Fale directamente com um especialista. Sem compromisso, sem pressão — apenas
                  respostas claras para o seu caso.
                </p>
                <a
                  href={site.ctaSecond.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-[#22C55E] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#16A34A]"
                >
                  {site.ctaSecond.label}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>

              <div className="rounded-[14px] border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 p-6">
                <div className="flex size-10 items-center justify-center rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#C084FC]">
                  <MessageSquare className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#F5F7FA]">
                  Diagnóstico gratuito
                </h3>
                <p className="mt-2 text-sm text-[#A7B0BF] leading-relaxed">
                  Apenas 5 empresas/mês recebem um diagnóstico personalizado — análise
                  completa do seu funil de vendas, identificação de gargalos, e plano de
                  acção concreto.
                </p>
                <a
                  href={site.ctaSecond.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-5 text-sm font-semibold text-[#C084FC] transition-colors hover:bg-[#8B5CF6]/20"
                >
                  Pedir diagnóstico gratuito
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase ${className}`}
    >
      {children}
    </span>
  );
}
