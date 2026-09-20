import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Percent,
  Search,
  Filter,
  Sparkles,
  Smartphone,
  PhoneOff,
} from "lucide-react";
import { CampaignValidationRecord } from "./campaignValidationStore";

interface CampaignValidationDashboardProps {
  campaigns: CampaignValidationRecord[];
  onSelectCampaign?: (campaign: CampaignValidationRecord) => void;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: CampaignValidationRecord & { shortName?: string };
    color?: string;
  }>;
  label?: string;
}

function CustomValidationTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload as CampaignValidationRecord & { shortName?: string };
    const successRate = data.taxaSucesso ? data.taxaSucesso.toFixed(1) : "0.0";

    return (
      <div className="bg-[#121622] border border-[#2A3548] p-3 rounded-lg shadow-xl text-xs space-y-2 min-w-[240px]">
        <div className="border-b border-[#252C38] pb-1.5">
          <p className="font-bold text-white text-sm">{data.name}</p>
          <p className="text-[10px] text-slate-400">Auditado em: {data.timestamp}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Bem-sucedidas (Ativos):
            </span>
            <span className="font-bold font-mono text-emerald-300">{data.bemSucedidas}</span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-rose-400">
              <XCircle className="w-3.5 h-3.5" />
              Malsucedidas (Descartadas):
            </span>
            <span className="font-bold font-mono text-rose-300">{data.malsucedidas}</span>
          </div>

          <div className="pt-1.5 border-t border-[#252C38] flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Taxa de Sucesso:</span>
            <span className="font-bold text-emerald-400 font-mono">{successRate}%</span>
          </div>

          <div className="text-[10px] text-slate-400 pt-1">
            <span>
              Fixos descartados: <strong>{data.fixosDescartados}</strong>
            </span>{" "}
            •{" "}
            <span>
              Sem conta: <strong>{data.semContaDescartados}</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function CampaignValidationDashboard({
  campaigns,
  onSelectCampaign,
}: CampaignValidationDashboardProps) {
  const [chartType, setChartType] = useState<"grouped" | "stacked" | "donut">("grouped");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampaigns = useMemo(() => {
    if (!searchTerm.trim()) return campaigns;
    return campaigns.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [campaigns, searchTerm]);

  // Totais agregados
  const summary = useMemo(() => {
    let total = 0;
    let bemSucedidas = 0;
    let malsucedidas = 0;
    let fixos = 0;
    let semConta = 0;

    filteredCampaigns.forEach((c) => {
      total += c.total;
      bemSucedidas += c.bemSucedidas;
      malsucedidas += c.malsucedidas;
      fixos += c.fixosDescartados;
      semConta += c.semContaDescartados;
    });

    const taxaGeral = total > 0 ? (bemSucedidas / total) * 100 : 0;
    const bestCampaign = [...filteredCampaigns].sort((a, b) => b.taxaSucesso - a.taxaSucesso)[0];

    return {
      total,
      bemSucedidas,
      malsucedidas,
      fixos,
      semConta,
      taxaGeral: taxaGeral.toFixed(1),
      bestCampaign,
    };
  }, [filteredCampaigns]);

  // Formata os dados para o Recharts
  const chartData = useMemo(() => {
    return filteredCampaigns.map((c) => {
      const shortName = c.name.length > 20 ? `${c.name.slice(0, 18)}...` : c.name;
      const pctSuccess = c.total > 0 ? (c.bemSucedidas / c.total) * 100 : 0;
      const pctFailure = c.total > 0 ? (c.malsucedidas / c.total) * 100 : 0;

      return {
        ...c,
        shortName,
        pctSuccess: Number(pctSuccess.toFixed(1)),
        pctFailure: Number(pctFailure.toFixed(1)),
      };
    });
  }, [filteredCampaigns]);

  // Dados para Donut Chart de distribuição consolidada
  const donutData = useMemo(() => {
    return [
      { name: "Validações Bem-sucedidas (Ativos)", value: summary.bemSucedidas, color: "#10B981" },
      { name: "Linhas Fixas Descartadas", value: summary.fixos, color: "#F43F5E" },
      { name: "Sem Cadastro WhatsApp", value: summary.semConta, color: "#F59E0B" },
    ];
  }, [summary]);

  return (
    <div className="space-y-6">
      {/* Top Banner de Métricas & KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total de Números Auditados</span>
            <ShieldCheck className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white font-mono">{summary.total}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Em {filteredCampaigns.length} campanhas analisadas
            </p>
          </div>
        </div>

        <div className="bg-[#131824] border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Validações Bem-sucedidas
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
              {summary.taxaGeral}% taxa
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {summary.bemSucedidas}
            </div>
            <p className="text-[11px] text-emerald-500/80 mt-0.5">
              WhatsApp móvel ativo e verificado
            </p>
          </div>
        </div>

        <div className="bg-[#131824] border border-rose-500/20 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-400 text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <XCircle className="w-4 h-4" />
              Validações Malsucedidas
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">
              Descarte Pré-DB
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-rose-400 font-mono">{summary.malsucedidas}</div>
            <p className="text-[11px] text-rose-500/80 mt-0.5">
              {summary.fixos} fixos + {summary.semConta} sem conta
            </p>
          </div>
        </div>

        <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Melhor Qualificação</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-sm font-bold text-slate-200 truncate">
              {summary.bestCampaign?.name || "N/A"}
            </div>
            <p className="text-[11px] text-emerald-400 font-mono font-semibold mt-0.5">
              {summary.bestCampaign
                ? `${summary.bestCampaign.taxaSucesso.toFixed(1)}% de aprovação`
                : "Sem dados"}
            </p>
          </div>
        </div>
      </div>

      {/* Painel do Gráfico Recharts */}
      <div className="bg-[#131824] border border-[#252C38] rounded-xl p-5 space-y-4 shadow-lg shadow-black/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#252C38]">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Validações de WhatsApp: Bem-sucedidas vs Malsucedidas por Campanha
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualização analítica de terminals com WhatsApp ativo versus números descartados
              (fixos ou sem conta)
            </p>
          </div>

          {/* Controles do Gráfico */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-[#0E121A] border border-[#252C38] rounded-lg p-0.5 flex items-center">
              <button
                onClick={() => setChartType("grouped")}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  chartType === "grouped"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Barras Agrupadas
              </button>

              <button
                onClick={() => setChartType("stacked")}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  chartType === "stacked"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                100% Proporção
              </button>

              <button
                onClick={() => setChartType("donut")}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  chartType === "donut"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <PieIcon className="w-3.5 h-3.5" />
                Distribuição Geral
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filtrar campanha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0E121A] border border-[#252C38] rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 w-40"
              />
            </div>
          </div>
        </div>

        {/* ÁREA DO GRÁFICO RECHARTS */}
        <div className="w-full h-80 pt-2">
          {filteredCampaigns.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              Nenhuma campanha com dados de validação encontrada.
            </div>
          ) : chartType === "donut" ? (
            <div className="h-full flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(val: number) => [`${val} números`, "Total"]}
                      contentStyle={{
                        backgroundColor: "#121622",
                        borderColor: "#2A3548",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Pie
                      data={donutData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full md:w-1/2 space-y-3 pr-4">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Distribuição Consolidada de Validação
                </h4>
                {donutData.map((d, i) => {
                  const pct =
                    summary.total > 0 ? ((d.value / summary.total) * 100).toFixed(1) : "0";
                  return (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-[#0E121A] border border-[#252C38] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: d.color }}
                        />
                        <span className="text-xs text-slate-300 font-medium">{d.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-white font-mono">{d.value}</span>
                        <span className="text-[11px] text-slate-400 ml-1.5 font-mono">
                          ({pct}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2433" vertical={false} />
                <XAxis
                  dataKey="shortName"
                  stroke="#64748B"
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  tickLine={{ stroke: "#252C38" }}
                />
                <YAxis
                  stroke="#64748B"
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  tickLine={{ stroke: "#252C38" }}
                  allowDecimals={false}
                  unit={chartType === "stacked" ? "%" : ""}
                />
                <Tooltip content={<CustomValidationTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: "14px" }}
                  formatter={(value) => (
                    <span className="text-xs text-slate-300 font-medium">{value}</span>
                  )}
                />

                {chartType === "grouped" ? (
                  <>
                    <Bar
                      dataKey="bemSucedidas"
                      name="Validações Bem-sucedidas (WhatsApp Ativo)"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="malsucedidas"
                      name="Validações Malsucedidas (Descartadas)"
                      fill="#F43F5E"
                      radius={[4, 4, 0, 0]}
                    />
                  </>
                ) : (
                  <>
                    <Bar
                      dataKey="pctSuccess"
                      name="% Bem-sucedidas"
                      stackId="a"
                      fill="#10B981"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="pctFailure"
                      name="% Malsucedidas"
                      stackId="a"
                      fill="#F43F5E"
                      radius={[4, 4, 0, 0]}
                    />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* TABELA COMPARATIVA DE CAMPANHAS */}
      <div className="bg-[#131824] border border-[#252C38] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#252C38] flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Detalhamento de Validação por Campanha
            </h4>
            <p className="text-[11px] text-slate-400">
              Taxa de sucesso e proporção de números fixos ou sem cadastro descartados
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filteredCampaigns.length} campanhas registradas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0E121A] text-slate-400 font-medium text-[11px] border-b border-[#252C38]">
              <tr>
                <th className="p-3">Campanha</th>
                <th className="p-3">Data / Hora</th>
                <th className="p-3 text-center">Total Auditado</th>
                <th className="p-3 text-center">Bem-sucedidas</th>
                <th className="p-3 text-center">Malsucedidas</th>
                <th className="p-3 text-center">Taxa de Sucesso</th>
                <th className="p-3">Descarte Detalhado</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2636]">
              {filteredCampaigns.map((camp) => (
                <tr
                  key={camp.id}
                  onClick={() => onSelectCampaign && onSelectCampaign(camp)}
                  className="hover:bg-[#161D2C] transition-colors cursor-pointer"
                >
                  <td className="p-3 font-semibold text-white">{camp.name}</td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">{camp.timestamp}</td>
                  <td className="p-3 text-center font-mono font-bold text-white">{camp.total}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono font-semibold border border-emerald-500/20">
                      {camp.bemSucedidas}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 font-mono font-semibold border border-rose-500/20">
                      {camp.malsucedidas}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-[#1A2232] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${camp.taxaSucesso}%` }}
                        />
                      </div>
                      <span className="font-mono text-emerald-400 font-semibold text-[11px]">
                        {camp.taxaSucesso.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-400 text-[11px]">
                    <span className="text-rose-400 font-mono">{camp.fixosDescartados} fixos</span> •{" "}
                    <span className="text-amber-400 font-mono">
                      {camp.semContaDescartados} sem conta
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                        camp.status === "concluida"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : camp.status === "em_andamento"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-slate-700/40 text-slate-400 border-slate-700"
                      }`}
                    >
                      {camp.status === "concluida"
                        ? "Concluída"
                        : camp.status === "em_andamento"
                          ? "Em Andamento"
                          : "Rascunho"}
                    </span>
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
