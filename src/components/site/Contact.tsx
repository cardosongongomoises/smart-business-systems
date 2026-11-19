import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Calendar,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { site, whatsappLink } from "@/lib/site-config";

export function Contact() {
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [volume, setVolume] = useState("");
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
      "Olá! Gostaria de solicitar o Diagnóstico Gratuito para a minha empresa:",
      `• Empresa: ${company.trim()}`,
      `• WhatsApp: ${phone.trim()}`,
      sector ? `• Sector: ${sector}` : null,
      volume ? `• Contactos/mês: ${volume}` : null,
      goal.trim() ? `• Objectivo: ${goal.trim()}` : null,
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
            <p className="lume-eyebrow text-[#D9531C]">Comece Agora</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
              Cada dia sem o sistema é um dia de{" "}
              <span className="text-[#D64545]">leads perdidos</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
              Não espere mais. Comece hoje — o primeiro mês é sobre recuperar os clientes que está a
              perder por demora ou falta de atendimento.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_400px]">
            {/* Form Card */}
            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-8">
              <h3 className="font-heading text-lg font-bold text-[#101D35]">
                Diagnóstico gratuito — Apenas 5 empresas/mês
              </h3>
              <p className="mt-2 text-sm text-[#5B6B8C]">
                Preencha os seus dados para receber em 24h um plano personalizado com os seus
                números.
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
                        Pedido de diagnóstico registado
                      </h4>
                      <p className="mt-1 text-sm text-[#5B6B8C] leading-relaxed">
                        Recebemos os dados da <strong className="text-[#101D35]">{company}</strong>.
                        Para atendimento imediato agora mesmo, envie o resumo directamente pelo
                        nosso WhatsApp oficial.
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
                      <span>Confirmar no WhatsApp agora</span>
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
                        placeholder="Ex: Construções Silva"
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

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-sector"
                      className="text-xs font-semibold text-[#101D35] block"
                    >
                      Sector de Actividade
                    </label>
                    <select
                      id="contact-sector"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                    >
                      <option value="">Selecione o seu sector</option>
                      <option value="Construção Civil / Imobiliário">
                        Construção Civil / Imobiliário
                      </option>
                      <option value="Saúde / Clínicas">Saúde / Clínicas</option>
                      <option value="Advocacia / Jurídico">Advocacia / Jurídico</option>
                      <option value="Educação / Formação">Educação / Formação</option>
                      <option value="Consultoria / Serviços">Consultoria / Serviços</option>
                      <option value="Comércio / Retalho">Comércio / Retalho</option>
                      <option value="Tecnologia / Software">Tecnologia / Software</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-volume"
                      className="text-xs font-semibold text-[#101D35] block"
                    >
                      Quantos contactos recebem por mês? (WhatsApp, e-mail, formulário)
                    </label>
                    <select
                      id="contact-volume"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                    >
                      <option value="">Selecione</option>
                      <option value="10 a 30">10 a 30</option>
                      <option value="30 a 100">30 a 100</option>
                      <option value="100 a 500">100 a 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-goal"
                      className="text-xs font-semibold text-[#101D35] block"
                    >
                      Que resultado quer alcançar?
                    </label>
                    <textarea
                      id="contact-goal"
                      rows={3}
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="Ex: Responder mais rápido, agendar mais reuniões, perder menos leads..."
                      className="w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 py-2.5 text-sm text-[#101D35] placeholder:text-[#5B6B8C]/70 focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="lume-btn-primary inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap cursor-pointer"
                  >
                    <Calendar className="size-4" aria-hidden="true" />
                    <span>{site.ctaSecond.label}</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>

                  <p className="text-center text-xs text-[#5B6B8C]">
                    Sem compromisso. Resposta em 24h. Apenas 5 vagas por mês.
                  </p>
                </form>
              )}
            </div>

            {/* Info Stack */}
            <div className="space-y-5">
              <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6">
                <h3 className="font-heading text-base font-bold text-[#101D35]">
                  Contacte-nos directamente
                </h3>
                <p className="mt-2 text-sm text-[#5B6B8C]">
                  Prefere falar directamente? Estamos disponíveis no WhatsApp — resposta em minutos,
                  não em horas.
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
                      <p className="font-semibold text-[#101D35]">Seg–Sex: 08h–17h</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Garantia */}
              <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 text-[#F5F3EE]">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#1A2A4A] text-[#2E9E6B] shrink-0">
                    <Shield className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#F5F3EE]">
                      Garantia de Satisfação 30 Dias
                    </h3>
                    <p className="mt-2 text-xs text-[#B8C0D0] leading-relaxed">
                      Se o sistema não entregar o que prometemos nos primeiros 30 dias, devolvemos
                      100% do investimento. Sem perguntas, sem burocracia. O risco é nosso, não seu.
                    </p>
                  </div>
                </div>
              </div>

              {/* Urgência */}
              <div className="rounded-[16px] border border-[#F4C542] bg-[#FCF0C8] p-5 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#F4C542] text-[#101D35] shrink-0">
                  <Clock className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold text-[#101D35] uppercase tracking-wider">
                    Apenas 5 vagas/mês
                  </p>
                  <p className="text-xs text-[#101D35]/80">
                    Limitamos a 5 diagnósticos por mês para garantir qualidade técnica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
