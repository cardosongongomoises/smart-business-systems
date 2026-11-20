import { useState, useEffect } from "react";
import {
  Globe,
  Bot,
  MessageSquare,
  Database,
  Calendar,
  Clock,
  UserCheck,
  Activity,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { trackAutomateProEvent } from "./automateAnalytics";

interface FlowNode {
  id: string;
  name: string;
  category: string;
  icon: typeof Globe;
  status: string;
}

const NODES: FlowNode[] = [
  {
    id: "website",
    name: "Website",
    category: "Ponto de Entrada",
    icon: Globe,
    status: "Ativo 24/7",
  },
  {
    id: "ia",
    name: "Atendimento",
    category: "Resposta Imediata",
    icon: Bot,
    status: "Resposta <10s",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "Canal Oficial",
    icon: MessageSquare,
    status: "Integrado",
  },
  {
    id: "crm",
    name: "CRM",
    category: "Gestão & Dados",
    icon: Database,
    status: "Sincronizado",
  },
  {
    id: "agendamento",
    name: "Agendamento",
    category: "Calendário",
    icon: Calendar,
    status: "Slots livres",
  },
  {
    id: "followup",
    name: "Follow-up",
    category: "Acompanhamento",
    icon: Clock,
    status: "Cadência ativa",
  },
  {
    id: "humano",
    name: "Humano",
    category: "Equipa Comercial",
    icon: UserCheck,
    status: "Passagem pronta",
  },
];

interface FlowStep {
  step: number;
  nodeIndex: number;
  entity: string;
  message: string;
  label: string;
  detail: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    step: 1,
    nodeIndex: 0,
    entity: "Visitante",
    message: "Novo visitante acessou a página",
    label: "Entrada no site",
    detail: "Origem: Website corporativo existente",
  },
  {
    step: 2,
    nodeIndex: 0,
    entity: "Website",
    message: "Visitante iniciou uma conversa no chat",
    label: "Chat iniciado",
    detail: "Widget interativo ativado sem recarregar a página",
  },
  {
    step: 3,
    nodeIndex: 1,
    entity: "Atendimento",
    message: "Sistema respondeu em <10s e orientou o utilizador",
    label: "Atendimento imediato",
    detail: "Resposta clara gerada com base na sua empresa",
  },
  {
    step: 4,
    nodeIndex: 1,
    entity: "Qualificação",
    message: "Lead qualificado com orçamento e interesse",
    label: "Lead qualificado",
    detail: "Segmento, dimensão e prazo identificados",
  },
  {
    step: 5,
    nodeIndex: 3,
    entity: "CRM",
    message: "Lead registado e estruturado no funil comercial",
    label: "CRM atualizado",
    detail: "Histórico completo e contacto organizados",
  },
  {
    step: 6,
    nodeIndex: 4,
    entity: "Agendamento",
    message: "Reunião de apresentação agendada automaticamente",
    label: "Reunião marcada",
    detail: "Convites e confirmações integrados ao Google Agenda",
  },
  {
    step: 7,
    nodeIndex: 5,
    entity: "Follow-up",
    message: "Automação ativada com lembretes e reforço de valor",
    label: "Follow-up ativo",
    detail: "Disparo automático programado por WhatsApp e e-mail",
  },
  {
    step: 8,
    nodeIndex: 6,
    entity: "Humano",
    message: "Vendedor notificado com resumo executivo do lead",
    label: "Entrega à equipa",
    detail: "Equipa assume a reunião com todo o contexto prévio",
  },
];

