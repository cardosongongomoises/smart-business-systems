import { LayoutGrid, List } from "lucide-react";
import { ViewMode } from "./types";

interface ViewSwitcherProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export function ViewSwitcher({ viewMode, onViewChange }: ViewSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Alternar modo de visualização"
      className="inline-flex items-center rounded-[8px] border border-[#252C38] bg-[#0E121A] p-1 shadow-sm"
    >
      <button
        type="button"
        onClick={() => onViewChange("kanban")}
        aria-pressed={viewMode === "kanban"}
        title="Visualização em Kanban (Tecla K)"
        className={`relative inline-flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
          viewMode === "kanban"
            ? "bg-[#151A23] text-white shadow-[0_1px_4px_rgba(0,0,0,0.4)] border border-[#252C38]"
            : "text-[#A7B0BF] hover:text-[#F5F7FA]"
        }`}
      >
        <LayoutGrid className="size-3.5 text-[#3B82F6]" />
        <span>Kanban</span>
        <kbd className="hidden sm:inline-block ml-1 rounded bg-[#252C38] px-1 py-0.2 text-[9px] font-mono text-[#667085]">
          K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => onViewChange("list")}
        aria-pressed={viewMode === "list"}
        title="Visualização em Lista (Tecla L)"
        className={`relative inline-flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
          viewMode === "list"
            ? "bg-[#151A23] text-white shadow-[0_1px_4px_rgba(0,0,0,0.4)] border border-[#252C38]"
            : "text-[#A7B0BF] hover:text-[#F5F7FA]"
        }`}
      >
        <List className="size-3.5 text-[#8B5CF6]" />
        <span>Lista</span>
        <kbd className="hidden sm:inline-block ml-1 rounded bg-[#252C38] px-1 py-0.2 text-[9px] font-mono text-[#667085]">
          L
        </kbd>
      </button>
    </div>
  );
}
