import { useState, useEffect } from "react";
import {
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Send,
  Calendar,
  MessageSquare,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

interface Message {
  from: "cliente" | "ia";
  text: string;
  time: string;
  badge?: string;
}

const scenarioConsultoria: Message[] = [
  { from: "cliente", text: "Olá, gostaria de agendar uma reunião.", time: "14:20" },
  {
    from: "ia",
    text: "Claro. Posso ajudar. Qual serviço você procura?",
    time: "14:20",
    badge: "Resposta em 0.8s",
  },
  { from: "cliente", text: "Consultoria empresarial.", time: "14:21" },
  {
    from: "ia",
    text: "Perfeito. Tenho disponibilidade amanhã às 10h ou às 15h. Qual horário prefere?",
    time: "14:21",
    badge: "Calendário consultado",
  },
  { from: "cliente", text: "15h.", time: "14:21" },
  {
    from: "ia",
    text: "Reunião agendada para amanhã às 15h. Enviarei a confirmação por WhatsApp e e-mail.",
    time: "14:22",
    badge: "Sincronizado com CRM & Google Calendar",
  },
];

const scenarioAutomacao: Message[] = [
  { from: "cliente", text: "Vocês conseguem automatizar nosso WhatsApp comercial?", time: "10:04" },
  {
    from: "ia",
    text: "Sim! Integramos agentes inteligentes para qualificar leads, responder dúvidas e agendar reuniões diretamente no seu número oficial.",
    time: "10:04",
    badge: "Detecção de intenção",
  },
  { from: "cliente", text: "E se o cliente quiser falar com um atendente?", time: "10:05" },
  {
    from: "ia",
    text: "O agente transfere a conversa imediatamente com o resumo de tudo o que foi falado.",
    time: "10:05",
    badge: "Encaminhamento Humano",
  },
];

export function AIAgent() {
  const [selectedScenario, setSelectedScenario] = useState<"consultoria" | "automacao">(
    "consultoria",
  );
  const [shownCount, setShownCount] = useState<number>(2);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activeMessages =
    selectedScenario === "consultoria" ? scenarioConsultoria : scenarioAutomacao;

  useEffect(() => {
    setShownCount(1);
    let current = 1;
    const interval = setInterval(() => {
      if (current < activeMessages.length) {
        setIsTyping(true);
        setTimeout(() => {
          current += 1;
          setShownCount(current);
          setIsTyping(false);
        }, 800);
      } else {
        clearInterval(interval);
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [selectedScenario, activeMessages.length]);

  return (
    <section id="agente-ia" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              <ShieldCheck className="size-3.5" /> AUTOMATIZADO
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Seu próximo funcionário pode ser uma{" "}
              <span className="text-gradient">Inteligência Artificial.</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Um agente digital capaz de conversar com seus clientes 24 horas por dia, responder
              perguntas, qualificar oportunidades e agendar atendimentos.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
              <div className="rounded-2xl border border-border/80 bg-surface/50 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Zap className="size-4" />
                  <span className="font-mono text-sm font-bold">1.2s</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Tempo médio de resposta</p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-surface/50 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="size-4" />
                  <span className="font-mono text-sm font-bold">24 / 7 / 365</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Disponibilidade ininterrupta</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-primary shadow-elegant inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Falar com um especialista
              </a>
              <a
                href="#canais"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                Ver canais de atendimento
              </a>
            </div>
          </Reveal>
        </div>

        {/* Live Chat Simulator */}
        <Reveal delay={180}>
          <div className="glass-card shadow-elegant relative overflow-hidden rounded-3xl border border-border/80 p-5 sm:p-7">
            {/* Header Simulator */}
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
                  <Bot className="size-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-primary border-2 border-background" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground">Agente Digital IA</p>
                    <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary tracking-wider uppercase">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Atendimento oficial • Agentes Digital
                  </p>
                </div>
              </div>

              {/* Scenarios switch */}
              <div className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-surface-2/40 p-1">
                <button
                  type="button"
                  onClick={() => setSelectedScenario("consultoria")}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    selectedScenario === "consultoria"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Agendamento
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScenario("automacao")}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    selectedScenario === "automacao"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="mt-5 space-y-3 min-h-[290px] flex flex-col justify-end">
              {activeMessages.slice(0, shownCount).map((m, i) => {
                const isAI = m.from === "ia";
                return (
                  <div
                    key={i}
                    className={`flex flex-col gap-1 transition-all duration-300 ${
                      isAI ? "items-start" : "items-end"
                    }`}
                  >
                    <div
                      className={`flex gap-2.5 max-w-[86%] sm:max-w-[78%] ${
                        isAI ? "" : "flex-row-reverse"
                      }`}
                    >
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground">
                        {isAI ? (
                          <Bot className="size-3.5 text-primary" />
                        ) : (
                          <User className="size-3.5" />
                        )}
                      </span>
                      <div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            isAI
                              ? "border border-primary/40 bg-primary/10 text-foreground"
                              : "border border-border/80 bg-surface-2 text-foreground"
                          }`}
                        >
                          {m.text}
                        </div>
                        <div className="mt-1 flex items-center gap-2 px-1 text-[10px] text-muted-foreground">
                          <span>{m.time}</span>
                          {m.badge && (
                            <span className="inline-flex items-center gap-1 font-mono text-primary">
                              • <CheckCircle2 className="size-2.5" /> {m.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 pl-8 pt-1">
                  <span className="text-[11px] text-muted-foreground">Agente digitando...</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-1.5 animate-bounce rounded-full bg-primary"
                        style={{ animationDelay: `${d * 140}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setShownCount(activeMessages.length)}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="size-3" /> Ver conversa completa
              </button>
              <span className="inline-flex items-center gap-1 text-primary font-semibold">
                <CheckCircle2 className="size-3.5" /> Fluxo Automatizado Ativo
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
