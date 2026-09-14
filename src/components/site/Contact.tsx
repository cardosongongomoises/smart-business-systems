import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA, EMAIL, WHATSAPP_DISPLAY } from "@/lib/site-config";
import { submitContactForm } from "@/lib/supabaseService";
import { toast } from "sonner";

const serviceOptions = [
  "Website",
  "Agente de IA",
  "WhatsApp",
  "Automação",
  "Sistema personalizado",
  "Não sei ainda",
];

export function Contact() {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [areaAtuacao, setAreaAtuacao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [servico, setServico] = useState("Website");
  const [mensagem, setMensagem] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setNome("");
    setEmpresa("");
    setAreaAtuacao("");
    setTelefone("");
    setEmail("");
    setServico("Website");
    setMensagem("");
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !nome.trim() ||
      !empresa.trim() ||
      !telefone.trim() ||
      !email.trim() ||
      !areaAtuacao.trim() ||
      !servico.trim() ||
      !mensagem.trim()
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Grava os dados no Supabase
      const res = await submitContactForm({
        nome,
        empresa,
        telefone,
        email,
        areaAtuacao,
        servico,
        mensagem,
        canal: "website",
      });

      if (res.success) {
        // Mostra a mensagem de agradecimento
        setSubmitted(true);
        // Após 5 segundos, reseta o formulário automaticamente
        setTimeout(() => {
          resetForm();
        }, 5000);
      } else {
        console.error("Falha ao gravar no Supabase:", res.error);
        toast.error(
          "Ocorreu um erro ao registar o seu pedido. Por favor tente novamente ou contacte-nos directamente.",
        );
      }
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
      toast.error("Ocorreu um erro ao processar o seu pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* SECTION 13: CTA FINAL */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#080A0F] border-t border-[#252C38]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.06),transparent_70%)]" />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 text-center sm:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#22C55E] uppercase">
              Diagnóstico Gratuito · Apenas 5 empresas/mês
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-6 text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl lg:text-5xl text-balance max-w-3xl mx-auto">
              Cada minuto sem automação são{" "}
              <span className="text-gradient">leads perdidos para a concorrência.</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#A7B0BF]">
              O diagnóstico é gratuito e sem compromisso. Em 30 minutos, mapeamos os pontos
              críticos da sua operação e mostramos exactamente como resolver — com números, não promessas.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[48px] items-center justify-center gap-2 rounded-[8px] bg-[#22C55E] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#16A34A]"
              >
                Ativar Agora <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={CTA.diagnostic}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[48px] items-center justify-center gap-2 rounded-[8px] border border-[#252C38] bg-transparent px-8 text-sm font-semibold text-[#F5F7FA] transition-colors hover:bg-[#151A23] hover:border-[#22C55E]"
              >
                <Calendar className="size-4 text-[#22C55E]" aria-hidden="true" /> Agendar
                diagnóstico gratuito
              </a>
            </div>
            <p className="mt-4 text-xs text-[#667085]">Diagnóstico gratuito limitado a 5 empresas por mês.</p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 14: CONTACTO */}
      <section
        id="contato"
        className="relative border-t border-[#252C38] py-20 sm:py-28 bg-[#0E121A] scroll-mt-20"
      >
        <span id="contacto" className="sr-only" />
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
                  Fale Directamente com um Especialista
                </span>
                <h2 className="mt-6 text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
                  Vai pensar que é mais um formulário que vai para o lixo.
                </h2>
                <p className="mt-4 text-base text-[#A7B0BF]">
                  Não é. Resposta pessoal em menos de 2 horas em dias úteis — do responsável técnico, não de um chatbot. Sem compromisso, sem pressão.
                </p>
              </Reveal>

              <div className="mt-10 space-y-4">
                <Reveal delay={100}>
                  <a
                    href={CTA.specialist}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 transition-[border-color,transform] hover:border-[#3B82F6]/50 hover:-translate-y-0.5"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#252C38] bg-[#0E121A] text-[#3B82F6]">
                      <MessageCircle className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold tracking-wider text-[#667085] uppercase">
                        WhatsApp Oficial
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-[#F5F7FA] font-mono">
                        {WHATSAPP_DISPLAY}
                      </p>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={180}>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-4 rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 transition-[border-color,transform] hover:border-[#3B82F6]/50 hover:-translate-y-0.5"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#252C38] bg-[#0E121A] text-[#3B82F6]">
                      <Mail className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold tracking-wider text-[#667085] uppercase">
                        E-mail Institucional
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-[#F5F7FA]">{EMAIL}</p>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={260}>
                  <div className="flex items-center gap-4 rounded-[16px] border border-[#252C38] bg-[#151A23] p-5">
                    <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#252C38] bg-[#0E121A] text-[#3B82F6]">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold tracking-wider text-[#667085] uppercase">
                        Sede & Atendimento
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-[#F5F7FA]">
                        Luanda & Malanje, Angola • Lusofonia
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={120}>
              <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-7 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
                <h3 className="text-xl font-bold text-[#F5F7FA]">Solicitar proposta personalizada</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#A7B0BF]">
                  Responda 6 perguntas rápidas — nossa equipa prepara uma proposta com números reais, não estimativas vagas. Resposta em menos de 24h úteis.
                </p>

                {submitted ? (
                  <div
                    aria-live="polite"
                    className="mt-8 rounded-[12px] border border-[#22C55E]/30 bg-[#22C55E]/10 p-8 text-center"
                  >
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30">
                      <CheckCircle2 className="size-6 text-[#22C55E]" aria-hidden="true" />
                    </div>
                    <p className="text-base font-bold text-[#F5F7FA]">
                      Solicitação recebida — estamos a analisar
                    </p>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#A7B0BF]">
                      Um especialista da Agentes Digital vai entrar em contacto pessoalmente
                      em breve. A sua proposta será preparada com base nos dados que forneceu.
                    </p>
                    <p className="mt-3 text-[11px] text-[#667085]">
                      O formulário será reiniciado automaticamente em instantes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5" aria-busy={isSubmitting}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="nome"
                          className="block text-[11px] font-bold tracking-wider text-[#A7B0BF] uppercase"
                        >
                          Nome do Responsável *
                        </label>
                        <input
                          id="nome"
                          name="nome"
                          type="text"
                          required
                          autoComplete="name"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome completo"
                          className="mt-2 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-4 py-3 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="empresa"
                          className="block text-[11px] font-bold tracking-wider text-[#A7B0BF] uppercase"
                        >
                          Nome da Empresa *
                        </label>
                        <input
                          id="empresa"
                          name="empresa"
                          type="text"
                          required
                          autoComplete="organization"
                          value={empresa}
                          onChange={(e) => setEmpresa(e.target.value)}
                          placeholder="Ex: Grupo Horizonte Lda"
                          className="mt-2 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-4 py-3 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="telefone"
                          className="block text-[11px] font-bold tracking-wider text-[#A7B0BF] uppercase"
                        >
                          Telefone / WhatsApp *
                        </label>
                        <input
                          id="telefone"
                          name="telefone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          required
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                          placeholder="+244 941 647 752"
                          className="mt-2 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-4 py-3 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-bold tracking-wider text-[#A7B0BF] uppercase"
                        >
                          E-mail Corporativo *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          spellCheck={false}
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="diretoria@empresa.ao"
                          className="mt-2 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-4 py-3 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="areaAtuacao"
                          className="block text-[11px] font-bold tracking-wider text-[#A7B0BF] uppercase"
                        >
                          Segmento de Atuação *
                        </label>
                        <input
                          id="areaAtuacao"
                          name="areaAtuacao"
                          type="text"
                          required
                          value={areaAtuacao}
                          onChange={(e) => setAreaAtuacao(e.target.value)}
                          placeholder="Ex: Saúde, Imobiliário, Logística…"
                          className="mt-2 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-4 py-3 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="servico"
                          className="block text-[11px] font-bold tracking-wider text-[#A7B0BF] uppercase"
                        >
                          Solução de Interesse *
                        </label>
                        <select
                          id="servico"
                          name="servico"
                          required
                          value={servico}
                          onChange={(e) => setServico(e.target.value)}
                          className="mt-2 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-4 py-3 text-sm text-[#F5F7FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                        >
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0E121A] text-[#F5F7FA]">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="mensagem"
                        className="block text-[11px] font-bold tracking-wider text-[#A7B0BF] uppercase"
                      >
                        Descreva o Objetivo ou Desafio Principal *
                      </label>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        rows={4}
                        required
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Descreva brevemente sua necessidade atual (ex: automatizar agendamento, criar portal institucional moderno, integrar CRM)..."
                        className="mt-2 w-full resize-none rounded-[8px] border border-[#252C38] bg-[#0E121A] px-4 py-3 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#3B82F6] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden="true" /> A enviar a sua solicitação…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" aria-hidden="true" /> Quero minha proposta personalizada
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[11px] text-[#667085]">
                      Sem compromisso · Resposta em 24h · Dados protegidos
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
