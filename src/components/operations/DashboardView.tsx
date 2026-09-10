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
} from "lucide-react";
import { Lead } from "./types";
import { FunnelOverview } from "./FunnelOverview";
import { funnelStages } from "./mockData";
import { ActiveTab } from "./OperationsSidebar";
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
  const totalLeads = leads.length;
  const activeChats = leads.filter((l) => l.aiProcessingStatus === "ativo").length;
  const scheduledMeetings = leads.reduce((acc, l) => acc + l.appointments.length, 0);
  const convertedCount = leads.filter((l) => l.status === "convertido").length;
  const conversionRate = totalLeads > 0 ? ((convertedCount / totalLeads) * 100).toFixed(1) : "0";

  // Form requests metrics (website channel submissions)
  const formLeads = useMemo(() => {
    return leads.filter((l) => l.channel === "website" || l.channel === "email");
  }, [leads]);

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
    return leads.reduce((acc, lead) => {
      const match = lead.estimatedValue.match(/[\d.]+/);
      if (match) {
        const num = parseInt(match[0].replace(/\./g, ""), 10);
        return acc + (isNaN(num) ? 0 : num);
      }
      return acc;
    }, 0);
  }, [leads]);

  const formattedPipeline = `Kz ${(pipelineKz / 1000).toLocaleString("pt-PT")}k`;

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
            Visão unificada de captação, conversas automáticas e pipeline comercial em Angola
          </p>
        </div>

        <div className="flex items-center gap-2.5">
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

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
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

        {/* Dedicated Commercial Form Requests Card (Recharts) */}
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

      {/* Visual Funnel Overview */}
      <FunnelOverview stages={funnelStages} />

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
