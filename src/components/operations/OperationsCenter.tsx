import { useState, useMemo } from "react";
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
import { initialLeads, initialMetrics, funnelStages } from "./mockData";
import { Lead, LeadStatus, ChatMessage } from "./types";
import { toast } from "sonner";
import { useAdminAuth } from "./AdminAuthGuard";

export function OperationsCenter() {
  const { logout, adminEmail } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(initialLeads[0]?.id || null);
  const [currentTab, setCurrentTab] = useState<ActiveTab>("dashboard");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sbs_sidebar_collapsed") === "true";
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

  // Active chats count
  const activeChatsCount = useMemo(() => {
    return leads.filter((l) => l.aiProcessingStatus === "ativo").length;
  }, [leads]);

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

  // Handlers
  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
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

  const handleCreateLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    setSelectedLeadId(newLead.id);
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
    const pickedName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const pickedCompany = randomCompanies[Math.floor(Math.random() * randomCompanies.length)];

    const simulatedLead: Lead = {
      id: `lead-sim-${Date.now()}`,
      name: pickedName,
      company: pickedCompany,
      role: "Diretor Geral",
      phone: `+244 9${Math.floor(20000000 + Math.random() * 79999999)}`,
      email: `${pickedName.toLowerCase().replace(/\s+/g, ".")}@empresa.co.ao`,
      location: "Luanda, Angola",
      channel: "whatsapp",
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
          text: "Lead recebido via WhatsApp. IA qualificou com interesse imediato no pacote Domínio IA para automação 24/7.",
          createdAt: "Agora mesmo",
        },
      ],
      activities: [
        {
          id: `sim-act-${Date.now()}`,
          type: "capture",
          title: "Mensagem recebida no WhatsApp",
          description: "Entrada pelo número oficial da Agentes Digital",
          timestamp: "Agora mesmo",
        },
        {
          id: `sim-act-2-${Date.now()}`,
          type: "ai_qualification",
          title: "IA Qualificou Automaticamente",
          description: "Score 94/100 atribuído em 38ms",
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
    toast.success(`⚡ Novo Lead WhatsApp: ${pickedName}`, {
      description: `${pickedCompany} • Score IA 94/100 (Kz 700.000)`,
    });
  };

  return (
    <div className="flex h-screen w-full bg-[#080A0F] text-[#F5F7FA] font-sans antialiased overflow-hidden">
      {/* 1. Left Sidebar (Collapsible 240px / 72px) */}
      <OperationsSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeChatsCount={activeChatsCount}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        onLogout={logout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <OperationsTopbar
          onOpenNewLead={() => setIsNewLeadModalOpen(true)}
          onSimulateIncomingLead={handleSimulateIncomingLead}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
          onLogout={logout}
          adminEmail={adminEmail}
        />

        {/* Views Router */}
        {currentTab === "dashboard" && (
          <DashboardView
            leads={leads}
            onSelectLead={setSelectedLeadId}
            onNavigateTab={setCurrentTab}
            onOpenNewLead={() => setIsNewLeadModalOpen(true)}
          />
        )}

        {currentTab === "leads" && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Top Metrics & Journey Funnel */}
            <div className="p-6 pb-2 space-y-5 bg-gradient-to-b from-[#0E121A]/40 to-transparent">
              <MetricsRow metrics={initialMetrics} />
              <FunnelOverview stages={funnelStages} />
            </div>

            {/* CRM Main Columns */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-[600px] border-t border-[#252C38] mt-4">
              <LeadsList
                leads={filteredLeads}
                selectedLeadId={selectedLead?.id || null}
                onSelectLead={setSelectedLeadId}
                statusFilter={statusFilter}
                onChangeStatusFilter={setStatusFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
              />

              <LeadDetailPanel
                lead={selectedLead}
                onUpdateStatus={handleUpdateStatus}
                onAddMessage={handleAddMessage}
                onAddNote={handleAddNote}
                onToggleAiStatus={handleToggleAiStatus}
              />
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

        {currentTab === "system_prompt" && <SystemPromptView currentLead={selectedLead} />}
      </div>

      {/* Modal: New Manual Lead */}
      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        onCreateLead={handleCreateLead}
      />
    </div>
  );
}
