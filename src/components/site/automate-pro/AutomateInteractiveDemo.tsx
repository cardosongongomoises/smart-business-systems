import { useState, useEffect } from "react";
import {
  Bot,
  User,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Database,
  Bell,
  Check,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { CTA } from "@/lib/site-config";
import { trackAutomateProEvent } from "./automateAnalytics";

interface DemoMessage {
  id: number;
  from: "visitante" | "ia";
  text: string;
  time: string;
  badge?: string;
}

const CONVERSATION: DemoMessage[] = [
  {
    id: 1,
    from: "visitante",
    text: "Olá, gostaria de saber mais sobre os serviços.",
    time: "10:30",
  },
  {
    id: 2,
    from: "ia",
    text: "Olá! Posso ajudá-lo. Qual serviço procura?",
    time: "10:30",
    badge: "Resposta em 0.6s",
  },
  {
    id: 3,
    from: "visitante",
    text: "Preciso de um sistema para minha empresa.",
    time: "10:31",
  },
  {
    id: 4,
    from: "ia",
    text: "Perfeito. Para entender melhor sua necessidade, posso fazer algumas perguntas rápidas?",
    time: "10:31",
    badge: "Triagem consultiva",
  },
  {
    id: 5,
    from: "visitante",
    text: "Sim.",
    time: "10:31",
  },
  {
    id: 6,
    from: "ia",
    text: "Qual é o principal processo que deseja automatizar?",
    time: "10:32",
    badge: "Qualificação avançada",
  },
  {
    id: 7,
    from: "visitante",
    text: "Gestão comercial e atendimento a novos clientes.",
    time: "10:32",
  },
  {
    id: 8,
    from: "ia",
    text: "Excelente. Temos módulos específicos para gestão de leads e atendimento automatizado. Tenho horários disponíveis amanhã às 11h ou às 16h para uma demonstração com a nossa equipa técnica. Qual prefere?",
    time: "10:32",
    badge: "Agendamento ativado",
  },
];

export function AutomateInteractiveDemo() {
  const [messagesCount, setMessagesCount] = useState(2);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (messagesCount >= CONVERSATION.length) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessagesCount((prev) => Math.min(prev + 1, CONVERSATION.length));
        setIsTyping(false);
      }, 700);
    }, 2200);

    return () => clearTimeout(timer);
  }, [messagesCount]);

  const handleReset = () => {
    setMessagesCount(2);
    trackAutomateProEvent("automate_demo_click", { action: "reset_chat" });
  };

  const isCompleted = messagesCount >= 6;
  const isFullyFinished = messagesCount >= CONVERSATION.length;

  return (
    <div
      id="automate-demo"
      className="py-20 sm:py-28 relative border-t border-[#252C38]/60 bg-[#080A0F]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#C084FC] uppercase">
              Simulação em Tempo Real
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[#F5F7FA] sm:text-5xl leading-tight">
              Veja a <span className="text-gradient">automação acontecendo.</span>
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 text-base sm:text-lg text-[#A7B0BF] leading-relaxed">
              Uma conversa que começa como dúvida do visitante e termina como reunião agendada —{" "}
              <span className="text-[#F5F7FA] font-semibold">sem a sua equipa tocar em uma tecla.</span>
            </p>
          </Reveal>
        </div>

        {/* Demo Interface: Chat on Left, System Events on Right */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Chat Simulator Window */}
          <Reveal delay={180}>
            <div className="rounded-3xl border border-[#252C38] bg-[#0E121A] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-[#252C38] pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] text-white">
                    <Bot className="size-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#22C55E] ring-2 ring-[#0E121A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#F5F7FA]">Agente IA • Automate Pro</h4>
                      <span className="rounded bg-[#22C55E]/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#22C55E] uppercase">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-xs text-[#A7B0BF]">Widget ativo no website do cliente</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs text-[#A7B0BF] hover:text-[#F5F7FA] hover:border-[#3B82F6] transition-colors"
                >
                  <RotateCcw className="size-3.5" />
                  <span className="hidden sm:inline">Reiniciar</span>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="mt-5 space-y-3.5 min-h-[380px] max-h-[460px] overflow-y-auto pr-1">
                {CONVERSATION.slice(0, messagesCount).map((msg) => {
                  const isIA = msg.from === "ia";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col gap-1 transition-all duration-300 ${
                        isIA ? "items-start" : "items-end"
                      }`}
                    >
                      <div
                        className={`flex gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                          isIA ? "" : "flex-row-reverse"
                        }`}
                      >
                        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[#252C38] bg-[#151A23] text-xs">
                          {isIA ? (
                            <Bot className="size-3.5 text-[#3B82F6]" />
                          ) : (
                            <User className="size-3.5 text-[#A7B0BF]" />
                          )}
                        </span>
                        <div>
                          <div
                            className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                              isIA
                                ? "border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#F5F7FA]"
                                : "border border-[#252C38] bg-[#151A23] text-[#F5F7FA]"
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div className="mt-1 flex items-center gap-2 px-1 text-[10px] text-[#667085]">
                            <span>{msg.time}</span>
                            {msg.badge && (
                              <span className="inline-flex items-center gap-1 font-mono text-[#3B82F6]">
                                • <Sparkles className="size-2.5" /> {msg.badge}
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
                    <span className="text-[11px] text-[#A7B0BF]">IA formulando resposta...</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="size-1.5 animate-bounce rounded-full bg-[#3B82F6]"
                          style={{ animationDelay: `${d * 140}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Chat footer note */}
              <div className="mt-4 pt-3 border-t border-[#252C38] flex items-center justify-between text-xs text-[#667085]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-[#22C55E]" />
                  Triagem em tempo real com base na sua empresa
                </span>
                {messagesCount < CONVERSATION.length && (
                  <button
                    type="button"
                    onClick={() => setMessagesCount(CONVERSATION.length)}
                    className="text-[#3B82F6] hover:underline font-medium text-[11px]"
                  >
                    Exibir tudo
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          {/* Right Column: System Automated Events Checklist */}
          <Reveal delay={240}>
            <div className="space-y-5">
              <div className="rounded-3xl border border-[#252C38] bg-[#0E121A] p-6 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between border-b border-[#252C38] pb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#F5F7FA] flex items-center gap-2">
                    <Database className="size-4 text-[#3B82F6]" /> Ações em Segundo Plano
                  </h4>
                  <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/20">
                    AUTOMATIZADO
                  </span>
                </div>

                <p className="mt-4 text-xs text-[#A7B0BF]">
                  Enquanto a conversa ocorre, a infraestrutura da Agentes Digital executa as
                  seguintes ações automáticas nos seus sistemas:
                </p>

                {/* 4 Required Checklist Items from prompt */}
                <div className="mt-5 space-y-3">
                  {/* Item 1: Lead Qualificado */}
                  <div
                    className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all duration-500 ${
                      messagesCount >= 4
                        ? "border-[#22C55E]/40 bg-[#22C55E]/5 text-[#F5F7FA]"
                        : "border-[#252C38] bg-[#151A23]/50 text-[#667085]"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                        messagesCount >= 4
                          ? "bg-[#22C55E]/20 text-[#22C55E]"
                          : "bg-[#252C38] text-[#667085]"
                      }`}
                    >
                      <Check className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold font-mono">✓ Lead qualificado</p>
                      <p className="text-[11px] text-[#A7B0BF]">
                        Intenção de compra detectada: "Sistema de gestão e atendimento".
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Contacto Registrado */}
                  <div
                    className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all duration-500 ${
                      messagesCount >= 5
                        ? "border-[#22C55E]/40 bg-[#22C55E]/5 text-[#F5F7FA]"
                        : "border-[#252C38] bg-[#151A23]/50 text-[#667085]"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                        messagesCount >= 5
                          ? "bg-[#22C55E]/20 text-[#22C55E]"
                          : "bg-[#252C38] text-[#667085]"
                      }`}
                    >
                      <Check className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold font-mono">✓ Contacto registrado</p>
                      <p className="text-[11px] text-[#A7B0BF]">
                        Dados de sessão, origem e horário capturados sem fricção.
                      </p>
                    </div>
                  </div>

                  {/* Item 3: CRM Atualizado */}
                  <div
                    className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all duration-500 ${
                      messagesCount >= 6
                        ? "border-[#22C55E]/40 bg-[#22C55E]/5 text-[#F5F7FA]"
                        : "border-[#252C38] bg-[#151A23]/50 text-[#667085]"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                        messagesCount >= 6
                          ? "bg-[#22C55E]/20 text-[#22C55E]"
                          : "bg-[#252C38] text-[#667085]"
                      }`}
                    >
                      <Check className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold font-mono">✓ CRM atualizado</p>
                      <p className="text-[11px] text-[#A7B0BF]">
                        Novo card criado no pipeline de vendas com notas da conversa.
                      </p>
                    </div>
                  </div>

                  {/* Item 4: Equipa Notificada */}
                  <div
                    className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all duration-500 ${
                      messagesCount >= 7
                        ? "border-[#22C55E]/40 bg-[#22C55E]/5 text-[#F5F7FA]"
                        : "border-[#252C38] bg-[#151A23]/50 text-[#667085]"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                        messagesCount >= 7
                          ? "bg-[#22C55E]/20 text-[#22C55E]"
                          : "bg-[#252C38] text-[#667085]"
                      }`}
                    >
                      <Check className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold font-mono">✓ Equipa notificada</p>
                      <p className="text-[11px] text-[#A7B0BF]">
                        Alerta enviado por WhatsApp para o vendedor responsável.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conversion CTA Block */}
                <div className="mt-7 pt-6 border-t border-[#252C38]">
                  <a
                    href={CTA.automateDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackAutomateProEvent("automate_demo_click", {
                        location: "demo_section",
                        label: "Agendar uma demonstração",
                      })
                    }
                    className="w-full inline-flex h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-6 text-sm font-bold text-white shadow-[0_12px_24px_rgba(59,130,246,0.25)] transition-transform hover:scale-[1.02]"
                  >
                    <Calendar className="size-4" />
                    <span>Agendar uma demonstração</span>
                    <ArrowRight className="size-4" />
                  </a>
                  <p className="mt-2.5 text-center text-[11px] text-[#667085]">
                    Demonstração interativa aplicada ao domínio da sua empresa — sem compromisso
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
