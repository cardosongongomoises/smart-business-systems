import { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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
} from "lucide-react";
import { FinancialSummary, MonthlyRevenueData, formatKz } from "./financialUtils";
import { ActiveTab } from "./OperationsSidebar";

interface RevenueAnalyticsSectionProps {
  financialMetrics: FinancialSummary;
  onNavigateTab?: (tab: ActiveTab) => void;
}

export function RevenueAnalyticsSection({
  financialMetrics,
  onNavigateTab,
}: RevenueAnalyticsSectionProps) {
  // Chart view mode: 'monthly' (mês a mês) or 'cumulative' (acumulado)
  const [viewMode, setViewMode] = useState<"monthly" | "cumulative">("monthly");
  // Time horizon: 'all' (6 months) or 'actual' (Jan-Mar only)
  const [timeHorizon, setTimeHorizon] = useState<"all" | "actual">("all");

  const filteredData = financialMetrics.monthlyRevenueEvolution.filter((item) => {
    if (timeHorizon === "actual") {
      return !item.isProjected;
    }
    return true;
  });

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
                Separação analítica entre implantação inicial de websites e receitas recorrentes de
                mensalidade
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Monthly vs Cumulative */}
          <div className="inline-flex rounded-[8px] bg-[#0E121A] border border-[#252C38] p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("monthly")}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all ${
                viewMode === "monthly"
                  ? "bg-[#22C55E] text-black shadow-sm font-bold"
                  : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              Visão Mensal
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cumulative")}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all ${
                viewMode === "cumulative"
                  ? "bg-[#22C55E] text-black shadow-sm font-bold"
                  : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              Visão Acumulada
            </button>
          </div>

          {/* Time Horizon Filter */}
          <div className="inline-flex rounded-[8px] bg-[#0E121A] border border-[#252C38] p-0.5">
            <button
              type="button"
              onClick={() => setTimeHorizon("actual")}
              className={`px-2.5 py-1.5 rounded-[6px] text-xs font-medium transition-all ${
                timeHorizon === "actual"
                  ? "bg-[#252C38] text-white"
                  : "text-[#667085] hover:text-[#A7B0BF]"
              }`}
            >
              1º Trimestre (Real)
            </button>
            <button
              type="button"
              onClick={() => setTimeHorizon("all")}
              className={`px-2.5 py-1.5 rounded-[6px] text-xs font-medium transition-all ${
                timeHorizon === "all"
                  ? "bg-[#252C38] text-white"
                  : "text-[#667085] hover:text-[#A7B0BF]"
              }`}
            >
              Semestre (+ Projeções)
            </button>
          </div>

          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab("clients")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#3B82F6]/15 hover:bg-[#3B82F6]/25 border border-[#3B82F6]/30 text-xs font-semibold text-[#3B82F6] transition-all"
            >
              <span>Ver Contratos</span>
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
          <p className="text-2xl font-bold font-mono text-[#3B82F6] mt-2 tracking-tight">
            {financialMetrics.setupRevenueFormatted}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">
            Desenvolvimento de websites, integrações e implantação inicial dos agentes
          </p>
        </div>

        {/* Metric 2: Receita Recorrente Mensal (MRR) with MoM */}
        <div className="rounded-[12px] border-2 border-[#22C55E]/60 bg-gradient-to-br from-[#0F231A] via-[#12231B] to-[#151A23] p-3.5 relative overflow-hidden shadow-[0_0_16px_rgba(34,197,94,0.15)]">
          <div className="flex items-center justify-between text-[#22C55E]">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Coins className="size-3.5 text-[#22C55E]" />
              Receita Recorrente (MRR)
            </span>
            <div
              className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                financialMetrics.isChurn
                  ? "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40"
                  : "bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40"
              }`}
            >
              {financialMetrics.isChurn ? (
                <TrendingDown className="size-2.5" />
              ) : (
                <TrendingUp className="size-2.5" />
              )}
              <span>{financialMetrics.mrrMomGrowthFormatted} MoM</span>
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-[#22C55E] mt-2 tracking-tight">
            {financialMetrics.mrrFormatted}
          </p>
          <p className="text-[11px] text-[#86EFAC] mt-1 flex items-center justify-between">
            <span>{financialMetrics.activeRecurringClients} contratos mensais ativos</span>
            <span className="text-[10px] text-[#A7B0BF]">
              vs. mês ant: {financialMetrics.mrrMomDiffFormatted}
            </span>
          </p>
        </div>

        {/* Metric 3: ARR Anualizado */}
        <div className="rounded-[12px] border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-3.5">
          <div className="flex items-center justify-between text-[#F59E0B]">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <DollarSign className="size-3.5 text-[#F59E0B]" />
              ARR Projetado (12 Meses)
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#F59E0B]/20 font-bold font-mono">
              Anualizado
            </span>
          </div>
          <p className="text-2xl font-bold font-mono text-[#F59E0B] mt-2 tracking-tight">
            {financialMetrics.arrFormatted}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">
            Previsibilidade garantida pela base de retenção ({financialMetrics.retentionRate}%)
          </p>
        </div>

        {/* Metric 4: Previsibilidade & Estabilidade */}
        <div className="rounded-[12px] border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 p-3.5">
          <div className="flex items-center justify-between text-[#8B5CF6]">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#8B5CF6]" />
              Previsibilidade de Caixa
            </span>
            <span className="text-[10px] text-[#8B5CF6] font-mono font-bold">0% Churn</span>
          </div>
          <p className="text-2xl font-bold font-mono text-[#8B5CF6] mt-2 tracking-tight">100%</p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">
            Contratos com suporte contínuo, SLA de infraestrutura e hospedagem de alta performance
          </p>
        </div>
      </div>

      {/* Recharts Chart Container */}
      <div className="rounded-[14px] border border-[#252C38] bg-[#0E121A]/80 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-2">
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
            <ComposedChart data={filteredData} margin={{ top: 15, right: 15, left: 10, bottom: 5 }}>
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
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as MonthlyRevenueData;
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

      {/* Monthly Timeline Cards Strip */}
      <div className="mt-4 pt-3 border-t border-[#252C38]/60">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
            Detalhamento Cronológico por Mês
          </span>
          <span className="text-[10px] text-[#A7B0BF]">
            Variação contínua e sem churn registrado
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {filteredData.map((item, idx) => {
            const isCurrent = item.monthShort === "Mar";
            return (
              <div
                key={item.month}
                className={`p-2.5 rounded-[10px] border transition-all ${
                  isCurrent
                    ? "border-[#22C55E] bg-[#22C55E]/10 shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                    : item.isProjected
                      ? "border-[#252C38]/80 bg-[#0E121A]/50 opacity-80"
                      : "border-[#252C38] bg-[#0E121A]/80 hover:bg-[#151A23]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F5F7FA]">{item.monthShort}</span>
                  {item.isProjected ? (
                    <span className="text-[8px] px-1 py-0.2 rounded bg-[#8B5CF6]/20 text-[#A78BFA] font-mono">
                      Proj.
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[8px] px-1 py-0.2 rounded bg-[#22C55E] text-black font-bold font-mono">
                      Atual
                    </span>
                  ) : (
                    <CheckCircle2 className="size-3 text-[#22C55E]" />
                  )}
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-baseline justify-between text-[10px]">
                    <span className="text-[#93C5FD]">Setup:</span>
                    <span className="font-mono font-semibold text-[#F5F7FA]">
                      {formatKz(item.setupRevenue)}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between text-[10px]">
                    <span className="text-[#86EFAC]">MRR:</span>
                    <span className="font-mono font-bold text-[#22C55E]">
                      {formatKz(item.mrrRevenue)}
                    </span>
                  </div>

                  <div className="pt-1 border-t border-[#252C38]/60 flex items-baseline justify-between text-[10px] font-bold">
                    <span className="text-[#F59E0B]">Total:</span>
                    <span className="font-mono text-[#F5F7FA]">{formatKz(item.totalRevenue)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
