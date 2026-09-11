import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Layers,
  Coins,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Printer,
  Sparkles,
  Percent,
  BarChart3,
  LineChart as LineChartIcon,
  HelpCircle,
  X,
} from "lucide-react";
import { FinancialSummary, MonthlyRevenueData, formatKz } from "./financialUtils";
import { ActiveTab } from "./OperationsSidebar";
import { MRRProjectionChart } from "./MRRProjectionChart";
import { toast } from "sonner";

interface RevenueAnalyticsSectionProps {
  financialMetrics: FinancialSummary;
  onNavigateTab?: (tab: ActiveTab) => void;
  conversionRatePercent?: number;
  totalPipelineLeads?: number;
}

export function RevenueAnalyticsSection({
  financialMetrics,
  onNavigateTab,
  conversionRatePercent = 25,
  totalPipelineLeads = 18,
}: RevenueAnalyticsSectionProps) {
  // Chart visual mode: 'stacked' (Barras Empilhadas - proporção exata), 'composed' (Evolução contínua) or 'projection' (Projeção 6 Meses)
  const [chartMode, setChartMode] = useState<"stacked" | "composed" | "projection">("stacked");

  // Stacked chart sub-mode: 'absolute' (Valores em Kwanzas) vs 'percent' (100% Proporção Relativa)
  const [stackedUnit, setStackedUnit] = useState<"absolute" | "percent">("absolute");

  // Chart view mode: 'monthly' (mês a mês) or 'cumulative' (acumulado)
  const [viewMode, setViewMode] = useState<"monthly" | "cumulative">("monthly");

  // Time horizon: 'all' (6 months) or 'actual' (Jan-Mar only)
  const [timeHorizon, setTimeHorizon] = useState<"all" | "actual">("all");

  // PDF / Print executive preview modal state
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    return financialMetrics.monthlyRevenueEvolution.filter((item) => {
      if (timeHorizon === "actual") {
        return !item.isProjected;
      }
      return true;
    });
  }, [financialMetrics.monthlyRevenueEvolution, timeHorizon]);

  // Normalized 100% data for stacked bar chart showing exact proportions
  const normalizedStackedData = useMemo(() => {
    return filteredData.map((item) => {
      const setupVal = viewMode === "monthly" ? item.setupRevenue : item.cumulativeSetup;
      const mrrVal = viewMode === "monthly" ? item.mrrRevenue : item.cumulativeMrr;
      const total = setupVal + mrrVal || 1;

      const setupPercent = Number(((setupVal / total) * 100).toFixed(1));
      const mrrPercent = Number(((mrrVal / total) * 100).toFixed(1));

      return {
        ...item,
        setupVal,
        mrrVal,
        totalVal: total,
        setupPercent,
        mrrPercent,
      };
    });
  }, [filteredData, viewMode]);

  // Export to CSV functionality
  const handleDownloadCSV = () => {
    try {
      const headers = [
        "Mês",
        "Receita Setup Único (AOA)",
        "Receita Recorrente MRR (AOA)",
        "Receita Total (AOA)",
        "Proporção Setup (%)",
        "Proporção MRR (%)",
        "Clientes Ativos",
        "Status",
        "Observações",
      ];

      const rows = filteredData.map((item) => {
        const total = item.totalRevenue || 1;
        const setupPct = ((item.setupRevenue / total) * 100).toFixed(1);
        const mrrPct = ((item.mrrRevenue / total) * 100).toFixed(1);
        return [
          `"${item.month}"`,
          item.setupRevenue,
          item.mrrRevenue,
          item.totalRevenue,
          `"${setupPct}%"`,
          `"${mrrPct}%"`,
          item.activeClients,
          `"${item.isProjected ? "Projeção" : "Realizado"}"`,
          `"${(item.highlightNote || "").replace(/"/g, '""')}"`,
        ].join(";");
      });

      const csvContent = "\uFEFF" + [headers.join(";"), ...rows].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `relatorio_receita_mrr_setup_agentes_digital_${new Date().getFullYear()}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Planilha CSV baixada com sucesso!", {
        description: "Dados consolidados de Setup Único e MRR Recorrente exportados.",
      });
    } catch {
      toast.error("Erro ao gerar arquivo CSV.");
    }
  };

  return (
    <section
      id="revenue-streams-analytics"
      className="rounded-[16px] border border-[#252C38] bg-gradient-to-br from-[#151A23] via-[#10141D] to-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
    >
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#252C38]/70 mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-[10px] bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
              <Coins className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-[#F5F7FA] uppercase tracking-wider">
                  Evolução de Receita: Setup vs. MRR Recorrente
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 flex items-center gap-1">
                  {financialMetrics.isChurn ? (
                    <TrendingDown className="size-3 text-[#EF4444]" />
                  ) : (
                    <TrendingUp className="size-3 text-[#22C55E]" />
                  )}
                  <span>{financialMetrics.mrrMomGrowthFormatted} MoM</span>
                </span>
              </div>
              <p className="text-xs text-[#A7B0BF] mt-0.5">
                Proporção analítica entre implantação de websites (Setup) e receitas recorrentes de
                mensalidade (MRR)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons & Export Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Chart Type Selector */}
          <div className="inline-flex rounded-[8px] bg-[#0E121A] border border-[#252C38] p-0.5">
            <button
              type="button"
              onClick={() => setChartMode("stacked")}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                chartMode === "stacked"
                  ? "bg-[#38BDF8] text-black shadow-sm font-bold"
                  : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              <BarChart3 className="size-3.5" />
              <span>Barras Empilhadas</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode("composed")}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                chartMode === "composed"
                  ? "bg-[#22C55E] text-black shadow-sm font-bold"
                  : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              <LineChartIcon className="size-3.5" />
              <span>Tendência Composta</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode("projection")}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                chartMode === "projection"
                  ? "bg-[#8B5CF6] text-white shadow-sm font-bold"
                  : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              <Sparkles className="size-3.5" />
              <span>Projeção 6 Meses</span>
            </button>
          </div>

          {/* Download CSV & Print PDF Buttons */}
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#0E121A] hover:bg-[#252C38] border border-[#252C38] text-xs font-semibold text-[#38BDF8] hover:text-[#7DD3FC] transition-all shadow-sm"
            title="Baixar planilha consolidada de Setup e MRR em formato CSV"
          >
            <FileSpreadsheet className="size-3.5" />
            <span>Baixar CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPrintModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#0E121A] hover:bg-[#252C38] border border-[#252C38] text-xs font-semibold text-[#F5F7FA] hover:text-white transition-all shadow-sm"
            title="Exportar relatório formatado para impressão ou salvar em PDF"
          >
            <Printer className="size-3.5" />
            <span>Relatório PDF</span>
          </button>

          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab("clients")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#3B82F6]/15 hover:bg-[#3B82F6]/25 border border-[#3B82F6]/30 text-xs font-semibold text-[#3B82F6] transition-all"
            >
              <span>Contratos</span>
              <ArrowUpRight className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* 4 Comparative Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        {/* Metric 1: Receita de Setup */}
        <div className="rounded-[12px] border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-3.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#3B82F6]">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <Layers className="size-3.5 text-[#3B82F6]" />
              Receita de Setup (Implementação)
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#3B82F6]/20 font-bold font-mono">
              Pontual
            </span>
          </div>
          <p className="text-2xl font-bold font-mono text-[#F5F7FA] mt-2">
            {financialMetrics.setupRevenueFormatted}
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#A7B0BF]">
            <span>Desenvolvimento inicial</span>
            <span className="text-[#3B82F6] font-semibold">Websites + APIs</span>
          </div>
        </div>

        {/* Metric 2: MRR Recorrente */}
        <div className="rounded-[12px] border border-[#22C55E]/40 bg-[#22C55E]/5 p-3.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#22C55E]">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <Coins className="size-3.5 text-[#22C55E]" />
              Receita Recorrente (MRR)
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#22C55E]/20 font-bold font-mono">
              Recorrente
            </span>
          </div>
          <p className="text-2xl font-bold font-mono text-[#22C55E] mt-2">
            {financialMetrics.mrrFormatted}
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[11px]">
            <span className="text-[#A7B0BF]">Crescimento mensal</span>
            <span className="text-[#22C55E] font-bold font-mono">
              {financialMetrics.mrrMomGrowthFormatted} MoM
            </span>
          </div>
        </div>

        {/* Metric 3: ARR Anualizado */}
        <div className="rounded-[12px] border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-3.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#F59E0B]">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <DollarSign className="size-3.5 text-[#F59E0B]" />
              ARR Projetado (12 Meses)
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#F59E0B]/20 font-bold font-mono">
              Anualizado
            </span>
          </div>
          <p className="text-2xl font-bold font-mono text-[#F59E0B] mt-2">
            {financialMetrics.arrFormatted}
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#A7B0BF]">
            <span>Contratos ativos</span>
            <span className="text-[#F59E0B] font-semibold">12 meses de caixa</span>
          </div>
        </div>

        {/* Metric 4: Taxa de Retenção & Previsibilidade */}
        <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A]/70 p-3.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#667085]">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#8B5CF6]" />
              Índice de Retenção Histórica
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#8B5CF6]/20 text-[#A78BFA] font-bold font-mono">
              0% Churn
            </span>
          </div>
          <p className="text-2xl font-bold font-mono text-[#F5F7FA] mt-2">
            {financialMetrics.retentionRate}%
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#A7B0BF]">
            <span>Base contratada</span>
            <span className="text-[#22C55E] font-semibold flex items-center gap-1">
              <CheckCircle2 className="size-3" />
              100% Previsível
            </span>
          </div>
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO SELECTED CHART MODE */}
      {chartMode === "projection" ? (
        /* 6-Month MRR Projection Chart */
        <MRRProjectionChart
          currentMrr={financialMetrics.mrrTotal}
          conversionRatePercent={conversionRatePercent}
          totalPipelineLeads={totalPipelineLeads}
          averageTicketMrr={65000}
        />
      ) : chartMode === "stacked" ? (
        /* Stacked Bar Chart (Gráfico de Barras Empilhadas - Proporção Exata Setup vs MRR) */
        <div
          id="stacked-bar-chart-container"
          className="rounded-[14px] border border-[#252C38] bg-[#080A0F] p-4.5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#252C38]/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="size-4 text-[#38BDF8]" />
                  Gráfico de Barras Empilhadas — Proporção Exata: Setup vs. MRR
                </span>
                <span className="text-[11px] text-[#38BDF8] font-mono font-medium">
                  {stackedUnit === "percent" ? "(Proporção Relativa 100%)" : "(Valores em Kwanzas)"}
                </span>
              </div>
              <p className="text-[11px] text-[#A7B0BF] mt-0.5">
                Demonstra como a receita recorrente (MRR) ganha dominância sobre o faturamento total
                ao longo dos meses
              </p>
            </div>

            {/* Sub-controls: Unit Toggle (Kwanzas vs 100% Porcentagem) and Horizon */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex rounded-[8px] bg-[#151A23] border border-[#252C38] p-0.5">
                <button
                  type="button"
                  onClick={() => setStackedUnit("absolute")}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-medium transition-all ${
                    stackedUnit === "absolute"
                      ? "bg-[#38BDF8] text-black font-bold"
                      : "text-[#667085] hover:text-[#A7B0BF]"
                  }`}
                >
                  Kz Absoluto
                </button>
                <button
                  type="button"
                  onClick={() => setStackedUnit("percent")}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-medium inline-flex items-center gap-1 transition-all ${
                    stackedUnit === "percent"
                      ? "bg-[#38BDF8] text-black font-bold"
                      : "text-[#667085] hover:text-[#A7B0BF]"
                  }`}
                >
                  <Percent className="size-3" />
                  <span>100% Proporção</span>
                </button>
              </div>

              {/* Time Horizon Filter */}
              <div className="inline-flex rounded-[8px] bg-[#151A23] border border-[#252C38] p-0.5">
                <button
                  type="button"
                  onClick={() => setTimeHorizon("actual")}
                  className={`px-2 py-1 rounded-[6px] text-xs font-medium transition-all ${
                    timeHorizon === "actual"
                      ? "bg-[#252C38] text-white"
                      : "text-[#667085] hover:text-[#A7B0BF]"
                  }`}
                >
                  1º Tri (Real)
                </button>
                <button
                  type="button"
                  onClick={() => setTimeHorizon("all")}
                  className={`px-2 py-1 rounded-[6px] text-xs font-medium transition-all ${
                    timeHorizon === "all"
                      ? "bg-[#252C38] text-white"
                      : "text-[#667085] hover:text-[#A7B0BF]"
                  }`}
                >
                  Semestre (+ Proj.)
                </button>
              </div>
            </div>
          </div>

          {/* Stacked Chart Container */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={normalizedStackedData}
                margin={{ top: 15, right: 15, left: 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="stackedSetupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="stackedMrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#15803D" stopOpacity={0.85} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#252C38" vertical={false} />

                <XAxis
                  dataKey="monthShort"
                  stroke="#667085"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#252C38" }}
                />

                <YAxis
                  stroke="#667085"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: "#252C38" }}
                  domain={stackedUnit === "percent" ? [0, 100] : [0, "auto"]}
                  tickFormatter={(value) => {
                    if (stackedUnit === "percent") return `${value}%`;
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return String(value);
                  }}
                />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]!.payload;
                      const setupKz = data.setupRevenue;
                      const mrrKz = data.mrrRevenue;
                      const totalKz = data.totalRevenue;
                      const setupPct = ((setupKz / totalKz) * 100).toFixed(1);
                      const mrrPct = ((mrrKz / totalKz) * 100).toFixed(1);

                      return (
                        <div className="rounded-[12px] border border-[#252C38] bg-[#0E141D] p-3.5 shadow-2xl backdrop-blur-md min-w-[260px] text-xs">
                          <div className="flex items-center justify-between pb-2 border-b border-[#252C38]">
                            <strong className="text-[#F5F7FA] font-bold">{data.month}</strong>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                                data.isProjected
                                  ? "bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/40"
                                  : "bg-[#22C55E]/20 text-[#86EFAC] border border-[#22C55E]/40"
                              }`}
                            >
                              {data.isProjected ? "Projetado" : "Realizado"}
                            </span>
                          </div>

                          <div className="mt-2.5 space-y-2">
                            {/* Setup share */}
                            <div className="flex items-center justify-between">
                              <span className="text-[#93C5FD] flex items-center gap-1.5">
                                <span className="size-2 rounded-[2px] bg-[#3B82F6]" />
                                Setup Único:
                              </span>
                              <div className="text-right">
                                <span className="font-mono font-bold text-[#F5F7FA]">
                                  {formatKz(setupKz)}
                                </span>
                                <span className="ml-1 text-[11px] text-[#93C5FD] font-mono">
                                  ({setupPct}%)
                                </span>
                              </div>
                            </div>

                            {/* MRR share */}
                            <div className="flex items-center justify-between">
                              <span className="text-[#86EFAC] flex items-center gap-1.5">
                                <span className="size-2 rounded-[2px] bg-[#22C55E]" />
                                MRR Recorrente:
                              </span>
                              <div className="text-right">
                                <span className="font-mono font-bold text-[#22C55E]">
                                  {formatKz(mrrKz)}
                                </span>
                                <span className="ml-1 text-[11px] text-[#86EFAC] font-mono font-bold">
                                  ({mrrPct}%)
                                </span>
                              </div>
                            </div>

                            {/* Total and proportion summary */}
                            <div className="pt-2 border-t border-[#252C38] flex items-center justify-between font-bold">
                              <span className="text-[#F59E0B]">Total Faturado:</span>
                              <span className="font-mono text-[#F5F7FA]">{formatKz(totalKz)}</span>
                            </div>

                            <div className="p-1.5 rounded bg-[#151A23] border border-[#252C38] flex items-center justify-between text-[11px]">
                              <span className="text-[#A7B0BF]">Índice de Recorrência:</span>
                              <span className="font-mono font-bold text-[#22C55E]">
                                {mrrPct}% Recorrente
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="rect"
                  iconSize={10}
                  wrapperStyle={{ paddingBottom: "10px", fontSize: "11px" }}
                />

                {/* Stacked Bars with stackId="revenue" */}
                <Bar
                  dataKey={stackedUnit === "percent" ? "setupPercent" : "setupRevenue"}
                  stackId="revenue"
                  name="Receita de Setup Único"
                  fill="url(#stackedSetupGrad)"
                  radius={stackedUnit === "percent" ? [0, 0, 0, 0] : [0, 0, 0, 0]}
                  barSize={32}
                />

                <Bar
                  dataKey={stackedUnit === "percent" ? "mrrPercent" : "mrrRevenue"}
                  stackId="revenue"
                  name="Receita Recorrente (MRR)"
                  fill="url(#stackedMrrGrad)"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Analytical Callout Footer */}
          <div className="mt-3 pt-3 border-t border-[#252C38]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="text-[#A7B0BF] flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#22C55E]" />
              <strong>Conclusão Estrutural:</strong> No início das operações (Janeiro), o Setup
              representava 83% da receita. Atualmente, o MRR já ultrapassa a metade do faturamento
              mensal, consolidando fluxo de caixa previsível.
            </span>
            <button
              type="button"
              onClick={() => setChartMode("projection")}
              className="text-[#38BDF8] hover:underline font-semibold shrink-0 inline-flex items-center gap-1 text-[11px]"
            >
              <span>Ver Projeção para os Próximos 6 Meses</span>
              <ArrowUpRight className="size-3" />
            </button>
          </div>
        </div>
      ) : (
        /* Composed Evolution Trend Chart (Original Multi-metric View) */
        <div
          id="composed-chart-container"
          className="rounded-[14px] border border-[#252C38] bg-[#080A0F] p-4.5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#252C38]/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
                {viewMode === "monthly"
                  ? "Comparativo Mês a Mês: Setup vs. MRR"
                  : "Crescimento Acumulado de Receita"}
              </span>
              <span className="text-[11px] text-[#667085]">(Valores em Kwanzas - AOA)</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-[3px] bg-[#3B82F6]" />
                <span className="text-[#A7B0BF]">Receita de Setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-[#22C55E]" />
                <span className="text-[#A7B0BF]">MRR Recorrente</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-3 h-0.5 bg-[#F59E0B]" />
                <span className="text-[#A7B0BF]">Receita Total</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={filteredData}
                margin={{ top: 15, right: 15, left: 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="mrrAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="setupBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.7} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#252C38" vertical={false} />

                <XAxis
                  dataKey="monthShort"
                  stroke="#667085"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#252C38" }}
                />

                <YAxis
                  stroke="#667085"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: "#252C38" }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return String(value);
                  }}
                />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]!.payload as MonthlyRevenueData;
                      const setupVal =
                        viewMode === "monthly" ? data.setupRevenue : data.cumulativeSetup;
                      const mrrVal = viewMode === "monthly" ? data.mrrRevenue : data.cumulativeMrr;
                      const totalVal =
                        viewMode === "monthly" ? data.totalRevenue : data.cumulativeTotal;

                      return (
                        <div className="rounded-[12px] border border-[#252C38] bg-[#0E141D] p-3 shadow-2xl backdrop-blur-md min-w-[240px]">
                          <div className="flex items-center justify-between pb-2 border-b border-[#252C38]">
                            <span className="text-xs font-bold text-[#F5F7FA]">{data.month}</span>
                            {data.isProjected ? (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/40 font-mono">
                                Projeção
                              </span>
                            ) : (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#22C55E]/20 text-[#86EFAC] border border-[#22C55E]/40 font-mono">
                                Realizado
                              </span>
                            )}
                          </div>

                          <div className="mt-2 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[#93C5FD] flex items-center gap-1.5">
                                <span className="size-2 rounded-[2px] bg-[#3B82F6]" />
                                Receita Setup:
                              </span>
                              <span className="font-mono font-bold text-[#F5F7FA]">
                                {formatKz(setupVal)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[#86EFAC] flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-[#22C55E]" />
                                MRR Recorrente:
                              </span>
                              <span className="font-mono font-bold text-[#22C55E]">
                                {formatKz(mrrVal)}
                                {viewMode === "monthly" && "/mês"}
                              </span>
                            </div>

                            <div className="pt-1.5 border-t border-[#252C38] flex items-center justify-between font-bold">
                              <span className="text-[#F59E0B]">Receita Total:</span>
                              <span className="font-mono text-[#F5F7FA]">{formatKz(totalVal)}</span>
                            </div>

                            <div className="pt-1 flex items-center justify-between text-[10px] text-[#A7B0BF]">
                              <span>Contratos Ativos:</span>
                              <span className="font-mono text-[#F5F7FA] font-bold">
                                {data.activeClients} empresas
                              </span>
                            </div>

                            {data.highlightNote && (
                              <p className="pt-1 text-[10px] text-[#667085] italic border-t border-[#252C38]/60 mt-1">
                                {data.highlightNote}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Bar for Setup Revenue */}
                <Bar
                  dataKey={viewMode === "monthly" ? "setupRevenue" : "cumulativeSetup"}
                  name="Receita de Setup"
                  fill="url(#setupBarGrad)"
                  radius={[4, 4, 0, 0]}
                  barSize={viewMode === "monthly" ? 28 : 22}
                />

                {/* Area for Recurring MRR */}
                <Area
                  type="monotone"
                  dataKey={viewMode === "monthly" ? "mrrRevenue" : "cumulativeMrr"}
                  name="MRR Recorrente"
                  stroke="#22C55E"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#mrrAreaGrad)"
                />

                {/* Line for Total Month Revenue */}
                <Line
                  type="monotone"
                  dataKey={viewMode === "monthly" ? "totalRevenue" : "cumulativeTotal"}
                  name="Receita Total"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#F59E0B", strokeWidth: 1 }}
                  activeDot={{ r: 5, fill: "#F59E0B" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Monthly Timeline Cards Strip */}
      <div className="mt-4 pt-3 border-t border-[#252C38]/60">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
            Linha do Tempo Mensal de Ativações e Faturamento
          </span>
          <span className="text-[10px] text-[#A7B0BF]">
            Valores discriminados por competência fiscal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {filteredData.map((item) => (
            <div
              key={item.month}
              className={`p-2.5 rounded-[10px] border transition-all ${
                item.month.includes("Março")
                  ? "border-[#22C55E]/40 bg-[#22C55E]/5 shadow-sm"
                  : item.isProjected
                    ? "border-[#8B5CF6]/30 bg-[#8B5CF6]/5"
                    : "border-[#252C38] bg-[#0E121A]/50"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-[#F5F7FA]">{item.monthShort}</span>
                {item.isProjected ? (
                  <span className="text-[8px] px-1 rounded bg-[#8B5CF6]/20 text-[#A78BFA] font-mono">
                    Proj
                  </span>
                ) : (
                  <span className="text-[8px] px-1 rounded bg-[#22C55E]/20 text-[#86EFAC] font-mono">
                    Real
                  </span>
                )}
              </div>

              <div className="mt-1.5 space-y-0.5 text-[10px]">
                <div className="flex items-center justify-between text-[#93C5FD]">
                  <span>Setup:</span>
                  <span className="font-mono font-medium">{formatKz(item.setupRevenue)}</span>
                </div>
                <div className="flex items-center justify-between text-[#86EFAC]">
                  <span>MRR:</span>
                  <span className="font-mono font-semibold">{formatKz(item.mrrRevenue)}</span>
                </div>
                <div className="pt-1 border-t border-[#252C38]/50 flex items-center justify-between text-[#F5F7FA] font-bold">
                  <span>Total:</span>
                  <span className="font-mono">{formatKz(item.totalRevenue)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Print Executive Preview Modal */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-[16px] border border-[#252C38] bg-[#0E121A] p-6 shadow-2xl text-[#F5F7FA]">
            <div className="flex items-start justify-between pb-3 border-b border-[#252C38]">
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                  <Printer className="size-4.5 text-[#38BDF8]" />
                  <span>Relatório Executivo de Receita & MRR</span>
                </h3>
                <p className="text-xs text-[#A7B0BF] mt-0.5">
                  Agentes Digital • Luanda, Angola • Competência 2026
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPrintModalOpen(false)}
                className="p-1.5 text-[#667085] hover:text-white rounded-[6px] hover:bg-[#1A212D]"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Printable Preview Table */}
            <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-3 gap-3 p-3 rounded-[10px] bg-[#151A23] border border-[#252C38]">
                <div>
                  <span className="text-[#667085] block text-[10px]">MRR Recorrente Ativo</span>
                  <span className="text-sm font-bold font-mono text-[#22C55E]">
                    {financialMetrics.mrrFormatted}
                  </span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px]">Setup Único Total</span>
                  <span className="text-sm font-bold font-mono text-[#3B82F6]">
                    {financialMetrics.setupRevenueFormatted}
                  </span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px]">ARR Anualizado</span>
                  <span className="text-sm font-bold font-mono text-[#F59E0B]">
                    {financialMetrics.arrFormatted}
                  </span>
                </div>
              </div>

              <table className="w-full border-collapse border border-[#252C38] text-[11px]">
                <thead>
                  <tr className="bg-[#151A23] text-[#A7B0BF]">
                    <th className="p-2 text-left border border-[#252C38]">Mês</th>
                    <th className="p-2 text-right border border-[#252C38]">Setup (AOA)</th>
                    <th className="p-2 text-right border border-[#252C38]">MRR (AOA)</th>
                    <th className="p-2 text-right border border-[#252C38]">Total (AOA)</th>
                    <th className="p-2 text-center border border-[#252C38]">% MRR</th>
                    <th className="p-2 text-center border border-[#252C38]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => {
                    const mrrPct = ((row.mrrRevenue / row.totalRevenue) * 100).toFixed(0);
                    return (
                      <tr
                        key={row.month}
                        className="border-b border-[#252C38] hover:bg-[#151A23]/50"
                      >
                        <td className="p-2 font-medium">{row.month}</td>
                        <td className="p-2 text-right font-mono text-[#93C5FD]">
                          {formatKz(row.setupRevenue)}
                        </td>
                        <td className="p-2 text-right font-mono text-[#86EFAC] font-bold">
                          {formatKz(row.mrrRevenue)}
                        </td>
                        <td className="p-2 text-right font-mono text-[#F5F7FA]">
                          {formatKz(row.totalRevenue)}
                        </td>
                        <td className="p-2 text-center font-mono text-[#22C55E] font-bold">
                          {mrrPct}%
                        </td>
                        <td className="p-2 text-center">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] ${
                              row.isProjected
                                ? "bg-[#8B5CF6]/20 text-[#A78BFA]"
                                : "bg-[#22C55E]/20 text-[#86EFAC]"
                            }`}
                          >
                            {row.isProjected ? "Projeção" : "Realizado"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pt-3.5 border-t border-[#252C38] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDownloadCSV}
                className="px-3.5 py-2 rounded-[8px] bg-[#0E121A] hover:bg-[#252C38] border border-[#252C38] text-xs font-semibold text-[#38BDF8] inline-flex items-center gap-1.5 transition-all"
              >
                <FileSpreadsheet className="size-3.5" />
                <span>Baixar CSV</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPrintModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] bg-[#151A23] hover:bg-[#252C38] text-[#CBD5E1] text-xs font-medium border border-[#252C38] transition-all"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Printer className="size-3.5" />
                  <span>Imprimir / Salvar como PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
