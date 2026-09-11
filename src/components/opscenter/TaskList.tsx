import { Member, Project, Task, TaskStatus } from "./types";
import { TaskListRow } from "./TaskListRow";

interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  members: Member[];
  onSelectTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onMoveTask: (id: string, status: TaskStatus) => void;
  onDuplicateTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({
  tasks,
  projects,
  members,
  onSelectTask,
  onEditTask,
  onMoveTask,
  onDuplicateTask,
  onArchiveTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <div className="w-full overflow-hidden rounded-[12px] border border-[#252C38] bg-[#0E121A] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#252C38] bg-[#151A23]/80 text-[11px] font-bold uppercase tracking-[0.14em] text-[#A7B0BF]">
              <th className="py-3 px-4">Tarefa</th>
              <th className="py-3 px-4">Projeto</th>
              <th className="py-3 px-4">Responsável</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Prioridade</th>
              <th className="py-3 px-4">Prazo</th>
              <th className="py-3 px-4">Progresso</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#252C38]">
            {tasks.map((task) => {
              const project = projects.find((p) => p.id === task.projectId);
              const assignee = members.find((m) => m.id === task.assigneeId);

              return (
                <TaskListRow
                  key={task.id}
                  task={task}
                  project={project}
                  assignee={assignee}
                  onSelect={onSelectTask}
                  onEdit={onEditTask}
                  onMoveStatus={onMoveTask}
                  onDuplicate={onDuplicateTask}
                  onArchive={onArchiveTask}
                  onDelete={onDeleteTask}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#252C38] bg-[#151A23]/40 px-4 py-3 text-xs text-[#A7B0BF]">
        <span>Mostrando {tasks.length} tarefas</span>
        <span className="font-mono text-[11px] text-[#667085]">
          Clique em qualquer linha para abrir o painel de detalhes
        </span>
      </div>
    </div>
  );
}
