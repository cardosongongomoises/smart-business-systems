import { useState, useEffect, useRef } from "react";
import { CheckCheck, CheckCircle2, RotateCcw, ArrowRight, ClipboardList } from "lucide-react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { HighlightWipe, TypingDots } from "./MotionPrimitives";
import { DEMO_CTA_LABEL, whatsappLink } from "@/lib/site-config";
import clientAvatarImg from "@/assets/images/client_avatar_1795278040761.jpg";
import receptionAvatarImg from "@/assets/images/reception_avatar_1795278041065.jpg";

interface Message {
  from: "cliente" | "recepcao";
  text: string;
  time?: string;
  badge?: string;
}

const demoConversation: Message[] = [
  {
    from: "cliente",
    text: "Olá! Gostaria de saber o preço de uma limpeza de pele.",
    time: "21h45",
  },
  {
    from: "recepcao",
    text: "Olá, seja bem-vinda! Temos limpeza de pele. Posso apresentar as opções e ajudar a marcar uma sessão.",
    badge: "Informação autorizada",
  },
  {
    from: "cliente",
    text: "Quero marcar para amanhã à tarde.",
  },
  {
    from: "recepcao",
    text: "Tenho disponível às 14h00, 15h30 e 17h00. Qual prefere?",
    badge: "Agenda consultada",
  },
  {
    from: "cliente",
    text: "15h30, por favor.",
  },
  {
    from: "recepcao",
    text: "Marcação registada para amanhã às 15h30. Obrigada!",
    badge: "Marcação registada",
  },
];

const diagnosticQuestions = [
  {
    q: "1. Qual é o principal canal de atendimento e de marcações?",
    hint: "Mostra onde se concentram os pedidos que hoje competem com o atendimento presencial.",
  },
  {
    q: "2. Quem responde às mensagens?",
    hint: "Revela se a recepção ou o proprietário está a parar o trabalho para responder.",
  },
  {
    q: "3. Quantos pedidos recebem em dias movimentados?",
    hint: "Ajuda a perceber o volume real que fica à espera nos horários de pico.",
  },
  {
    q: "4. Que perguntas se repetem mais?",
    hint: "Indica o tempo gasto diariamente a repetir preços, serviços e horários.",
  },
  {
    q: "5. Como consultam a disponibilidade?",
    hint: "Mostra quantas trocas manuais exige cada marcação.",
  },
  {
    q: "6. Como confirmam as marcações?",
    hint: "Identifica falhas ou esquecimentos antes da sessão.",
  },
  {
    q: "7. Que sistema de agenda usam?",
    hint: "Permite validar logo no diagnóstico se a integração direta é possível.",
  },
  {
    q: "8. Que situações precisam sempre de atendimento humano?",
    hint: "Define as regras claras para passar a conversa à sua equipa.",
  },
];

