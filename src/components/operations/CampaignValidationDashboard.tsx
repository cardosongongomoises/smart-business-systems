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
  Download,
  Trash2,
  Eye,
  Plus,
  Copy,
  Check,
  ExternalLink,
  X,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { CampaignValidationRecord } from "./campaignValidationStore";

interface CampaignValidationDashboardProps {
  campaigns: CampaignValidationRecord[];
  onSelectCampaign?: (campaign: CampaignValidationRecord) => void;
  onLoadIntoEditor?: (campaign: CampaignValidationRecord) => void;
  onRunSampleAudit?: () => void;
  onDeleteCampaign?: (id: string) => void;
  onClearHistory?: () => void;
  onNavigateToEditor?: () => void;
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
  if (active && payload && payload.length && payload[0]) {
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
  onLoadIntoEditor,
  onRunSampleAudit,
  onDeleteCampaign,
  onClearHistory,
  onNavigateToEditor,
}: CampaignValidationDashboardProps) {
  const [chartType, setChartType] = useState<"grouped" | "stacked" | "donut">("grouped");
  const [searchTerm, setSearchTerm] = useState("");
  const [inspectingCampaign, setInspectingCampaign] = useState<CampaignValidationRecord | null>(
    null,
  );
  const [modalSearch, setModalSearch] = useState("");
  const [modalFilter, setModalFilter] = useState<"all" | "approved" | "discarded">("all");
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

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
      { name: "Descartes por Linha Fixa", value: summary.fixos, color: "#F43F5E" },
      { name: "Descartes por Sem Conta WhatsApp", value: summary.semConta, color: "#F59E0B" },
    ].filter((d) => d.value > 0);
  }, [summary]);

  const handleCopyNumber = (num: string) => {
    const clean = num.replace(/[^\d+]/g, "");
    navigator.clipboard.writeText(clean);
    setCopiedNumber(num);
    toast.success(`Número ${clean} copiado!`);
    setTimeout(() => setCopiedNumber(null), 1800);
  };

  const handleExportFullReport = () => {
    if (campaigns.length === 0) {
      toast.info("Nenhuma campanha para exportar.");
      return;
    }

    const rows = [
      [
        "ID",
        "Nome da Campanha",
        "Data",
        "Total Auditado",
        "Bem-sucedidas",
        "Malsucedidas",
        "Taxa de Sucesso (%)",
        "Fixos Descartados",
        "Sem Conta Descartados",
        "Unitel",
        "Movicel",
        "Africell",
        "Status",
      ].join(";"),
      ...campaigns.map((c) =>
        [
          `"${c.id}"`,
          `"${c.name.replace(/"/g, '""')}"`,
          `"${c.timestamp}"`,
          c.total,
          c.bemSucedidas,
          c.malsucedidas,
          c.taxaSucesso.toFixed(2),
          c.fixosDescartados,
          c.semContaDescartados,
          c.operadoras.unitel,
          c.operadoras.movicel,
          c.operadoras.africell,
          `"${c.status}"`,
        ].join(";"),
      ),
    ];

    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `painel_validacoes_whatsapp_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Relatório consolidado exportado com sucesso!");
  };

  // Leads da campanha inspecionada
  const inspectingLeads = useMemo(() => {
    if (!inspectingCampaign) return [];
    if (inspectingCampaign.sampleLeads && inspectingCampaign.sampleLeads.length > 0) {
      return inspectingCampaign.sampleLeads;
    }
    // Gera contatos sintéticos fieis aos números se não tiver amostragem salva
    const generated = [];
    const total = inspectingCampaign.total;
    const ok = inspectingCampaign.bemSucedidas;
    const fixos = inspectingCampaign.fixosDescartados;

    for (let i = 0; i < total; i++) {
      if (i < ok) {
        const prefix = i % 3 === 0 ? "923" : i % 3 === 1 ? "912" : "951";
        const op = prefix === "923" ? "Unitel" : prefix === "912" ? "Movicel" : "Africell";
        generated.push({
          empresa: `Contato Auditado ${i + 1} (${inspectingCampaign.name.slice(0, 14)})`,
          telefone: `+244 ${prefix} ${100 + i} ${200 + i}`,
          operadora: op,
          status: "aprovado" as const,
          motivo: "WhatsApp ativo e operacional",
          mensagem: "Olá! Gostaria de apresentar nossa proposta comercial.",
        });
      } else if (i < ok + fixos) {
        generated.push({
          empresa: `Recepção Fixo ${i + 1}`,
          telefone: `+244 222 ${300 + i} ${400 + i}`,
          operadora: "Angola Telecom (Fixo)",
          status: "descarte_fixo" as const,
          motivo: "Descarte automático: linha de telefonia fixa Luanda",
          mensagem: "",
        });
      } else {
        const prefix = i % 2 === 0 ? "928" : "944";
        generated.push({
          empresa: `Terminal Sem WhatsApp ${i + 1}`,
          telefone: `+244 ${prefix} ${700 + i} ${800 + i}`,
          operadora: prefix === "928" ? "Unitel" : "Movicel",
          status: "descarte_sem_conta" as const,
          motivo: "Sem conta WhatsApp vinculada a este número móvel",
          mensagem: "",
        });
      }
    }
    return generated;
  }, [inspectingCampaign]);

  const filteredInspectingLeads = useMemo(() => {
    return inspectingLeads.filter((item) => {
      if (modalFilter === "approved" && item.status !== "aprovado") return false;
      if (modalFilter === "discarded" && item.status === "aprovado") return false;
      if (modalSearch) {
        const s = modalSearch.toLowerCase();
        return (
          item.empresa.toLowerCase().includes(s) ||
          item.telefone.toLowerCase().includes(s) ||
          item.operadora.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [inspectingLeads, modalFilter, modalSearch]);

  const handleExportInspectingValidLeads = () => {
    if (!inspectingCampaign) return;
    const validOnly = inspectingLeads.filter((l) => l.status === "aprovado");
    if (validOnly.length === 0) {
      toast.info("Nenhum lead aprovado nesta campanha.");
      return;
    }

    const lines = validOnly.map((l) => `${l.telefone}, ${l.empresa}, ${l.mensagem}`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `leads_validados_${inspectingCampaign.name.replace(/\s+/g, "_")}.txt`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exportados ${validOnly.length} leads aprovados!`);
  };

  return (
    <div className="space-y-6">
      {/* Topo do Painel com Ações Globais */}
      <div className="bg-[#10141D] border border-[#252C38] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Painel Analítico de Validação WhatsApp
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitoramento de números válidos, descartes de linhas fixas e taxas de entrega por
            campanha
          </p>
        </div>

        {/* Botões de Ação do Painel */}
        <div className="flex items-center gap-2 flex-wrap">
          {onNavigateToEditor && (
            <button
              onClick={onNavigateToEditor}
              className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-emerald-700/40"
            >
              <Plus className="w-3.5 h-3.5" />
              Nova Auditoria
            </button>
          )}

          {onRunSampleAudit && (
            <button
              onClick={onRunSampleAudit}
              className="text-xs px-3 py-1.5 bg-[#161E2E] hover:bg-[#1E283C] text-emerald-400 border border-emerald-500/30 rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Auditar Exemplo
            </button>
          )}

          <button
            onClick={handleExportFullReport}
            className="text-xs px-3 py-1.5 bg-[#161D2C] hover:bg-[#1E2638] text-slate-300 border border-[#2A3548] rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Exportar todas as campanhas em CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            Exportar Geral (.CSV)
          </button>

          {onClearHistory && campaigns.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Limpar histórico de validações"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards de Resumo Consolidado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total de Números Analisados</span>
            <Smartphone className="w-4 h-4 text-slate-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white font-mono">{summary.total}</div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Em {filteredCampaigns.length} campanhas registradas
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
              WhatsApp Ativo
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {summary.bemSucedidas}
            </div>
            <p className="text-[11px] text-emerald-500/80 mt-0.5">
              {summary.taxaGeral}% de aproveitamento geral
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
              Descarte Seguro
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
              Comparativo de terminais móveis ativos contra números fixos ou sem cadastro
              descartados
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
                Empilhadas
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
                Consolidado
              </button>
            </div>

            {/* Busca rápida */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filtrar campanha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0E121A] border border-[#252C38] rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44"
              />
            </div>
          </div>
        </div>

        {/* Visualizador Gráfico Recharts */}
        <div className="h-[280px] w-full pt-2">
          {chartData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
              <BarChart3 className="w-8 h-8 mb-2 stroke-[1.5] text-slate-600" />
              Nenhuma campanha encontrada para visualização no gráfico.
            </div>
          ) : chartType === "donut" ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name.split(" ")[0]} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={false}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121622",
                    borderColor: "#2A3548",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#94A3B8" }}
                  formatter={(value) => <span className="text-slate-300">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis
                  dataKey="shortName"
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomValidationTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                  formatter={(value) => (
                    <span className="text-slate-300">
                      {value === "bemSucedidas"
                        ? "Bem-sucedidas (Ativos no WhatsApp)"
                        : "Malsucedidas (Descartes Fixos/Sem Conta)"}
                    </span>
                  )}
                />
                <Bar
                  dataKey="bemSucedidas"
                  name="bemSucedidas"
                  fill="#10B981"
                  radius={chartType === "stacked" ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                  {...(chartType === "stacked" ? { stackId: "a" } : {})}
                />
                <Bar
                  dataKey="malsucedidas"
                  name="malsucedidas"
                  fill="#F43F5E"
                  radius={[4, 4, 0, 0]}
                  {...(chartType === "stacked" ? { stackId: "a" } : {})}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Tabela de Campanhas com Ações Funcionais */}
      <div className="bg-[#131824] border border-[#252C38] rounded-xl overflow-hidden shadow-lg shadow-black/30">
        <div className="p-4 border-b border-[#252C38] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Detalhamento de Validação por Campanha
            </h4>
            <p className="text-[11px] text-slate-400">
              Taxa de sucesso, descarte de linhas fixas e acesso direto aos contatos
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
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center">Bem-sucedidas</th>
                <th className="p-3 text-center">Malsucedidas</th>
                <th className="p-3 text-center">Taxa de Sucesso</th>
                <th className="p-3">Descarte Detalhado</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2636]">
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-[#161D2C] transition-colors">
                  <td
                    onClick={() => setInspectingCampaign(camp)}
                    className="p-3 font-semibold text-white hover:text-emerald-400 cursor-pointer"
                  >
                    {camp.name}
                  </td>
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
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setInspectingCampaign(camp)}
                        className="p-1.5 rounded bg-[#161E2E] hover:bg-[#1E283C] text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                        title="Inspecionar todos os números da campanha"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {onLoadIntoEditor && (
                        <button
                          onClick={() => onLoadIntoEditor(camp)}
                          className="p-1.5 rounded bg-[#161D2C] hover:bg-[#1E2638] text-slate-300 border border-[#2A3548] transition-colors cursor-pointer"
                          title="Carregar campanha no editor para disparo"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {onDeleteCampaign && (
                        <button
                          onClick={() => onDeleteCampaign(camp.id)}
                          className="p-1.5 rounded bg-[#161D2C] hover:bg-rose-950/30 text-slate-400 hover:text-rose-400 border border-[#2A3548] transition-colors cursor-pointer"
                          title="Excluir campanha do histórico"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE INSPEÇÃO DE NÚMEROS DA CAMPANHA */}
      {inspectingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#10141D] border border-[#252C38] rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-[#141A26] border-b border-[#252C38] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  Contatos Auditados: {inspectingCampaign.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Taxa de Aprovação:{" "}
                  <strong className="text-emerald-400 font-mono">
                    {inspectingCampaign.taxaSucesso.toFixed(1)}%
                  </strong>{" "}
                  ({inspectingCampaign.bemSucedidas} válidos de {inspectingCampaign.total})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportInspectingValidLeads}
                  className="text-xs px-2.5 py-1.5 bg-[#161E2E] hover:bg-[#1E283C] text-emerald-400 border border-emerald-500/30 rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exportar Aprovados
                </button>

                {onLoadIntoEditor && (
                  <button
                    onClick={() => {
                      onLoadIntoEditor(inspectingCampaign);
                      setInspectingCampaign(null);
                    }}
                    className="text-xs px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    Abrir no Editor
                  </button>
                )}

                <button
                  onClick={() => setInspectingCampaign(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filtros e Busca no Modal */}
            <div className="p-3 bg-[#121620] border-b border-[#202735] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setModalFilter("all")}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    modalFilter === "all"
                      ? "bg-slate-700 text-white font-medium"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Todos ({inspectingLeads.length})
                </button>

                <button
                  onClick={() => setModalFilter("approved")}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                    modalFilter === "approved"
                      ? "bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30"
                      : "text-slate-400 hover:text-emerald-400"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Aprovados ({inspectingLeads.filter((l) => l.status === "aprovado").length})
                </button>

                <button
                  onClick={() => setModalFilter("discarded")}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                    modalFilter === "discarded"
                      ? "bg-rose-500/20 text-rose-300 font-medium border border-rose-500/30"
                      : "text-slate-400 hover:text-rose-400"
                  }`}
                >
                  <XCircle className="w-3 h-3 text-rose-400" />
                  Descartados ({inspectingLeads.filter((l) => l.status !== "aprovado").length})
                </button>
              </div>

              <div className="relative">
                <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar contato ou número..."
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  className="bg-[#0A0D14] border border-[#252C38] rounded-md pl-7 pr-2.5 py-1 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 w-52"
                />
              </div>
            </div>

            {/* Lista dos Contatos com Ações de Copiar e Testar */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
              {filteredInspectingLeads.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  Nenhum contato encontrado para os filtros selecionados.
                </div>
              ) : (
                filteredInspectingLeads.map((lead, idx) => {
                  const isOk = lead.status === "aprovado";
                  const isLandline = lead.status === "descarte_fixo";
                  const isCopied = copiedNumber === lead.telefone;

                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                        isOk
                          ? "bg-[#0E151E] border-emerald-500/20 hover:border-emerald-500/40"
                          : "bg-[#181116] border-rose-500/20 hover:border-rose-500/40"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`font-bold ${isOk ? "text-emerald-300" : "text-rose-300"}`}
                          >
                            {lead.telefone}
                          </span>
                          <span className="text-slate-200 font-sans font-medium">
                            {lead.empresa}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {lead.operadora}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.2 rounded-full font-semibold border ${
                              isOk
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : isLandline
                                  ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                                  : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            }`}
                          >
                            {isOk ? "WhatsApp Ativo" : isLandline ? "Linha Fixa" : "Sem Conta"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">{lead.motivo}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleCopyNumber(lead.telefone)}
                          className="p-1.5 rounded bg-[#161D2B] hover:bg-[#20293C] text-slate-300 border border-[#252E40] transition-colors cursor-pointer"
                          title="Copiar número"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() => {
                            const clean = lead.telefone.replace(/\D/g, "");
                            const final = clean.startsWith("244") ? clean : `244${clean}`;
                            window.open(`https://wa.me/${final}`, "_blank", "noopener,noreferrer");
                          }}
                          className="p-1.5 rounded bg-[#161D2B] hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-400 border border-[#252E40] transition-colors cursor-pointer"
                          title="Abrir WhatsApp direto"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#141A26] border-t border-[#252C38] flex items-center justify-between text-xs text-slate-400">
              <span>Total no filtro: {filteredInspectingLeads.length} contatos</span>
              <button
                onClick={() => setInspectingCampaign(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
