import { useState } from "react";
import { Plus } from "lucide-react";
import { Member, Project, Task, TaskStatus, STATUS_META } from "./types";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  projects: Project[];
  members: Member[];
  onSelectTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onMoveTask: (id: string, status: TaskStatus) => void;
  onAssigneeChange?: (id: string, assigneeId: string) => void;
  onDuplicateTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onQuickAddTask: (status: TaskStatus) => void;
}

export function KanbanColumn({
  status,
  tasks,
  projects,
  members,
  onSelectTask,
  onEditTask,
  onMoveTask,
  onAssigneeChange,
  onDuplicateTask,
  onArchiveTask,
  onDeleteTask,
  onQuickAddTask,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const meta = STATUS_META[status];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set false if leaving column container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  return (
    <section
      aria-label={`Coluna ${meta.label}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col w-[300px] sm:w-[320px] shrink-0 rounded-[14px] border p-3 transition-all duration-200 ${
        isOver
          ? "border-[#3B82F6] bg-[#3B82F6]/5 shadow-[0_0_24px_rgba(59,130,246,0.15)] ring-1 ring-[#3B82F6]"
          : "border-[#252C38] bg-[#0E121A]/60"
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
        <div className="flex items-center gap-2">
          {/* Status color indicator */}
          <span className="size-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#F5F7FA]">
            {meta.label}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#151A23] px-2 py-0.5 font-mono text-[11px] font-bold text-[#A7B0BF] border border-[#252C38]">
            {tasks.length < 10 ? `0${tasks.length}` : tasks.length}
          </span>
          <button
            type="button"
            title={`Adicionar tarefa em ${meta.label}`}
            onClick={() => onQuickAddTask(status)}
            className="flex size-6 items-center justify-center rounded-md text-[#667085] hover:bg-[#151A23] hover:text-[#3B82F6] transition-colors"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Cards list container with smooth scrolling */}
      <div className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1 max-h-[calc(100vh-320px)] min-h-[200px]">
        {tasks.map((task) => {
          const project = projects.find((p) => p.id === task.projectId);
          const assignee = members.find((m) => m.id === task.assigneeId);

          return (
            <TaskCard
              key={task.id}
              task={task}
              project={project}
              assignee={assignee}
              allMembers={members}
              onSelect={onSelectTask}
              onEdit={onEditTask}
              onMoveStatus={onMoveTask}
              onAssigneeChange={onAssigneeChange}
              onDuplicate={onDuplicateTask}
              onArchive={onArchiveTask}
              onDelete={onDeleteTask}
            />
          );
        })}

        {/* Empty placeholder in column */}
        {tasks.length === 0 && (
          <div
            onClick={() => onQuickAddTask(status)}
            className={`flex flex-col items-center justify-center rounded-[12px] border border-dashed p-6 text-center transition-all cursor-pointer ${
              isOver
                ? "border-[#3B82F6] bg-[#3B82F6]/10 text-[#3B82F6]"
                : "border-[#252C38] bg-[#151A23]/30 text-[#667085] hover:border-[#3B82F6]/40 hover:text-[#A7B0BF]"
            }`}
          >
            <p className="text-xs font-medium">Nenhuma tarefa nesta etapa</p>
            <span className="mt-1 text-[11px] text-[#3B82F6] font-semibold">
              + Adicionar tarefa
            </span>
          </div>
        )}
      </div>

      {/* Footer quick add button */}
      <div className="mt-3 pt-2 border-t border-[#252C38]">
        <button
          type="button"
          onClick={() => onQuickAddTask(status)}
          className="flex w-full items-center justify-center gap-1.5 rounded-[8px] border border-dashed border-[#252C38] bg-[#151A23]/40 py-2 text-xs font-medium text-[#A7B0BF] hover:border-[#3B82F6]/50 hover:bg-[#151A23] hover:text-[#F5F7FA] transition-all"
        >
          <Plus className="size-3.5" />
          <span>Nova tarefa</span>
        </button>
      </div>
    </section>
  );
}
