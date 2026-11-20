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
    title: "Atendimento Imediato",
    subtitle: "Resposta em <10 segundos",
    desc: "Responde, orienta e qualifica visitantes a qualquer hora com base nos serviços e regras da sua empresa.",
    badge: "01",
    tag: "<10 segundos",
  },
  {
    icon: Filter,
    title: "Qualificação Comercial",
    subtitle: "Filtro Antes da Equipa",
    desc: "Apura necessidade, urgência e orçamento antes de passar ao vendedor. Só clientes prontos chegam à equipa.",
    badge: "02",
    tag: "Filtro Ativo",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Oficial",
    subtitle: "Canal Principal de Vendas",
    desc: "Liga o seu site diretamente ao WhatsApp oficial da empresa, para nenhum pedido ficar sem resposta.",
    badge: "03",
    tag: "API Oficial",
  },
  {
    icon: Database,
    title: "Registo de Contactos",
    subtitle: "Zero Pedidos Perdidos",
    desc: "Cada contacto fica guardado com nome, telefone, interesse e histórico, tudo organizado num só lugar.",
    badge: "04",
    tag: "CRM Incluído",
  },
  {
    icon: Calendar,
    title: "Marcação Automática",
    subtitle: "Reuniões na Agenda",
    desc: "O cliente escolhe o horário no próprio chat. O sistema confirma e bloqueia a agenda sem troca de mensagens.",
    badge: "05",
    tag: "Agenda Direta",
  },
  {
    icon: Clock,
    title: "Follow-up Automático",
    subtitle: "Retoma Sem Esquecimentos",
    desc: "Dispara lembretes nos dias certos, no canal certo, para retomar contactos que pararam de responder.",
    badge: "06",
    tag: "Cadência Ativa",
  },
  {
    icon: Mail,
    title: "Lembretes de Reunião",
    subtitle: "Menos Faltas Marcadas",
    desc: "Envia confirmações imediatas e lembretes antes da hora para reduzir ausências nas reuniões.",
    badge: "07",
    tag: "Confirmação",
  },
  {
    icon: UserCheck,
    title: "Passagem para a Equipa",
    subtitle: "Fecho Humano Informado",
    desc: "Quando o cliente está pronto para fechar, o sistema passa a conversa com o histórico completo para o vendedor.",
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
            <p className="lume-eyebrow text-[#F36B32]">O que ligamos ao seu site</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-2xl font-bold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              Tudo o que precisa para transformar visitas em reuniões marcadas
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-3 max-w-[65ch] text-sm sm:text-base text-[#B8C0D0]">
              Sem reconstruir o seu website atual. Ligamos atendimento, qualificação e marcação de
              ponta a ponta.
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
