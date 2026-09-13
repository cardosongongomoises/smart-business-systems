import {
  Search,
  Bot,
  MessageCircle,
  Globe,
  Mail,
  Sparkles,
  Filter,
  Plus,
  Compass,
  Phone,
  PhoneOff,
} from "lucide-react";
import { Lead, LeadStatus, LeadChannel } from "./types";
import { isPhoneRegisteredOnWhatsApp } from "./whatsappVerification";

interface LeadsListProps {
  leads: Lead[];
  selectedLeadId: string | null;
  onSelectLead: (id: string) => void;
  statusFilter: LeadStatus | "todos";
  onChangeStatusFilter: (status: LeadStatus | "todos") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNewLeadModal: () => void;
}

export function LeadsList({
  leads,
  selectedLeadId,
  onSelectLead,
  statusFilter,
  onChangeStatusFilter,
  searchQuery,
  onSearchChange,
  onOpenNewLeadModal,
}: LeadsListProps) {
  const filterTabs: Array<{ id: LeadStatus | "todos"; label: string }> = [
    { id: "todos", label: "Todos" },
    { id: "novo", label: "Novo" },
    { id: "qualificado", label: "Qualificado" },
    { id: "agendado", label: "Agendado" },
    { id: "convertido", label: "Convertido" },
    { id: "perdido", label: "Perdido" },
  ];

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case "novo":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30">
            Novo
          </span>
        );
      case "qualificado":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
            Qualificado
          </span>
        );
      case "agendado":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
            Agendado
          </span>
        );
      case "convertido":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
            Convertido
          </span>
        );
      case "perdido":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30">
            Perdido
          </span>
        );
    }
  };

  const getChannelIcon = (channel: LeadChannel) => {
    switch (channel) {
      case "whatsapp":
        return <MessageCircle className="size-3.5 text-[#22C55E]" />;
      case "website":
        return <Globe className="size-3.5 text-[#3B82F6]" />;
      case "email":
        return <Mail className="size-3.5 text-[#8B5CF6]" />;
      case "google":
        return <Compass className="size-3.5 text-[#F59E0B]" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0E121A] border-r border-[#252C38] w-full lg:w-[380px] shrink-0">
      {/* List Header */}
      <div className="p-4 border-b border-[#252C38] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#F5F7FA] tracking-wide">Leads & Conversas</h2>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#151A23] border border-[#252C38] text-[#A7B0BF]">
              {leads.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenNewLeadModal}
            className="inline-flex items-center gap-1 h-7 rounded-[8px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-2.5 text-[11px] font-semibold text-white hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <Plus className="size-3" /> Novo
          </button>
        </div>

        {/* Local Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#667085]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filtrar nesta lista..."
            className="w-full h-8.5 rounded-[8px] border border-[#252C38] bg-[#080A0F] pl-9 pr-3 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeStatusFilter(tab.id)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#151A23] text-[#3B82F6] border border-[#252C38]"
                    : "text-[#A7B0BF] hover:text-[#F5F7FA] hover:bg-[#151A23]/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Scroll Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#252C38]/60 p-2 space-y-1">
        {leads.length === 0 ? (
          <div className="p-8 text-center text-[#667085] flex flex-col items-center justify-center">
            <Filter className="size-6 mb-2 opacity-60" />
            <p className="text-xs">Nenhum lead encontrado com estes filtros.</p>
          </div>
        ) : (
          leads.map((lead) => {
            const isSelected = lead.id === selectedLeadId;

            // Generate initials
            const initials = lead.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <div
                key={lead.id}
                onClick={() => onSelectLead(lead.id)}
                className={`group cursor-pointer rounded-[12px] p-3 transition-all duration-150 relative border ${
                  isSelected
                    ? "bg-[#151A23] border-[#3B82F6] shadow-[0_4px_16px_rgba(59,130,246,0.15)]"
                    : "bg-[#0E121A] border-transparent hover:border-[#252C38] hover:bg-[#151A23]/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar with Initials */}
                  <div className="relative">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? "bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/40"
                          : "bg-[#151A23] text-[#A7B0BF] border border-[#252C38]"
                      }`}
                    >
                      {initials}
                    </div>

                    {/* Origin Channel Icon */}
                    <div
                      className="absolute -bottom-1 -right-1 size-4 rounded-full bg-[#080A0F] border border-[#252C38] flex items-center justify-center"
                      title={`Canal: ${lead.channel}`}
                    >
                      {getChannelIcon(lead.channel)}
                    </div>
                  </div>

                  {/* Lead Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-bold text-[#F5F7FA] truncate">
                          {lead.name}
                        </span>
                        {lead.aiQualified && (
                          <span
                            title={`Qualificado por IA (Score: ${lead.qualificationScore}/100)`}
                            className="inline-flex items-center text-[#8B5CF6] text-[11px]"
                          >
                            🤖
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#667085] whitespace-nowrap">
                        {lead.lastActive}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#A7B0BF] mt-0.5">
                      <span className="truncate">{lead.company}</span>
                      {isPhoneRegisteredOnWhatsApp(lead.phone, lead.hasWhatsApp) ? (
                        <span
                          className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#22C55E] shrink-0"
                          title="WhatsApp Ativo"
                        >
                          <Phone className="size-2.5" /> WA
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#EF4444] shrink-0"
                          title="Sem WhatsApp"
                        >
                          <PhoneOff className="size-2.5" /> Sem WA
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#252C38]/40">
                      <span className="text-[10px] font-medium text-[#667085] truncate max-w-[140px]">
                        {lead.packageInterest}
                      </span>
                      <div>{getStatusBadge(lead.status)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
