import { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Users,
  Bot,
  Zap,
  CheckCircle2,
  FileText,
  Clock,
  Filter,
  Coins,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Lead } from "./types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { computeFinancialMetrics, PLANS_CATALOG, formatKz } from "./financialUtils";
import { useMRRMonitoring } from "./mrrMonitoringStore";

interface ReportsViewProps {
  leads: Lead[];
}

export function ReportsView({ leads }: ReportsViewProps) {
  const [period, setPeriod] = useState<"7d" | "30d" | "trimestre" | "ano">("30d");
  const { clients } = useMRRMonitoring();

  // Real-time financial calculations using real clients and leads
  const financialMetrics = useMemo(() => {
    return computeFinancialMetrics(clients, leads);
  }, [clients, leads]);

  // Dynamic monthly evolution from financial metrics
  const monthlyRevenueData = useMemo(() => {
    return financialMetrics.monthlyRevenueEvolution.map((item) => ({
      month: item.monthShort,
      setup: item.setupRevenue,
      mrr: item.mrrRevenue,
      total: item.totalRevenue,
      projetos: item.activeClients,
    }));
  }, [financialMetrics]);

  // Dynamic package share calculated from real leads
  const packageShareData = useMemo(() => {
    const totalLeads = leads.length;
    if (totalLeads === 0) {
      return [
        { name: "Profissional (Setup 250k | MRR 50k)", value: 0, color: "#3B82F6" },
        { name: "Automate Pro (Setup 300k | MRR 65k)", value: 0, color: "#38BDF8" },
        { name: "Domínio IA (Setup 700k | MRR 150k)", value: 0, color: "#8B5CF6" },
        { name: "Autoridade (Setup 450k | MRR 85k)", value: 0, color: "#22C55E" },
        { name: "Presença (Setup 125k | MRR 20k)", value: 0, color: "#F59E0B" },
      ];
    }
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      const p = l.packageInterest || "Profissional";
      counts[p] = (counts[p] || 0) + 1;
    });

    const colors: Record<string, string> = {
      Profissional: "#3B82F6",
      "Automate Pro": "#38BDF8",
      "Domínio IA": "#8B5CF6",
      Autoridade: "#22C55E",
      Presença: "#F59E0B",
    };

    return Object.entries(PLANS_CATALOG).map(([key, plan]) => {
      const c = counts[key] || 0;
      const pct = Math.round((c / totalLeads) * 100);
      return {
        name: `${key} (Setup ${formatKz(plan.setupFee).replace("Kz ", "")} | MRR ${formatKz(plan.monthlyFee).replace("Kz ", "")})`,
        value: pct,
        color: colors[key] || "#3B82F6",
      };
    });
  }, [leads]);

  // Dynamic conversion funnel from real leads
  const conversionFunnelData = useMemo(() => {
    const total = leads.length;
    const conversations = leads.filter(
      (l) => (Array.isArray(l.conversation) && l.conversation.length > 0) || l.status !== "novo",
    ).length;
    const qualified = leads.filter(
      (l) => l.aiQualified || ["qualificado", "agendado", "convertido"].includes(l.status),
    ).length;
    const scheduled = leads.filter(
      (l) =>
        (Array.isArray(l.appointments) && l.appointments.length > 0) ||
        ["agendado", "convertido"].includes(l.status),
    ).length;
    const converted = leads.filter((l) => l.status === "convertido").length;

    const rate = (val: number, base: number) => {
      if (base === 0) return "0.0%";
      return `${((val / base) * 100).toFixed(1)}%`;
    };

    return [
      { etapa: "Total de Leads", total, taxa: "100%" },
      { etapa: "Conversas Ativas", total: conversations, taxa: rate(conversations, total) },
      {
        etapa: "Qualificados (IA)",
        total: qualified,
        taxa: rate(qualified, conversations || total),
      },
      { etapa: "Reuniões Agendadas", total: scheduled, taxa: rate(scheduled, qualified || total) },
      { etapa: "Clientes Convertidos", total: converted, taxa: rate(converted, total) },
    ];
  }, [leads]);

  const aiAutonomyRate = useMemo(() => {
    if (leads.length === 0) return "0.0%";
    const qualified = leads.filter((l) => l.aiQualified).length;
    return `${((qualified / leads.length) * 100).toFixed(1)}%`;
  }, [leads]);

  const exportCSV = () => {
    const headers = "ID,Nome,Empresa,Telefone,Email,Canal,Status,Pacote,Score,ValorEstimado\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.company}","${l.phone}","${l.email}","${l.channel}","${l.status}","${l.packageInterest}","${l.qualificationScore}","${l.estimatedValue}"`,
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `relatorio-agentes-digital-${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Relatório CSV exportado com sucesso!");
  };

  const exportPDF = () => {
    window.print();
    toast.info("Janela de impressão/PDF gerada.");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080A0F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <h1 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <BarChart3 className="size-5 text-[#3B82F6]" />
            <span>Relatórios & Business Intelligence</span>
          </h1>
          <p className="text-xs text-[#A7B0BF] mt-1">
            Métricas consolidadas de vendas, faturamento e eficiência operacional em Angola
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Period selector */}
          <div className="flex items-center rounded-[8px] bg-[#151A23] border border-[#252C38] p-0.5 text-xs">
            {(
              [
                { id: "7d", label: "7 Dias" },
                { id: "30d", label: "30 Dias" },
                { id: "trimestre", label: "Trimestre" },
                { id: "ano", label: "Ano 2026" },
              ] as const
            ).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={`px-2.5 py-1 rounded-[6px] font-semibold transition-all ${
                  period === p.id
                    ? "bg-[#3B82F6] text-white"
                    : "text-[#A7B0BF] hover:text-[#F5F7FA]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] bg-[#151A23] hover:bg-[#252C38] border border-[#252C38] text-[#F5F7FA] text-xs font-semibold transition-all"
          >
            <Download className="size-3.5 text-[#22C55E]" />
            <span>Exportar CSV</span>
          </button>

          <button
            type="button"
            onClick={exportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold transition-all shadow-sm"
          >
            <FileText className="size-3.5" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Performance Highlights — Differentiating Setup Único from MRR Recorrente */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR Recorrente */}
        <div className="rounded-[16px] border border-[#22C55E]/40 bg-gradient-to-br from-[#151A23] via-[#10141D] to-[#151A23] p-4 shadow-[0_8px_24px_rgba(34,197,94,0.12)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#22C55E] flex items-center gap-1">
              <Coins className="size-3 text-[#22C55E]" />
              MRR Recorrência Mensal
            </span>
            <div className="size-7 rounded-[8px] bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
              <TrendingUp className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#22C55E] mt-2 font-mono">
            {financialMetrics.mrrFormatted}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1 font-medium">
            Previsibilidade de caixa • {financialMetrics.retentionRate}% de retenção
          </p>
        </div>

        {/* Setup Único */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085] flex items-center gap-1">
              <Layers className="size-3 text-[#3B82F6]" />
              Setup Único (Implementações)
            </span>
            <div className="size-7 rounded-[8px] bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6]">
              <DollarSign className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">
            {financialMetrics.setupRevenueFormatted}
          </p>
          <p className="text-[11px] text-[#3B82F6] mt-1 font-medium">
            Criação de sites, agentes IA e integrações
          </p>
        </div>

        {/* ARR Projetado */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085] flex items-center gap-1">
              <DollarSign className="size-3 text-[#F59E0B]" />
              ARR Projetado (12 Meses)
            </span>
            <div className="size-7 rounded-[8px] bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B]">
              <Calendar className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F59E0B] mt-2 font-mono">
            {financialMetrics.arrFormatted}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">
            Receita anualizada contratada e renovável
          </p>
        </div>

        {/* Autonomia do Agente IA */}
        <div className="rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8B5CF6] flex items-center gap-1">
              <Bot className="size-3 text-[#8B5CF6]" />
              Autonomia do Agente IA
            </span>
            <div className="size-7 rounded-[8px] bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6]">
              <Sparkles className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#C084FC] mt-2 font-mono">{aiAutonomyRate}</p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Qualificação sem intervenção humana</p>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Revenue BarChart: Setup Único vs MRR Recorrente */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-4">
            <div>
              <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="size-4 text-[#22C55E]" />
                Composição do Faturamento: Setup Único vs MRR Recorrente
              </h3>
              <p className="text-[11px] text-[#A7B0BF] mt-0.5">
                Demonstrativo de barras empilhadas separando receita pontual da receita mensal
                contínua
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#252C38" vertical={false} />
                <XAxis dataKey="month" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#667085"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val: number | string | Array<number | string>, name: string) => [
                    `Kz ${Number(val).toLocaleString("pt-PT")}`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#0E121A",
                    borderColor: "#252C38",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#F5F7FA",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(val) => (
                    <span className="text-xs text-[#A7B0BF] font-medium">{val}</span>
                  )}
                />
                <Bar
                  dataKey="setup"
                  stackId="receita"
                  fill="#3B82F6"
                  radius={[0, 0, 0, 0]}
                  name="Setup Único (Implementação)"
                />
                <Bar
                  dataKey="mrr"
                  stackId="receita"
                  fill="#22C55E"
                  radius={[6, 6, 0, 0]}
                  name="MRR Recorrente (Operação/IA)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package Share PieChart */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] flex flex-col justify-between">
          <div className="pb-3 border-b border-[#252C38] mb-4">
            <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
              <Zap className="size-4 text-[#8B5CF6]" />
              Participação de Pacotes Vendidos (%)
            </h3>
            <p className="text-[11px] text-[#A7B0BF] mt-0.5">
              Distribuição percentual da demanda por pacotes no mercado angolano
            </p>
          </div>

          <div className="space-y-3">
            {packageShareData.map((pkg) => (
              <div key={pkg.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F5F7FA] font-medium flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: pkg.color }}
                    />
                    {pkg.name}
                  </span>
                  <span className="font-mono font-bold" style={{ color: pkg.color }}>
                    {pkg.value}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pkg.value}%`, backgroundColor: pkg.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-[10px] bg-[#0E121A] border border-[#252C38] text-xs text-[#A7B0BF] leading-relaxed">
            <span className="text-white font-semibold">Insight Comercial & MRR:</span> O pacote{" "}
            <strong className="text-[#3B82F6]">Profissional</strong> lidera em volume para novos
            sites; o novo{" "}
            <strong className="text-[#38BDF8]">Automate Pro (Kz 300k Setup | Kz 65k MRR)</strong>{" "}
            acelera adesão de empresas com site existente; e o{" "}
            <strong className="text-[#8B5CF6]">Domínio IA (Kz 700k Setup | Kz 150k MRR)</strong>{" "}
            consolida o maior LTV e retenção em Angola.
          </div>
        </div>
      </div>

      {/* Conversion Funnel Table */}
      <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-[#252C38] mb-4">
          <TrendingUp className="size-4 text-[#3B82F6]" />
          Eficiência do Funil de Vendas de Ponta a Ponta
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {conversionFunnelData.map((step, idx) => (
            <div
              key={step.etapa}
              className="p-3.5 rounded-[12px] bg-[#0E121A] border border-[#252C38] flex flex-col justify-between relative"
            >
              <div>
                <span className="text-[10px] font-mono text-[#667085]">Etapa {idx + 1}</span>
                <h4 className="text-xs font-bold text-[#F5F7FA] mt-1">{step.etapa}</h4>
              </div>
              <div className="mt-3 pt-2 border-t border-[#252C38]/60 flex items-center justify-between">
                <span className="font-mono text-lg font-bold text-[#3B82F6]">{step.total}</span>
                <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-1.5 py-0.5 rounded">
                  {step.taxa}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
