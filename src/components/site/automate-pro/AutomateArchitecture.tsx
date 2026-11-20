import {
  Globe,
  Bot,
  MessageSquare,
  Mail,
  Database,
  Calendar,
  Clock,
  UserCheck,
} from "lucide-react";
import { Reveal } from "../Reveal";

export function AutomateArchitecture() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Como ligamos ao seu site</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-3xl font-extrabold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              Do clique no seu site atual à reunião marcada na agenda
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-3 max-w-[65ch] text-sm sm:text-base text-[#B8C0D0]">
              Cada passo garante que nenhum pedido se perde.{" "}
              <strong className="text-[#F5F3EE]">
                Um processo completo, sem ferramentas soltas nem trabalho manual.
              </strong>
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="mt-12 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-full sm:w-80 rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4 text-center">
              <div className="flex items-center justify-center gap-2 font-heading text-xs font-bold text-[#F5F3EE]">
                <Globe className="size-4 text-[#F36B32]" aria-hidden="true" /> WEBSITE EXISTENTE
              </div>
              <p className="text-xs text-[#B8C0D0] mt-1">
                Interface de captação onde o visitante inicia contacto
              </p>
            </div>

            <div className="h-6 w-px bg-[#2A3D63]" />

            <div className="w-full sm:w-80 rounded-[12px] border border-[#F36B32] bg-[#1A2A4A] p-4 text-center">
              <div className="flex items-center justify-center gap-2 font-heading text-xs font-bold text-[#F4C542]">
                <Bot className="size-4 text-[#F36B32]" aria-hidden="true" /> ATENDIMENTO E TRIAGEM
              </div>
              <p className="text-xs text-[#B8C0D0] mt-1">
                Resposta em &lt;10 segundos, qualificação e encaminhamento
              </p>
            </div>

            <div className="h-5 w-px bg-[#2A3D63]" />

            <div className="w-full max-w-md">
              <div className="h-px w-full bg-[#2A3D63]" />
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 font-heading text-xs font-bold text-[#2E9E6B]">
                    <MessageSquare className="size-3.5" aria-hidden="true" /> WHATSAPP
                  </div>
                  <p className="text-[11px] text-[#B8C0D0] mt-0.5">Mensagens diretas</p>
                </div>
                <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 font-heading text-xs font-bold text-[#3B82C4]">
                    <Mail className="size-3.5" aria-hidden="true" /> E-MAIL
                  </div>
                  <p className="text-[11px] text-[#B8C0D0] mt-0.5">Confirmações automáticas</p>
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-[#2A3D63]" />
            </div>

            <div className="h-5 w-px bg-[#2A3D63]" />

            <div className="w-full sm:w-80 rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4 text-center">
              <div className="flex items-center justify-center gap-2 font-heading text-xs font-bold text-[#F5F3EE]">
                <Database className="size-4 text-[#F36B32]" aria-hidden="true" /> CRM &amp; BASE DE
                DADOS
              </div>
              <p className="text-xs text-[#B8C0D0] mt-1">
                Armazenamento seguro e histórico de interações
              </p>
            </div>

            <div className="h-5 w-px bg-[#2A3D63]" />

            <div className="w-full sm:w-80 rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4 text-center">
              <div className="flex items-center justify-center gap-2 font-heading text-xs font-bold text-[#F5F3EE]">
                <Calendar className="size-4 text-[#F4C542]" aria-hidden="true" /> AGENDAMENTO
                AUTOMÁTICO
              </div>
              <p className="text-xs text-[#B8C0D0] mt-1">
                Sincronização de horários e envio de confirmações
              </p>
            </div>

            <div className="h-5 w-px bg-[#2A3D63]" />

            <div className="w-full sm:w-80 rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4 text-center">
              <div className="flex items-center justify-center gap-2 font-heading text-xs font-bold text-[#F5F3EE]">
                <Clock className="size-4 text-[#F36B32]" aria-hidden="true" /> FOLLOW-UP INTELIGENTE
              </div>
              <p className="text-xs text-[#B8C0D0] mt-1">
                Lembretes e nutrição contínua da oportunidade
              </p>
            </div>

            <div className="h-5 w-px bg-[#2A3D63]" />

            <div className="w-full sm:w-80 rounded-[12px] border border-[#2E9E6B] bg-[#1A2A4A] p-4 text-center">
              <div className="flex items-center justify-center gap-2 font-heading text-xs font-bold text-[#2E9E6B]">
                <UserCheck className="size-4" aria-hidden="true" /> EQUIPA COMERCIAL (HUMANO)
              </div>
              <p className="text-xs text-[#B8C0D0] mt-1">
                Lead qualificado + histórico completo para fecho
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
