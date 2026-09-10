import { useState } from "react";
import {
  Zap,
  Bot,
  UserCheck,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  CheckCircle2,
  Play,
  Pause,
  AlertCircle,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

interface AutomationRule {
  id: string;
  name: string;
  category: "ia" | "whatsapp" | "agenda" | "crm";
  description: string;
  trigger: string;
  action: string;
  active: boolean;
  executionsToday: number;
  lastRun: string;
}

const initialAutomations: AutomationRule[] = [
  {
    id: "auto-1",
    name: "Triagem & Qualificação Agente Digital v3.2",
    category: "ia",
    description: "Atendimento imediato via WhatsApp Business com os 4 pacotes oficiais em Kwanzas.",
    trigger: "Mensagem recebida de novo contacto no WhatsApp",
    action: "Classifica intenção, score e responde com proposta de diagnóstico",
    active: true,
    executionsToday: 58,
    lastRun: "Há 2 minutos",
  },
  {
    id: "auto-2",
    name: "Regra 7: Escalonamento Imediato para Humano",
    category: "crm",
    description: "Detecta pedidos de desconto, insatisfação ou atendente humano e desativa o bot.",
    trigger: "Palavra-chave de negociação de preço ou insatisfação",
    action: "Pausa o agente, notifica operador e altera status para ATENDENTE HUMANO",
    active: true,
    executionsToday: 9,
    lastRun: "Há 18 minutos",
  },
  {
    id: "auto-3",
    name: "Auto-Agendamento Google Meet & Calendar",
    category: "agenda",
    description: "Criação instantânea de sala no Google Meet assim que o horário é acordado.",
    trigger: "Confirmação de data/hora pelo contacto no chat",
    action: "Gera link meet.google.com e envia convite de calendário",
    active: true,
    executionsToday: 14,
    lastRun: "Há 41 minutos",
  },
  {
    id: "auto-4",
    name: "Lembrete WhatsApp (24h e 1h antes)",
    category: "whatsapp",
    description: "Envia mensagem amigável no WhatsApp lembrando da reunião de diagnóstico.",
    trigger: "Temporizador de proximidade da reunião",
    action: "Dispara mensagem WhatsApp com link da sala",
    active: true,
    executionsToday: 23,
    lastRun: "Há 1 hora",
  },
  {
    id: "auto-5",
    name: "Lead Scoring Preditivo de Urgência",
    category: "ia",
    description: "Atribuição automática de pontuação de 0 a 100 baseada em segmento e capacidade.",
    trigger: "Identificação de porte da empresa e pacote de interesse",
    action: "Atualiza qualificationScore no banco de leads em tempo real",
    active: true,
    executionsToday: 38,
    lastRun: "Há 6 minutos",
  },
  {
    id: "auto-6",
    name: "Webhook de Alerta Comercial (Slack/E-mail)",
    category: "crm",
    description: "Notifica a diretoria comercial quando um lead com score > 85 é qualificado.",
    trigger: "Score IA >= 85 ou pacote Domínio IA",
    action: "Envia payload JSON via Webhook com dados completos",
    active: false,
    executionsToday: 0,
    lastRun: "Ontem às 18:30",
  },
];

export function AutomationsView() {
  const [automations, setAutomations] = useState<AutomationRule[]>(initialAutomations);

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const next = !a.active;
          toast.success(
            next ? `Automação "${a.name}" ativada com sucesso!` : `Automação "${a.name}" pausada.`,
          );
          return { ...a, active: next };
        }
        return a;
      }),
    );
  };

  const totalActive = automations.filter((a) => a.active).length;
  const totalExecutions = automations.reduce((acc, a) => acc + a.executionsToday, 0);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080A0F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <h1 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Zap className="size-5 text-[#8B5CF6]" />
            <span>Motor de Automações & Regras Operacionais</span>
          </h1>
          <p className="text-xs text-[#A7B0BF] mt-1">
            Fluxos autônomos de atendimento, agendamento e sincronização do sistema
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold">
            <Activity className="size-3.5 animate-pulse" />
            <span>Motor Operacional Ativo</span>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <span className="text-xs text-[#667085]">Automações Ativas</span>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">
            {totalActive} / {automations.length}
          </p>
          <p className="text-[11px] text-[#8B5CF6] mt-1">Execução em background 24/7</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <span className="text-xs text-[#667085]">Disparos Realizados Hoje</span>
          <p className="text-2xl font-bold text-[#22C55E] mt-2 font-mono">{totalExecutions}</p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Latência média: 42ms</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <span className="text-xs text-[#667085]">Taxa de Confiabilidade</span>
          <p className="text-2xl font-bold text-[#3B82F6] mt-2 font-mono">99.8%</p>
          <p className="text-[11px] text-[#22C55E] mt-1">Sem falhas críticas registradas</p>
        </div>
      </div>

      {/* Grid of Automation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map((rule) => (
          <div
            key={rule.id}
            className={`rounded-[16px] border p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-all flex flex-col justify-between ${
              rule.active
                ? "border-[#252C38] bg-[#151A23] hover:border-[#8B5CF6]/50"
                : "border-[#252C38]/60 bg-[#0E121A] opacity-70"
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#252C38]">
                <div>
                  <h3 className="text-sm font-bold text-[#F5F7FA]">{rule.name}</h3>
                  <p className="text-xs text-[#A7B0BF] mt-0.5">{rule.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleAutomation(rule.id)}
                  className={`px-3 py-1 rounded-[8px] text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                    rule.active
                      ? "bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] hover:bg-[#22C55E]/25"
                      : "bg-[#252C38] text-[#A7B0BF] hover:text-white"
                  }`}
                >
                  {rule.active ? (
                    <>
                      <CheckCircle2 className="size-3" />
                      <span>Ativo</span>
                    </>
                  ) : (
                    <>
                      <Pause className="size-3" />
                      <span>Pausado</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 py-3 text-xs">
                <div>
                  <span className="text-[#667085] block text-[10px] font-semibold uppercase">
                    Gatilho (Trigger):
                  </span>
                  <span className="text-[#F5F7FA] font-mono text-[11px]">{rule.trigger}</span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px] font-semibold uppercase">
                    Ação Executada:
                  </span>
                  <span className="text-[#8B5CF6] font-mono text-[11px]">{rule.action}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#252C38] flex items-center justify-between text-xs font-mono">
              <span className="text-[#A7B0BF]">
                Disparos hoje: <strong className="text-white">{rule.executionsToday}</strong>
              </span>
              <span className="text-[11px] text-[#667085]">Último: {rule.lastRun}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Execution Logs Terminal Card */}
      <div className="rounded-[16px] border border-[#252C38] bg-[#0E121A] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-3">
          <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
            <Clock className="size-4 text-[#3B82F6]" />
            Logs de Execução em Tempo Real
          </h3>
          <span className="text-[11px] font-mono text-[#22C55E]">● 200 OK: Conectado</span>
        </div>

        <div className="space-y-2 font-mono text-xs text-[#A7B0BF]">
          <div className="p-2 rounded-[6px] bg-[#151A23] border border-[#252C38] flex items-center justify-between">
            <span>
              [15:32:04] <span className="text-[#8B5CF6]">AUTO_QUALIFY:</span> Lead "Dr. Sebastião"
              qualificado com score 92 (Autoridade).
            </span>
            <span className="text-[#22C55E] text-[10px]">38ms</span>
          </div>
          <div className="p-2 rounded-[6px] bg-[#151A23] border border-[#252C38] flex items-center justify-between">
            <span>
              [15:14:21] <span className="text-[#3B82F6]">GOOGLE_MEET:</span> Sala criada para
              reunião diagnóstica com Dra. Jandira.
            </span>
            <span className="text-[#22C55E] text-[10px]">112ms</span>
          </div>
          <div className="p-2 rounded-[6px] bg-[#151A23] border border-[#252C38] flex items-center justify-between">
            <span>
              [14:48:10] <span className="text-[#F59E0B]">RULE_7_ESCALATE:</span> Pedido de
              negociação detectado. Agente pausado.
            </span>
            <span className="text-[#22C55E] text-[10px]">22ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
