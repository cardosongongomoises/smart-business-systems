import {
  Globe,
  Bot,
  MessageSquare,
  Mail,
  Database,
  Calendar,
  Clock,
  UserCheck,
  ArrowDown,
  Sparkles,
  Cpu,
} from "lucide-react";
import { Reveal } from "../Reveal";

export function AutomateArchitecture() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#252C38]/60 bg-[#0E121A]/40">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#C084FC] uppercase">
              Topologia do Sistema
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[#F5F7FA] sm:text-5xl leading-tight">
              Arquitetura tecnológica <span className="text-gradient">de alta precisão</span>
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-3 text-sm sm:text-base text-[#A7B0BF]">
              Cada camada foi projetada para operar sem perda de dados e sem latência —{" "}
              <span className="text-[#F5F7FA] font-semibold">um sistema orquestrado, não uma collection de ferramentas soltas.</span>
            </p>
          </Reveal>
        </div>

        {/* Visual Architecture Tree */}
        <Reveal delay={180}>
          <div className="mt-14 max-w-2xl mx-auto flex flex-col items-center">
            {/* 1. WEBSITE */}
            <div className="group relative w-full sm:w-80 rounded-2xl border border-[#252C38] bg-[#0E121A] p-4 text-center transition-all hover:border-[#3B82F6] hover:bg-[#151A23] shadow-md">
              <div className="flex items-center justify-center gap-2 text-xs font-bold font-mono text-[#F5F7FA]">
                <Globe className="size-4 text-[#3B82F6]" /> WEBSITE EXISTENTE
              </div>
              <p className="text-[11px] text-[#A7B0BF] mt-1">
                Interface de captação — onde o visitante decide se fica ou vai
              </p>
            </div>

            {/* Down Connector */}
            <div className="h-7 w-px bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6] relative my-1">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-[#3B82F6] animate-ping" />
            </div>

            {/* 2. IA */}
            <div className="group relative w-full sm:w-80 rounded-2xl border border-[#8B5CF6]/50 bg-[#151A23] p-4 text-center shadow-[0_0_24px_rgba(139,92,246,0.2)]">
              <div className="flex items-center justify-center gap-2 text-xs font-bold font-mono text-[#C084FC]">
                <Bot className="size-4 text-[#8B5CF6]" /> NÚCLEO DE INTELIGÊNCIA ARTIFICIAL
              </div>
              <p className="text-[11px] text-[#A7B0BF] mt-1">
                Compreensão semântica, triagem em tempo real e roteamento inteligente
              </p>
            </div>

            {/* Branching down to WHATSAPP and EMAIL */}
            <div className="h-6 w-px bg-[#8B5CF6] my-1" />

            <div className="w-full max-w-md relative">
              {/* Horizontal bridge */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />

              <div className="grid grid-cols-2 gap-4 mt-3">
                {/* 3A. WHATSAPP */}
                <div className="rounded-xl border border-[#252C38] bg-[#0E121A] p-3 text-center transition-colors hover:border-[#22C55E]/60">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold font-mono text-[#22C55E]">
                    <MessageSquare className="size-3.5" /> WHATSAPP
                  </div>
                  <p className="text-[10px] text-[#A7B0BF] mt-0.5">Mensagens diretas</p>
                </div>

                {/* 3B. EMAIL */}
                <div className="rounded-xl border border-[#252C38] bg-[#0E121A] p-3 text-center transition-colors hover:border-[#3B82F6]/60">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold font-mono text-[#60A5FA]">
                    <Mail className="size-3.5" /> E-MAIL
                  </div>
                  <p className="text-[10px] text-[#A7B0BF] mt-0.5">Confirmações automáticas</p>
                </div>
              </div>

              {/* Converging line */}
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent" />
            </div>

            <div className="h-6 w-px bg-[#3B82F6] my-1" />

            {/* 4. CRM */}
            <div className="group relative w-full sm:w-80 rounded-2xl border border-[#252C38] bg-[#0E121A] p-4 text-center transition-all hover:border-[#3B82F6] hover:bg-[#151A23]">
              <div className="flex items-center justify-center gap-2 text-xs font-bold font-mono text-[#F5F7FA]">
                <Database className="size-4 text-[#3B82F6]" /> CRM & BANCO DE DADOS
              </div>
              <p className="text-[11px] text-[#A7B0BF] mt-1">
                Armazenamento seguro e histórico de interações
              </p>
            </div>

            <div className="h-6 w-px bg-[#3B82F6] my-1" />

            {/* 5. AGENDAMENTO */}
            <div className="group relative w-full sm:w-80 rounded-2xl border border-[#252C38] bg-[#0E121A] p-4 text-center transition-all hover:border-[#8B5CF6] hover:bg-[#151A23]">
              <div className="flex items-center justify-center gap-2 text-xs font-bold font-mono text-[#F5F7FA]">
                <Calendar className="size-4 text-[#8B5CF6]" /> AGENDAMENTO AUTOMÁTICO
              </div>
              <p className="text-[11px] text-[#A7B0BF] mt-1">
                Sincronização de slots e envio de links
              </p>
            </div>

            <div className="h-6 w-px bg-[#8B5CF6] my-1" />

            {/* 6. FOLLOW-UP */}
            <div className="group relative w-full sm:w-80 rounded-2xl border border-[#252C38] bg-[#0E121A] p-4 text-center transition-all hover:border-[#F59E0B] hover:bg-[#151A23]">
              <div className="flex items-center justify-center gap-2 text-xs font-bold font-mono text-[#F5F7FA]">
                <Clock className="size-4 text-[#F59E0B]" /> FOLLOW-UP INTELIGENTE
              </div>
              <p className="text-[11px] text-[#A7B0BF] mt-1">
                Lembretes e nutrição contínua da oportunidade
              </p>
            </div>

            <div className="h-6 w-px bg-[#F59E0B] my-1" />

            {/* 7. HUMANO */}
            <div className="group relative w-full sm:w-80 rounded-2xl border border-[#22C55E]/40 bg-[#151A23] p-4 text-center shadow-[0_0_20px_rgba(34,197,94,0.15)]">
              <div className="flex items-center justify-center gap-2 text-xs font-bold font-mono text-[#4ADE80]">
                <UserCheck className="size-4 text-[#22C55E]" /> EQUIPA COMERCIAL (HUMANO)
              </div>
              <p className="text-[11px] text-[#A7B0BF] mt-1">
                Lead qualificado + histórico completo = fechamento garantido
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
