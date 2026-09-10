import { Bell, Menu, Plus, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  onNewTask: () => void;
  onNewProject: () => void;
  onOpenMobileSidebar: () => void;
  notifications: string[];
}

export function OperationsHeader({
  onNewTask,
  onNewProject,
  onOpenMobileSidebar,
  notifications,
}: Props) {
  return (
    <header className="border-b border-[#252C38] bg-[#0E121A]/80 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenMobileSidebar}
              className="rounded-[8px] border border-[#252C38] p-1.5 text-[#A7B0BF] lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <nav aria-label="Trilho de navegação" className="text-[11px] tracking-wide text-[#667085]">
              Operações <span className="px-1">/</span>
              <span className="text-[#A7B0BF]">Centro de Operações</span>
            </nav>
          </div>
          <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight text-[#F5F7FA] sm:text-[34px]">
            Centro de Operações
          </h1>
          <p className="mt-1 max-w-2xl text-[13px] text-[#A7B0BF] sm:text-sm">
            Acompanhe projetos, tarefas e operações da Agentes Digital em um único lugar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onNewTask}
            className="h-9 rounded-[8px] bg-[#3B82F6] px-3 text-[13px] font-medium text-white hover:bg-[#2f76e6]"
          >
            <Plus className="mr-1 h-4 w-4" /> Nova tarefa
          </Button>
          <Button
            onClick={onNewProject}
            variant="outline"
            className="h-9 rounded-[8px] border-[#252C38] bg-[#151A23] px-3 text-[13px] text-[#A7B0BF] hover:bg-[#1B212C] hover:text-[#F5F7FA]"
          >
            <FolderPlus className="mr-1 h-4 w-4" /> Novo projeto
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`Notificações (${notifications.length})`}
                className="relative rounded-[8px] border border-[#252C38] bg-[#151A23] p-2 text-[#A7B0BF] transition-colors hover:text-[#F5F7FA]"
              >
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[9px] font-bold text-white">
                    {notifications.length}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-72 border-[#252C38] bg-[#151A23] text-[#F5F7FA]"
            >
              <DropdownMenuLabel className="text-[11px] tracking-[0.14em] text-[#667085]">
                NOTIFICAÇÕES
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#252C38]" />
              {notifications.length === 0 ? (
                <p className="px-2 py-3 text-xs text-[#667085]">Sem notificações por agora.</p>
              ) : (
                notifications.map((n) => (
                  <DropdownMenuItem
                    key={n}
                    className="text-xs text-[#A7B0BF] focus:bg-[#1B212C] focus:text-[#F5F7FA]"
                  >
                    {n}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
            title="Cardoso Moisés"
          >
            CM
          </span>
        </div>
      </div>
    </header>
  );
}
