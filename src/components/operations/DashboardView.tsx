import { useMemo } from "react";
import {
  Users,
  MessageSquareCode,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Bot,
  CheckCircle2,
  Clock,
  Briefcase,
  PlusCircle,
  BarChart3,
  Zap,
  FileSpreadsheet,
  Globe,
  LayoutGrid,
  CheckSquare,
  AlertTriangle,
  FolderKanban,
  ListTodo,
  ShieldAlert,
  ChevronRight,
  Coins,
  DollarSign,
  Layers,
  TrendingDown,
} from "lucide-react";
import { Lead } from "./types";
import { FunnelOverview } from "./FunnelOverview";
import { funnelStages } from "./mockData";
import { ActiveTab } from "./OperationsSidebar";
import { MRRCompositionTooltip } from "./MRRCompositionTooltip";
import { RevenueAnalyticsSection } from "./RevenueAnalyticsSection";
import { MRRAlertsBanner } from "./MRRAlertsBanner";
import { useMRRMonitoring } from "./mrrMonitoringStore";
import {
  computeFinancialMetrics,
  INITIAL_CLIENTS,
  PLANS_CATALOG,
  formatKz,
} from "./financialUtils";
import { useTaskStore } from "@/components/opscenter/useTaskStore";
import {
  isOverdue,
  isDueToday,
  formatShortDate,
  ProgressBar,
  MemberAvatar,
  PriorityDot,
} from "@/components/opscenter/ui-bits";
import { PRIORITY_META, STATUS_META } from "@/components/opscenter/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface DashboardViewProps {
  leads: Lead[];
  onSelectLead: (id: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenNewLead: () => void;
}

const weeklyData = [
  { day: "Seg", leads: 4, conversas: 9, agendados: 2 },
  { day: "Ter", leads: 7, conversas: 14, agendados: 3 },
  { day: "Qua", leads: 9, conversas: 18, agendados: 4 },
  { day: "Qui", leads: 12, conversas: 22, agendados: 6 },
  { day: "Sex", leads: 15, conversas: 28, agendados: 8 },
  { day: "Sáb", leads: 8, conversas: 12, agendados: 3 },
  { day: "Dom", leads: 5, conversas: 10, agendados: 2 },
];

