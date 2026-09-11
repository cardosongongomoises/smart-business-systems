import { Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { ViewMode, Member, Project, Client } from "./types";
import { SearchTasks } from "./SearchTasks";
import { ViewSwitcher } from "./ViewSwitcher";
import { FilterPanel, FilterState } from "./FilterPanel";
import { useState } from "react";

export type SortField = "due_asc" | "priority_desc" | "recent" | "title_asc";

interface OperationsToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  sortBy: SortField;
  onSortChange: (sort: SortField) => void;
  projects: Project[];
  members: Member[];
  clients: Client[];
}

export function OperationsToolbar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewChange,
  filters,
  onFilterChange,
  onResetFilters,
  activeFilterCount,
  sortBy,
  onSortChange,
  projects,
  members,
  clients,
}: OperationsToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Search + Quick Dropdowns */}
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <SearchTasks value={searchQuery} onChange={onSearchChange} />

          {/* Filter toggle button with active badge */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 rounded-[8px] border px-3 py-2 text-xs font-semibold transition-all ${
              showFilters || activeFilterCount > 0
                ? "border-[#3B82F6] bg-[#3B82F6]/15 text-[#F5F7FA]"
                : "border-[#252C38] bg-[#0E121A] text-[#A7B0BF] hover:border-[#3B82F6]/50 hover:text-white"
            }`}
          >
            <Filter className="size-3.5 text-[#3B82F6]" />
            <span>Filtros</span>
            {activeFilterCount > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-[#3B82F6] text-[9px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Project quick select */}
          <select
            value={filters.projectId}
            onChange={(e) => onFilterChange({ ...filters, projectId: e.target.value })}
            className="hidden sm:inline-block rounded-[8px] border border-[#252C38] bg-[#0E121A] px-2.5 py-2 text-xs font-medium text-[#A7B0BF] hover:text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="ALL">Todos os projetos</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Assignee quick select */}
          <select
            value={filters.assigneeId}
            onChange={(e) => onFilterChange({ ...filters, assigneeId: e.target.value })}
            className="hidden md:inline-block rounded-[8px] border border-[#252C38] bg-[#0E121A] px-2.5 py-2 text-xs font-medium text-[#A7B0BF] hover:text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
          >
            <option value="ALL">Todos os responsáveis</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Sort + View Switcher */}
        <div className="flex items-center justify-between lg:justify-end gap-2.5">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-2.5 py-1.5">
            <ArrowUpDown className="size-3 text-[#667085]" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortField)}
              className="bg-transparent text-xs font-medium text-[#A7B0BF] hover:text-[#F5F7FA] focus:outline-none cursor-pointer"
            >
              <option value="due_asc">Prazo mais próximo</option>
              <option value="priority_desc">Maior prioridade</option>
              <option value="recent">Mais recentes</option>
              <option value="title_asc">Título (A-Z)</option>
            </select>
          </div>

          {/* ViewSwitcher (Kanban / Lista) */}
          <ViewSwitcher viewMode={viewMode} onViewChange={onViewChange} />
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onChange={onFilterChange}
          onReset={onResetFilters}
          members={members}
          projects={projects}
          clients={clients}
          activeCount={activeFilterCount}
        />
      )}
    </div>
  );
}
