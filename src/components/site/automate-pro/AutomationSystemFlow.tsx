import { useState, useEffect } from "react";
import {
  Globe,
  Bot,
  MessageSquare,
  Database,
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
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
  color: string;
}

const NODES: FlowNode[] = [
  {
    id: "website",
    name: "WEBSITE",
    category: "Ponto de Entrada",
    icon: Globe,
    status: "Ativo • 24/7",
    color: "#3B82F6",
  },
  {
    id: "ia",
    name: "IA",
    category: "Inteligência Digital",
    icon: Bot,
    status: "Processamento 0.8s",
    color: "#8B5CF6",
  },
  {
    id: "whatsapp",
    name: "WHATSAPP",
    category: "Comunicação Instantânea",
    icon: MessageSquare,
    status: "Canal Oficial",
    color: "#22C55E",
  },
  {
    id: "crm",
    name: "CRM",
    category: "Gestão & Dados",
    icon: Database,
    status: "Sincronizado",
    color: "#3B82F6",
  },
  {
    id: "agendamento",
    name: "AGENDAMENTO",
    category: "Calendário Automático",
    icon: Calendar,
    status: "Slots Disponíveis",
    color: "#8B5CF6",
  },
  {
    id: "followup",
    name: "FOLLOW-UP",
    category: "Acompanhamento",
    icon: Clock,
    status: "Cadência Ativa",
    color: "#F59E0B",
  },
  {
    id: "humano",
    name: "HUMANO",
    category: "Equipa Comercial",
    icon: UserCheck,
    status: "Handoff Pronto",
    color: "#3B82F6",
  },
];