export function DashboardView({
  leads,
  onSelectLead,
  onNavigateTab,
  onOpenNewLead,
}: DashboardViewProps) {
  // Aggregate KPI stats
  const safeLeads = useMemo(() => leads || [], [leads]);
  const totalLeads = safeLeads.length;
  const activeChats = safeLeads.filter((l) => l?.aiProcessingStatus === "ativo").length;
  const scheduledMeetings = safeLeads.reduce(
    (acc, l) => acc + (Array.isArray(l?.appointments) ? l.appointments.length : 0),
    0,
  );
  const convertedCount = safeLeads.filter((l) => l?.status === "convertido").length;
  const conversionRate = totalLeads > 0 ? ((convertedCount / totalLeads) * 100).toFixed(1) : "0";

  // Form requests metrics (website channel submissions)
  const formLeads = useMemo(() => {
    return safeLeads.filter((l) => l?.channel === "website" || l?.channel === "email");
  }, [safeLeads]);

  const formRequestsCount = formLeads.length;

  // Mini trend data for the form card using Recharts
  const formTrendData = useMemo(
    () => [
      { dia: "Seg", solicitacoes: 2 },
      { dia: "Ter", solicitacoes: 4 },
      { dia: "Qua", solicitacoes: 3 },
      { dia: "Qui", solicitacoes: 7 },
      { dia: "Sex", solicitacoes: 8 },
      { dia: "Sáb", solicitacoes: 5 },
      { dia: "Dom", solicitacoes: Math.max(formRequestsCount, 6) },
    ],
    [formRequestsCount],
  );

  // Calculate Pipeline Value in Kwanzas
  const pipelineKz = useMemo(() => {
    return safeLeads.reduce((acc, lead) => {
      if (!lead?.estimatedValue) return acc;
      const match = String(lead.estimatedValue).match(/[\d.]+/);
      if (match) {
        const num = parseInt(match[0].replace(/\./g, ""), 10);
        return acc + (isNaN(num) ? 0 : num);
      }
      return acc;
    }, 0);
  }, [safeLeads]);

  const formattedPipeline = `Kz ${(pipelineKz / 1000).toLocaleString("pt-PT")}k`;

  // Monitoring store integration for real-time churn/downgrade response
  const { clients: monitoredClients } = useMRRMonitoring();

  // Dynamic Financial & MRR Calculation (Base clients + converted leads in real-time)
  const financialMetrics = useMemo(() => {
    return computeFinancialMetrics(monitoredClients, safeLeads);
  }, [monitoredClients, safeLeads]);

  // Real Task & Project Store Connection
  const { tasks, projects, members, clients } = useTaskStore();

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const reviewTasks = tasks.filter((t) => t.status === "REVIEW").length;
  const doneTasks = tasks.filter((t) => t.status === "DONE").length;
  const activeTasks = tasks.filter((t) => t.status !== "DONE").length;
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate, t.status));
  const dueTodayTasks = tasks.filter((t) => isDueToday(t.dueDate, t.status));
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Projects with calculated live progress
  const projectsWithProgress = useMemo(() => {
    return projects.map((project) => {
      const projTasks = tasks.filter((t) => t.projectId === project.id);
      const projDone = projTasks.filter((t) => t.status === "DONE").length;
      const projProgress =
        projTasks.length > 0 ? Math.round((projDone / projTasks.length) * 100) : 0;
      const client = clients.find((c) => c.id === project.clientId);
      return {
        ...project,
        totalTasks: projTasks.length,
        doneTasks: projDone,
        progress: projProgress,
        clientName: client?.company || "Cliente Agentes Digital",
      };
    });
  }, [projects, tasks, clients]);

  // Critical operational attention queue
  const criticalTasks = useMemo(() => {
    return tasks
      .filter(
        (t) =>
          isOverdue(t.dueDate, t.status) ||
          isDueToday(t.dueDate, t.status) ||
          t.status === "REVIEW",
      )
      .slice(0, 5);
  }, [tasks]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080A0F]">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <h1 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span>Centro de Comando Operacional</span>
            <span className="px-2 py-0.5 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#60A5FA] text-xs font-semibold">
              Ao Vivo
            </span>
          </h1>
          <p className="text-xs text-[#A7B0BF] mt-1">
            Visão unificada de captação comercial, conversas automáticas e gestão operacional de
            tarefas em Angola
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => onNavigateTab("ops")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-[#3B82F6]/15 hover:bg-[#3B82F6]/25 border border-[#3B82F6]/40 text-[#60A5FA] text-xs font-semibold shadow-sm transition-all"
          >
            <LayoutGrid className="size-4 text-[#3B82F6]" />
            <span>Quadro Kanban ({activeTasks} tarefas)</span>
            {overdueTasks.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#EF4444] text-white text-[10px] font-bold animate-pulse">
                {overdueTasks.length} atrasadas
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onOpenNewLead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold shadow-sm transition-all"
          >
            <PlusCircle className="size-4" />
            <span>Novo Lead Manual</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("conversations")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#151A23] hover:bg-[#252C38] border border-[#252C38] text-[#F5F7FA] text-xs font-semibold transition-all"
          >
            <Bot className="size-4 text-[#8B5CF6]" />
            <span>Ver Conversas IA ({activeChats})</span>
          </button>
        </div>
      </div>

      {/* Visual Monitoring System: Churn & Downgrade Alerts */}
      <MRRAlertsBanner onNavigateToClients={() => onNavigateTab("clients")} />

      {/* High-Visibility MRR & Financial Highlight Banner */}
      <div
        id="mrr-top-banner"
        className="rounded-[16px] border-2 border-[#22C55E]/60 bg-gradient-to-r from-[#0E2018] via-[#12241C] to-[#151A23] p-4.5 px-5 shadow-[0_0_24px_rgba(34,197,94,0.18)] flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <div className="size-11 rounded-[12px] bg-[#22C55E]/20 border border-[#22C55E]/50 flex items-center justify-center text-[#22C55E] shrink-0 shadow-[0_0_16px_rgba(34,197,94,0.3)]">
            <Coins className="size-6 text-[#22C55E]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black tracking-wider uppercase bg-[#22C55E] text-black px-2 py-0.5 rounded-[6px]">
                MRR RECORRÊNCIA MENSAL
              </span>
              <span className="text-[11px] font-semibold text-[#86EFAC] flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#22C55E] animate-pulse" />
                Receita Contínua em Kwanzas
              </span>
            </div>
            <div className="flex items-baseline gap-2.5 mt-1 flex-wrap">
              <span className="text-3xl font-black font-mono text-[#22C55E] tracking-tight">
                {financialMetrics.mrrFormatted}
              </span>
              <div
                className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                  financialMetrics.isChurn
                    ? "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40"
                    : "bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40"
                }`}
                title={`Variação Mês sobre Mês (MoM): ${financialMetrics.mrrMomDiffFormatted} vs. mês anterior`}
              >
                {financialMetrics.isChurn ? (
                  <TrendingDown className="size-3" />
                ) : (
                  <TrendingUp className="size-3" />
                )}
                <span>{financialMetrics.mrrMomGrowthFormatted} MoM</span>
              </div>
              <MRRCompositionTooltip financialMetrics={financialMetrics} align="left" />
              <span className="text-xs text-[#A7B0BF]">
                • {financialMetrics.activeRecurringClients} contratos activos (
                {financialMetrics.retentionRate}% retenção)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="rounded-[10px] bg-[#0E121A] border border-[#252C38] px-3.5 py-2">
            <div className="text-[10px] text-[#A7B0BF] uppercase font-bold">ARR (12 Meses)</div>
            <div className="text-xs font-bold font-mono text-[#F59E0B]">
              {financialMetrics.arrFormatted}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab("clients")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs shadow-[0_0_20px_rgba(34,197,94,0.35)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Ver Clientes & Contratos</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
        {/* Card 1: Total Leads */}
        <div
          onClick={() => onNavigateTab("leads")}
          className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)] cursor-pointer hover:border-[#3B82F6]/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085]">Total Leads</span>
            <div className="size-7 rounded-[8px] bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6] group-hover:scale-110 transition-transform">
              <Users className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">{totalLeads}</p>
          <p className="text-[11px] text-[#22C55E] mt-1 flex items-center gap-1">
            <TrendingUp className="size-3" />
            <span>+28% este mês</span>
          </p>
        </div>

        {/* Card 2: MRR Recorrente (Elevated to top row position 2!) */}
        <div
          id="mrr-kpi-card"
          onClick={() => onNavigateTab("clients")}
          title="Monthly Recurring Revenue: Suporte contínuo, hospedagem e operação dos agentes IA (Clique para abrir Clientes & Contratos)"
          className="rounded-[16px] border-2 border-[#22C55E] bg-gradient-to-br from-[#10241A] via-[#13231B] to-[#151A23] p-4 shadow-[0_0_24px_rgba(34,197,94,0.2)] cursor-pointer hover:border-[#4ADE80] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all group relative overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#22C55E] flex items-center gap-1.5">
                <Coins className="size-3.5 text-[#22C55E]" />
                MRR Recorrente
              </span>
              <div className="flex items-center gap-1.5">
                <MRRCompositionTooltip financialMetrics={financialMetrics} align="right" />
                <div className="size-7 rounded-[8px] bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-transform">
                  {financialMetrics.isChurn ? (
                    <TrendingDown className="size-3.5 text-[#EF4444]" />
                  ) : (
                    <TrendingUp className="size-3.5" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold text-[#22C55E] font-mono tracking-tight">
                {financialMetrics.mrrFormatted}
              </p>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                  financialMetrics.isChurn
                    ? "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40"
                    : "bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40"
                }`}
                title={`Variação MoM: ${financialMetrics.mrrMomDiffFormatted} vs. mês anterior`}
              >
                {financialMetrics.mrrMomGrowthFormatted}
              </span>
            </div>

            <p className="text-[11px] text-[#A7B0BF] mt-0.5 flex items-center justify-between">
              <span>{financialMetrics.activeRecurringClients} contratos ativos</span>
              <span className="text-[10px] text-[#86EFAC] font-mono font-semibold">
                {financialMetrics.mrrMomDiffFormatted}
              </span>
            </p>
          </div>

          <div className="mt-2 pt-2 border-t border-[#22C55E]/20 flex items-center justify-between text-[10px]">
            <span className="text-[#86EFAC] group-hover:text-white font-bold flex items-center gap-1 transition-colors">
              <span>Gerir Clientes</span>
              <ChevronRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-[#22C55E] font-mono font-bold bg-[#22C55E]/15 px-1.5 py-0.5 rounded">
              Previsível
            </span>
          </div>
        </div>

        {/* Card 3: Dedicated Commercial Form Requests Card (Recharts) */}
        <div
          onClick={() => onNavigateTab("leads")}
          title="Solicitações recebidas pelo formulário de proposta comercial (armazenadas no Supabase)"
          className="rounded-[16px] border border-[#3B82F6]/35 bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)] cursor-pointer hover:border-[#3B82F6] transition-all group relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#3B82F6] flex items-center gap-1">
              <FileSpreadsheet className="size-3 text-[#3B82F6]" />
              Formulário Site
            </span>
            <div className="size-7 rounded-[8px] bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:scale-110 transition-transform">
              <Globe className="size-3.5" />
            </div>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-bold text-[#F5F7FA] font-mono">{formRequestsCount}</p>
              <p className="text-[10px] text-[#A7B0BF] mt-0.5">Pedidos Comerciais</p>
            </div>
            {/* Sparkline trend using Recharts AreaChart */}
            <div className="w-20 h-9">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formTrendData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFormSpark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="solicitacoes"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorFormSpark)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-[#252C38] flex items-center justify-between text-[10px]">
            <span className="text-[#22C55E] font-semibold flex items-center gap-0.5">
              <TrendingUp className="size-2.5" />
              100% no Supabase
            </span>
            <span className="text-[#A7B0BF] font-mono">7 dias</span>
          </div>
        </div>

        {/* Card 4: Conversas IA */}
        <div
          onClick={() => onNavigateTab("conversations")}
          className="rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)] cursor-pointer hover:border-[#8B5CF6] transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8B5CF6]">Conversas IA</span>
            <div className="size-7 rounded-[8px] bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 transition-transform animate-pulse">
              <MessageSquareCode className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">{activeChats}</p>
          <p className="text-[11px] text-[#A7B0BF] mt-1 flex items-center gap-1">
            <Bot className="size-3 text-[#8B5CF6]" />
            <span>Atendimento 24/7 ativo</span>
          </p>
        </div>

        {/* Card 5: Reuniões Agendadas */}
        <div
          onClick={() => onNavigateTab("schedules")}
          className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)] cursor-pointer hover:border-[#F59E0B]/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085]">Reuniões Agendadas</span>
            <div className="size-7 rounded-[8px] bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
              <Calendar className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">{scheduledMeetings}</p>
          <p className="text-[11px] text-[#F59E0B] mt-1 flex items-center gap-1">
            <Clock className="size-3" />
            <span>Próxima hoje às 15h</span>
          </p>
        </div>

        {/* Card 6: Pipeline Estimado */}
        <div
          onClick={() => onNavigateTab("reports")}
          className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)] cursor-pointer hover:border-[#22C55E]/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085]">Pipeline Estimado</span>
            <div className="size-7 rounded-[8px] bg-[#22C55E]/15 flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-transform">
              <TrendingUp className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#22C55E] mt-2 font-mono">{formattedPipeline}</p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Valores em Kwanzas (AOA)</p>
        </div>

        {/* Card 7: Taxa de Conversão */}
        <div
          onClick={() => onNavigateTab("clients")}
          className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)] cursor-pointer hover:border-[#3B82F6]/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085]">Taxa de Conversão</span>
            <div className="size-7 rounded-[8px] bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6] group-hover:scale-110 transition-transform">
              <CheckCircle2 className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">{conversionRate}%</p>
          <p className="text-[11px] text-[#22C55E] mt-1">{convertedCount} clientes fechados</p>
        </div>
      </div>

      {/* Operational Pulse: Tasks & Projects KPIs */}
      <div className="rounded-[16px] border border-[#252C38] bg-gradient-to-r from-[#151A23] via-[#10141D] to-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#252C38]/70 mb-3">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-[6px] bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6]">
              <LayoutGrid className="size-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
                Pulso Operacional & Entregas (Kanban)
              </span>
              <span className="ml-2 text-[11px] text-[#A7B0BF]">
                {activeTasks} tarefas em execução em {projects.length} projetos
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab("ops")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
          >
            <span>Acessar Quadro Kanban Completo</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Active Tasks */}
          <div
            onClick={() => onNavigateTab("ops")}
            className="rounded-[12px] border border-[#252C38] bg-[#0E121A]/70 hover:bg-[#1B212C] p-3 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#667085]">Tarefas Ativas</span>
              <CheckSquare className="size-3.5 text-[#3B82F6] group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">{activeTasks}</p>
            <p className="text-[10px] text-[#A7B0BF] mt-0.5">
              {inProgressTasks} em progresso • {reviewTasks} em revisão
            </p>
          </div>

          {/* Critical Deadlines */}
          <div
            onClick={() => onNavigateTab("ops")}
            className={`rounded-[12px] border p-3 transition-all cursor-pointer group ${
              overdueTasks.length > 0
                ? "border-[#EF4444]/40 bg-[#EF4444]/10 hover:bg-[#EF4444]/15"
                : "border-[#252C38] bg-[#0E121A]/70 hover:bg-[#1B212C]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[11px] font-medium ${
                  overdueTasks.length > 0 ? "text-[#F87171]" : "text-[#667085]"
                }`}
              >
                Prazos & Atenção
              </span>
              <AlertTriangle
                className={`size-3.5 ${
                  overdueTasks.length > 0 ? "text-[#EF4444] animate-bounce" : "text-[#F59E0B]"
                }`}
              />
            </div>
            <p
              className={`text-xl font-bold font-mono mt-1 ${
                overdueTasks.length > 0 ? "text-[#F87171]" : "text-[#F5F7FA]"
              }`}
            >
              {overdueTasks.length > 0
                ? `${overdueTasks.length} Atrasadas`
                : `${dueTodayTasks.length} Para Hoje`}
            </p>
            <p className="text-[10px] text-[#A7B0BF] mt-0.5">
              {overdueTasks.length > 0
                ? `${dueTodayTasks.length} entregas agendadas para hoje`
                : "Nenhum prazo vencido no momento"}
            </p>
          </div>

          {/* Completion Rate */}
          <div
            onClick={() => onNavigateTab("ops")}
            className="rounded-[12px] border border-[#252C38] bg-[#0E121A]/70 hover:bg-[#1B212C] p-3 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#667085]">Conclusão de Entregas</span>
              <span className="text-[11px] font-mono font-bold text-[#22C55E]">
                {completionRate}%
              </span>
            </div>
            <p className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">
              {doneTasks}{" "}
              <span className="text-xs font-normal text-[#667085]">/ {totalTasks} feitas</span>
            </p>
            <div className="mt-1.5">
              <ProgressBar value={completionRate} tone="green" />
            </div>
          </div>

          {/* Active Projects */}
          <div
            onClick={() => onNavigateTab("ops")}
            className="rounded-[12px] border border-[#252C38] bg-[#0E121A]/70 hover:bg-[#1B212C] p-3 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#667085]">Projetos em Produção</span>
              <FolderKanban className="size-3.5 text-[#8B5CF6] group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">{projects.length}</p>
            <p className="text-[10px] text-[#22C55E] mt-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>100% monitorados no Kanban</span>
            </p>
          </div>
        </div>
      </div>

      {/* Visual Funnel Overview */}
      <FunnelOverview stages={funnelStages} />

      {/* New Analytical Section: Setup vs MRR Recorrente (Recharts + Barras Empilhadas + Projeção 6 Meses + Download) */}
      <RevenueAnalyticsSection
        financialMetrics={financialMetrics}
        onNavigateTab={onNavigateTab}
        conversionRatePercent={Number(conversionRate)}
        totalPipelineLeads={totalLeads}
      />

      {/* Breakdown by Plan pill list including Automate Pro */}
      <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4.5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#252C38]/60">
          <div>
            <span className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-1.5">
              <Coins className="size-3.5 text-[#22C55E]" />
              Distribuição do MRR por Plano Contratado
            </span>
            <p className="text-[11px] text-[#A7B0BF] mt-0.5">
              Contratos vigentes com cobrança mensal automática de suporte e IA
            </p>
          </div>
          <span className="text-[10px] text-[#38BDF8] font-mono font-medium px-2 py-0.5 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30">
            5 Planos: Presença, Profissional, Autoridade, Domínio IA e Automate Pro
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {financialMetrics.mrrByPlan.map((item) => {
            const cfg = PLANS_CATALOG[item.plan];
            return (
              <div
                key={item.plan}
                className={`p-2.5 rounded-[10px] border transition-all ${
                  item.plan === "Automate Pro"
                    ? "border-[#38BDF8]/40 bg-[#38BDF8]/10"
                    : "border-[#252C38] bg-[#0E121A]/50 hover:bg-[#151A23]"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-[#F5F7FA] truncate">{item.plan}</span>
                  {cfg?.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 whitespace-nowrap font-medium">
                      {cfg.badge}
                    </span>
                  )}
                </div>

                <div className="mt-1.5 flex items-baseline justify-between text-xs">
                  <span className="text-[#A7B0BF] text-[10px]">MRR / mês:</span>
                  <span className="font-mono font-semibold text-[#22C55E]">
                    {cfg?.monthlyFormatted}
                  </span>
                </div>

                <div className="mt-0.5 flex items-baseline justify-between text-xs text-[#667085]">
                  <span className="text-[10px]">Setup inicial:</span>
                  <span className="font-mono text-[10px]">{cfg?.setupFormatted}</span>
                </div>

                <div className="mt-1 pt-1 border-t border-[#252C38]/50 flex items-center justify-between text-[10px]">
                  <span className="text-[#667085]">{item.count} ativos</span>
                  <span className="font-mono font-semibold text-[#F5F7FA]">
                    {formatKz(item.mrrSubtotal)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weekly Activity Area Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-4">
            <div>
              <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="size-4 text-[#3B82F6]" />
                Volume de Captação & Conversas da Semana
              </h3>
              <p className="text-[11px] text-[#A7B0BF] mt-0.5">
                Comparativo diário entre Leads captados e Conversas atendidas pelo Agente
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#3B82F6]" />
                <span className="text-[#A7B0BF] text-[11px]">Leads</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#8B5CF6]" />
                <span className="text-[#A7B0BF] text-[11px]">Conversas IA</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConversas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#252C38" vertical={false} />
                <XAxis dataKey="day" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis stroke="#667085" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0E121A",
                    borderColor: "#252C38",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#F5F7FA",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="conversas"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorConversas)"
                  name="Conversas IA"
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLeads)"
                  name="Leads"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Distribution & AI Diagnostics (1 col) */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-[#252C38]">
              <Zap className="size-4 text-[#8B5CF6]" />
              Origem dos Contactos (Luanda)
            </h3>

            <div className="space-y-3.5 mt-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F5F7FA] font-medium flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#22C55E]" />
                    WhatsApp Business API
                  </span>
                  <span className="font-mono text-[#22C55E] font-semibold">68%</span>
                </div>
                <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
                  <div className="h-full bg-[#22C55E] rounded-full w-[68%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F5F7FA] font-medium flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#3B82F6]" />
                    Website Oficial (Chat & Form)
                  </span>
                  <span className="font-mono text-[#3B82F6] font-semibold">22%</span>
                </div>
                <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-full w-[22%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F5F7FA] font-medium flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#8B5CF6]" />
                    Google Maps / Orgânico
                  </span>
                  <span className="font-mono text-[#8B5CF6] font-semibold">10%</span>
                </div>
                <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
                  <div className="h-full bg-[#8B5CF6] rounded-full w-[10%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3.5 rounded-[12px] border border-[#8B5CF6]/35 bg-[#8B5CF6]/10 text-xs">
            <div className="flex items-center gap-2 text-[#C084FC] font-semibold mb-1">
              <Sparkles className="size-3.5" />
              <span>Diagnóstico do Agente IA</span>
            </div>
            <p className="text-[11px] text-[#A7B0BF] leading-relaxed">
              O tempo médio de resposta nos últimos 7 dias foi de{" "}
              <strong className="text-white">42ms</strong> com taxa de qualificação autônoma de{" "}
              <strong className="text-[#22C55E]">91%</strong> sem necessidade de intervenção humana.
            </p>
          </div>
        </div>
      </div>

      {/* Integrated Operations & Project Kanban Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active Projects Showcase (2 cols) */}
        <div className="lg:col-span-2 rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-4">
            <div>
              <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
                <FolderKanban className="size-4 text-[#3B82F6]" />
                Projetos & Implementações em Andamento
              </h3>
              <p className="text-[11px] text-[#A7B0BF] mt-0.5">
                Acompanhamento dinâmico do avanço de automações e desenvolvimento de agentes IA
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("ops")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
            >
              <span>Abrir no Quadro Kanban</span>
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {projectsWithProgress.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigateTab("ops")}
                className="p-4 rounded-[12px] border border-[#252C38] bg-[#0E121A]/80 hover:border-[#3B82F6]/50 hover:bg-[#1B212C] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold tracking-wider text-[#3B82F6] uppercase">
                      {proj.clientName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-[#252C38] bg-[#151A23] text-[#A7B0BF]">
                      {proj.status === "ACTIVE" ? "Em Produção" : proj.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#F5F7FA] mt-1.5 group-hover:text-[#60A5FA] transition-colors line-clamp-1">
                    {proj.name}
                  </h4>
                  <p className="text-[11px] text-[#667085] mt-0.5 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#252C38]/60">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-[#A7B0BF]">
                      Progresso ({proj.doneTasks}/{proj.totalTasks} tarefas)
                    </span>
                    <span className="font-mono font-bold text-[#F5F7FA]">{proj.progress}%</span>
                  </div>
                  <ProgressBar
                    value={proj.progress}
                    tone={proj.progress === 100 ? "green" : "blue"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Attention Queue (1 col) */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-4">
              <div>
                <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="size-4 text-[#F59E0B]" />
                  Fila de Atenção Operacional
                </h3>
                <p className="text-[11px] text-[#A7B0BF] mt-0.5">
                  Tarefas críticas, prazos iminentes e revisões pendentes
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {criticalTasks.length === 0 ? (
                <div className="p-6 text-center text-[#667085] text-xs">
                  Nenhuma tarefa com prazo crítico ou pendência imediata. Todas as operações em dia!
                </div>
              ) : (
                criticalTasks.map((t) => {
                  const member = members.find((m) => m.id === t.assigneeId);
                  const isTaskOverdue = isOverdue(t.dueDate, t.status);
                  const isTaskDueToday = isDueToday(t.dueDate, t.status);

                  return (
                    <div
                      key={t.id}
                      onClick={() => onNavigateTab("ops")}
                      className={`p-3 rounded-[10px] border transition-all cursor-pointer group ${
                        isTaskOverdue
                          ? "border-[#EF4444]/30 bg-[#EF4444]/5 hover:bg-[#EF4444]/10"
                          : "border-[#252C38] bg-[#0E121A]/70 hover:bg-[#1B212C]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px]">
                        <span className="font-mono text-[#3B82F6] font-semibold">{t.id}</span>
                        <PriorityDot priority={t.priority} />
                      </div>
                      <p className="text-xs font-semibold text-[#F5F7FA] mt-1 line-clamp-1 group-hover:text-[#60A5FA] transition-colors">
                        {t.title}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#252C38]/50 text-[10px]">
                        <span
                          className={`font-medium ${
                            isTaskOverdue
                              ? "text-[#EF4444] font-semibold"
                              : isTaskDueToday
                                ? "text-[#F59E0B]"
                                : "text-[#A7B0BF]"
                          }`}
                        >
                          {isTaskOverdue ? "Atrasada • " : isTaskDueToday ? "Hoje • " : ""}
                          {formatShortDate(t.dueDate)}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <MemberAvatar member={member} size="sm" />
                          <span className="text-[#A7B0BF] text-[10px] truncate max-w-[80px]">
                            {member?.name ? member.name.split(" ")[0] : "Equipa"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("ops")}
            className="w-full mt-4 py-2.5 px-3 rounded-[8px] border border-[#252C38] bg-[#0E121A] hover:bg-[#252C38] text-xs font-semibold text-[#3B82F6] hover:text-[#60A5FA] flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Gerir no Quadro Kanban</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Leads Activity Table */}
      <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-4">
          <div>
            <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
              <Users className="size-4 text-[#3B82F6]" />
              Últimos Leads Registados no Sistema
            </h3>
            <p className="text-[11px] text-[#A7B0BF] mt-0.5">
              Clique em qualquer lead para abrir a telemetria detalhada e histórico de mensagens
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab("leads")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
          >
            <span>Ver Todos os Leads</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#252C38] text-[#667085] uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Lead / Empresa</th>
                <th className="py-2.5 px-3">Canal</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Pacote</th>
                <th className="py-2.5 px-3">Score IA</th>
                <th className="py-2.5 px-3">Valor Estimado</th>
                <th className="py-2.5 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252C38]/60">
              {leads.slice(0, 5).map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => {
                    onSelectLead(lead.id);
                    onNavigateTab("leads");
                  }}
                  className="hover:bg-[#0E121A] cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3">
                    <div className="font-semibold text-[#F5F7FA]">{lead.name}</div>
                    <div className="text-[11px] text-[#A7B0BF]">{lead.company}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[11px] text-[#3B82F6] uppercase">
                      {lead.channel}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        lead.status === "convertido"
                          ? "bg-[#22C55E]/15 text-[#22C55E]"
                          : lead.status === "agendado"
                            ? "bg-[#F59E0B]/15 text-[#F59E0B]"
                            : lead.status === "qualificado"
                              ? "bg-[#8B5CF6]/15 text-[#8B5CF6]"
                              : "bg-[#3B82F6]/15 text-[#3B82F6]"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#A7B0BF] font-medium">{lead.packageInterest}</td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-[#8B5CF6]">
                      {lead.qualificationScore}/100
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#22C55E]">
                    {lead.estimatedValue}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-[6px] bg-[#252C38] text-[#F5F7FA] text-[11px] font-semibold hover:bg-[#3B82F6] transition-colors"
                    >
                      Abrir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
