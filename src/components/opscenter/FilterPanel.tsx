import { X, RotateCcw, Check } from "lucide-react";
import { ALL_TAGS, Client, Member, Project, STATUS_META, TaskPriority, TaskStatus } from "./types";

export interface FilterState {
  status: TaskStatus | "ALL";
  assigneeId: string | "ALL";
  projectId: string | "ALL";
  clientId: string | "ALL";
  priority: TaskPriority | "ALL";
  dueRange: "ALL" | "TODAY" | "THIS_WEEK" | "NEXT_WEEK" | "OVERDUE" | "NO_DATE";
  tag: string | "ALL";
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  members: Member[];
  projects: Project[];
  clients: Client[];
  activeCount: number;
}

export function FilterPanel({
  filters,
  onChange,
  onReset,
  members,
  projects,
  clients,
  activeCount,
}: FilterPanelProps) {
  const update = (patch: Partial<FilterState>) => {
    onChange({ ...filters, ...patch });
  };

  return (
    <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] animate-in fade-in-20">
      <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#F5F7FA]">
            Filtros Avançados
          </span>
          {activeCount > 0 && (
            <span className="rounded-full bg-[#3B82F6]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#3B82F6]">
              {activeCount} ativos
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A7B0BF] hover:text-[#EF4444] transition-colors"
          >
            <RotateCcw className="size-3" />
            Limpar todos
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
        {/* Status */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A7B0BF] mb-1.5">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => update({ status: e.target.value as TaskStatus | "ALL" })}
            className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="ALL">Todos os status</option>
            {Object.entries(STATUS_META).map(([key, meta]) => (
              <option key={key} value={key}>
                {meta.label}
              </option>
            ))}
          </select>
        </div>

        {/* Responsável */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A7B0BF] mb-1.5">
            Responsável
          </label>
          <select
            value={filters.assigneeId}
            onChange={(e) => update({ assigneeId: e.target.value })}
            className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="ALL">Todos os responsáveis</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.role})
              </option>
            ))}
          </select>
        </div>

        {/* Projeto */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A7B0BF] mb-1.5">
            Projeto
          </label>
          <select
            value={filters.projectId}
            onChange={(e) => update({ projectId: e.target.value })}
            className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="ALL">Todos os projetos</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cliente */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A7B0BF] mb-1.5">
            Cliente
          </label>
          <select
            value={filters.clientId}
            onChange={(e) => update({ clientId: e.target.value })}
            className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="ALL">Todos os clientes</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Prioridade */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A7B0BF] mb-1.5">
            Prioridade
          </label>
          <select
            value={filters.priority}
            onChange={(e) => update({ priority: e.target.value as TaskPriority | "ALL" })}
            className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="ALL">Todas as prioridades</option>
            <option value="LOW">● Baixa</option>
            <option value="MEDIUM">● Média</option>
            <option value="HIGH">● Alta</option>
            <option value="URGENT">● Urgente</option>
          </select>
        </div>

        {/* Prazo */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A7B0BF] mb-1.5">
            Prazo de Entrega
          </label>
          <select
            value={filters.dueRange}
            onChange={(e) => update({ dueRange: e.target.value as FilterState["dueRange"] })}
            className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 py-1.5 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="ALL">Todos os prazos</option>
            <option value="OVERDUE">⚠ Apenas Atrasadas</option>
            <option value="TODAY">Hoje</option>
            <option value="THIS_WEEK">Esta semana</option>
            <option value="NEXT_WEEK">Próxima semana</option>
            <option value="NO_DATE">Sem prazo definido</option>
          </select>
        </div>

        {/* Tag */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A7B0BF] mb-1.5">
            Tag / Categoria
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => update({ tag: "ALL" })}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                filters.tag === "ALL"
                  ? "bg-[#3B82F6] text-white shadow-sm"
                  : "bg-[#151A23] text-[#A7B0BF] hover:text-white border border-[#252C38]"
              }`}
            >
              Todas
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => update({ tag: filters.tag === tag ? "ALL" : tag })}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  filters.tag === tag
                    ? "bg-[#8B5CF6] text-white shadow-sm"
                    : "bg-[#151A23] text-[#A7B0BF] hover:text-white border border-[#252C38]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
