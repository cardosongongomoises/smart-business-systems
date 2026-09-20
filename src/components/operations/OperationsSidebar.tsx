import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  MessageSquareCode,
  Briefcase,
  Calendar,
  Zap,
  BarChart3,
  Settings,
  ExternalLink,
  ShieldCheck,
  Radio,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  GraduationCap,
  LayoutGrid,
  Send,
} from "lucide-react";

export type ActiveTab =
  | "ops"
  | "dashboard"
  | "leads"
  | "campanhas"
  | "campaigns"
  | "conversations"
  | "knowledge_base"
  | "system_prompt"
  | "clients"
  | "schedules"
  | "automations"
  | "reports"
  | "settings";

interface SidebarProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  activeChatsCount: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onLogout?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function OperationsSidebar({
  currentTab,
  onSelectTab,
  activeChatsCount = 4,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  const handleItemClick = (id: ActiveTab) => {
    onSelectTab(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const menuItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: "violet" | "blue" | "green";
  }> = [
    {
      id: "dashboard",
      label: "Dashboard Principal",
      icon: LayoutDashboard,
      badge: "MRR",
      badgeColor: "green",
    },
    {
      id: "ops",
      label: "Tarefas & Projetos",
      icon: LayoutGrid,
      badge: "Kanban",
      badgeColor: "blue",
    },
    { id: "leads", label: "Leads", icon: Users },
    {
      id: "campanhas",
      label: "Campanhas & Disparos",
      icon: Send,
      badge: "Disparos",
      badgeColor: "blue",
    },
    {
      id: "conversations",
      label: "Conversas IA",
      icon: MessageSquareCode,
      badge: activeChatsCount || 4,
      badgeColor: "violet",
    },
    {
      id: "knowledge_base",
      label: "Capacitação & Skills IA",
      icon: GraduationCap,
      badge: "Skills",
      badgeColor: "violet",
    },
    {
      id: "clients",
      label: "Clientes & Contratos",
      icon: Briefcase,
      badge: "Contratos",
      badgeColor: "green",
    },
    { id: "schedules", label: "Agendamentos", icon: Calendar },
    { id: "automations", label: "Automações", icon: Zap },
    { id: "reports", label: "Relatórios", icon: BarChart3 },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 h-screen bg-[#0E121A] border-r border-[#252C38] flex flex-col justify-between select-none z-50 transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-[72px]" : "md:w-60"}
          shrink-0
        `}
      >
        {/* Top Section */}
        <div
          className={`${isCollapsed ? "md:p-2.5 p-4" : "p-4"} flex flex-col gap-4 overflow-y-auto overflow-x-hidden`}
        >
          {/* Brand Header & Toggle */}
          <div
            className={`flex items-center pb-3 border-b border-[#252C38] ${
              isCollapsed
                ? "md:flex-col md:gap-2.5 justify-between md:justify-center"
                : "justify-between"
            }`}
          >
            <a
              href="/"
              className="flex items-center gap-2.5 group"
              title="Agentes Digital - Início"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#3B82F6] text-xs font-extrabold text-white shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-transform group-hover:scale-105">
                AD
              </span>
              <div
                className={`flex flex-col overflow-hidden transition-opacity duration-200 ${isCollapsed ? "md:hidden" : "flex"}`}
              >
                <span className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#F5F7FA] truncate">
                  Agentes Digital
                </span>
                <span className="text-[10px] font-semibold text-[#8B5CF6] tracking-wider uppercase flex items-center gap-1">
                  <ShieldCheck className="size-3" /> Operações
                </span>
              </div>
            </a>

            {/* Mobile close button / Desktop collapse toggle */}
            <div className="flex items-center gap-1">
              {/* Close button on mobile */}
              <button
                type="button"
                onClick={onCloseMobile}
                className="size-7 md:hidden rounded-[6px] border border-[#252C38] bg-[#151A23] flex items-center justify-center text-[#A7B0BF] hover:text-[#F5F7FA] transition-all cursor-pointer"
                title="Fechar menu lateral"
              >
                <PanelLeftClose className="size-3.5" />
              </button>

              {/* Desktop toggle */}
              <button
                type="button"
                onClick={handleToggle}
                title={isCollapsed ? "Desencolher barra lateral" : "Encolher barra lateral"}
                aria-label={isCollapsed ? "Desencolher barra lateral" : "Encolher barra lateral"}
                className="hidden md:flex size-7 shrink-0 rounded-[6px] border border-[#252C38] bg-[#151A23] items-center justify-center text-[#A7B0BF] hover:text-[#F5F7FA] hover:border-[#3B82F6]/60 hover:bg-[#1C2330] transition-all cursor-pointer shadow-sm"
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="size-3.5 text-[#3B82F6]" />
                ) : (
                  <PanelLeftClose className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1">
            <p
              className={`px-3 pb-1 text-[10px] font-semibold tracking-wider text-[#667085] uppercase transition-opacity duration-200 ${isCollapsed ? "md:hidden" : "block"}`}
            >
              Gestão & IA
            </p>
            {isCollapsed && (
              <div className="hidden md:block w-6 mx-auto my-1 border-b border-[#252C38]" />
            )}

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed
                        ? "md:justify-center md:px-0 justify-between px-3"
                        : "justify-between px-3"
                    } py-2.5 rounded-[10px] text-xs font-medium transition-all duration-150 text-left ${
                      isActive
                        ? "bg-[#151A23] text-[#3B82F6] border border-[#252C38] shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                        : "text-[#A7B0BF] hover:bg-[#151A23]/60 hover:text-[#F5F7FA] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center">
                        <Icon
                          className={`size-4 shrink-0 ${isActive ? "text-[#3B82F6]" : "text-[#A7B0BF]"}`}
                          strokeWidth={isActive ? 2.2 : 1.75}
                        />
                        {/* Compact notification badge dot in collapsed mode */}
                        {isCollapsed && item.badge !== undefined && (
                          <span
                            className={`absolute -top-1 -right-1 size-2 rounded-full ${
                              item.badgeColor === "violet"
                                ? "bg-[#8B5CF6] animate-pulse"
                                : "bg-[#3B82F6]"
                            }`}
                          />
                        )}
                      </div>
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.badgeColor === "violet"
                            ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30 animate-pulse"
                            : "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Floating tooltip when collapsed */}
                  {isCollapsed && (
                    <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex z-50 items-center gap-2 whitespace-nowrap rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs font-semibold text-[#F5F7FA] shadow-xl">
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-1.5 py-0.5 text-[10px] font-bold text-[#C084FC]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Back to Public Site */}
          <div className="pt-2">
            <a
              href="/"
              title="Ver Website Público"
              className={`flex items-center ${
                isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2"
              } rounded-[8px] border border-[#252C38] bg-[#151A23]/40 text-[11px] font-medium text-[#A7B0BF] hover:text-[#F5F7FA] hover:border-[#3B82F6]/50 transition-colors relative group`}
            >
              {!isCollapsed ? (
                <>
                  <span className="truncate">Ver Website Público</span>
                  <ExternalLink className="size-3 text-[#667085] shrink-0" />
                </>
              ) : (
                <>
                  <ExternalLink className="size-4 text-[#A7B0BF] group-hover:text-[#F5F7FA]" />
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex z-50 items-center whitespace-nowrap rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs font-semibold text-[#F5F7FA] shadow-xl">
                    Ver Website Público
                  </div>
                </>
              )}
            </a>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Encerrar Sessão Administrativa"
                className={`w-full mt-2 flex items-center ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2"
                } rounded-[8px] border border-[#EF4444]/20 bg-[#EF4444]/5 text-[11px] font-medium text-[#FCA5A5] hover:bg-[#EF4444]/15 hover:border-[#EF4444]/50 transition-colors relative group cursor-pointer`}
              >
                {!isCollapsed ? (
                  <>
                    <span className="truncate">Encerrar Sessão</span>
                    <LogOut className="size-3 text-[#EF4444] shrink-0" />
                  </>
                ) : (
                  <>
                    <LogOut className="size-4 text-[#EF4444]" />
                    <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex z-50 items-center whitespace-nowrap rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs font-semibold text-[#FCA5A5] shadow-xl">
                      Encerrar Sessão
                    </div>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* System Status Card (Fixed Footer) */}
        <div className={`${isCollapsed ? "p-2" : "p-4"} border-t border-[#252C38] bg-[#080A0F]/60`}>
          {!isCollapsed ? (
            <div className="rounded-[12px] border border-[#252C38] bg-[#151A23] p-3 shadow-sm transition-opacity duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#252C38] mb-2.5">
                <span className="text-[11px] font-bold text-[#F5F7FA] tracking-wide flex items-center gap-1.5">
                  <Radio className="size-3 text-[#22C55E] animate-pulse" />
                  Status do Sistema
                </span>
                <span className="text-[10px] font-mono text-[#22C55E] font-bold">100% OK</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-[#A7B0BF]">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Website</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#22C55E]">ONLINE</span>
                </div>

                <div className="flex items-center justify-between text-[#A7B0BF]">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>WhatsApp API</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#22C55E]">ONLINE</span>
                </div>

                <div className="flex items-center justify-between text-[#A7B0BF]">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Agente IA Core</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8B5CF6] font-semibold">ONLINE</span>
                </div>

                <div className="flex items-center justify-between text-[#A7B0BF]">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Agendamentos</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#22C55E]">ONLINE</span>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={handleToggle}
              title="Status do Sistema: 100% OK (Clique para expandir)"
              className="flex flex-col items-center justify-center p-2 rounded-[10px] border border-[#252C38] bg-[#151A23] hover:border-[#3B82F6]/50 cursor-pointer transition-all relative group"
            >
              <div className="relative flex size-6 items-center justify-center">
                <Radio className="size-3.5 text-[#22C55E] animate-pulse" />
                <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-[#22C55E]" />
              </div>
              <span className="text-[9px] font-mono text-[#22C55E] font-bold mt-1">100%</span>

              {/* Hover tooltip for status in collapsed mode */}
              <div className="pointer-events-none absolute left-full bottom-2 ml-2 hidden group-hover:flex flex-col gap-1 z-50 whitespace-nowrap rounded-[8px] border border-[#252C38] bg-[#151A23] p-2.5 text-xs text-[#F5F7FA] shadow-xl">
                <div className="flex items-center gap-1.5 font-bold text-[#22C55E]">
                  <Radio className="size-3" /> Status do Sistema: 100% OK
                </div>
                <div className="text-[11px] text-[#A7B0BF]">
                  Website, WhatsApp API, IA e Agendamentos ONLINE
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
