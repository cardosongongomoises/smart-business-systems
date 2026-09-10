import { useState } from "react";
import {
  Search,
  Bot,
  Bell,
  Sparkles,
  RefreshCw,
  Plus,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Database,
} from "lucide-react";

interface TopbarProps {
  onOpenNewLead: () => void;
  onSimulateIncomingLead: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  onOpenMobileSidebar?: () => void;
  onLogout?: () => void;
  adminEmail?: string;
  supabaseSource?: "supabase" | "cache" | "mock";
  onRefresh?: () => void;
}

export function OperationsTopbar({
  onOpenNewLead,
  onSimulateIncomingLead,
  searchQuery,
  onSearchChange,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenMobileSidebar,
  onLogout,
  adminEmail,
  supabaseSource = "mock",
  onRefresh,
}: TopbarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="h-[68px] sm:h-[70px] border-b border-[#252C38] bg-[#0E121A]/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-20">
      {/* Left: Mobile Menu, Sidebar Toggle, Section and Global Status */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Mobile Hamburger Drawer Trigger */}
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            title="Abrir menu de navegação"
            aria-label="Abrir menu lateral"
            className="md:hidden size-9 rounded-[8px] border border-[#252C38] bg-[#151A23] flex items-center justify-center text-[#F5F7FA] hover:border-[#3B82F6] transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            <Bot className="size-4 text-[#3B82F6]" />
          </button>
        )}

        {/* Desktop Sidebar Toggle */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            title={isSidebarCollapsed ? "Desencolher barra lateral" : "Encolher barra lateral"}
            aria-label={isSidebarCollapsed ? "Desencolher barra lateral" : "Encolher barra lateral"}
            className="hidden md:flex size-9 rounded-[8px] border border-[#252C38] bg-[#151A23] items-center justify-center text-[#A7B0BF] hover:text-[#F5F7FA] hover:border-[#3B82F6]/60 transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="size-4 text-[#3B82F6]" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </button>
        )}

        <div>
          <h1 className="text-sm sm:text-base font-bold tracking-tight text-[#F5F7FA]">
            Centro de Operações
          </h1>
          <p className="text-[10px] sm:text-[11px] text-[#A7B0BF] line-clamp-1">
            Pipeline comercial & IA 24/7
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#252C38]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1 text-[11px] font-semibold text-[#22C55E]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#22C55E]" />
            </span>
            <span className="tracking-wide">AGENTE IA ONLINE</span>
            <span className="text-[10px] text-[#8B5CF6] font-mono border-l border-[#22C55E]/30 pl-2">
              38ms
            </span>
          </div>

          {/* Supabase Status Badge */}
          {supabaseSource === "supabase" ? (
            <div
              title="Banco de dados conectado ao Supabase com persistência ativa"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 px-3 py-1 text-[11px] font-semibold text-[#22C55E]"
            >
              <Database className="size-3 text-[#22C55E]" />
              <span className="tracking-wide">SUPABASE CONECTADO</span>
            </div>
          ) : (
            <div
              title="Aguardando configuração de VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-3 py-1 text-[11px] font-semibold text-[#F59E0B]"
            >
              <Database className="size-3 text-[#F59E0B]" />
              <span className="tracking-wide">MODO DEMO / LOCAL</span>
            </div>
          )}
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#667085]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar por nome, clínica, empresa, telefone..."
            className="w-full h-10 rounded-[10px] border border-[#252C38] bg-[#080A0F] pl-10 pr-4 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Simulate AI Lead Action */}
        <button
          type="button"
          onClick={onSimulateIncomingLead}
          title="Simular mensagem recebida no WhatsApp"
          className="hidden xl:inline-flex items-center gap-1.5 h-9 rounded-[8px] border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-3 text-xs font-semibold text-[#C084FC] hover:bg-[#8B5CF6]/20 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="size-3.5 text-[#8B5CF6]" />
          <span>Simular Lead WhatsApp</span>
        </button>

        {/* New Manual Lead AI Button */}
        <button
          type="button"
          onClick={onOpenNewLead}
          className="inline-flex items-center gap-1.5 h-8 sm:h-9 rounded-[8px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-2.5 sm:px-3.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <Plus className="size-3.5" />
          <span className="hidden xs:inline sm:inline">+ Novo Lead</span>
          <span className="xs:hidden sm:hidden">Novo</span>
        </button>

        {/* Sync Button */}
        <button
          type="button"
          onClick={handleRefresh}
          aria-label="Atualizar dados"
          className="size-8 sm:size-9 rounded-[8px] border border-[#252C38] bg-[#151A23] flex items-center justify-center text-[#A7B0BF] hover:text-[#F5F7FA] hover:border-[#3B82F6]/50 transition-colors shrink-0"
        >
          <RefreshCw className={`size-3.5 sm:size-4 ${isRefreshing ? "animate-spin text-[#3B82F6]" : ""}`} />
        </button>

        {/* Operator Badge & Logout */}
        <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-[#252C38]">
          <div className="size-7 sm:size-8 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-xs font-bold text-[#3B82F6]">
            AD
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#F5F7FA] leading-tight">
              {adminEmail ? adminEmail.split("@")[0] : "Administrador"}
            </span>
            <span className="text-[10px] text-[#A7B0BF] leading-tight">Agentes Digital</span>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title="Encerrar sessão administrativa"
              aria-label="Encerrar sessão administrativa"
              className="size-8 sm:size-9 rounded-[8px] border border-[#252C38] bg-[#151A23] flex items-center justify-center text-[#A7B0BF] hover:text-[#EF4444] hover:border-[#EF4444]/40 hover:bg-[#EF4444]/10 transition-colors ml-0.5 sm:ml-1 cursor-pointer shrink-0"
            >
              <LogOut className="size-3.5 sm:size-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
