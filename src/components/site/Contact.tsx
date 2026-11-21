import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { DemoDeck } from "./DemoDeck";
import { HighlightWipe } from "./MotionPrimitives";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { site, whatsappLink, CTA, DEMO_CTA_LABEL } from "@/lib/site-config";

export function Contact() {
  const [spaceName, setSpaceName] = useState("");
  const [phone, setPhone] = useState("");
  const [professionals, setProfessionals] = useState("");
  const [currentAgenda, setCurrentAgenda] = useState("");
  const [biggestTimeSink, setBiggestTimeSink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!spaceName.trim() || !phone.trim()) {
      setError("Por favor, preencha o nome do espaço e o número de WhatsApp.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const buildWhatsAppSummaryUrl = () => {
    const lines = [
      "Olá, vi o site da Agentes Digital. Gostava de ver a demonstração da recepção digital para o meu espaço:",
      `• Nome do espaço: ${spaceName.trim()}`,
      `• WhatsApp: ${phone.trim()}`,
      professionals ? `• Profissionais: ${professionals}` : null,
      currentAgenda.trim() ? `• Agenda atual: ${currentAgenda.trim()}` : null,
      biggestTimeSink ? `• O que consome mais tempo: ${biggestTimeSink}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return whatsappLink(lines);
  };

  return (
    <section
      id="demonstracao-final"
      className="py-14 sm:py-20 lg:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="lume-eyebrow text-[#D9531C]">Demonstração de 7 minutos</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
              Veja a sua recepção a funcionar{" "}
              <span className="text-[#D9531C]">
                <HighlightWipe highlightColor="#FDE3D6" delay={160}>
                  antes de decidir.
                </HighlightWipe>
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5B6B8C] leading-[1.65]">
              Em 7 minutos vê uma conversa de WhatsApp acabar numa marcação registada. Depois,
              conversamos sobre o seu espaço.
            </p>
            <div className="mt-7 flex justify-center">
              <a
                href={CTA.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="lume-btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap"
              >
                <span>{DEMO_CTA_LABEL}</span>
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <DemoDeck />
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
            {/* Short 5-field Form Card */}
            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] text-[#101D35] p-5 sm:p-7 lg:p-9 shadow-[0_12px_36px_-12px_rgba(16,29,53,0.08)]">
              <h3 className="font-heading text-xl font-bold text-[#101D35]">
                Pedir demonstração para o meu espaço
              </h3>
              <p className="mt-2 text-sm text-[#5B6B8C]">
                Cinco perguntas rápidas para prepararmos a demonstração para a realidade do seu
                espaço de estética.
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
                        Pedido preparado para {spaceName}
                      </h4>
                      <p className="mt-1 text-sm text-[#5B6B8C] leading-relaxed">
                        Clique abaixo para enviar estes dados pelo WhatsApp oficial e agendar a sua
                        demonstração de 7 minutos.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={buildWhatsAppSummaryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm sm:whitespace-nowrap"
                    >
                      <span>Confirmar no WhatsApp</span>
                      <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="lume-btn-secondary-light inline-flex items-center justify-center text-sm sm:whitespace-nowrap cursor-pointer"
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="space-name"
                        className="text-xs font-semibold text-[#101D35] block"
                      >
                        Nome do espaço *
                      </label>
                      <input
                        id="space-name"
                        type="text"
                        required
                        value={spaceName}
                        onChange={(e) => {
                          setSpaceName(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="Ex: Espaço Beleza Luanda"
                        className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] placeholder:text-[#5B6B8C]/70 focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="space-whatsapp"
                        className="text-xs font-semibold text-[#101D35] block"
                      >
                        WhatsApp *
                      </label>
                      <input
                        id="space-whatsapp"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="+244 9XX XXX XXX"
                        className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] placeholder:text-[#5B6B8C]/70 focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="space-professionals"
                        className="text-xs font-semibold text-[#101D35] block"
                      >
                        Quantos profissionais tem
                      </label>
                      <select
                        id="space-professionals"
                        value={professionals}
                        onChange={(e) => setProfessionals(e.target.value)}
                        className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                      >
                        <option value="">Selecione</option>
                        <option value="1 a 2 profissionais">1 a 2 profissionais</option>
                        <option value="3 a 6 profissionais">3 a 6 profissionais</option>
                        <option value="7 a 15 profissionais">7 a 15 profissionais</option>
                        <option value="Mais de 15 profissionais">Mais de 15 profissionais</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="space-agenda"
                        className="text-xs font-semibold text-[#101D35] block"
                      >
                        Que agenda usa hoje
                      </label>
                      <input
                        id="space-agenda"
                        type="text"
                        value={currentAgenda}
                        onChange={(e) => setCurrentAgenda(e.target.value)}
                        placeholder="Ex: Google Agenda, papel, Excel, software próprio"
                        className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] placeholder:text-[#5B6B8C]/70 focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="space-bottleneck"
                      className="text-xs font-semibold text-[#101D35] block"
                    >
                      O que consome mais tempo hoje
                    </label>
                    <select
                      id="space-bottleneck"
                      value={biggestTimeSink}
                      onChange={(e) => setBiggestTimeSink(e.target.value)}
                      className="h-11 w-full rounded-[8px] border border-[#E7E3D9] bg-[#F5F3EE] px-3.5 text-sm text-[#101D35] focus:border-[#F36B32] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#F36B32] outline-none transition-colors"
                    >
                      <option value="">Selecione</option>
                      <option value="Responder a perguntas repetidas">Responder a perguntas</option>
                      <option value="Consultar horários na agenda">Consultar horários</option>
                      <option value="Confirmar marcações">Confirmar marcações</option>
                      <option value="Tudo o anterior">Tudo o anterior</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="lume-btn-secondary-light inline-flex w-full items-center justify-center gap-2 text-sm sm:whitespace-nowrap cursor-pointer"
                  >
                    <CalendarCheck className="size-4 shrink-0" aria-hidden="true" />
                    <span>Pedir a minha demonstração</span>
                    <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>

            {/* Info Stack */}
            <div className="space-y-5">
              <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6">
                <h3 className="font-heading text-base font-bold text-[#F5F3EE]">
                  Fale diretamente no WhatsApp
                </h3>
                <p className="mt-2 text-sm text-[#B8C0D0]">
                  Se preferir, abra já uma conversa com a mensagem pronta para pedir a sua
                  demonstração.
                </p>

                <ul className="mt-5 space-y-3.5 text-sm">
                  <li className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#2E9E6B] shrink-0">
                      <Phone className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-[#B8C0D0]">WhatsApp</p>
                      <p className="font-semibold text-[#F5F3EE] tabular-nums">
                        {site.whatsapp.number}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#F36B32] shrink-0">
                      <Mail className="size-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#B8C0D0]">Email</p>
                      <p className="font-semibold text-[#F5F3EE] break-all sm:break-normal">
                        {site.email}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#F4C542] shrink-0">
                      <MapPin className="size-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#B8C0D0]">Localização</p>
                      <p className="font-semibold text-[#F5F3EE]">{site.location}</p>
                    </div>
                  </li>
                </ul>

                <a
                  href={CTA.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lume-btn-secondary-dark mt-6 inline-flex w-full items-center justify-center gap-2 text-sm sm:whitespace-nowrap"
                >
                  <MessageSquare className="size-4 shrink-0" aria-hidden="true" />
                  <span>Abrir WhatsApp agora</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
