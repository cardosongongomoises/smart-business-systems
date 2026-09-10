import {
  LayoutDashboard,
  Command,
  FolderKanban,
  Building2,
  UserPlus,
  CalendarDays,
  Contact,
  ListChecks,
  Users,
  Bot,
  Workflow,
  BadgeCheck,
  Gauge,
  FileBarChart,
  Activity,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: LucideIcon;
  id: string;
}

const GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "PRINCIPAL",
    items: [
      { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
      { id: "ops", label: "Centro de Operações", icon: Command },
      { id: "projects", label: "Projetos", icon: FolderKanban },
      { id: "clients", label: "Clientes", icon: Building2 },
      { id: "leads", label: "Leads", icon: UserPlus },
      { id: "agenda", label: "Agenda", icon: CalendarDays },
      { id: "crm", label: "CRM", icon: Contact },
    ],
  },
  {
    title: "OPERAÇÕES",
    items: [
      { id: "tasks", label: "Tarefas", icon: ListChecks },
      { id: "team", label: "Equipa", icon: Users },
      { id: "automation", label: "Automação", icon: Bot },
      { id: "processes", label: "Processos", icon: Workflow },
      { id: "approvals", label: "Aprovações", icon: BadgeCheck },
    ],
  },
  {
    title: "ANÁLISES",
    items: [
      { id: "performance", label: "Performance", icon: Gauge },
      { id: "reports", label: "Relatórios", icon: FileBarChart },
      { id: "indicators", label: "Indicadores", icon: Activity },
    ],
  },
  {
    title: "SISTEMA",
    items: [{ id: "settings", label: "Configurações", icon: Settings }],
  },
];

export function OperationsSidebar({
  isMobileOpen,
  onCloseMobile,
}: {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const active = "ops";

  const content = (
    <nav className="flex h-full w-[248px] shrink-0 flex-col border-r border-[#252C38] bg-[#0E121A]">
      <div className="flex items-center gap-2.5 border-b border-[#252C38] px-5 py-4">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-[8px] text-sm font-bold text-[#F5F7FA]"
          style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
        >
          A
        </span>
        <span className="text-[13px] font-semibold tracking-[0.16em] text-[#F5F7FA]">
          AGENTES DIGITAL
        </span>
        <button
          type="button"
          onClick={onCloseMobile}
          className="ml-auto rounded-[8px] p-1 text-[#667085] hover:text-[#F5F7FA] lg:hidden"
          aria-label="Fechar menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-[10px] font-semibold tracking-[0.18em] text-[#667085]">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.id === active;
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative flex w-full items-center gap-3 rounded-[8px] px-3 py-2 text-[13px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
                        isActive
                          ? "bg-[#3B82F6]/10 font-medium text-[#F5F7FA]"
                          : "text-[#A7B0BF] hover:bg-[#151A23] hover:text-[#F5F7FA]",
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#3B82F6]" />
                      )}
                      <Icon
                        className={cn("h-4 w-4", isActive ? "text-[#3B82F6]" : "text-[#667085]")}
                      />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#252C38] px-5 py-4">
        <p className="text-[10px] leading-relaxed tracking-[0.12em] text-[#667085]">
          OPERATION CENTER
          <br />
          <span className="text-[#A7B0BF]">Tudo sob controlo.</span>
        </p>
      </div>
    </nav>
  );

  return (
    <>
      <div className="hidden lg:block">{content}</div>
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Fechar menu"
            onClick={onCloseMobile}
          />
          <div className="relative h-full animate-in slide-in-from-left duration-250">{content}</div>
        </div>
      )}
    </>
  );
}
