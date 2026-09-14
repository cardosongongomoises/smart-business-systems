import {
  Bot,
  Filter,
  MessageSquare,
  Database,
  Calendar,
  Clock,
  Mail,
  UserCheck,
} from "lucide-react";
import { Reveal } from "../Reveal";

const features = [
  {
    icon: Bot,
    title: "AGENTE DE IA",
    subtitle: "Atendimento Conversacional",
    desc: "Responde, orienta e qualifica visitantes em tempo real. Não é um chatbot genérico — é um agente treinado no seu negócio.",
    badge: "01",
    tag: "IA Contextual",
  },
  {
    icon: Filter,
    title: "QUALIFICAÇÃO",
    subtitle: "Filtro Comercial Ativo",
    desc: "Descobre o orçamento, a urgência e a necessidade antes de passar ao humano. Só leads qualificados chegam à equipa.",
    badge: "02",
    tag: "Score de Lead",
  },
  {
    icon: MessageSquare,
    title: "WHATSAPP",
    subtitle: "Canal de Alto Engajamento",
    desc: "95% das mensagens de WhatsApp são lidas em menos de 3 minutos. Conectamos o seu site a esse poder.",
    badge: "03",
    tag: "API Oficial",
  },
  {
    icon: Database,
    title: "CRM",
    subtitle: "Centralização de Leads",
    desc: "Cada lead fica com nome, telefone, interesse e histórico — tudo rastreável num só lugar. Sem planilhas perdidas.",
    badge: "04",
    tag: "Funil Visual",
  },
  {
    icon: Calendar,
    title: "AGENDAMENTO",
    subtitle: "Calendário Automático",
    desc: "O cliente escolhe o horário. O sistema confirma, envia lembrete e bloqueia a agenda. Zero troca de e-mails.",
    badge: "05",
    tag: "Auto-Booking",
  },
  {
    icon: Clock,
    title: "FOLLOW-UP",
    subtitle: "Acompanhamento Inteligente",
    desc: "Dispara lembretes nos dias certos, no canal certo. Retoma leads que pararam de responder sem parecer insistente.",
    badge: "06",
    tag: "Cadência Ativa",
  },
  {
    icon: Mail,
    title: "E-MAIL",
    subtitle: "Confirmações e Lembretes",
    desc: "Reduz faltas em reuniões com lembretes automáticos 24h antes. Confirmações instantâneas que transmitem profissionalismo.",
    badge: "07",
    tag: "Automação",
  },
  {
    icon: UserCheck,
    title: "TRANSFERÊNCIA HUMANA",
    subtitle: "Handoff Transparente",
    desc: "Quando o lead está pronto, a IA passa o bastão. O vendedor recebe o histórico completo e o lead quente para fechar.",
    badge: "08",
    tag: "Equipa Notificada",
  },
];

export function AutomateFeatures() {
  return (
    <div className="py-20 sm:py-28 relative">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#60A5FA] uppercase">
              Recursos Nativos Integrados
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#F5F7FA] sm:text-4xl leading-tight">
              Os 8 pilares da infraestrutura <span className="text-gradient">Automate Pro</span>
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-3 text-sm sm:text-base text-[#A7B0BF]">
              Cada módulo foi desenhado para funcionar como uma máquina de conversão — do primeiro
              clique ao contrato assinado.
            </p>
          </Reveal>
        </div>

        {/* 8 Features Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="glass-card group h-full rounded-2xl border border-[#252C38] bg-[#0E121A] p-6 transition-all duration-300 hover:border-[#3B82F6]/50 hover:bg-[#151A23]">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-[#252C38] bg-[#151A23] text-[#3B82F6] transition-transform group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-[10px] text-[#667085]">PILAR {item.badge}</span>
                  </div>

                  <div className="mt-5">
                    <span className="inline-block font-mono text-[9px] font-bold uppercase tracking-wider text-[#A7B0BF]">
                      {item.subtitle}
                    </span>
                    <h4 className="mt-0.5 text-base font-bold text-[#F5F7FA]">{item.title}</h4>
                  </div>

                  <p className="mt-2.5 text-xs text-[#A7B0BF] leading-relaxed">{item.desc}</p>

                  <div className="mt-4 pt-3 border-t border-[#252C38]/60 flex items-center justify-between font-mono text-[10px] text-[#667085]">
                    <span>STATUS: OPERACIONAL</span>
                    <span className="text-[#3B82F6]">{item.tag}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
