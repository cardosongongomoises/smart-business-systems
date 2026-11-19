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
    title: "Agente de IA",
    subtitle: "Atendimento Conversacional",
    desc: "Responde, orienta e qualifica visitantes em tempo real. Um agente treinado exclusivamente no seu negócio.",
    badge: "01",
    tag: "IA Contextual",
  },
  {
    icon: Filter,
    title: "Qualificação",
    subtitle: "Filtro Comercial Ativo",
    desc: "Descobre o orçamento, a urgência e a necessidade antes de passar ao humano. Só leads qualificados chegam à equipa.",
    badge: "02",
    tag: "Score de Lead",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    subtitle: "Canal de Alto Engajamento",
    desc: "95% das mensagens de WhatsApp são lidas em menos de 3 minutos. Conectamos o seu site a esse poder.",
    badge: "03",
    tag: "API Oficial",
  },
  {
    icon: Database,
    title: "CRM",
    subtitle: "Centralização de Leads",
    desc: "Cada lead fica com nome, telefone, interesse e histórico — tudo rastreável num só lugar.",
    badge: "04",
    tag: "Funil Visual",
  },
  {
    icon: Calendar,
    title: "Agendamento",
    subtitle: "Calendário Automático",
    desc: "O cliente escolhe o horário. O sistema confirma, envia lembrete e bloqueia a agenda sem troca de e-mails.",
    badge: "05",
    tag: "Auto-Booking",
  },
  {
    icon: Clock,
    title: "Follow-up",
    subtitle: "Acompanhamento Inteligente",
    desc: "Dispara lembretes nos dias certos, no canal certo. Retoma leads que pararam de responder.",
    badge: "06",
    tag: "Cadência Ativa",
  },
  {
    icon: Mail,
    title: "E-mail",
    subtitle: "Confirmações e Lembretes",
    desc: "Reduz faltas em reuniões com lembretes automáticos 24h antes e confirmações instantâneas.",
    badge: "07",
    tag: "Automação",
  },
  {
    icon: UserCheck,
    title: "Transferência Humana",
    subtitle: "Passagem Transparente",
    desc: "Quando o lead está pronto, a IA passa o bastão com o histórico completo para o vendedor fechar.",
    badge: "08",
    tag: "Equipa Notificada",
  },
];

export function AutomateFeatures() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Recursos nativos integrados</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-2xl font-bold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              Os 8 pilares da infraestrutura Automate Pro
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-3 max-w-[65ch] text-sm sm:text-base text-[#B8C0D0]">
              Cada módulo foi desenhado para funcionar como um sistema integrado — do primeiro
              clique ao contrato assinado.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 50}>
                <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 transition-colors duration-200 hover:border-[#F36B32]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#F36B32]">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-xs font-bold text-[#B8C0D0] tabular-nums">
                        {item.badge}
                      </span>
                    </div>

                    <div className="mt-5">
                      <span className="block text-xs font-medium text-[#B8C0D0]">
                        {item.subtitle}
                      </span>
                      <h4 className="mt-0.5 font-heading text-base font-bold text-[#F5F3EE]">
                        {item.title}
                      </h4>
                    </div>

                    <p className="mt-2.5 text-xs text-[#B8C0D0] leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#2A3D63] flex items-center justify-between text-xs">
                    <span className="text-[#B8C0D0]">Módulo ativo</span>
                    <span className="font-semibold text-[#F4C542]">{item.tag}</span>
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
