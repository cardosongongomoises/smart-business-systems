import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  Target,
  Sparkles,
  Users,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { formatKz } from "./financialUtils";

interface MRRProjectionChartProps {
  currentMrr: number;
  conversionRatePercent: number; // e.g. 22.2
  totalPipelineLeads: number; // e.g. 18
  averageTicketMrr?: number; // average plan monthly fee, default 65000
}

interface ProjectionMonthData {
  month: string;
  monthIndex: number;
  // Base Scenario
  mrrBase: number;
  newClientsBase: number;
  arrBase: number;
  // Accelerated Scenario
  mrrAccelerated: number;
  // Conservative Scenario
  mrrConservative: number;
  // Range for Area
  mrrRange: [number, number];
  note: string;
}

export function MRRProjectionChart({
  currentMrr,
  conversionRatePercent,
  totalPipelineLeads,
  averageTicketMrr = 65000,
}: MRRProjectionChartProps) {
  const [scenario, setScenario] = useState<"base" | "accelerated" | "conservative">("base");
  const [activeMilestone, setActiveMilestone] = useState<number | null>(500000);

  // Normalize conversion rate (fallback to 25% if 0)
  const effectiveConvRate = useMemo(() => {
    const r = conversionRatePercent > 0 ? conversionRatePercent : 25;
    return Math.min(Math.max(r, 10), 60);
  }, [conversionRatePercent]);

  // Compute 6-month projection data series
  const projectionData: ProjectionMonthData[] = useMemo(() => {
    const monthsNames = [
      "Abril 2026",
      "Maio 2026",
      "Junho 2026",
      "Julho 2026",
      "Agosto 2026",
      "Setembro 2026",
    ];

    const monthsShort = ["Abr", "Mai", "Jun", "Jul", "Ago", "Set"];

    // Average incoming qualified leads per month based on pipeline
    const monthlyNewQualifiedLeads = Math.max(Math.round(totalPipelineLeads * 0.45), 6);

    let runningBaseMrr = currentMrr;
    let runningAccMrr = currentMrr;
    let runningConsMrr = currentMrr;

    const notes = [
      "Conversão de propostas em negociação final",
      "Adesão ao plano Automate Pro em clientes existentes",
      "Expansão de contas jurídicas e clínicas médicas",
      "Novas ativações pelo agente de IA no WhatsApp",
      "Consolidação de contratos corporativos no Talatona",
      "Marco de 6 meses com base recorrente expandida",
    ];

    return monthsNames.map((mName, idx) => {
      // Base: uses actual conversion rate
      const convBaseDec = effectiveConvRate / 100;
      const newClientsBase = Math.max(1, Math.round(monthlyNewQualifiedLeads * convBaseDec));
      const addedMrrBase = newClientsBase * averageTicketMrr;
      runningBaseMrr += addedMrrBase;

      // Accelerated: +15% conversion efficiency & higher tier adoption (Domínio IA + Automate Pro)
      const convAccDec = Math.min((effectiveConvRate + 15) / 100, 0.7);
      const newClientsAcc = Math.max(2, Math.round(monthlyNewQualifiedLeads * convAccDec));
      const addedMrrAcc = newClientsAcc * (averageTicketMrr * 1.15);
      runningAccMrr += addedMrrAcc;

      // Conservative: 30% reduction in conversion speed
      const convConsDec = Math.max((effectiveConvRate * 0.7) / 100, 0.08);
      const newClientsCons = Math.max(1, Math.round(monthlyNewQualifiedLeads * convConsDec));
      const addedMrrCons = newClientsCons * (averageTicketMrr * 0.85);
      runningConsMrr += addedMrrCons;

      return {
        month: monthsShort[idx] ?? "",
        monthIndex: idx + 1,
        mrrBase: Math.round(runningBaseMrr),
        newClientsBase,
        arrBase: Math.round(runningBaseMrr * 12),
        mrrAccelerated: Math.round(runningAccMrr),
        mrrConservative: Math.round(runningConsMrr),
        mrrRange: [Math.round(runningConsMrr), Math.round(runningAccMrr)],
        note: notes[idx] ?? "",
      };
    });
  }, [currentMrr, effectiveConvRate, totalPipelineLeads, averageTicketMrr]);

  // Key projection milestones
  const endPeriodBase = projectionData[projectionData.length - 1]?.mrrBase || currentMrr;
  const endPeriodAcc = projectionData[projectionData.length - 1]?.mrrAccelerated || currentMrr;
  const endPeriodCons = projectionData[projectionData.length - 1]?.mrrConservative || currentMrr;

  const activeEndMrr =
    scenario === "accelerated"
      ? endPeriodAcc
      : scenario === "conservative"
        ? endPeriodCons
        : endPeriodBase;

  const totalGrowthPercent =
    currentMrr > 0 ? Math.round(((activeEndMrr - currentMrr) / currentMrr) * 100) : 0;

  const totalNewClientsProjected = projectionData.reduce((acc, cur) => acc + cur.newClientsBase, 0);

  return (
    <div
      id="mrr-growth-projection-panel"
      className="rounded-[16px] border border-[#252C38] bg-gradient-to-br from-[#10141D] via-[#151A23] to-[#0E121A] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
    >
      {/* Header with Title and Scenario Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-[8px] bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
              <TrendingUp className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA] flex items-center gap-2">
                <span>Projeção de Crescimento do MRR (Próximos 6 Meses)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 font-mono font-medium">
                  Taxa Atual: {effectiveConvRate.toFixed(1)}% Conv.
                </span>
              </h3>
              <p className="text-xs text-[#A7B0BF] mt-0.5">
                Modelo preditivo baseado no fluxo atual de leads, taxa de fechamento e ticket médio
                contratual
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Controls */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
          <span className="text-[11px] text-[#667085] font-semibold uppercase tracking-wider mr-1">
            Cenário:
          </span>
          <div className="inline-flex rounded-[8px] bg-[#0E121A] border border-[#252C38] p-0.5">
            <button
              type="button"
              onClick={() => setScenario("conservative")}
              className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-all ${
                scenario === "conservative"
                  ? "bg-[#252C38] text-[#F5F7FA] shadow-sm"
                  : "text-[#667085] hover:text-[#A7B0BF]"
              }`}
            >
              Conservador
            </button>
            <button
              type="button"
              onClick={() => setScenario("base")}
              className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-all ${
                scenario === "base"
                  ? "bg-[#38BDF8] text-black shadow-sm font-bold"
                  : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              Base ({effectiveConvRate.toFixed(0)}%)
            </button>
            <button
              type="button"
              onClick={() => setScenario("accelerated")}
              className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-all ${
                scenario === "accelerated"
                  ? "bg-[#22C55E] text-black shadow-sm font-bold"
                  : "text-[#667085] hover:text-[#A7B0BF]"
              }`}
            >
              Acelerado (+15%)
            </button>
          </div>
        </div>
      </div>

      {/* 4 KPI Highlights of the 6-month forecast */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-4">
        <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A]/70 p-3.5">
          <span className="text-[11px] text-[#667085] block font-medium">MRR Inicial Atual</span>
          <p className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">{formatKz(currentMrr)}</p>
          <span className="text-[10px] text-[#A7B0BF] mt-0.5 block">
            Base contratada Março 2026
          </span>
        </div>

        <div className="rounded-[12px] border border-[#38BDF8]/40 bg-[#38BDF8]/10 p-3.5">
          <div className="flex items-center justify-between text-[#38BDF8]">
            <span className="text-[11px] font-semibold">MRR em 6 Meses</span>
            <Sparkles className="size-3.5" />
          </div>
          <p className="text-xl font-bold font-mono text-[#38BDF8] mt-1">
            {formatKz(activeEndMrr)}
          </p>
          <span className="text-[10px] text-[#7DD3FC] font-semibold mt-0.5 block">
            +{totalGrowthPercent}% de crescimento projetado
          </span>
        </div>

        <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A]/70 p-3.5">
          <div className="flex items-center justify-between text-[#667085]">
            <span className="text-[11px] font-medium">Novos Clientes Previstos</span>
            <Users className="size-3.5 text-[#22C55E]" />
          </div>
          <p className="text-xl font-bold font-mono text-[#22C55E] mt-1">
            +{totalNewClientsProjected} empresas
          </p>
          <span className="text-[10px] text-[#A7B0BF] mt-0.5 block">
            Ticket médio: ~{formatKz(averageTicketMrr)}/mês
          </span>
        </div>

        <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A]/70 p-3.5">
          <div className="flex items-center justify-between text-[#667085]">
            <span className="text-[11px] font-medium">ARR Anualizado (Mês 6)</span>
            <DollarSign className="size-3.5 text-[#F59E0B]" />
          </div>
          <p className="text-xl font-bold font-mono text-[#F59E0B] mt-1">
            {formatKz(activeEndMrr * 12)}
          </p>
          <span className="text-[10px] text-[#A7B0BF] mt-0.5 block">
            Potencial anual de faturamento
          </span>
        </div>
      </div>

      {/* Main Recharts Forecast Chart */}
      <div className="mt-2 rounded-[14px] border border-[#252C38] bg-[#080A0F] p-4">
        <div className="flex items-center justify-between gap-3 mb-3 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#F5F7FA]">Curva de Aceleração do MRR</span>
            <span className="text-[#667085]">(Abril a Setembro de 2026)</span>
          </div>

          {/* Milestone Target Toggles */}
          <div className="flex items-center gap-3">
            <span className="text-[#667085] text-[11px]">Marcos de Meta:</span>
            {[
              { val: 500000, label: "500k" },
              { val: 750000, label: "750k" },
              { val: 1000000, label: "1.0M" },
            ].map((m) => (
              <button
                key={m.val}
                type="button"
                onClick={() => setActiveMilestone(activeMilestone === m.val ? null : m.val)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all border ${
                  activeMilestone === m.val
                    ? "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/50"
                    : "bg-[#151A23] text-[#667085] border-[#252C38] hover:text-[#A7B0BF]"
                }`}
              >
                Meta {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={projectionData}
              margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="projAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="accAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1E2530" vertical={false} />

              <XAxis
                dataKey="month"
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
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0]!.payload as ProjectionMonthData;
                    return (
                      <div className="rounded-[12px] border border-[#252C38] bg-[#0E141D] p-3 shadow-2xl backdrop-blur-md min-w-[220px] text-xs">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#252C38]">
                          <strong className="text-[#F5F7FA]">{data.month} 2026</strong>
                          <span className="text-[10px] text-[#38BDF8] font-mono">
                            Mês +{data.monthIndex}
                          </span>
                        </div>

                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[#38BDF8]">MRR Base:</span>
                            <span className="font-mono font-bold text-[#F5F7FA]">
                              {formatKz(data.mrrBase)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[#22C55E]">Cenário Acelerado:</span>
                            <span className="font-mono font-bold text-[#22C55E]">
                              {formatKz(data.mrrAccelerated)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[#667085]">
                            <span>Cenário Conservador:</span>
                            <span className="font-mono">{formatKz(data.mrrConservative)}</span>
                          </div>

                          <div className="pt-1 border-t border-[#252C38] flex items-center justify-between text-[11px]">
                            <span className="text-[#A7B0BF]">Novos Clientes:</span>
                            <span className="font-bold text-[#F5F7FA]">
                              +{data.newClientsBase} contratos
                            </span>
                          </div>

                          <p className="pt-1 text-[10px] text-[#667085] italic">{data.note}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {activeMilestone && (
                <ReferenceLine
                  y={activeMilestone}
                  stroke="#F59E0B"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: `Meta ${formatKz(activeMilestone)}`,
                    fill: "#F59E0B",
                    fontSize: 10,
                    position: "top",
                  }}
                />
              )}

              {/* Range Area between conservative and accelerated */}
              <Area
                type="monotone"
                dataKey={scenario === "accelerated" ? "mrrAccelerated" : "mrrBase"}
                name="MRR Projetado"
                stroke={scenario === "accelerated" ? "#22C55E" : "#38BDF8"}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={scenario === "accelerated" ? "url(#accAreaGrad)" : "url(#projAreaGrad)"}
              />

              {/* Conservative line if in base mode */}
              {scenario === "base" && (
                <Line
                  type="monotone"
                  dataKey="mrrConservative"
                  name="Piso Conservador"
                  stroke="#64748B"
                  strokeDasharray="3 3"
                  strokeWidth={1.5}
                  dot={false}
                />
              )}

              {/* Accelerated line if in base mode */}
              {scenario === "base" && (
                <Line
                  type="monotone"
                  dataKey="mrrAccelerated"
                  name="Teto Acelerado"
                  stroke="#22C55E"
                  strokeDasharray="3 3"
                  strokeWidth={1.5}
                  dot={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
