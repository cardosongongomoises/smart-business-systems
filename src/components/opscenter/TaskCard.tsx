import { useState } from "react";
import {
  Calendar,
  AlertTriangle,
  MessageSquare,
  Paperclip,
  CheckSquare,
  MoreHorizontal,
  Copy,
  Archive,
  Trash2,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  Member,
  Project,
  Task,
  TaskPriority,
  TaskStatus,
  PRIORITY_META,
  STATUS_META,
} from "./types";
import { isOverdue, isDueToday } from "./ui-bits";

interface TaskCardProps {
  task: Task;
  project?: Project;
  assignee?: Member;
  allMembers?: Member[];
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => void;
  onMoveStatus: (id: string, status: TaskStatus) => void;
  onAssigneeChange?: (id: string, assigneeId: string) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({
  task,
  project,
  assignee,
  allMembers = [],
  onSelect,
  onEdit,
  onMoveStatus,
  onAssigneeChange,
  onDuplicate,
  onArchive,
  onDelete,
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showStatusSubmenu, setShowStatusSubmenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const overdue = isOverdue(task.dueDate, task.status);
  const today = isDueToday(task.dueDate);

  const doneChecklist = task.checklist.filter((i) => i.done).length;
  const totalChecklist = task.checklist.length;

  const priorityMeta = PRIORITY_META[task.priority];

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const formatDueDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const monthNames = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      const day = parts[2];
      const monthIndex = parseInt(parts[1], 10) - 1;
      return `${day} ${monthNames[monthIndex] || ""}`;
    }
    return dateStr;
  };

