import { useState, useMemo, useEffect, useCallback } from "react";
import { OperationsSidebar, ActiveTab } from "./OperationsSidebar";
import { OperationsTopbar } from "./OperationsTopbar";
import { MetricsRow } from "./MetricsRow";
import { FunnelOverview } from "./FunnelOverview";
import { LeadsList } from "./LeadsList";
import { LeadDetailPanel } from "./LeadDetailPanel";
import { NewLeadModal } from "./NewLeadModal";
import { SystemPromptView } from "./SystemPromptView";
import { DashboardView } from "./DashboardView";
import { ConversationsView } from "./ConversationsView";
import { ClientsView } from "./ClientsView";
import { SchedulesView } from "./SchedulesView";
import { AutomationsView } from "./AutomationsView";
import { ReportsView } from "./ReportsView";
import { SettingsView } from "./SettingsView";
import { KnowledgeBaseView } from "./KnowledgeBaseView";
import { OperationsCenterView } from "@/components/opscenter/OperationsCenterView";
import { TaskStoreProvider } from "@/components/opscenter/useTaskStore";
import { initialMetrics, funnelStages } from "./mockData";
import { Lead, LeadStatus, ChatMessage, MetricData } from "./types";
import { computeFinancialMetrics, INITIAL_CLIENTS } from "./financialUtils";
import { useMRRMonitoring } from "./mrrMonitoringStore";
import { toast } from "sonner";
import { useAdminAuth } from "./AdminAuthGuard";
import {
  fetchLeadsFromSupabase,
  updateLeadStatusInSupabase,
  addLeadNoteInSupabase,
  addChatMessageInSupabase,
  createManualLeadInSupabase,
  subscribeToLeadsChanges,
} from "@/lib/supabaseService";

