import { useState } from "react";
import { CheckSquare, Plus, Trash2 } from "lucide-react";
import { ChecklistItem } from "./types";

interface TaskChecklistProps {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  onAdd: (text: string) => void;
}

export function TaskChecklist({ items, onToggle, onAdd }: TaskChecklistProps) {
  const [newItemText, setNewItemText] = useState("");

  const total = items.length;
  const done = items.filter((i) => i.done).length;
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    onAdd(newItemText.trim());
    setNewItemText("");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare className="size-4 text-[#3B82F6]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">
            Checklist de Entregas
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#A7B0BF]">
            {done} / {total} concluídos
          </span>
          <span
            className={`font-bold ${
              percentage === 100 && total > 0 ? "text-[#22C55E]" : "text-[#3B82F6]"
            }`}
          >
            ({percentage}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#252C38]">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            percentage === 100 && total > 0 ? "bg-[#22C55E]" : "bg-[#3B82F6]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Items list */}
      <div className="space-y-1.5 pt-1">
        {items.map((item) => (
          <label
            key={item.id}
            className={`flex items-start gap-2.5 rounded-[8px] border p-2 text-xs transition-colors cursor-pointer ${
              item.done
                ? "border-[#252C38]/60 bg-[#151A23]/40 text-[#667085]"
                : "border-[#252C38] bg-[#151A23] text-[#F5F7FA] hover:border-[#3B82F6]/50"
            }`}
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => onToggle(item.id)}
              className="mt-0.5 size-3.5 rounded border-[#252C38] bg-[#0E121A] text-[#3B82F6] focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span
              className={`flex-1 select-none ${item.done ? "line-through text-[#667085]" : ""}`}
            >
              {item.text}
            </span>
          </label>
        ))}

        {items.length === 0 && (
          <p className="text-xs text-[#667085] italic py-1">Nenhum item na checklist.</p>
        )}
      </div>

      {/* Add new item input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="+ Adicionar item à checklist..."
          className="flex-1 rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-1.5 text-xs text-[#F5F7FA] placeholder-[#667085] focus:border-[#3B82F6] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="rounded-[8px] bg-[#252C38] px-3 py-1.5 text-xs font-semibold text-[#F5F7FA] hover:bg-[#3B82F6] hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <Plus className="size-3.5" />
        </button>
      </form>
    </div>
  );
}
