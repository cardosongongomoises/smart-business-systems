import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { site, whatsappLink, CTA } from "@/lib/site-config";

export function Contact() {
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!company.trim() || !phone.trim()) {
      setError("Por favor, preencha o nome da empresa e o número de WhatsApp.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const buildWhatsAppSummaryUrl = () => {
    const lines = [
      "Olá. Gostaria de solicitar um diagnóstico para a minha empresa:",
      `• Empresa: ${company.trim()}`,
      `• WhatsApp: ${phone.trim()}`,
      sector ? `• Setor: ${sector}` : null,
      serviceInterest ? `• Interesse principal: ${serviceInterest}` : null,
      goal.trim() ? `• Objetivo / Gargalo atual: ${goal.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return whatsappLink(lines);
  };

  return (
    <section
      id="contacto"
      className="py-20 sm:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="lume-eyebrow text-[#D9531C]">Diagnóstico e Contacto</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
              Organize o seu atendimento e os seus processos antes de{" "}
              <span className="text-[#D9531C]">perder mais oportunidades</span>.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
              Solicite um diagnóstico ou converse connosco no WhatsApp. Avaliamos a sua operação
              atual para propor um plano prático, claro e ajustado à sua realidade.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_400px]">
            {/* Form Card */}
            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-8">
              <h3 className="font-heading text-lg font-bold text-[#101D35]">
                Solicitar diagnóstico da operação
              </h3>
              <p className="mt-2 text-sm text-[#5B6B8C]">
                Preencha os dados abaixo para preparar a nossa conversa inicial sobre atendimento ou
                automatização de processos.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-[12px] border border-[#2E9E6B] bg-[#F5F3EE] p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="size-6 text-[#2E9E6B] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="font-heading text-base font-bold text-[#101D35]">
                        Resumo pronto para envio
                      </h4>
                      <p className="mt-1 text-sm text-[#5B6B8C] leading-relaxed">
                        Preparámos os dados da <strong className="text-[#101D35]">{company}</strong>
                        . Clique abaixo para enviar diretamente para o nosso WhatsApp oficial e
                        agendar a avaliação.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={buildWhatsAppSummaryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                    >
                      <span>Enviar pedido no WhatsApp</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="lume-btn-secondary-light inline-flex items-center justify-center text-sm whitespace-nowrap cursor-pointer"
                    >
                      Editar dados
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  {error && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 rounded-[8px] border border-[#D64545] bg-[#FFFFFF] px-3.5 py-2.5 text-xs font-medium text-[#D64545]"
                    >
                      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-company"
                        className="text-xs font-semibold text-[#101D35] block"
                      >
                        Nome da Empresa *
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ex: Clínica Central"
                        className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] placeholder:text-[#5B6B8C]/70 focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-phone"
                        className="text-xs font-semibold text-[#101D35] block"
                      >
                        Contacto (WhatsApp) *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+244 9XX XXX XXX"
                        className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] placeholder:text-[#5B6B8C]/70 focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-sector"
                        className="text-xs font-semibold text-[#101D35] block"
                      >
                        Setor de Atividade
                      </label>
                      <select
                        id="contact-sector"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                      >
                        <option value="">Selecione o setor</option>
                        <option value="Saúde / Clínicas">Saúde / Clínicas</option>
                        <option value="Construção Civil / Imobiliário">
                          Construção Civil / Imobiliário
                        </option>
                        <option value="Advocacia / Consultoria">Advocacia / Consultoria</option>
                        <option value="Educação / Formação">Educação / Formação</option>
                        <option value="Comércio / Serviços">Comércio / Serviços</option>
                        <option value="Logística / Operações">Logística / Operações</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-service"
                        className="text-xs font-semibold text-[#101D35] block"
                      >
                        Serviço de interesse
                      </label>
                      <select
                        id="contact-service"
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="Implementação de IA no atendimento">
                          Implementação de IA no atendimento
                        </option>
                        <option value="Automatização de processos">
                          Automatização de processos
                        </option>
                        <option value="Ambos os serviços">Ambos os serviços</option>
                        <option value="Automate Pro (já tenho website)">
                          Automate Pro (já tenho website)
                        </option>
                        <option value="Ainda quero avaliar no diagnóstico">
                          Ainda quero avaliar no diagnóstico
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-goal"
                      className="text-xs font-semibold text-[#101D35] block"
                    >
                      O que pretende resolver primeiro?
                    </label>
                    <textarea
                      id="contact-goal"
                      rows={3}
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="Ex: Demora no WhatsApp, follow-ups manuais, agendamento de reuniões, relatórios internos..."
                      className="w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 py-2.5 text-sm text-[#101D35] placeholder:text-[#5B6B8C]/70 focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="lume-btn-primary inline-flex flex-1 items-center justify-center gap-2 text-sm whitespace-nowrap cursor-pointer"
                    >
                      <Calendar className="size-4" aria-hidden="true" />
                      <span>Solicitar diagnóstico</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </button>
                    <a
                      href={CTA.specialist}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lume-btn-secondary-light inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                    >
                      <span>Conversar no WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-center text-xs text-[#5B6B8C]">
                    Conversa direta e sem compromisso para avaliar a adequação à sua empresa.
                  </p>
                </form>
              )}
            </div>

            {/* Info Stack */}
            <div className="space-y-5">
              <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6">
                <h3 className="font-heading text-base font-bold text-[#101D35]">
                  Canais oficiais de contacto
                </h3>
                <p className="mt-2 text-sm text-[#5B6B8C]">
                  Fale diretamente com a nossa equipa através dos canais oficiais em Angola.
                </p>

                <ul className="mt-5 space-y-3.5 text-sm">
                  <li className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] text-[#2E9E6B] shrink-0">
                      <Phone className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-[#5B6B8C]">WhatsApp</p>
                      <p className="font-semibold text-[#101D35] tabular-nums">
                        {site.whatsapp.number}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] text-[#D9531C] shrink-0">
                      <Mail className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-[#5B6B8C]">Email</p>
                      <p className="font-semibold text-[#101D35]">{site.email}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] text-[#101D35] shrink-0">
                      <MapPin className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-[#5B6B8C]">Localização</p>
                      <p className="font-semibold text-[#101D35]">{site.location}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] text-[#3B82C4] shrink-0">
                      <Clock className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-[#5B6B8C]">Horário</p>
                      <p className="font-semibold text-[#101D35]">Seg a Sex: 08h - 17h</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Next steps clarity card */}
              <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 text-[#F5F3EE]">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#1A2A4A] text-[#2E9E6B] shrink-0">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#F5F3EE]">
                      O que acontece depois do pedido
                    </h3>
                    <p className="mt-2 text-xs text-[#B8C0D0] leading-relaxed">
                      Marcamos uma conversa objetiva para mapear o seu fluxo atual, mostrar onde a
                      IA ou a automatização trazem mais ganho e apresentar uma proposta com escopo
                      claro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