export function OperationsCenter() {
  const { logout, adminEmail } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<ActiveTab>("dashboard");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [supabaseSource, setSupabaseSource] = useState<"supabase" | "cache" | "mock">("mock");
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [mobileLeadView, setMobileLeadView] = useState<"list" | "detail">("list");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("sbs_sidebar_collapsed") === "true";
      } catch {
        return false;
      }
    }
    return false;
  });

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("sbs_sidebar_collapsed", String(next));
        } catch {
          // Ignore localStorage errors
        }
      }
      return next;
    });
  };

  const handleSelectLeadResponsive = (leadId: string) => {
    setSelectedLeadId(leadId);
    setMobileLeadView("detail");
  };

  // Active chats count
  const activeChatsCount = useMemo(() => {
    return leads.filter((l) => l.aiProcessingStatus === "ativo").length;
  }, [leads]);

  // Real-time Dynamic Metrics including MRR and monitored clients
  const { clients: monitoredClients } = useMRRMonitoring();

  const dynamicMetrics = useMemo<MetricData[]>(() => {
    const fin = computeFinancialMetrics(monitoredClients, leads);
    const convertedCount = leads.filter((l) => l.status === "convertido").length;
    const total = leads.length;
    const convRate = total > 0 ? ((convertedCount / total) * 100).toFixed(1) : "0.0";
    const qualifiedCount = leads.filter((l) => l.aiQualified).length;
    const qualRate = total > 0 ? ((qualifiedCount / total) * 100).toFixed(1) : "0.0";
    const appointmentsCount = leads.reduce((acc, l) => acc + (l.appointments?.length || 0), 0);

    return [
      {
        title: "MRR Recorrente",
        value: fin.mrrFormatted,
        change: `${fin.mrrMomGrowthFormatted} MoM`,
        isPositive: !fin.isChurn,
        timeframe: `${fin.activeRecurringClients} contratos ativos (vs. ant: ${fin.mrrMomDiffFormatted})`,
        type: "mrr",
      },
      {
        title: "Leads Totais",
        value: String(total),
        change: "+28%",
        isPositive: true,
        timeframe: "No pipeline comercial",
        type: "leads",
      },
      {
        title: "Qualificação IA",
        value: `${qualRate}%`,
        change: "+12%",
        isPositive: true,
        timeframe: `${qualifiedCount} qualificados`,
        type: "qualification",
      },
      {
        title: "Reuniões",
        value: String(appointmentsCount),
        change: "+5%",
        isPositive: true,
        timeframe: "Sessões marcadas",
        type: "appointments",
      },
      {
        title: "Conversão",
        value: `${convRate}%`,
        change: "+8%",
        isPositive: true,
        timeframe: `${convertedCount} clientes fechados`,
        type: "conversion",
      },
    ];
  }, [leads, monitoredClients]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Tab filter
      if (currentTab === "conversations" && lead.aiProcessingStatus !== "ativo") {
        return false;
      }
      if (currentTab === "schedules" && lead.appointments.length === 0) {
        return false;
      }
      if (currentTab === "clients" && lead.status !== "convertido") {
        return false;
      }

      // Status filter
      if (statusFilter !== "todos" && lead.status !== statusFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = lead.name.toLowerCase().includes(q);
        const matchCompany = lead.company.toLowerCase().includes(q);
        const matchPhone = lead.phone.toLowerCase().includes(q);
        const matchEmail = lead.email.toLowerCase().includes(q);
        const matchPackage = lead.packageInterest.toLowerCase().includes(q);
        return matchName || matchCompany || matchPhone || matchEmail || matchPackage;
      }

      return true;
    });
  }, [leads, currentTab, statusFilter, searchQuery]);

  // Selected Lead object
  const selectedLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId) || filteredLeads[0] || null;
  }, [leads, selectedLeadId, filteredLeads]);

  // Carregamento de leads a partir do Supabase (com fallback para cache/mock)
  const loadLeads = useCallback(async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetchLeadsFromSupabase();
      setLeads(res.leads);
      setSupabaseSource(res.source);
      if (res.leads.length > 0 && res.leads[0]) {
        setSelectedLeadId((current) => current || res.leads[0]?.id || null);
      }
    } catch (err) {
      console.error("Erro ao carregar dados do Supabase:", err);
    } finally {
      setIsLoadingLeads(false);
    }
  }, []);

  useEffect(() => {
    // Purga leads mockados que possam ter ficado no localStorage
    try {
      const cached = localStorage.getItem("sbs_leads_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          const hasMockLeads = parsed.some(
            (l: { id?: unknown }) => typeof l?.id === "string" && l.id.startsWith("lead-0"),
          );
          if (hasMockLeads) {
            localStorage.removeItem("sbs_leads_cache");
          }
        }
      }
    } catch {
      // ignore
    }

    loadLeads();

    // Supabase Realtime: escuta atualizações e novos leads automaticamente
    const unsubscribe = subscribeToLeadsChanges(() => {
      loadLeads();
      toast.info("Novo lead recebido! Pipeline actualizado.");
    });

    // Polling automático a cada 30 segundos como fallback ao Realtime
    const pollInterval = setInterval(() => {
      loadLeads();
    }, 30000);

    return () => {
      unsubscribe();
      clearInterval(pollInterval);
    };
  }, [loadLeads]);

  // Handlers
  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    // 1. Atualização otimista no estado local
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const updatedActivities = [
            {
              id: `act-${Date.now()}`,
              type: "status_change" as const,
              title: `Status alterado para ${newStatus.toUpperCase()}`,
              description: `Atualizado pelo operador comercial`,
              timestamp: "Agora mesmo",
            },
            ...lead.activities,
          ];
          return { ...lead, status: newStatus, activities: updatedActivities };
        }
        return lead;
      }),
    );

    // 2. Persistência assíncrona no Supabase
    updateLeadStatusInSupabase(leadId, newStatus);
    toast.success(`Status atualizado para: ${newStatus.toUpperCase()}`);
  };

  const handleAddMessage = (leadId: string, message: ChatMessage) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            lastActive: "há 1m",
            conversation: [...lead.conversation, message],
          };
        }
        return lead;
      }),
    );

    // Persistência no Supabase
    addChatMessageInSupabase(leadId, message);
  };

  const handleAddNote = (leadId: string, noteText: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            notes: [
              {
                id: `note-${Date.now()}`,
                author: "Operador Comercial",
                text: noteText,
                createdAt: "Agora mesmo",
              },
              ...lead.notes,
            ],
          };
        }
        return lead;
      }),
    );

    // Persistência no Supabase
    addLeadNoteInSupabase(leadId, "Operador Comercial", noteText);
    toast.success("Nota gravada com sucesso!");
  };

  const handleToggleAiStatus = (leadId: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const nextStatus = lead.aiProcessingStatus === "ativo" ? "escalado" : "ativo";
          return {
            ...lead,
            aiProcessingStatus: nextStatus,
          };
        }
        return lead;
      }),
    );
  };

  const handleUpdateWhatsAppStatus = (leadId: string, hasWhatsApp: boolean) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            hasWhatsApp,
          };
        }
        return lead;
      }),
    );
  };

  const handleCreateLead = async (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    setSelectedLeadId(newLead.id);
    await createManualLeadInSupabase(newLead);
    toast.success(`Lead criado: ${newLead.name}`);
  };

  const handleSimulateIncomingLead = () => {
    const randomNames = [
      "Dra. Jandira Kuanza",
      "Eng. Arnaldo Gaspar",
      "Dr. Sebastião Luvumbo",
      "Marta Tchissola",
    ];
    const randomCompanies = [
      "Clínica Vida Talatona",
      "Gaspar Logística & Distribuição Luanda",
      "Luvumbo Advocacia Corporativa",
      "Imobiliária Kilamba Prime",
    ];
    const pickedName =
      randomNames[Math.floor(Math.random() * randomNames.length)] ?? "Dra. Jandira Kuanza";
    const pickedCompany =
      randomCompanies[Math.floor(Math.random() * randomCompanies.length)] ??
      "Clínica Vida Talatona";

    const isLandline = Math.random() < 0.35;
    const phone = isLandline
      ? `+244 222 ${Math.floor(100000 + Math.random() * 899999)}`
      : `+244 9${Math.floor(21000000 + Math.random() * 78000000)}`;
    const hasWhatsApp = !isLandline;

    const simulatedLead: Lead = {
      id: `lead-sim-${Date.now()}`,
      name: pickedName,
      company: pickedCompany,
      role: "Diretor Geral",
      phone,
      hasWhatsApp,
      email: `${pickedName.toLowerCase().replace(/\s+/g, ".")}@empresa.co.ao`,
      location: "Luanda, Angola",
      channel: hasWhatsApp ? "whatsapp" : "website",
      status: "qualificado",
      packageInterest: "Domínio IA",
      aiQualified: true,
      qualificationScore: 94,
      estimatedValue: "Kz 700.000",
      firstContactAt: "Agora mesmo",
      lastActive: "Agora mesmo",
      aiProcessingStatus: "ativo",
      appointments: [],
      notes: [
        {
          id: `sim-note-${Date.now()}`,
          author: "IA Auto-Analyst",
          text: `Lead qualificado automaticamente por IA. Veredito WhatsApp: ${hasWhatsApp ? "Ativo (Linha Móvel)" : "Sem WhatsApp (Linha Fixa)"}.`,
          createdAt: "Agora mesmo",
        },
      ],
      activities: [
        {
          id: `sim-act-${Date.now()}`,
          type: "capture",
          title: hasWhatsApp ? "Mensagem recebida no WhatsApp" : "Contacto recebido no Website",
          description: `Telefone: ${phone}`,
          timestamp: "Agora mesmo",
        },
        {
          id: `sim-act-2-${Date.now()}`,
          type: "ai_qualification",
          title: "IA Qualificou Automaticamente",
          description: "Score 94/100 • Qualificação concluída em 35ms",
          timestamp: "Agora mesmo",
        },
      ],
      conversation: [
        {
          id: `sim-m-1-${Date.now()}`,
          sender: "client",
          text: "Boa tarde! Gostaria de saber como funciona a implementação de um agente de IA para a minha empresa.",
          timestamp: new Date().toLocaleTimeString("pt-PT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        {
          id: `sim-m-2-${Date.now()}`,
          sender: "ai",
          text: "Boa tarde! Claro, com todo gosto. Para eu entender melhor: qual é o seu negócio ou em que área atua?",
          timestamp: new Date().toLocaleTimeString("pt-PT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          aiMetadata: {
            ai_intent: "qualificacao",
            ai_confidence: 0.95,
            lead_update: {
              business_segment: null,
              package_interest: null,
              qualification_score: 65,
              status: "novo",
            },
            escalate_to_human: false,
          },
        },
      ],
    };

    setLeads((prev) => [simulatedLead, ...prev]);
    setSelectedLeadId(simulatedLead.id);
    toast.success(`⚡ Lead: ${pickedName}`, {
      description: `${pickedCompany} • ${hasWhatsApp ? "Veredito: WhatsApp Ativo" : "Veredito: Sem WhatsApp"} • Score IA 94/100`,
    });
  };

  return (
    <TaskStoreProvider>
      <div className="flex h-screen w-full bg-[#080A0F] text-[#F5F7FA] font-sans antialiased overflow-hidden">
        {/* 1. Left Sidebar (Collapsible 240px / 72px desktop, slide-over drawer mobile) */}
        <OperationsSidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          activeChatsCount={activeChatsCount}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          onLogout={logout}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
          {/* Topbar */}
          <OperationsTopbar
            onOpenNewLead={() => setIsNewLeadModalOpen(true)}
            onSimulateIncomingLead={handleSimulateIncomingLead}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={handleToggleSidebar}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            onLogout={logout}
            adminEmail={adminEmail}
            supabaseSource={supabaseSource}
            onRefresh={loadLeads}
          />

          {/* Views Router */}
          {currentTab === "ops" && (
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              <OperationsCenterView onNavigateTab={(tab) => setCurrentTab(tab as ActiveTab)} />
            </div>
          )}

          {currentTab === "dashboard" && (
            <DashboardView
              leads={leads}
              onSelectLead={(id) => {
                handleSelectLeadResponsive(id);
                setCurrentTab("leads");
              }}
              onNavigateTab={setCurrentTab}
              onOpenNewLead={() => setIsNewLeadModalOpen(true)}
            />
          )}

          {currentTab === "leads" && (
            <div className="flex-1 overflow-y-auto flex flex-col">
              {/* Top Metrics & Journey Funnel */}
              <div className="p-4 sm:p-6 pb-2 space-y-4 sm:space-y-5 bg-gradient-to-b from-[#0E121A]/40 to-transparent">
                <MetricsRow metrics={dynamicMetrics} />
                <FunnelOverview stages={funnelStages} />
              </div>

              {/* CRM Main Columns */}
              <div className="flex-1 flex flex-col lg:flex-row min-h-[600px] border-t border-[#252C38] mt-4">
                {/* Leads List: visible on desktop, or on mobile when mobileLeadView === 'list' */}
                <div
                  className={`w-full lg:w-[380px] shrink-0 ${
                    mobileLeadView === "list" ? "block" : "hidden lg:block"
                  }`}
                >
                  <LeadsList
                    leads={filteredLeads}
                    selectedLeadId={selectedLead?.id || null}
                    onSelectLead={handleSelectLeadResponsive}
                    statusFilter={statusFilter}
                    onChangeStatusFilter={setStatusFilter}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
                  />
                </div>

                {/* Lead Detail Panel: visible on desktop, or on mobile when mobileLeadView === 'detail' */}
                <div
                  className={`flex-1 min-w-0 ${
                    mobileLeadView === "detail" ? "block" : "hidden lg:block"
                  }`}
                >
                  <LeadDetailPanel
                    lead={selectedLead}
                    onUpdateStatus={handleUpdateStatus}
                    onAddMessage={handleAddMessage}
                    onAddNote={handleAddNote}
                    onToggleAiStatus={handleToggleAiStatus}
                    onUpdateWhatsAppStatus={handleUpdateWhatsAppStatus}
                    onBackToList={() => setMobileLeadView("list")}
                  />
                </div>
              </div>
            </div>
          )}

          {currentTab === "conversations" && (
            <ConversationsView
              leads={leads}
              selectedLeadId={selectedLead?.id || null}
              onSelectLead={setSelectedLeadId}
              onAddMessage={handleAddMessage}
              onToggleAiStatus={handleToggleAiStatus}
            />
          )}

          {currentTab === "clients" && (
            <ClientsView leads={leads} onOpenNewLead={() => setIsNewLeadModalOpen(true)} />
          )}

          {currentTab === "schedules" && (
            <SchedulesView leads={leads} onSelectLead={setSelectedLeadId} />
          )}

          {currentTab === "automations" && <AutomationsView />}

          {currentTab === "reports" && <ReportsView leads={leads} />}

          {currentTab === "settings" && <SettingsView onNavigateTab={setCurrentTab} />}

          {currentTab === "knowledge_base" && <KnowledgeBaseView />}

          {currentTab === "system_prompt" && <SystemPromptView currentLead={selectedLead} />}
        </div>

        {/* Modal: New Manual Lead */}
        <NewLeadModal
          isOpen={isNewLeadModalOpen}
          onClose={() => setIsNewLeadModalOpen(false)}
          onCreateLead={handleCreateLead}
        />
      </div>
    </TaskStoreProvider>
  );
}
