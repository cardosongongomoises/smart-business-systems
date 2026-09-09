import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA, EMAIL, WHATSAPP_NUMBER, whatsappLink } from "@/lib/site-config";

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
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [servico, setServico] = useState("Website");
  const [mensagem, setMensagem] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `*Novo Pedido de Contacto - Agentes Digital*\n\n` +
      `*Nome:* ${nome}\n` +
      `*Empresa:* ${empresa || "Não informada"}\n` +
      `*Telefone/WhatsApp:* ${telefone}\n` +
      `*E-mail:* ${email || "Não informado"}\n` +
      `*Serviço de interesse:* ${servico}\n` +
      `*Mensagem:* ${mensagem || "Sem mensagem adicional"}`;

    const link = whatsappLink(text);
    window.open(link, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <>
      {/* SECTION 13 — CTA FINAL */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="relative mx-auto w-full max-w-5xl px-5 text-center sm:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              Transformação Digital
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Sua empresa está pronta para trabalhar de{" "}
              <span className="text-gradient">forma mais inteligente?</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Vamos analisar sua operação e identificar onde um website, um agente de IA ou uma
              automação pode gerar mais eficiência.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-primary shadow-elegant inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Falar com um especialista <ArrowRight className="size-4" />
              </a>
              <a
                href={CTA.diagnostic}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                <Calendar className="size-4 text-primary" /> Agendar diagnóstico
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Sem compromisso.</p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 14 — CONTACTO */}
      <section id="contacto" className="relative border-t border-border/60 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                  Contacto Directo
                </span>
                <h2 className="mt-6 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                  Inicie a transformação digital do seu negócio.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Preencha o formulário ou fale directamente pelos nossos canais oficiais em Angola.
                </p>
              </Reveal>

              <div className="mt-10 space-y-5">
                <Reveal delay={100}>
                  <a
                    href={CTA.specialist}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-transform hover:scale-[1.02]"
                  >
                    <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
                      <MessageCircle className="size-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        WhatsApp Oficial
                      </p>
                      <p className="mt-1 text-sm font-bold text-foreground">
                        +{WHATSAPP_NUMBER.slice(0, 3)} {WHATSAPP_NUMBER.slice(3, 6)}{" "}
                        {WHATSAPP_NUMBER.slice(6)}
                      </p>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={180}>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-transform hover:scale-[1.02]"
                  >
                    <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
                      <Mail className="size-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        E-mail
                      </p>
                      <p className="mt-1 text-sm font-bold text-foreground">{EMAIL}</p>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={260}>
                  <div className="glass-card flex items-center gap-4 rounded-2xl p-5">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
                      <MapPin className="size-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Localização
                      </p>
                      <p className="mt-1 text-sm font-bold text-foreground">
                        Angola • Lusofonia • Digital First
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={120}>
              <div className="glass-card rounded-3xl p-7 sm:p-10">
                <h3 className="text-xl font-bold">Solicitar proposta comercial</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Conte-nos brevemente sobre o seu projecto e entraremos em contacto rapidamente.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center">
                    <CheckCircle2 className="mx-auto size-10 text-primary" />
                    <p className="mt-3 font-bold text-foreground">Pedido enviado com sucesso!</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      O seu contacto foi encaminhado para a nossa equipa. Responderemos em breve.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-5 text-xs font-semibold text-primary underline underline-offset-4"
                    >
                      Enviar outro pedido
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="nome"
                          className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                        >
                          Nome *
                        </label>
                        <input
                          id="nome"
                          type="text"
                          required
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome completo"
                          className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="empresa"
                          className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                        >
                          Empresa
                        </label>
                        <input
                          id="empresa"
                          type="text"
                          value={empresa}
                          onChange={(e) => setEmpresa(e.target.value)}
                          placeholder="Nome da sua empresa"
                          className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="telefone"
                          className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                        >
                          Telefone / WhatsApp *
                        </label>
                        <input
                          id="telefone"
                          type="tel"
                          required
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                          placeholder="+244 9..."
                          className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                        >
                          E-mail
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="exemplo@empresa.com"
                          className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="servico"
                        className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                      >
                        Serviço de interesse
                      </label>
                      <select
                        id="servico"
                        value={servico}
                        onChange={(e) => setServico(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-surface text-foreground">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="mensagem"
                        className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                      >
                        Mensagem
                      </label>
                      <textarea
                        id="mensagem"
                        rows={4}
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Descreva brevemente o seu desafio actual ou objectivo..."
                        className="mt-2 w-full resize-none rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-gradient-primary shadow-elegant flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.01]"
                    >
                      <Send className="size-4" /> Enviar pedido
                    </button>
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
