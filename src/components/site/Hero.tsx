import { useState, useEffect } from "react";
import {
  ArrowRight,
  PlayCircle,
  Bot,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { CTA } from "@/lib/site-config";

const flow = [
  {
    label: "CLIENTE INTERESSADO",
    detail: "Alguém manda mensagem às 2h da manhã",
    tag: "LEAD",
    desc: '"Quero saber o preço do vosso serviço"',
  },
  {
    label: "RESPOSTA IMEDIATA",
    detail: "Em menos de 10 segundos, sem ninguém online",
    tag: "8 SEGUNDOS",
    desc: "A IA responde como um consultor humano faria",
  },
  {
    label: "QUALIFICAÇÃO",
    detail: "Filtro automático: orçamento, urgência, perfil",
    tag: "FILTRO",
    desc: "Só leads qualificados chegam à sua equipa",
  },
  {
    label: "REUNIÃO AGENDADA",
    detail: "O lead agenda direto no chat — sem vai-e-vem",
    tag: "CONVERSÃO",
    desc: "Consulta marcada no Google Calendar automaticamente",
  },
];

export function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flow.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#080A0F]"
    >
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -top-40 left-1/3 size-[36rem] -translate-x-1/2 rounded-full bg-[#3B82F6]/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-20 right-1/4 size-[32rem] rounded-full bg-[#8B5CF6]/10 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-[#22C55E] uppercase">
              <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              Resultados comprovados em Angola
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-[#F5F7FA] sm:text-6xl">
              Enquanto sua equipa dorme,{" "}
              <span className="text-gradient">
                o seu negócio pode estar a fechar negócios.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A7B0BF] sm:text-lg">
              Imagina: um cliente manda mensagem às 2h da manhã. Em{" "}
              <strong className="text-[#22C55E]">menos de 10 segundos</strong>, o seu website
              atende, qualifica e agenda uma reunião — sem ninguém da sua equipa tocar num
              telemóvel. É isso que fazemos.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#22C55E] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#16A34A] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F]"
              >
                <span>Quero este resultado</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] border border-[#252C38] bg-transparent px-6 text-sm font-semibold text-[#F5F7FA] transition-colors hover:bg-[#151A23] hover:border-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <PlayCircle className="size-4 text-[#A7B0BF]" aria-hidden="true" />
                <span>Ver como funciona</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 pt-7 border-t border-[#252C38]/70">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-1 text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
                  <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  Diagnóstico gratuito
                </span>
                <span className="text-[10px] text-[#667085]">Apenas 5 empresas/mês</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4 text-xs text-[#A7B0BF]">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#22C55E]" />
                  </span>
                  <span className="font-medium text-[#F5F7FA]">+50 empresas a fechar negócios 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#3B82F6]" />
                  <span>Resposta em &lt;10 segundos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#8B5CF6]" />
                  <span>Atendimento 24/7/365</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#22C55E]" />
                  <span className="font-mono text-[11px] text-[#22C55E]">Zero leads perdidos</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="ai-card relative overflow-hidden rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-5 sm:p-6 shadow-[0_0_32px_-8px_rgba(139,92,246,0.25)]">
            <div className="flex items-center justify-between border-b border-[#252C38] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-[6px] bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  <Bot className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#F5F7FA] uppercase">
                    O que acontece quando alguém te contacta
                  </p>
                  <p className="text-[10px] font-mono text-[#A7B0BF]">Em tempo real — 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-1">
                <span className="size-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
                  ATIVO
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {flow.map((step, i) => {
                const isCurrent = activeStep === i;
                return (
                  <div key={step.label} className="group">
                    <div
                      onClick={() => setActiveStep(i)}
                      className={`cursor-pointer transition-all duration-200 rounded-[10px] border p-3 ${
                        isCurrent
                          ? "border-[#22C55E] bg-[#22C55E]/10 shadow-sm shadow-[#22C55E]/20"
                          : "border-[#252C38] bg-[#0E121A] hover:border-[#22C55E]/40 hover:bg-[#151A23]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex size-6 items-center justify-center rounded-[6px] font-mono text-[11px] font-bold transition-colors ${
                              isCurrent
                                ? "bg-[#22C55E] text-white"
                                : "border border-[#252C38] bg-[#151A23] text-[#A7B0BF]"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-xs font-bold tracking-wider uppercase ${
                                  isCurrent ? "text-[#22C55E]" : "text-[#F5F7FA]"
                                }`}
                              >
                                {step.label}
                              </p>
                              {isCurrent && (
                                <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-[#22C55E]/20 text-[#22C55E]">
                                  <Sparkles className="size-2.5" /> EM EXECUÇÃO
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#A7B0BF]">{step.detail}</p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider text-[#667085] uppercase">
                          {step.tag}
                        </span>
                      </div>

                      {isCurrent && (
                        <div className="mt-2.5 border-t border-[#252C38] pt-2 text-xs font-mono flex items-center justify-between text-[#F5F7FA]">
                          <span className="text-[#A7B0BF]">{step.desc}</span>
                          <span className="text-[10px] text-[#22C55E]">8.2s</span>
                        </div>
                      )}
                    </div>

                    {i < flow.length - 1 && (
                      <div className="mx-auto flex h-2.5 items-center justify-center">
                        <div
                          className={`h-full w-0.5 transition-colors duration-200 ${
                            isCurrent ? "bg-[#22C55E]" : "bg-[#252C38]"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#252C38] pt-3 text-[11px] text-[#A7B0BF]">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#22C55E]" />
                A fechar negócios enquanto dorme
              </span>
              <span className="font-mono text-[#22C55E]">24/7/365</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
