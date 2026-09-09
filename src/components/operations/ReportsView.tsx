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

interface ReportsViewProps {
  leads: Lead[];
}

const monthlyRevenueData = [
  { month: "Nov 2025", faturamento: 850000, projetos: 3 },
  { month: "Dez 2025", faturamento: 1200000, projetos: 4 },
  { month: "Jan 2026", faturamento: 1450000, projetos: 5 },
  { month: "Fev 2026", faturamento: 1650000, projetos: 6 },
  { month: "Mar 2026 (Atual)", faturamento: 1850000, projetos: 7 },
];

const packageShareData = [
  { name: "Profissional (Kz 250k)", value: 45, color: "#3B82F6" },
  { name: "Domínio IA (Kz 700k)", value: 25, color: "#8B5CF6" },
  { name: "Autoridade (Kz 450k)", value: 20, color: "#22C55E" },
  { name: "Presença (Kz 125k)", value: 10, color: "#F59E0B" },
];

const conversionFunnelData = [
  { etapa: "Visitantes Únicos", total: 1850, taxa: "100%" },
  { etapa: "Conversas no WhatsApp", total: 420, taxa: "22.7%" },
  { etapa: "Leads Qualificados (IA)", total: 185, taxa: "44.0%" },
  { etapa: "Reuniões Agendadas", total: 64, taxa: "34.6%" },
  { etapa: "Propostas Aceitas", total: 28, taxa: "43.7%" },
];

export function ReportsView({ leads }: ReportsViewProps) {
  const [period, setPeriod] = useState<"7d" | "30d" | "trimestre" | "ano">("30d");

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

      {/* KPI Performance Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-[16px] border border-[#22C55E]/35 bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085]">Faturamento Total Gerado</span>
            <div className="size-7 rounded-[8px] bg-[#22C55E]/15 flex items-center justify-center text-[#22C55E]">
              <DollarSign className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#22C55E] mt-2 font-mono">Kz 1.850.000</p>
          <p className="text-[11px] text-[#22C55E] mt-1 font-semibold flex items-center gap-1">
            <TrendingUp className="size-3" />
            <span>+24.8% vs período anterior</span>
          </p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085]">Custo Médio por Lead (CPL)</span>
            <div className="size-7 rounded-[8px] bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6]">
              <Users className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">Kz 1.250</p>
          <p className="text-[11px] text-[#22C55E] mt-1">-18% em custos de tráfego</p>
        </div>

        <div className="rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8B5CF6]">Autonomia do Agente IA</span>
            <div className="size-7 rounded-[8px] bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6]">
              <Bot className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#C084FC] mt-2 font-mono">89.4%</p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Qualificação sem intervenção</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085]">Tempo Médio de Resposta</span>
            <div className="size-7 rounded-[8px] bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B]">
              <Clock className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F59E0B] mt-2 font-mono">42 ms</p>
          <p className="text-[11px] text-[#22C55E] mt-1">Atendimento imediato 24/7</p>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Revenue BarChart */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-4">
            <div>
              <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="size-4 text-[#22C55E]" />
                Evolução do Faturamento Mensal (Kwanzas)
              </h3>
              <p className="text-[11px] text-[#A7B0BF] mt-0.5">
                Valores consolidados em AOA incluindo criação de sites e planos mensais
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
                  formatter={(val: number | string | Array<number | string>) => [
                    `Kz ${Number(val).toLocaleString("pt-PT")}`,
                    "Faturamento",
                  ]}
                  contentStyle={{
                    backgroundColor: "#0E121A",
                    borderColor: "#252C38",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#F5F7FA",
                  }}
                />
                <Bar
                  dataKey="faturamento"
                  fill="#22C55E"
                  radius={[6, 6, 0, 0]}
                  name="Faturamento"
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

          <div className="mt-4 p-3 rounded-[10px] bg-[#0E121A] border border-[#252C38] text-xs text-[#A7B0BF]">
            <span className="text-white font-semibold">Insight Comercial:</span> O pacote{" "}
            <strong className="text-[#3B82F6]">Profissional (Kz 250.000)</strong> representa o maior
            volume, enquanto o pacote{" "}
            <strong className="text-[#8B5CF6]">Domínio IA (Kz 700.000)</strong> entrega a maior
            margem e LTV em Luanda.
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
