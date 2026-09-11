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
  TrendingDown,
  Coins,
  Layers,
  Sparkles,
  Info,
  AlertTriangle,
  ArrowDownRight,
  RotateCcw,
  X,
  FileWarning,
} from "lucide-react";
import { Lead } from "./types";
import { toast } from "sonner";
import {
  PLANS_CATALOG,
  ClientAccount,
  computeFinancialMetrics,
  normalizePlanName,
  formatKz,
} from "./financialUtils";
import { useMRRMonitoring, MRRPlanName } from "./mrrMonitoringStore";
import { MRRAlertsBanner } from "./MRRAlertsBanner";

interface ClientsViewProps {
  leads: Lead[];
  onOpenNewLead: () => void;
}

export function ClientsView({ leads, onOpenNewLead }: ClientsViewProps) {
  const {
    clients,
    alerts,
    recordPlanDowngrade,
    recordClientCancellation,
    resolveAlertAndRestoreClient,
  } = useMRRMonitoring();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  // Modals state for plan change and contract cancellation
  const [planChangeModalClient, setPlanChangeModalClient] = useState<ClientAccount | null>(null);
  const [selectedNewPlan, setSelectedNewPlan] = useState<MRRPlanName>("Presença");
  const [planChangeReason, setPlanChangeReason] = useState("");

  const [cancelModalClient, setCancelModalClient] = useState<ClientAccount | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Converted leads dynamically join the client roster
  const convertedLeads = useMemo(() => {
    return (leads || []).filter((l) => l?.status === "convertido");
  }, [leads]);

  // Merge monitored clients with dynamically converted leads
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
    return computeFinancialMetrics(allClients, leads);
  }, [allClients, leads]);

  // Available plans for the selection modal
  const availablePlans: MRRPlanName[] = [
    "Presença",
    "Profissional",
    "Autoridade",
    "Domínio IA",
    "Automate Pro",
  ];

  // Handle plan change submission (evaluates downgrade vs upgrade)
  const handleConfirmPlanChange = () => {
    if (!planChangeModalClient) return;

    const currentPlanCfg = PLANS_CATALOG[planChangeModalClient.plan];
    const newPlanCfg = PLANS_CATALOG[selectedNewPlan];

    if (!currentPlanCfg || !newPlanCfg) return;

    if (currentPlanCfg.monthlyKz > newPlanCfg.monthlyKz) {
      // Downgrade detected!
      const diffKz = currentPlanCfg.monthlyKz - newPlanCfg.monthlyKz;
      recordPlanDowngrade(
        planChangeModalClient.id,
        selectedNewPlan,
        planChangeReason.trim() || "Solicitação do cliente para redução de custos",
      );
      toast.warning("Alerta de Downgrade Disparado!", {
        description: `Impacto negativo de -${formatKz(diffKz)}/mês no MRR. Alerta registrado no Centro de Operações.`,
      });
    } else {
      // Upgrade or same plan
      recordPlanDowngrade(
        planChangeModalClient.id,
        selectedNewPlan,
        planChangeReason.trim() || "Upgrade de plano contratado",
      );
      toast.success("Plano atualizado com sucesso!", {
        description: `${planChangeModalClient.company} agora está no plano ${selectedNewPlan}.`,
      });
    }

    setPlanChangeModalClient(null);
    setPlanChangeReason("");
  };

  // Handle contract cancellation submission (triggers Churn alert)
  const handleConfirmCancellation = () => {
    if (!cancelModalClient) return;

    const clientPlanCfg = PLANS_CATALOG[cancelModalClient.plan];
    const monthlyLost = clientPlanCfg?.monthlyKz || 50000;

    recordClientCancellation(
      cancelModalClient.id,
      cancelReason.trim() || "Encerramento de contrato solicitado pelo cliente",
    );

    toast.error("Alerta de Churn Disparado!", {
      description: `Cancelamento de ${cancelModalClient.company}. Perda de -${formatKz(monthlyLost)}/mês no MRR. Alerta crítico ativado!`,
    });

    setCancelModalClient(null);
    setCancelReason("");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080A0F]" id="clients-management-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <h1 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Briefcase className="size-5 text-[#3B82F6]" />
            <span>Gestão de Clientes & Contratos</span>
          </h1>
          <p className="text-xs text-[#A7B0BF] mt-1">
            Empresas com projetos implementados, planos e monitoramento ativo de MRR da Agentes
            Digital
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

      {/* Visual Monitoring System: Churn & Downgrade Alerts Banner */}
      <MRRAlertsBanner />

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
          <p className="text-[11px] text-[#A7B0BF] mt-1">
            {financialMetrics.mrrMomGrowthFormatted} vs mês anterior
          </p>
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
            <span className="text-xs text-[#667085]">ARR Anualizado</span>
            <div className="size-7 rounded-[8px] bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B]">
              <DollarSign className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F59E0B] mt-2 font-mono">
            {financialMetrics.arrFormatted}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Projeção 12 meses de contratos</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#667085]">Ticket Médio MRR</span>
            <div className="size-7 rounded-[8px] bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6]">
              <Zap className="size-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#8B5CF6] mt-2 font-mono">
            {formatKz(financialMetrics.averageTicketMrr)}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Por cliente ativo</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#667085]" />
          <input
            type="text"
            placeholder="Buscar por empresa, responsável ou plano..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-[8px] bg-[#151A23] border border-[#252C38] text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div className="inline-flex rounded-[8px] bg-[#151A23] border border-[#252C38] p-0.5 self-start sm:self-auto">
          {[
            { id: "todos", label: "Todos" },
            { id: "no_ar", label: "No Ar" },
            { id: "desenvolvimento", label: "Em Desenvolvimento" },
            { id: "cancelado", label: "Cancelados / Churn" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all ${
                statusFilter === tab.id
                  ? "bg-[#3B82F6] text-white shadow-sm"
                  : "text-[#667085] hover:text-[#A7B0BF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => {
          // Check if this client has an active alert
          const clientAlert = alerts.find(
            (a) => a.clientCompany === client.company || a.clientCompany === client.name,
          );

          const isCancelled = client.status === "cancelado";

          return (
            <div
              key={client.id}
              className={`rounded-[16px] border p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] flex flex-col justify-between transition-all ${
                clientAlert
                  ? clientAlert.type === "churn"
                    ? "border-red-500/60 bg-red-950/15"
                    : "border-amber-500/60 bg-amber-950/15"
                  : isCancelled
                    ? "border-red-500/40 bg-[#151A23]/60 opacity-80"
                    : "border-[#252C38] bg-[#151A23] hover:border-[#3B82F6]/40"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#252C38]">
                  <div>
                    <h3 className="font-bold text-sm text-[#F5F7FA] flex items-center gap-2">
                      <span>{client.company}</span>
                      {clientAlert && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                            clientAlert.type === "churn"
                              ? "bg-red-500/20 text-red-400 border border-red-500/40"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          }`}
                        >
                          {clientAlert.type === "churn" ? "Alerta Churn" : "Alerta Downgrade"}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[#A7B0BF] mt-0.5">{client.name}</p>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isCancelled
                        ? "bg-red-500/15 text-red-400 border border-red-500/30"
                        : client.status === "no_ar"
                          ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                          : "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30"
                    }`}
                  >
                    {isCancelled
                      ? "Cancelado"
                      : client.status === "no_ar"
                        ? "No Ar (Ativo)"
                        : "Desenvolvimento"}
                  </span>
                </div>

                {/* Active Alert Warning Banner on Card */}
                {clientAlert && (
                  <div className="my-2.5 p-2 rounded-[8px] bg-red-500/10 border border-red-500/30 flex items-center justify-between gap-2 text-xs">
                    <span className="text-red-400 flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="size-3.5 shrink-0" />
                      <span>
                        Impacto no MRR: <strong>{clientAlert.mrrImpactFormatted}</strong>
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        resolveAlertAndRestoreClient(clientAlert.id);
                        toast.success("Contrato restaurado ao plano original!");
                      }}
                      className="px-2 py-0.5 rounded bg-[#22C55E]/20 hover:bg-[#22C55E]/30 text-[#4ADE80] font-bold text-[10px] inline-flex items-center gap-1 border border-[#22C55E]/40 transition-all"
                    >
                      <RotateCcw className="size-3" />
                      <span>Reverter</span>
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 py-3 text-xs">
                  <div>
                    <span className="text-[#667085] block text-[10px]">Pacote Contratado</span>
                    <span className="font-semibold text-[#3B82F6]">{client.plan}</span>
                  </div>
                  <div>
                    <span className="text-[#667085] block text-[10px]">Taxa de Manutenção</span>
                    <span className="font-mono font-semibold text-[#22C55E]">
                      {isCancelled ? "Kz 0 (Cancelado)" : client.monthlyFee}
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

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-[#252C38] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-[#667085]">{client.launchedAt}</span>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Change Plan Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPlanChangeModalClient(client);
                      setSelectedNewPlan(client.plan);
                    }}
                    className="px-2.5 py-1 rounded-[6px] bg-[#1A212D] hover:bg-[#252C38] border border-[#252C38] text-[#CBD5E1] hover:text-white text-[11px] font-medium transition-all"
                    title="Mudar plano (Upgrade ou Downgrade)"
                  >
                    <span>Alterar Plano</span>
                  </button>

                  {/* Cancel / Churn Button */}
                  {!isCancelled && (
                    <button
                      type="button"
                      onClick={() => {
                        setCancelModalClient(client);
                      }}
                      className="px-2 py-1 rounded-[6px] bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 hover:text-red-300 text-[11px] font-medium transition-all"
                      title="Suspender ou cancelar contrato"
                    >
                      <span>Cancelar</span>
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-[6px] bg-[#0E121A] border border-[#252C38] text-[#22C55E] hover:border-[#22C55E]/50 flex items-center gap-1 transition-all text-[11px]"
                  >
                    <Phone className="size-3" />
                    <span>WhatsApp</span>
                  </a>

                  {client.siteUrl && (
                    <a
                      href={client.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-[6px] bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] flex items-center gap-1 transition-all text-[11px]"
                    >
                      <ExternalLink className="size-3" />
                      <span>Visitar</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan Change Modal (Allows testing Downgrade / Upgrade) */}
      {planChangeModalClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-[16px] border border-[#252C38] bg-[#0E121A] p-6 shadow-2xl text-[#F5F7FA]">
            <div className="flex items-start justify-between pb-3 border-b border-[#252C38]">
              <div>
                <h3 className="text-sm font-bold text-[#F5F7FA]">Alterar Plano Contratual</h3>
                <p className="text-xs text-[#A7B0BF] mt-0.5">
                  {planChangeModalClient.company} • Atual:{" "}
                  <strong className="text-[#3B82F6]">{planChangeModalClient.plan}</strong> (
                  {planChangeModalClient.monthlyFee})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPlanChangeModalClient(null)}
                className="p-1 text-[#667085] hover:text-white rounded-[6px]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-[#A7B0BF] mb-1.5 font-semibold">
                  Selecione o Novo Plano:
                </label>
                <div className="space-y-1.5">
                  {availablePlans.map((plan) => {
                    const cfg = PLANS_CATALOG[plan];
                    const currentCfg = PLANS_CATALOG[planChangeModalClient.plan];
                    const isDowngrade = currentCfg && cfg.monthlyKz < currentCfg.monthlyKz;
                    const isUpgrade = currentCfg && cfg.monthlyKz > currentCfg.monthlyKz;
                    const isCurrent = plan === planChangeModalClient.plan;

                    return (
                      <label
                        key={plan}
                        className={`flex items-center justify-between p-2.5 rounded-[8px] border cursor-pointer transition-all ${
                          selectedNewPlan === plan
                            ? "bg-[#3B82F6]/15 border-[#3B82F6]"
                            : "bg-[#151A23] border-[#252C38] hover:border-[#3B82F6]/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="plan"
                            value={plan}
                            checked={selectedNewPlan === plan}
                            onChange={() => setSelectedNewPlan(plan)}
                            className="text-[#3B82F6]"
                          />
                          <div>
                            <span className="font-bold text-[#F5F7FA] block">{plan}</span>
                            <span className="text-[10px] text-[#A7B0BF]">
                              Setup: {cfg.setupFormatted}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-bold text-[#22C55E]">
                            {cfg.monthlyFormatted}
                          </span>
                          {isDowngrade && (
                            <span className="block text-[9px] text-amber-400 font-bold">
                              ▼ Downgrade (-{formatKz(currentCfg.monthlyKz - cfg.monthlyKz)})
                            </span>
                          )}
                          {isUpgrade && (
                            <span className="block text-[9px] text-[#22C55E] font-bold">
                              ▲ Upgrade (+{formatKz(cfg.monthlyKz - currentCfg.monthlyKz)})
                            </span>
                          )}
                          {isCurrent && (
                            <span className="block text-[9px] text-[#667085]">Plano Atual</span>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Warning if selected plan is a downgrade */}
              {PLANS_CATALOG[selectedNewPlan]?.monthlyKz <
                PLANS_CATALOG[planChangeModalClient.plan]?.monthlyKz && (
                <div className="p-3 rounded-[8px] bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="size-4" />
                    <span>Atenção: Impacto Negativo no MRR</span>
                  </div>
                  <p className="text-[11px] mt-1 text-[#CBD5E1]">
                    Esta alteração reduzirá o MRR em{" "}
                    <strong>
                      -
                      {formatKz(
                        PLANS_CATALOG[planChangeModalClient.plan].monthlyKz -
                          PLANS_CATALOG[selectedNewPlan].monthlyKz,
                      )}
                      /mês
                    </strong>
                    . O sistema de monitoramento emitirá alertas visuais imediatamente.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-[#A7B0BF] mb-1 font-semibold">
                  Motivo da Alteração:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Redução orçamentária do cliente, mudança de escopo..."
                  value={planChangeReason}
                  onChange={(e) => setPlanChangeReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] bg-[#151A23] border border-[#252C38] text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#252C38] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPlanChangeModalClient(null)}
                className="px-3.5 py-1.5 rounded-[8px] bg-[#151A23] hover:bg-[#252C38] text-xs text-[#CBD5E1]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmPlanChange}
                className="px-4 py-1.5 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs"
              >
                Confirmar Alteração
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contract Cancellation Modal (Triggers Churn) */}
      {cancelModalClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-[16px] border border-red-500/50 bg-[#0E121A] p-6 shadow-2xl text-[#F5F7FA]">
            <div className="flex items-start justify-between pb-3 border-b border-red-500/30">
              <div className="flex items-center gap-2 text-red-400">
                <FileWarning className="size-5" />
                <h3 className="text-sm font-bold text-[#F5F7FA]">Cancelar Contrato (Churn)</h3>
              </div>
              <button
                type="button"
                onClick={() => setCancelModalClient(null)}
                className="p-1 text-[#667085] hover:text-white rounded-[6px]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 rounded-[8px] bg-red-500/10 border border-red-500/30">
                <p className="text-[#CBD5E1] leading-relaxed">
                  Você está prestes a registrar o cancelamento do contrato de{" "}
                  <strong className="text-white">{cancelModalClient.company}</strong>.
                </p>
                <p className="mt-2 text-red-400 font-mono font-bold">
                  Perda imediata de {cancelModalClient.monthlyFee} no MRR consolidado.
                </p>
              </div>

              <div>
                <label className="block text-[#A7B0BF] mb-1 font-semibold">
                  Motivo do Cancelamento:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Corte de custos internos, transição para gestão própria..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] bg-[#151A23] border border-[#252C38] text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#252C38] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setCancelModalClient(null)}
                className="px-3.5 py-1.5 rounded-[8px] bg-[#151A23] hover:bg-[#252C38] text-xs text-[#CBD5E1]"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={handleConfirmCancellation}
                className="px-4 py-1.5 rounded-[8px] bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm"
              >
                Confirmar Cancelamento & Disparar Alerta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
