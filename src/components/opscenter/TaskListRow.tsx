import { useState } from "react";
import {
  Calendar,
  AlertTriangle,
  MoreHorizontal,
  ExternalLink,
  Edit3,
  Copy,
  Archive,
  Trash2,
} from "lucide-react";
import { Member, Project, Task, TaskStatus, STATUS_META, PRIORITY_META } from "./types";
import { isOverdue, isDueToday } from "./ui-bits";

interface TaskListRowProps {
  task: Task;
  project?: Project;
  assignee?: Member;
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => void;
  onMoveStatus: (id: string, status: TaskStatus) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskListRow({
  task,
  project,
  assignee,
  onSelect,
  onEdit,
  onMoveStatus,
  onDuplicate,
  onArchive,
  onDelete,
}: TaskListRowProps) {
  const [showMenu, setShowMenu] = useState(false);

  const overdue = isOverdue(task.dueDate, task.status);
  const today = isDueToday(task.dueDate);

  const statusMeta = STATUS_META[task.status];
  const priorityMeta = PRIORITY_META[task.priority];

  const doneChecklist = task.checklist.filter((i) => i.done).length;
  const totalChecklist = task.checklist.length;
  const progressPercent =
    totalChecklist > 0 ? Math.round((doneChecklist / totalChecklist) * 100) : null;

  return (
    <tr
      onClick={() => onSelect(task)}
      className="group border-b border-[#252C38] bg-[#0E121A]/50 transition-colors hover:bg-[#151A23] cursor-pointer"
    >
      {/* 1. Tarefa (Title + Tags) */}
      <td className="py-3 px-4 min-w-[260px]">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#F5F7FA] group-hover:text-white leading-snug">
            {task.title}
          </span>
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="rounded bg-[#151A23] px-1.5 py-0.2 text-[9px] text-[#A7B0BF] border border-[#252C38]"
                >
                  {t}
                </span>
              ))}
              {task.tags.length > 2 && (
                <span className="text-[9px] text-[#667085]">+{task.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </td>

      {/* 2. Projeto */}
      <td className="py-3 px-4 min-w-[160px]">
        <span className="text-xs text-[#A7B0BF] line-clamp-1">
          {project?.name ? project.name.split("—")[0].trim() : "—"}
        </span>
      </td>

      {/* 3. Responsável */}
      <td className="py-3 px-4 min-w-[140px]">
        {assignee ? (
          <div className="flex items-center gap-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#151A23] border border-[#252C38] font-mono text-[10px] font-bold text-[#3B82F6]">
              {assignee.initials || "AD"}
            </div>
            <span className="text-xs text-[#F5F7FA] truncate">
              {assignee.name ? assignee.name.split(" ")[0] : "Equipa"}
            </span>
          </div>
        ) : (
          <span className="text-xs text-[#667085]">Sem responsável</span>
        )}
      </td>

      {/* 4. Status */}
      <td className="py-3 px-4 min-w-[140px]" onClick={(e) => e.stopPropagation()}>
        <select
          value={task.status}
          onChange={(e) => onMoveStatus(task.id, e.target.value as TaskStatus)}
          className="rounded-[6px] border border-[#252C38] bg-[#151A23] px-2 py-1 text-[11px] font-semibold text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none cursor-pointer"
          style={{ color: statusMeta.color }}
        >
          {Object.entries(STATUS_META).map(([st, m]) => (
            <option key={st} value={st} className="bg-[#0E121A] text-[#F5F7FA]">
              {m.label}
            </option>
          ))}
        </select>
      </td>

      {/* 5. Prioridade */}
      <td className="py-3 px-4 min-w-[100px]">
        <div
          className="flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: priorityMeta.color }}
        >
          <span className="size-2 rounded-full" style={{ backgroundColor: priorityMeta.color }} />
          <span>{priorityMeta.label}</span>
        </div>
      </td>

      {/* 6. Prazo */}
      <td className="py-3 px-4 min-w-[120px]">
        {task.dueDate ? (
          <span
            className={`inline-flex items-center gap-1 text-xs font-mono font-medium ${
              overdue
                ? "text-[#EF4444] font-bold"
                : today
                  ? "text-[#3B82F6] font-bold"
                  : "text-[#A7B0BF]"
            }`}
          >
            {overdue && <AlertTriangle className="size-3 text-[#EF4444]" />}
            {!overdue && <Calendar className="size-3 text-[#667085]" />}
            <span>{task.dueDate}</span>
          </span>
        ) : (
          <span className="text-xs text-[#667085]">—</span>
        )}
      </td>

      {/* 7. Progresso (Checklist) */}
      <td className="py-3 px-4 min-w-[130px]">
        {progressPercent !== null ? (
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#252C38]">
              <div
                className={`h-full rounded-full ${
                  progressPercent === 100 ? "bg-[#22C55E]" : "bg-[#3B82F6]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-[#A7B0BF]">{progressPercent}%</span>
          </div>
        ) : (
          <span className="text-[11px] text-[#667085]">—</span>
        )}
      </td>

      {/* 8. Menu Ações */}
      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="relative inline-block">
          <button
            type="button"
            aria-label="Mais opções"
            onClick={() => setShowMenu(!showMenu)}
            className="flex size-7 items-center justify-center rounded-md text-[#667085] hover:bg-[#252C38] hover:text-white transition-colors"
          >
            <MoreHorizontal className="size-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 z-30 w-44 rounded-[8px] border border-[#252C38] bg-[#151A23] p-1.5 shadow-[0_12px_24px_rgba(0,0,0,0.5)] text-left">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onSelect(task);
                }}
                className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
              >
                <ExternalLink className="size-3.5 text-[#3B82F6]" />
                Abrir detalhes
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onEdit(task);
                }}
                className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
              >
                <Edit3 className="size-3.5 text-[#A7B0BF]" />
                Editar tarefa
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onDuplicate(task.id);
                }}
                className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
              >
                <Copy className="size-3.5 text-[#A7B0BF]" />
                Duplicar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onArchive(task.id);
                }}
                className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
              >
                <Archive className="size-3.5 text-[#A7B0BF]" />
                Arquivar
              </button>
              <div className="mt-1 pt-1 border-t border-[#252C38]">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    if (confirm(`Excluir "${task.title}"?`)) onDelete(task.id);
                  }}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-[#EF4444] hover:bg-[#EF4444]/15"
                >
                  <Trash2 className="size-3.5" />
                  Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
