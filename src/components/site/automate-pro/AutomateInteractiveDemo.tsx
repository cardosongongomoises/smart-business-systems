import { useState, useEffect } from "react";
import {
  Bot,
  User,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Database,
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
  note?: string;
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
    note: "Resposta em <10s",
  },
  {
    id: 3,
    from: "visitante",
    text: "Preciso de um sistema para a minha empresa.",
    time: "10:31",
  },
  {
    id: 4,
    from: "ia",
    text: "Perfeito. Para entender melhor a sua necessidade, posso fazer algumas perguntas rápidas?",
    time: "10:31",
    note: "Triagem consultiva",
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
    note: "Qualificação avançada",
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
    note: "Agendamento ativado",
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

  return (
    <div id="automate-demo" className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Simulação em tempo real</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-3xl font-extrabold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              Veja a automação acontecendo.
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-4 max-w-[65ch] text-base text-[#B8C0D0] leading-relaxed">
              Uma conversa que começa como dúvida do visitante e termina como reunião agendada,{" "}
              <strong className="text-[#F5F3EE]">sem a sua equipa tocar numa tecla.</strong>
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Chat Simulator Window */}
          <Reveal delay={150}>
            <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#2A3D63] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#F36B32] text-[#101D35]">
                    <Bot className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#F5F3EE]">
                      Atendimento · Automate Pro
                    </h4>
                    <p className="text-xs text-[#B8C0D0]">Widget ativo no website do cliente</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#2A3D63] bg-[#101D35] px-3 py-1.5 text-xs font-medium text-[#B8C0D0] hover:text-[#F5F3EE] hover:border-[#F36B32] transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Reiniciar</span>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="mt-5 space-y-3.5 min-h-[360px] max-h-[440px] overflow-y-auto pr-1">
                {CONVERSATION.slice(0, messagesCount).map((msg) => {
                  const isIA = msg.from === "ia";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col gap-1 transition-opacity duration-200 ${
                        isIA ? "items-start" : "items-end"
                      }`}
                    >
                      <div
                        className={`flex gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                          isIA ? "" : "flex-row-reverse"
                        }`}
                      >
                        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[#2A3D63] bg-[#101D35] text-xs">
                          {isIA ? (
                            <Bot className="size-3.5 text-[#F36B32]" aria-hidden="true" />
                          ) : (
                            <User className="size-3.5 text-[#B8C0D0]" aria-hidden="true" />
                          )}
                        </span>
                        <div>
                          <div
                            className={`rounded-[12px] px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                              isIA
                                ? "border border-[#2A3D63] bg-[#101D35] text-[#F5F3EE]"
                                : "bg-[#F5F3EE] text-[#101D35] font-medium"
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div className="mt-1 flex items-center gap-2 px-1 text-[11px] text-[#B8C0D0] tabular-nums">
                            <span>{msg.time}</span>
                            {msg.note && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-[#F4C542] font-medium">{msg.note}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 pl-8 pt-1">
                    <span className="text-xs text-[#B8C0D0]">A preparar resposta...</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#2A3D63] flex items-center justify-between text-xs text-[#B8C0D0]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-[#2E9E6B]" aria-hidden="true" />
                  Triagem em tempo real com base na sua empresa
                </span>
                {messagesCount < CONVERSATION.length && (
                  <button
                    type="button"
                    onClick={() => setMessagesCount(CONVERSATION.length)}
                    className="text-[#F36B32] hover:underline font-semibold text-xs cursor-pointer"
                  >
                    Exibir tudo
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          {/* Right Column: Background Events */}
          <Reveal delay={200}>
            <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#2A3D63] pb-4">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F5F3EE] flex items-center gap-2">
                  <Database className="size-4 text-[#F36B32]" aria-hidden="true" /> Ações em segundo
                  plano
                </h4>
                <span className="text-xs font-semibold text-[#2E9E6B]">Automatizado</span>
              </div>

              <p className="mt-4 text-xs text-[#B8C0D0] leading-relaxed">
                Enquanto a conversa acontece, o sistema executa as seguintes ações para não perder o
                contacto:
              </p>

              <div className="mt-5 space-y-3">
                {[
                  {
                    active: messagesCount >= 4,
                    title: "Lead qualificado",
                    desc: 'Intenção detetada: "Sistema de gestão e atendimento".',
                  },
                  {
                    active: messagesCount >= 5,
                    title: "Contacto registado",
                    desc: "Dados de sessão, origem e horário capturados.",
                  },
                  {
                    active: messagesCount >= 6,
                    title: "CRM atualizado",
                    desc: "Novo card criado no pipeline com resumo da conversa.",
                  },
                  {
                    active: messagesCount >= 7,
                    title: "Equipa notificada",
                    desc: "Alerta enviado por WhatsApp para o vendedor responsável.",
                  },
                ].map((ev) => (
                  <div
                    key={ev.title}
                    className={`flex items-start gap-3 rounded-[12px] border p-3.5 transition-colors duration-200 ${
                      ev.active
                        ? "border-[#2E9E6B] bg-[#101D35] text-[#F5F3EE]"
                        : "border-[#2A3D63] bg-[#101D35]/50 text-[#B8C0D0]"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                        ev.active ? "bg-[#2E9E6B] text-[#101D35]" : "bg-[#1A2A4A] text-[#5B6B8C]"
                      }`}
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-heading text-xs font-bold">{ev.title}</p>
                      <p className="text-xs text-[#B8C0D0] mt-0.5">{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-6 border-t border-[#2A3D63]">
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
                  className="lume-btn-primary w-full inline-flex items-center justify-center gap-2 text-sm"
                >
                  <Calendar className="size-4" aria-hidden="true" />
                  <span>Agendar demonstração</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <p className="mt-2.5 text-center text-xs text-[#B8C0D0]">
                  Demonstração aplicada ao domínio da sua empresa · sem compromisso
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
