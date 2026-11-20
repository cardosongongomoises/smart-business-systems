import { Reveal } from "./Reveal";
import { site } from "@/lib/site-config";
import { ArrowRight, CheckCircle2, XCircle, Building2, Stethoscope, Scale } from "lucide-react";

const forWhoItems = [
  "Recebe pedidos por WhatsApp, e-mail ou website e nem sempre consegue responder logo",
  "A sua equipa gasta o dia a responder às mesmas perguntas sobre preços, horários e localização",
  "Não sabe ao certo quantos contactos recebeu no mês nem quantos viraram cliente",
  "Perde oportunidades à noite, ao fim de semana ou quando está em reunião",
];

const notForWhoItems = [
  "Ainda não tem o seu serviço e preço definidos",
  "Não tem ninguém disponível para fechar as reuniões que o sistema marcar",
  "Procura apenas curiosidades técnicas em vez de resolver o atendimento comercial",
];

const sectorExamples = [
  {
    icon: Stethoscope,
    sector: "Clínicas e Saúde",
    headline: "O paciente escreve a pedir consulta. Ninguém responde. Marca noutra clínica.",
    outcome: "Resposta imediata e consulta confirmada com lembretes antes da hora.",
  },
  {
    icon: Building2,
    sector: "Construtoras e Imobiliárias",
    headline: "O interessado pergunta pelo imóvel. Ninguém responde. Visita outro empreendimento.",
    outcome: "Qualificação do perfil e visita agendada em minutos com o comercial certo.",
  },
  {
    icon: Scale,
    sector: "Advocacia e Consultorias",
    headline: "O cliente pede uma reunião. Ninguém responde. Contrata outro escritório.",
    outcome: "Triagem do caso e agendamento direto na agenda, sem depender da recepção.",
  },
];

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="relative bg-[#F5F3EE] text-[#101D35] py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="lume-eyebrow text-[#D9531C]">02 · Para quem é</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-[#101D35] leading-[1.15] text-balance">
              Feito para empresários que sabem que perdem pedidos, mas ainda não sabem quantos
            </h2>
            <p className="mt-4 max-w-[65ch] text-base sm:text-lg text-[#5B6B8C] leading-relaxed">
              Não queremos impressionar com tecnologia. Queremos garantir que cada cliente que
              procura a sua empresa é atendido na hora e encaminhado para o fecho.
            </p>
          </div>
        </Reveal>

        {/* Qualification: For who / Not for who */}
        <Reveal delay={80}>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[16px] border border-[#101D35] bg-[#101D35] p-6 sm:p-8 text-[#F5F3EE] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="size-5 text-[#2E9E6B]" aria-hidden="true" />
                  <span className="font-heading text-xs font-bold tracking-wider text-[#F4C542] uppercase">
                    É para si se
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#F5F3EE]">
                  A sua empresa já recebe pedidos, mas perde vendas por demora
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
                  Resultado: atendimento em menos de 10 segundos e agenda preenchida sem esforço
                </p>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="size-5 text-[#D64545]" aria-hidden="true" />
                  <span className="font-heading text-xs font-bold tracking-wider text-[#D64545] uppercase">
                    Não é para si se
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#101D35]">
                  Preferimos ser diretos antes de avançar para uma conversa
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
                  O nosso sistema gera reuniões reais. Precisa de alguém preparado para fechar.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sector scenarios */}
        <Reveal delay={140}>
          <div className="mt-10 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-8">
            <h3 className="font-heading text-xl font-bold text-[#101D35] text-center">
              Como este problema acontece no seu sector
            </h3>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {sectorExamples.map((s) => (
                <div
                  key={s.sector}
                  className="rounded-[12px] border border-[#E7E3D9] bg-[#F5F3EE] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#101D35] text-[#F4C542]">
                        <s.icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#D9531C]">
                        {s.sector}
                      </span>
                    </div>
                    <p className="mt-4 font-heading text-sm font-bold text-[#101D35] leading-snug">
                      {s.headline}
                    </p>
                  </div>
                  <p className="mt-4 pt-3 border-t border-[#E7E3D9] text-xs font-medium text-[#2E9E6B]">
                    Com o sistema: {s.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={180}>
          <div className="mt-12 text-center">
            <a
              href={site.ctaSecond.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm"
            >
              <span>Quero parar de perder clientes</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <p className="mt-3 text-xs text-[#5B6B8C]">
              Diagnóstico gratuito · Apenas 5 empresas por mês
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
