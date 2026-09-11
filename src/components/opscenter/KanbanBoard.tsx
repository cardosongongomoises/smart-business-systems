import { Member, Project, Task, TaskStatus } from "./types";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
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

const COLUMNS: TaskStatus[] = ["BACKLOG", "TODO", "IN_PROGRESS", "REVIEW", "DONE"];

export function KanbanBoard({
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
}: KanbanBoardProps) {
  return (
    <div className="relative w-full overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max pb-2">
        {COLUMNS.map((status) => {
          const colTasks = tasks.filter((t) => t.status === status);
          return (
            <KanbanColumn
              key={status}
              status={status}
              tasks={colTasks}
              projects={projects}
              members={members}
              onSelectTask={onSelectTask}
              onEditTask={onEditTask}
              onMoveTask={onMoveTask}
              onAssigneeChange={onAssigneeChange}
              onDuplicateTask={onDuplicateTask}
              onArchiveTask={onArchiveTask}
              onDeleteTask={onDeleteTask}
              onQuickAddTask={onQuickAddTask}
            />
          );
        })}
      </div>
    </div>
  );
}
