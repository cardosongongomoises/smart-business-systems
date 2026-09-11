import { useState, useMemo } from "react";
import {
  Briefcase,
  ExternalLink,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  PlusCircle,
  Search,
  Building2,
  ShieldCheck,
  Zap,
  DollarSign,
  TrendingUp,
  Coins,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import { Lead } from "./types";
import { toast } from "sonner";
import {
  INITIAL_CLIENTS,
  PLANS_CATALOG,
  ClientAccount,
  computeFinancialMetrics,
  normalizePlanName,
  formatKz,
} from "./financialUtils";

interface ClientsViewProps {
  leads: Lead[];
  onOpenNewLead: () => void;
}

export function ClientsView({ leads, onOpenNewLead }: ClientsViewProps) {
  const [clients, setClients] = useState<ClientAccount[]>(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  // Converted leads dynamically join the client roster
  const convertedLeads = useMemo(() => {
    return (leads || []).filter((l) => l?.status === "convertido");
  }, [leads]);

  // Merge static initial clients with dynamically converted leads
  const allClients = useMemo(() => {
    const dynamicClients: ClientAccount[] = convertedLeads.map((lead) => {
      const plan = normalizePlanName(lead.packageInterest);
      const planCfg = PLANS_CATALOG[plan];
      return {
        id: `lead-conv-${lead.id}`,
        name: lead.name,
        company: lead.company,
        phone: lead.phone,
        email: lead.email,
        plan,
        status: "no_ar",
        setupPrice: planCfg?.setupFormatted || lead.estimatedValue || "Kz 250.000",
        monthlyFee: planCfg?.monthlyFormatted || "Kz 50.000/mês",
        launchedAt: `Lead Convertido (${lead.lastActive || "Recente"})`,
        uptime: "99.9%",
      };
    });
    return [...clients, ...dynamicClients];
  }, [clients, convertedLeads]);

  const filteredClients = useMemo(() => {
    return allClients.filter((client) => {
      if (statusFilter !== "todos" && client.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          client.company.toLowerCase().includes(q) ||
          client.name.toLowerCase().includes(q) ||
          client.phone.includes(q) ||
          client.plan.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allClients, statusFilter, search]);

  // Dynamic real-time calculation of MRR and Setup
  const financialMetrics = useMemo(() => {
    return computeFinancialMetrics(clients, leads);
  }, [clients, leads]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080A0F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <h1 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Briefcase className="size-5 text-[#3B82F6]" />
            <span>Gestão de Clientes & Contratos</span>
          </h1>
          <p className="text-xs text-[#A7B0BF] mt-1">
            Empresas com projetos implementados e mensalidades ativas da Agentes Digital
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            toast.info("Para adicionar um cliente, converta um lead existente ou use Novo Lead.");
            onOpenNewLead();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <PlusCircle className="size-4" />
          <span>Cadastrar Novo Cliente</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085]">Clientes & Contratos</span>
            <div className="size-7 rounded-[8px] bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6]">
              <Briefcase className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">{allClients.length}</p>
          <p className="text-[11px] text-[#22C55E] mt-1 font-semibold">
            {financialMetrics.retentionRate}% retenção histórica
          </p>
        </div>

        <div className="rounded-[16px] border border-[#22C55E]/40 bg-gradient-to-br from-[#151A23] via-[#10141D] to-[#151A23] p-4 shadow-[0_8px_24px_rgba(34,197,94,0.12)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#22C55E] font-semibold flex items-center gap-1">
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
          <p className="text-[11px] text-[#A7B0BF] mt-1">Hospedagem, IA & Suporte contínuo</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085]">Setup Único (Total)</span>
            <div className="size-7 rounded-[8px] bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6]">
              <Layers className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">
            {financialMetrics.setupRevenueFormatted}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Desenvolvimento & Setup Inicial</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085]">ARR Projetado (12m)</span>
            <div className="size-7 rounded-[8px] bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B]">
              <DollarSign className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F59E0B] mt-2 font-mono">
            {financialMetrics.arrFormatted}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Contratos com renovação ativa</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085]">Sistemas No Ar</span>
            <div className="size-7 rounded-[8px] bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6]">
              <Zap className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">
            {allClients.filter((c) => c.status === "no_ar").length}
          </p>
          <p className="text-[11px] text-[#8B5CF6] mt-1">Uptime médio 99.9%</p>
        </div>
      </div>

      {/* Automate Pro Plan Banner Spotlight */}
      <div className="rounded-[16px] border border-[#38BDF8]/30 bg-gradient-to-r from-[#0C1E30] via-[#101F2F] to-[#0E121A] p-4.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="size-10 rounded-[10px] bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#F5F7FA]">
                  Plano AUTOMATE PRO — Infraestrutura sobre Website Existente
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 uppercase tracking-wider">
                  Novo Plano Ativo
                </span>
              </div>
              <p className="text-xs text-[#A7B0BF] mt-1 leading-relaxed max-w-3xl">
                Implementação personalizada da infraestrutura de atendimento e automação de IA
                conectada diretamente ao website existente do cliente.
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
                <span className="text-[#F5F7FA]">
                  <strong className="text-[#38BDF8]">Implementação Única:</strong> Kz 300.000
                  (Setup, engenharia de prompt e integrações)
                </span>
                <span className="text-[#667085]">•</span>
                <span className="text-[#F5F7FA]">
                  <strong className="text-[#22C55E]">Operação e Gestão:</strong> Kz 65.000 / mês
                  (Manutenção, monitoramento e 4h/mês de ajustes)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <span className="text-[11px] px-2.5 py-1 rounded-[6px] bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] font-mono font-semibold">
              4h/mês de Suporte Inclusas
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por empresa ou titular..."
            className="w-full h-9 pl-9 pr-3 rounded-[8px] border border-[#252C38] bg-[#151A23] text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
          {[
            { id: "todos", label: "Todos" },
            { id: "no_ar", label: "No Ar" },
            { id: "em_desenvolvimento", label: "Em Desenvolvimento" },
            { id: "renovacao", label: "Renovação" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold border transition-all ${
                statusFilter === tab.id
                  ? "bg-[#3B82F6]/15 border-[#3B82F6] text-[#60A5FA]"
                  : "bg-[#151A23] border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] flex flex-col justify-between hover:border-[#3B82F6]/40 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#252C38]">
                <div>
                  <h3 className="font-bold text-sm text-[#F5F7FA]">{client.company}</h3>
                  <p className="text-xs text-[#A7B0BF] mt-0.5">{client.name}</p>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    client.status === "no_ar"
                      ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                      : "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30"
                  }`}
                >
                  {client.status === "no_ar" ? "No Ar (Ativo)" : "Desenvolvimento"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 text-xs">
                <div>
                  <span className="text-[#667085] block text-[10px]">Pacote Contratado</span>
                  <span className="font-semibold text-[#3B82F6]">{client.plan}</span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px]">Taxa de Manutenção</span>
                  <span className="font-mono font-semibold text-[#22C55E]">
                    {client.monthlyFee}
                  </span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px]">Investimento Inicial</span>
                  <span className="font-mono text-[#F5F7FA]">{client.setupPrice}</span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px]">Disponibilidade (SLA)</span>
                  <span className="font-mono text-[#8B5CF6] font-semibold">{client.uptime}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#252C38] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#667085]">{client.launchedAt}</span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-[6px] bg-[#0E121A] border border-[#252C38] text-[#22C55E] hover:border-[#22C55E]/50 flex items-center gap-1 transition-all"
                >
                  <Phone className="size-3" />
                  <span>WhatsApp</span>
                </a>
                {client.siteUrl && (
                  <a
                    href={client.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-[6px] bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] flex items-center gap-1 transition-all"
                  >
                    <ExternalLink className="size-3" />
                    <span>Visitar</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