export function AutomationSystemFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStep = FLOW_STEPS[currentStepIndex] || FLOW_STEPS[0]!;

  return (
    <div className="relative w-full rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-5 sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A3D63] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#101D35] text-[#F36B32]">
            <Activity className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F5F3EE]">
              Fluxo operacional de atendimento
            </h4>
            <p className="text-xs text-[#B8C0D0]">
              Ligação contínua entre o website existente, atendimento automático, agenda e equipa
            </p>
          </div>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-[#2A3D63] bg-[#101D35] px-3.5 text-xs font-semibold text-[#F5F3EE] transition-colors hover:border-[#F36B32] cursor-pointer"
            aria-label={isPlaying ? "Pausar simulação" : "Reproduzir simulação"}
          >
            {isPlaying ? (
              <Pause className="size-3.5 text-[#F4C542]" aria-hidden="true" />
            ) : (
              <Play className="size-3.5 text-[#2E9E6B]" aria-hidden="true" />
            )}
            <span>{isPlaying ? "Pausar" : "Executar"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentStepIndex(0);
              trackAutomateProEvent("automate_demo_click", { action: "reset_flow" });
            }}
            className="inline-flex size-9 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#B8C0D0] transition-colors hover:text-[#F5F3EE] hover:border-[#F36B32] cursor-pointer"
            title="Reiniciar fluxo"
            aria-label="Reiniciar fluxo"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Connected Nodes */}
      <div className="mt-7">
        <div className="mb-4 flex items-center justify-between text-xs font-semibold text-[#B8C0D0]">
          <span>Topologia do sistema integrado</span>
          <span className="font-heading font-bold text-[#F4C542] tabular-nums">
            Etapa {activeStep.step} de 8
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {NODES.map((node, idx) => {
            const isCurrentActive = activeStep.nodeIndex === idx;
            const Icon = node.icon;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  const stepMatch = FLOW_STEPS.findIndex((s) => s.nodeIndex === idx);
                  if (stepMatch !== -1) {
                    setCurrentStepIndex(stepMatch);
                  }
                }}
                className={`group text-left flex cursor-pointer flex-col justify-between rounded-[12px] border p-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] ${
                  isCurrentActive
                    ? "border-[#F36B32] bg-[#101D35]"
                    : "border-[#2A3D63] bg-[#101D35]/60 hover:border-[#5B6B8C]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-8 items-center justify-center rounded-[8px] border transition-colors ${
                      isCurrentActive
                        ? "border-[#F36B32] bg-[#F36B32] text-[#101D35]"
                        : "border-[#2A3D63] bg-[#1A2A4A] text-[#B8C0D0]"
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-[11px] font-bold text-[#B8C0D0] tabular-nums">
                    0{idx + 1}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] text-[#B8C0D0]">{node.category}</p>
                  <h5
                    className={`mt-0.5 font-heading text-xs font-bold uppercase tracking-wide ${
                      isCurrentActive ? "text-[#F5F3EE]" : "text-[#B8C0D0]"
                    }`}
                  >
                    {node.name}
                  </h5>
                </div>

                <div className="mt-3 pt-2 border-t border-[#2A3D63] text-[11px] font-medium text-[#B8C0D0] truncate">
                  {node.status}
                </div>
              </button>
            );
          })}
        </div>

        {/* Clean Progress Bar */}
        <div className="mt-6 h-1.5 w-full rounded-full bg-[#101D35] overflow-hidden border border-[#2A3D63]">
          <div
            className="h-full bg-[#F36B32] transition-all duration-300 ease-out"
            style={{
              width: `${(activeStep.step / 8) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Active Event Panel */}
      <div className="mt-6 rounded-[12px] border border-[#2A3D63] bg-[#101D35] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-heading font-bold text-[#F36B32] tabular-nums">
                Etapa {activeStep.step}: {activeStep.entity}
              </span>
              <span aria-hidden="true" className="text-[#5B6B8C]">
                ·
              </span>
              <span className="font-medium text-[#F4C542]">{activeStep.label}</span>
            </div>
            <p className="mt-1 font-heading text-sm font-semibold text-[#F5F3EE]">
              {activeStep.message}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-[#B8C0D0]">{activeStep.detail}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-1.5 pt-4 border-t border-[#2A3D63]">
          {FLOW_STEPS.map((s, index) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setCurrentStepIndex(index)}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-200 cursor-pointer ${
                index === currentStepIndex
                  ? "bg-[#F36B32]"
                  : index < currentStepIndex
                    ? "bg-[#F4C542]/70"
                    : "bg-[#2A3D63]"
              }`}
              title={`Ver etapa ${s.step}: ${s.entity}`}
              aria-label={`Ver etapa ${s.step}: ${s.entity}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
