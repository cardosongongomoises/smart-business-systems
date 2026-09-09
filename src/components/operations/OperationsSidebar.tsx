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
  Bot,
  Code2,
} from "lucide-react";

export type ActiveTab =
  | "dashboard"
  | "leads"
  | "conversations"
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
}

export function OperationsSidebar({ currentTab, onSelectTab, activeChatsCount = 4 }: SidebarProps) {
  const menuItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: "violet" | "blue" | "green";
  }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "leads", label: "Leads", icon: Users },
    {
      id: "conversations",
      label: "Conversas IA",
      icon: MessageSquareCode,
      badge: activeChatsCount || 4,
      badgeColor: "violet",
    },
    { id: "clients", label: "Clientes", icon: Briefcase },
    { id: "schedules", label: "Agendamentos", icon: Calendar },
    { id: "automations", label: "Automações", icon: Zap },
    { id: "reports", label: "Relatórios", icon: BarChart3 },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <aside className="w-60 shrink-0 border-r border-[#252C38] bg-[#0E121A] flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      {/* Top Section */}
      <div className="p-4 flex flex-col gap-5 overflow-y-auto">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
          <a href="/" className="flex items-center gap-2.5 group">
            <span className="flex size-8 items-center justify-center rounded-[8px] bg-[#3B82F6] text-xs font-extrabold text-white transition-transform group-hover:scale-105">
              AD
            </span>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#F5F7FA]">
                Agentes Digital
              </span>
              <span className="text-[10px] font-semibold text-[#8B5CF6] tracking-wider uppercase flex items-center gap-1">
                <ShieldCheck className="size-3" /> Operações
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[10px] font-semibold tracking-wider text-[#667085] uppercase">
            Gestão & IA
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-[10px] text-xs font-medium transition-all duration-150 text-left ${
                  isActive
                    ? "bg-[#151A23] text-[#3B82F6] border border-[#252C38] shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                    : "text-[#A7B0BF] hover:bg-[#151A23]/60 hover:text-[#F5F7FA] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`size-4 ${isActive ? "text-[#3B82F6]" : "text-[#A7B0BF]"}`}
                    strokeWidth={isActive ? 2.2 : 1.75}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
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
            );
          })}
        </nav>

        {/* Back to Public Site */}
        <div className="pt-2">
          <a
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-[8px] border border-[#252C38] bg-[#151A23]/40 text-[11px] font-medium text-[#A7B0BF] hover:text-[#F5F7FA] hover:border-[#3B82F6]/50 transition-colors"
          >
            <span>Ver Website Público</span>
            <ExternalLink className="size-3 text-[#667085]" />
          </a>
        </div>
      </div>

      {/* System Status Card (Fixed Footer) */}
      <div className="p-4 border-t border-[#252C38] bg-[#080A0F]/60">
        <div className="rounded-[12px] border border-[#252C38] bg-[#151A23] p-3 shadow-sm">
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
      </div>
    </aside>
  );
}