interface FlowStep {
  step: number;
  nodeIndex: number;
  entity: string;
  message: string;
  badge: string;
  badgeColor: string;
  detail: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    step: 1,
    nodeIndex: 0,
    entity: "Visitante",
    message: "Novo visitante acessou a landing page",
    badge: "NOVO VISITANTE",
    badgeColor: "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#60A5FA]",
    detail: "Origem: Website corporativo existente",
  },
  {
    step: 2,
    nodeIndex: 0,
    entity: "Website",
    message: "Visitante iniciou uma conversa no chat",
    badge: "CHAT INICIADO",
    badgeColor: "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#60A5FA]",
    detail: "Widget interativo ativado sem recarregar a página",
  },
  {
    step: 3,
    nodeIndex: 1,
    entity: "IA",
    message: "Agente IA respondeu e orientou o utilizador",
    badge: "AI ONLINE",
    badgeColor: "border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#C084FC]",
    detail: "Resposta contextual gerada com base na empresa",
  },
  {
    step: 4,
    nodeIndex: 1,
    entity: "Qualificação",
    message: "Lead qualificado com orçamento e interesse",
    badge: "LEAD QUALIFIED",
    badgeColor: "border-[#22C55E]/40 bg-[#22C55E]/10 text-[#4ADE80]",
    detail: "Segmento, dimensão e prazo identificados",
  },
  {
    step: 5,
    nodeIndex: 3,
    entity: "CRM",
    message: "Lead registrado e estruturado no funil comercial",
    badge: "CRM UPDATED",
    badgeColor: "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#60A5FA]",
    detail: "Histórico completo e contacto organizados",
  },
  {
    step: 6,
    nodeIndex: 4,
    entity: "Agendamento",
    message: "Reunião de apresentação agendada automaticamente",
    badge: "MEETING BOOKED",
    badgeColor: "border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#C084FC]",
    detail: "Convites e confirmações integrados ao Google Agenda",
  },
  {
    step: 7,
    nodeIndex: 5,
    entity: "Follow-up",
    message: "Automação ativada: lembretes e reforço de valor",
    badge: "FOLLOW-UP ACTIVE",
    badgeColor: "border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#FBBF24]",
    detail: "Disparo automático programado por WhatsApp e E-mail",
  },
  {
    step: 8,
    nodeIndex: 6,
    entity: "Humano",
    message: "Vendedor notificado com resumo executivo do lead",
    badge: "HUMAN HANDOFF",
    badgeColor: "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#60A5FA]",
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
  const activeNode = NODES[activeStep.nodeIndex] || NODES[0]!;

  return (
    <div className="relative w-full rounded-3xl border border-[#252C38] bg-[#0E121A]/90 p-5 sm:p-8 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      {/* Top Header of the System Canvas */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#252C38]/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-xl border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]">
            <Activity className="size-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-[#22C55E] ring-2 ring-[#0E121A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#F5F7FA]">
                Sistema Operacional de Atendimento
              </h4>
              <span className="rounded bg-[#8B5CF6]/20 px-2 py-0.5 font-mono text-[9px] font-bold text-[#C084FC] uppercase tracking-wider">
                AUTOMATE ENGINE
              </span>
            </div>
            <p className="text-xs text-[#A7B0BF]">
              Fluxo contínuo entre o website existente, IA, automações e a sua equipa
            </p>
          </div>
        </div>

        {/* Play / Pause / Step Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#252C38] bg-[#151A23] px-3 text-xs font-semibold text-[#F5F7FA] transition-colors hover:border-[#3B82F6]"
            aria-label={isPlaying ? "Pausar simulação" : "Reproduzir simulação"}
          >
            {isPlaying ? (
              <Pause className="size-3.5 text-[#F59E0B]" />
            ) : (
              <Play className="size-3.5 text-[#22C55E]" />
            )}
            <span>{isPlaying ? "Pausar" : "Executar"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentStepIndex(0);
              trackAutomateProEvent("automate_demo_click", { action: "reset_flow" });
            }}
            className="inline-flex size-8 items-center justify-center rounded-lg border border-[#252C38] bg-[#151A23] text-[#A7B0BF] transition-colors hover:text-[#F5F7FA]"
            title="Reiniciar fluxo"
            aria-label="Reiniciar fluxo"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Connected Nodes Horizontal Grid (Desktop) / Vertical (Mobile) */}
      <div className="mt-8">
        <div className="text-[11px] font-bold uppercase tracking-widest text-[#667085] mb-4 flex items-center justify-between">
          <span>Topologia do Sistema Integrado</span>
          <span className="font-mono text-[#3B82F6]">Etapa {activeStep.step} de 8</span>
        </div>

        {/* Nodes Representation */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7 relative">
          {NODES.map((node, idx) => {
            const isCurrentActive = activeStep.nodeIndex === idx;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => {
                  // Find step matching this node
                  const stepMatch = FLOW_STEPS.findIndex((s) => s.nodeIndex === idx);
                  if (stepMatch !== -1) {
                    setCurrentStepIndex(stepMatch);
                  }
                }}
                className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all duration-300 ${
                  isCurrentActive
                    ? "border-[#3B82F6] bg-[#151A23] shadow-[0_0_24px_-6px_rgba(59,130,246,0.35)] translate-y-[-2px]"
                    : "border-[#252C38] bg-[#151A23]/60 hover:border-[#252C38] hover:bg-[#151A23]"
                }`}
              >
                {/* Active Light Glow Indicator */}
                {isCurrentActive && (
                  <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6]" />
                )}

                <div className="flex items-center justify-between">
                  <span
                    className="flex size-9 items-center justify-center rounded-xl border transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: isCurrentActive ? `${node.color}20` : "#0E121A",
                      borderColor: isCurrentActive ? `${node.color}60` : "#252C38",
                      color: isCurrentActive ? node.color : "#A7B0BF",
                    }}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="font-mono text-[10px] text-[#667085]">0{idx + 1}</span>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A7B0BF]">
                    {node.category}
                  </p>
                  <h5
                    className={`mt-0.5 text-xs font-bold tracking-wide transition-colors ${
                      isCurrentActive ? "text-[#F5F7FA]" : "text-[#A7B0BF]"
                    }`}
                  >
                    {node.name}
                  </h5>
                </div>

                <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-[#252C38]/60">
                  <span
                    className={`size-1.5 rounded-full ${
                      isCurrentActive ? "bg-[#22C55E] animate-ping" : "bg-[#667085]"
                    }`}
                  />
                  <span className="text-[10px] font-medium text-[#667085] truncate">
                    {node.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Luminous Connector Line / Signal Flow Bar */}
        <div className="relative mt-6 h-1 w-full rounded-full bg-[#151A23] overflow-hidden border border-[#252C38]">
          <div
            className="h-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#22C55E] transition-all duration-700 ease-out"
            style={{
              width: `${(activeStep.step / 8) * 100}%`,
            }}
          />
          {/* Moving photon / pulse */}
          <div
            className="absolute top-0 bottom-0 w-16 bg-white/40 blur-[4px] animate-pulse"
            style={{
              left: `${Math.max(0, (activeStep.step / 8) * 100 - 10)}%`,
            }}
          />
        </div>
      </div>

      {/* Active Event Card / Real-Time Telemetry Monitor */}
      <div className="mt-6 rounded-2xl border border-[#252C38] bg-[#151A23] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
              <Sparkles className="size-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#F5F7FA]">
                  Etapa {activeStep.step}: {activeStep.entity}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${activeStep.badgeColor}`}
                >
                  {activeStep.badge}
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-[#F5F7FA]">{activeStep.message}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-[#A7B0BF]">{activeStep.detail}</span>
            <div className="mt-1 flex items-center sm:justify-end gap-1.5 font-mono text-[10px] text-[#22C55E]">
              <span className="size-1.5 rounded-full bg-[#22C55E]" />
              AUTOMATION RUNNING
            </div>
          </div>
        </div>

        {/* Step Indicator Bullets */}
        <div className="mt-5 flex items-center justify-between gap-1 pt-4 border-t border-[#252C38]/70">
          {FLOW_STEPS.map((s, index) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setCurrentStepIndex(index)}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                index === currentStepIndex
                  ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"
                  : index < currentStepIndex
                    ? "bg-[#3B82F6]/60"
                    : "bg-[#252C38]"
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