export function AIAgent() {
  const [shownCount, setShownCount] = useState<number>(1);
  const [typingFrom, setTypingFrom] = useState<"cliente" | "recepcao" | null>(null);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [cycleSeed, setCycleSeed] = useState<number>(0);
  const [checkedQuestions, setCheckedQuestions] = useState<number[]>([]);
  const chatViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeouts.push(id);
    };

    setIsResetting(false);
    setShownCount(1);
    setTypingFrom(null);

    if (chatViewportRef.current) {
      chatViewportRef.current.scrollTop = 0;
    }

    // Real-time conversational cadence from 1st contact to final confirmation, then seamless loop
    schedule(() => setTypingFrom("recepcao"), 650);
    schedule(() => {
      setTypingFrom(null);
      setShownCount(2);
    }, 1950);

    schedule(() => setTypingFrom("cliente"), 3100);
    schedule(() => {
      setTypingFrom(null);
      setShownCount(3);
    }, 4050);

    schedule(() => setTypingFrom("recepcao"), 4650);
    schedule(() => {
      setTypingFrom(null);
      setShownCount(4);
    }, 6050);

    schedule(() => setTypingFrom("cliente"), 7200);
    schedule(() => {
      setTypingFrom(null);
      setShownCount(5);
    }, 8050);

    schedule(() => setTypingFrom("recepcao"), 8650);
    schedule(() => {
      setTypingFrom(null);
      setShownCount(6);
    }, 9950);

    schedule(() => setIsResetting(true), 13150);
    schedule(() => setCycleSeed((s) => s + 1), 13550);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [cycleSeed]);

  useEffect(() => {
    const el = chatViewportRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: shownCount <= 1 && !typingFrom ? "auto" : "smooth",
    });
  }, [shownCount, typingFrom]);

  const toggleQuestion = (idx: number) => {
    setCheckedQuestions((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx],
    );
  };

  const buildDiagnosticWhatsAppUrl = () => {
    if (checkedQuestions.length === 0) {
      return whatsappLink(
        "Olá, vi o site da Agentes Digital e quero avaliar o atendimento do meu WhatsApp com a vossa equipa.",
      );
    }
    const selected = [...checkedQuestions]
      .sort((a, b) => a - b)
      .map((idx) => diagnosticQuestions[idx]?.q)
      .filter(Boolean)
      .map((q) => `• ${q}`)
      .join("\n");
    return whatsappLink(
      `Olá, vi o site da Agentes Digital e avaliei o atendimento do meu WhatsApp. Pontos prioritários para o meu espaço:\n${selected}`,
    );
  };

  const demoProgressPct = Math.round((shownCount / demoConversation.length) * 100);
  const assessmentProgressPct = Math.round(
    (checkedQuestions.length / diagnosticQuestions.length) * 100,
  );

  return (
    <section
      id="agente-ia"
      className="py-14 sm:py-20 lg:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left Column: Section 9 Veja como funciona */}
          <div className="min-w-0">
            <Reveal>
              <p className="lume-eyebrow text-[#D9531C]">05 · Veja como funciona</p>
              <h2 className="mt-3 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
                Uma conversa que acaba numa{" "}
                <span className="text-[#D9531C]">
                  <HighlightWipe highlightColor="#FDE3D6" delay={140}>
                    marcação registada.
                  </HighlightWipe>
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-[1.65] text-[#5B6B8C]">
                Veja um exemplo simples de como a recepção digital atende fora de horas, consulta a
                disponibilidade e regista o horário escolhido sem precisar de intervenção manual.
              </p>
            </Reveal>

            {/* Chat Demo Card */}
            <Reveal delay={100} variant="scale">
              <TiltCard maxTilt={2.5}>
                <div className="mt-7 overflow-hidden rounded-[16px] border border-[#2A3D63] bg-[#101D35] text-[#F5F3EE] shadow-[0_24px_60px_-15px_rgba(16,29,53,0.22)]">
                  {/* Clean conversation progress bar */}
                  <div className="h-1 w-full bg-[#1A2A4A]">
                    <div
                      className="h-full bg-[#F36B32] transition-all duration-300"
                      style={{ width: `${demoProgressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 border-b border-[#2A3D63] px-5 sm:px-6 py-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative shrink-0">
                        <img
                          src={receptionAvatarImg}
                          alt="Recepção Digital"
                          referrerPolicy="no-referrer"
                          className="size-9 rounded-full border border-[#2A3D63] object-cover object-top"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute right-0 bottom-0 size-2.5 rounded-full bg-[#2E9E6B] ring-2 ring-[#101D35]"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-xs font-bold tracking-[0.04em] text-[#F5F3EE] truncate">
                          Recepção Digital · WhatsApp
                        </p>
                        <p className="text-xs truncate">
                          {typingFrom === "recepcao" ? (
                            <span className="font-medium text-[#2E9E6B]">
                              Online · a escrever...
                            </span>
                          ) : (
                            <span className="text-[#B8C0D0]">Online · Exemplo em tempo real</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 font-heading text-xs font-semibold text-[#F4C542] tabular-nums whitespace-nowrap">
                      0{shownCount} / 0{demoConversation.length}
                    </span>
                  </div>

                  <div
                    ref={chatViewportRef}
                    className={`px-4 sm:px-6 py-4 sm:py-5 h-[360px] sm:h-[410px] lg:h-[430px] overflow-y-auto transition-opacity duration-300 ${
                      isResetting ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="min-h-full flex flex-col justify-end space-y-3.5">
                      {demoConversation.slice(0, shownCount).map((m, i) => {
                        const isReception = m.from === "recepcao";
                        const isRead = !isReception && i < shownCount - 1;
                        return (
                          <div
                            key={`${cycleSeed}-${i}`}
                            className={`flex flex-col gap-1 animate-[lume-slide-up_280ms_cubic-bezier(0.22,1,0.36,1)] ${
                              isReception ? "items-start" : "items-end"
                            }`}
                          >
                            <div
                              className={`flex gap-2.5 max-w-[90%] sm:max-w-[84%] ${
                                isReception ? "" : "flex-row-reverse"
                              }`}
                            >
                              <img
                                src={isReception ? receptionAvatarImg : clientAvatarImg}
                                alt={
                                  isReception ? "Avatar da recepção digital" : "Avatar da cliente"
                                }
                                referrerPolicy="no-referrer"
                                className={`mt-0.5 size-8 shrink-0 rounded-full border object-cover object-top ${
                                  isReception ? "border-[#F36B32]/70" : "border-[#F5F3EE]/80"
                                }`}
                              />
                              <div>
                                <div
                                  className={`rounded-[12px] px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                                    isReception
                                      ? "border border-[#2A3D63] bg-[#1A2A4A] text-[#F5F3EE]"
                                      : "border border-[#F5F3EE] bg-[#F5F3EE] text-[#101D35] font-medium"
                                  }`}
                                >
                                  {m.text}
                                </div>
                                <div
                                  className={`mt-1 flex flex-wrap items-center gap-1.5 px-1 text-[11px] text-[#B8C0D0] ${
                                    isReception ? "" : "justify-end"
                                  }`}
                                >
                                  <span>{isReception ? "Recepção digital" : "Cliente"}</span>
                                  {m.time && <span className="tabular-nums">· {m.time}</span>}
                                  {!isReception && (
                                    <CheckCheck
                                      className={`size-3.5 ${
                                        isRead ? "text-[#3B82C4]" : "text-[#B8C0D0]/70"
                                      }`}
                                      aria-hidden="true"
                                    />
                                  )}
                                  {m.badge && (
                                    <span className="inline-flex items-center gap-1 font-medium text-[#F4C542]">
                                      <CheckCircle2 className="size-3" aria-hidden="true" />
                                      {m.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {typingFrom === "recepcao" && (
                        <div className="flex items-center gap-2.5 animate-[lume-slide-up_200ms_ease-out]">
                          <img
                            src={receptionAvatarImg}
                            alt="Avatar da recepção digital"
                            referrerPolicy="no-referrer"
                            className="size-8 shrink-0 rounded-full border border-[#F36B32]/70 object-cover object-top"
                          />
                          <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] px-3.5 py-2">
                            <TypingDots variant="dark" />
                          </div>
                        </div>
                      )}

                      {typingFrom === "cliente" && (
                        <div className="flex flex-row-reverse items-center gap-2.5 animate-[lume-slide-up_200ms_ease-out]">
                          <img
                            src={clientAvatarImg}
                            alt="Avatar da cliente"
                            referrerPolicy="no-referrer"
                            className="size-8 shrink-0 rounded-full border border-[#F5F3EE]/80 object-cover object-top"
                          />
                          <div className="rounded-[12px] border border-[#F5F3EE] bg-[#F5F3EE] px-3.5 py-2">
                            <TypingDots variant="light" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-[#2A3D63] bg-[#1A2A4A]/60 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setCycleSeed((s) => s + 1)}
                      className="inline-flex items-center gap-1.5 text-[#B8C0D0] hover:text-[#F5F3EE] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] rounded"
                    >
                      <RotateCcw className="size-3.5" aria-hidden="true" />
                      <span>Reiniciar conversa</span>
                    </button>
                    <span className="text-[11px] text-[#B8C0D0]">
                      Dados fictícios · Preços reais vêm do seu espaço
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>

          {/* Right Column: Transitional Diagnostic Guide (8 perguntas) */}
          <div id="avaliacao-whatsapp" className="min-w-0 scroll-mt-24">
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]">
                <div className="p-5 sm:p-7 lg:p-8 border-b border-[#E7E3D9]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F4C542] shrink-0">
                        <ClipboardList className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="lume-eyebrow text-[#D9531C]">Avaliação gratuita</p>
                        <h3 className="mt-0.5 font-heading text-xl font-bold text-[#101D35]">
                          8 perguntas para avaliar o atendimento do seu WhatsApp
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4 text-xs text-[#5B6B8C]">
                    <p>Assinale os pontos que gostaria de melhorar hoje antes da demonstração:</p>
                    <span className="shrink-0 font-heading font-bold text-[#101D35] tabular-nums">
                      {checkedQuestions.length} / 8
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F3EE]">
                    <div
                      className="h-full bg-[#2E9E6B] transition-all duration-200"
                      style={{ width: `${assessmentProgressPct}%` }}
                    />
                  </div>
                </div>

                <ul className="divide-y divide-[#E7E3D9]">
                  {diagnosticQuestions.map((item, idx) => {
                    const checked = checkedQuestions.includes(idx);
                    return (
                      <li key={item.q}>
                        <button
                          type="button"
                          onClick={() => toggleQuestion(idx)}
                          aria-pressed={checked}
                          className={`w-full text-left px-4 sm:px-6 py-3.5 sm:py-4 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F36B32] ${
                            checked ? "bg-[#F5F3EE]/85" : "bg-[#FFFFFF] hover:bg-[#F5F3EE]/45"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2
                              className={`size-4 mt-0.5 shrink-0 transition-colors ${
                                checked ? "text-[#2E9E6B]" : "text-[#B8C0D0]"
                              }`}
                              aria-hidden="true"
                            />
                            <div>
                              <p className="font-heading text-xs sm:text-sm font-bold text-[#101D35]">
                                {item.q}
                              </p>
                              <p className="mt-1 text-xs text-[#5B6B8C] leading-relaxed">
                                {item.hint}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="p-5 sm:p-7 lg:px-8 border-t border-[#E7E3D9] bg-[#F5F3EE]/40 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <a
                    href="#demonstracao-final"
                    className="lume-btn-primary inline-flex items-center justify-center gap-2 text-xs sm:text-sm sm:whitespace-nowrap"
                  >
                    <span>{DEMO_CTA_LABEL}</span>
                    <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                  </a>
                  <a
                    href={buildDiagnosticWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lume-btn-secondary-light inline-flex items-center justify-center text-xs sm:whitespace-nowrap"
                  >
                    {checkedQuestions.length > 0
                      ? `Enviar ${checkedQuestions.length} no WhatsApp`
                      : "Enviar no WhatsApp"}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