  return (
    <article
      id={`task-card-${task.id}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onSelect(task)}
      className={`group relative flex flex-col rounded-[12px] border bg-[#0E121A] p-3.5 shadow-sm transition-all duration-200 cursor-pointer select-none ${
        isDragging
          ? "opacity-50 scale-[0.98] border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.3)] rotate-1"
          : "border-[#252C38] hover:border-[#3B82F6]/60 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
      }`}
    >
      {/* Top row: Project badge + Quick Menu '⋯' */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {project && (
            <span
              title={project.name}
              className="truncate rounded-[4px] bg-[#151A23] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#A7B0BF] border border-[#252C38]"
            >
              {project.name.split("—")[0].trim()}
            </span>
          )}
          {task.needsApproval && (
            <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[#8B5CF6]/20 px-2 py-0.5 text-[9px] font-semibold text-[#8B5CF6] border border-[#8B5CF6]/40">
              <Sparkles className="size-2.5" />
              Revisão
            </span>
          )}
        </div>

        {/* Quick actions menu */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label="Ações rápidas da tarefa"
            onClick={() => setShowMenu(!showMenu)}
            className="flex size-6 items-center justify-center rounded-md text-[#667085] hover:bg-[#151A23] hover:text-[#F5F7FA] transition-colors"
          >
            <MoreHorizontal className="size-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-7 z-30 w-48 rounded-[10px] border border-[#252C38] bg-[#151A23] p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.6)] animate-in fade-in-20">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onSelect(task);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
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
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
              >
                <Edit3 className="size-3.5 text-[#A7B0BF]" />
                Editar tarefa
              </button>

              {/* Alterar Status */}
              <div className="pt-1 mt-1 border-t border-[#252C38]">
                <button
                  type="button"
                  onClick={() => setShowStatusSubmenu(!showStatusSubmenu)}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="size-3.5 text-[#8B5CF6]" />
                    Mudar status
                  </span>
                  <span className="text-[10px] text-[#667085]">▸</span>
                </button>

                {showStatusSubmenu && (
                  <div className="my-1 space-y-0.5 pl-2 border-l border-[#252C38]">
                    {(["BACKLOG", "TODO", "IN_PROGRESS", "REVIEW", "DONE"] as TaskStatus[]).map(
                      (st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            onMoveStatus(task.id, st);
                            setShowMenu(false);
                            setShowStatusSubmenu(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded px-2 py-1 text-[11px] text-left transition-colors ${
                            task.status === st
                              ? "bg-[#3B82F6]/20 text-[#3B82F6] font-semibold"
                              : "text-[#A7B0BF] hover:bg-[#252C38] hover:text-white"
                          }`}
                        >
                          <span
                            className="size-1.5 rounded-full"
                            style={{ backgroundColor: STATUS_META[st].color }}
                          />
                          {STATUS_META[st].label}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onDuplicate(task.id);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
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
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-[#F5F7FA] hover:bg-[#252C38]"
              >
                <Archive className="size-3.5 text-[#A7B0BF]" />
                Arquivar
              </button>

              <div className="pt-1 mt-1 border-t border-[#252C38]">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    if (confirm(`Tem certeza que deseja excluir "${task.title}"?`)) {
                      onDelete(task.id);
                    }
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-[#EF4444] hover:bg-[#EF4444]/15"
                >
                  <Trash2 className="size-3.5" />
                  Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task title */}
      <h3 className="mt-2 text-sm font-semibold text-[#F5F7FA] line-clamp-2 leading-snug group-hover:text-white">
        {task.title}
      </h3>

      {/* Short description */}
      {task.description && (
        <p className="mt-1 text-xs text-[#A7B0BF] line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#151A23] px-2 py-0.5 text-[10px] font-medium text-[#A7B0BF] border border-[#252C38]"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-[10px] text-[#667085] self-center">+{task.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Checklist mini progress if exists */}
      {totalChecklist > 0 && (
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#252C38]">
            <div
              className={`h-full rounded-full transition-all ${
                doneChecklist === totalChecklist ? "bg-[#22C55E]" : "bg-[#3B82F6]"
              }`}
              style={{ width: `${(doneChecklist / totalChecklist) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#667085]">
            {doneChecklist}/{totalChecklist}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="my-3 border-t border-[#252C38]" />

      {/* Bottom row: Priority dot + Due date / Overdue alert + Assignee avatar */}
      <div className="flex items-center justify-between gap-2">
        {/* Priority Dot + Due date */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Priority with colored dot */}
          <span
            title={`Prioridade: ${priorityMeta.label}`}
            className="flex items-center gap-1.5 text-[11px] font-semibold"
            style={{ color: priorityMeta.color }}
          >
            <span
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: priorityMeta.color }}
            />
            <span className="truncate">{priorityMeta.label}</span>
          </span>

          {/* Due date badge */}
          {task.dueDate && (
            <span
              title={
                overdue
                  ? `ATRASADA: Prazo era ${task.dueDate}`
                  : today
                    ? "Vence hoje!"
                    : `Prazo: ${task.dueDate}`
              }
              className={`inline-flex items-center gap-1 rounded-[6px] px-1.5 py-0.5 text-[10px] font-semibold shrink-0 ${
                overdue
                  ? "bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/40"
                  : today
                    ? "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/40"
                    : "text-[#667085]"
              }`}
            >
              {overdue ? (
                <AlertTriangle className="size-3 text-[#EF4444]" />
              ) : (
                <Calendar className="size-3" />
              )}
              <span>{formatDueDate(task.dueDate)}</span>
            </span>
          )}
        </div>

        {/* Right stats + Assignee Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Comments count */}
          {task.comments.length > 0 && (
            <span
              title={`${task.comments.length} comentários`}
              className="flex items-center gap-1 text-[10px] text-[#667085] hover:text-[#A7B0BF]"
            >
              <MessageSquare className="size-3" />
              <span>{task.comments.length}</span>
            </span>
          )}

          {/* Attachments count */}
          {task.attachments.length > 0 && (
            <span
              title={`${task.attachments.length} arquivos anexados`}
              className="flex items-center gap-1 text-[10px] text-[#667085] hover:text-[#A7B0BF]"
            >
              <Paperclip className="size-3" />
              <span>{task.attachments.length}</span>
            </span>
          )}

          {/* Assignee Avatar with tooltip */}
          {assignee ? (
            <div
              title={`${assignee.name} (${assignee.role})`}
              className="relative flex size-6 items-center justify-center rounded-full bg-[#151A23] border border-[#252C38] font-mono text-[10px] font-bold text-[#3B82F6] hover:border-[#3B82F6] transition-colors"
            >
              {assignee.initials}
            </div>
          ) : (
            <div
              title="Sem responsável atribuído"
              className="flex size-6 items-center justify-center rounded-full bg-[#151A23] border border-dashed border-[#667085] text-[10px] text-[#667085]"
            >
              ?
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
