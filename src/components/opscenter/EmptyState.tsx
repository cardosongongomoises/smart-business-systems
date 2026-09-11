import { FolderKanban, FilterX, Plus } from "lucide-react";

interface EmptyStateProps {
  type?: "no_tasks" | "filtered" | "no_project_tasks";
  onClearFilters?: () => void;
  onCreateTask?: () => void;
}

export function EmptyState({ type = "filtered", onClearFilters, onCreateTask }: EmptyStateProps) {
  if (type === "no_project_tasks") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-[#252C38] bg-[#0E121A]/60 px-6 py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-[#252C38] bg-[#151A23] text-[#3B82F6] shadow-[0_0_24px_rgba(59,130,246,0.12)]">
          <FolderKanban className="size-7" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#F5F7FA]">
          Este projeto ainda não possui tarefas
        </h3>
        <p className="mt-1.5 max-w-sm text-sm text-[#A7B0BF]">
          Comece adicionando a primeira tarefa para estruturar o fluxo de entregas da equipa.
        </p>
        {onCreateTask && (
          <button
            type="button"
            onClick={onCreateTask}
            className="mt-5 inline-flex items-center gap-2 rounded-[8px] bg-[#3B82F6] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#2563EB] active:scale-[0.98]"
          >
            <Plus className="size-3.5" />
            Adicionar tarefa
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-[#252C38] bg-[#0E121A]/60 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-[#252C38] bg-[#151A23] text-[#A7B0BF] shadow-[0_0_24px_rgba(0,0,0,0.4)]">
        <FilterX className="size-7 text-[#667085]" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-[#F5F7FA]">Nenhuma tarefa encontrada</h3>
      <p className="mt-1.5 max-w-sm text-sm text-[#A7B0BF]">
        Não existem tarefas correspondentes aos filtros selecionados. Tente ajustar os termos de
        pesquisa ou remover os filtros.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="rounded-[8px] border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-xs font-semibold text-[#F5F7FA] transition-colors hover:border-[#3B82F6] hover:text-white"
          >
            Limpar filtros
          </button>
        )}
        {onCreateTask && (
          <button
            type="button"
            onClick={onCreateTask}
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#3B82F6] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#2563EB] active:scale-[0.98]"
          >
            <Plus className="size-3.5" />
            Nova tarefa
          </button>
        )}
      </div>
    </div>
  );
}
