import {
  Layers,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FolderGit2,
  Users2,
  TrendingUp,
} from "lucide-react";
import { Task } from "./types";
import { isOverdue } from "./ui-bits";

interface OperationsMetricsProps {
  tasks?: Task[];
  activeTasksCount?: number;
  inProgressCount?: number;
  overdueCount?: number;
  completedCount?: number;
  projectsCount?: number;
  teamCount?: number;
  onFilterStatus?: (status: string | null) => void;
  onFilterOverdue?: () => void;
}

export function OperationsMetrics({
  tasks,
  activeTasksCount,
  inProgressCount,
  overdueCount,
  completedCount,
  projectsCount,
  teamCount,
  onFilterStatus,
  onFilterOverdue,
}: OperationsMetricsProps) {
  const effectiveActive =
    activeTasksCount ?? (tasks ? tasks.filter((t) => t.status !== "DONE").length : 0);
  const effectiveInProgress =
    inProgressCount ?? (tasks ? tasks.filter((t) => t.status === "IN_PROGRESS").length : 0);
  const effectiveOverdue =
    overdueCount ?? (tasks ? tasks.filter((t) => isOverdue(t.dueDate, t.status)).length : 0);
  const effectiveCompleted =
    completedCount ?? (tasks ? tasks.filter((t) => t.status === "DONE").length : 0);
  const effectiveProjects =
    projectsCount ?? (tasks ? new Set(tasks.map((t) => t.projectId).filter(Boolean)).size : 0);
  const effectiveTeam =
    teamCount ?? (tasks ? new Set(tasks.map((t) => t.assigneeId).filter(Boolean)).size : 0);

  const format = (n?: number) => {
    const val = typeof n === "number" && !isNaN(n) ? n : 0;
    return val < 10 ? `0${val}` : `${val}`;
  };

  return (
    <section
      aria-label="Métricas Operacionais"
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
    >
      {/* 1. Tarefas Ativas */}
      <div
        onClick={() => onFilterStatus?.(null)}
        className="group cursor-pointer rounded-[12px] border border-[#252C38] bg-[#0E121A] p-3.5 sm:p-4 shadow-sm transition-all hover:border-[#3B82F6]/60 hover:bg-[#151A23]"
      >
        <div className="flex items-center justify-between text-[#A7B0BF]">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A7B0BF] group-hover:text-[#F5F7FA]">
            Tarefas Ativas
          </span>
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
            <Layers className="size-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between gap-1">
          <span className="font-mono text-2xl sm:text-3xl font-black text-[#F5F7FA] tracking-tight">
            {format(effectiveActive)}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#22C55E] whitespace-nowrap shrink-0">
            <TrendingUp className="size-3" />
            +8%
          </span>
        </div>
        <p className="mt-1 text-[10px] text-[#667085] truncate">esta semana no backlog e fluxo</p>
      </div>

      {/* 2. Em Andamento */}
      <div
        onClick={() => onFilterStatus?.("IN_PROGRESS")}
        className="group cursor-pointer rounded-[12px] border border-[#252C38] bg-[#0E121A] p-3.5 sm:p-4 shadow-sm transition-all hover:border-[#3B82F6] hover:bg-[#151A23]"
      >
        <div className="flex items-center justify-between text-[#A7B0BF]">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A7B0BF] group-hover:text-[#3B82F6]">
            Em Andamento
          </span>
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#3B82F6]">
            <Clock className="size-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between gap-1">
          <span className="font-mono text-2xl sm:text-3xl font-black text-[#3B82F6] tracking-tight">
            {format(effectiveInProgress)}
          </span>
          <span className="text-[10px] font-mono text-[#3B82F6]/90 font-bold uppercase whitespace-nowrap shrink-0">
            Execução
          </span>
        </div>
        <p className="mt-1 text-[10px] text-[#667085] truncate">tarefas em desenvolvimento</p>
      </div>

      {/* 3. Atrasadas */}
      <div
        onClick={() => onFilterOverdue?.()}
        className="group cursor-pointer rounded-[12px] border border-[#EF4444]/40 bg-[#0E121A] p-3.5 sm:p-4 shadow-sm transition-all hover:border-[#EF4444] hover:bg-[#EF4444]/10"
      >
        <div className="flex items-center justify-between text-[#EF4444]">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#EF4444]">
            Atrasadas
          </span>
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EF4444]/15 text-[#EF4444]">
            <AlertTriangle className="size-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between gap-1">
          <span className="font-mono text-2xl sm:text-3xl font-black text-[#EF4444] tracking-tight">
            {format(effectiveOverdue)}
          </span>
          <span className="rounded-full bg-[#EF4444]/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-[#EF4444] uppercase whitespace-nowrap shrink-0">
            Crítico
          </span>
        </div>
        <p className="mt-1 text-[10px] text-[#EF4444]/80 truncate">prazo expirado</p>
      </div>

      {/* 4. Concluídas */}
      <div
        onClick={() => onFilterStatus?.("DONE")}
        className="group cursor-pointer rounded-[12px] border border-[#252C38] bg-[#0E121A] p-3.5 sm:p-4 shadow-sm transition-all hover:border-[#22C55E]/60 hover:bg-[#151A23]"
      >
        <div className="flex items-center justify-between text-[#A7B0BF]">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A7B0BF] group-hover:text-[#22C55E]">
            Concluídas
          </span>
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#22C55E]/15 text-[#22C55E]">
            <CheckCircle2 className="size-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between gap-1">
          <span className="font-mono text-2xl sm:text-3xl font-black text-[#22C55E] tracking-tight">
            {format(effectiveCompleted)}
          </span>
          <span className="text-[10px] font-mono text-[#22C55E]/90 font-bold uppercase whitespace-nowrap shrink-0">
            Entregues
          </span>
        </div>
        <p className="mt-1 text-[10px] text-[#667085] truncate">finalizadas com sucesso</p>
      </div>

      {/* 5. Projetos Ativos */}
      <div className="group rounded-[12px] border border-[#252C38] bg-[#0E121A] p-3.5 sm:p-4 shadow-sm transition-all hover:border-[#8B5CF6]/60 hover:bg-[#151A23]">
        <div className="flex items-center justify-between text-[#A7B0BF]">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A7B0BF]">
            Projetos Ativos
          </span>
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6]">
            <FolderGit2 className="size-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between gap-1">
          <span className="font-mono text-2xl sm:text-3xl font-black text-[#F5F7FA] tracking-tight">
            {format(effectiveProjects)}
          </span>
          <span className="text-[10px] font-mono text-[#8B5CF6] font-bold uppercase whitespace-nowrap shrink-0">
            Ativos
          </span>
        </div>
        <p className="mt-1 text-[10px] text-[#667085] truncate">clientes corporativos</p>
      </div>

      {/* 6. Equipe */}
      <div className="group rounded-[12px] border border-[#252C38] bg-[#0E121A] p-3.5 sm:p-4 shadow-sm transition-all hover:border-[#3B82F6]/60 hover:bg-[#151A23]">
        <div className="flex items-center justify-between text-[#A7B0BF]">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A7B0BF]">
            Equipe
          </span>
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
            <Users2 className="size-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between gap-1">
          <span className="font-mono text-2xl sm:text-3xl font-black text-[#F5F7FA] tracking-tight">
            {format(effectiveTeam)}
          </span>
          <span className="text-[10px] font-mono text-[#22C55E] font-bold uppercase whitespace-nowrap shrink-0">
            Online
          </span>
        </div>
        <p className="mt-1 text-[10px] text-[#667085] truncate">especialistas alocados</p>
      </div>
    </section>
  );
}
