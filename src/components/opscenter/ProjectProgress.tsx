import { Folder, CheckCircle2, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Project, Task } from "./types";

interface ProjectProgressProps {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | null;
  onSelectProject: (projectId: string | null) => void;
}

export function ProjectProgress({
  projects,
  tasks,
  selectedProjectId,
  onSelectProject,
}: ProjectProgressProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Compute metrics per project
  const projectStats = projects.map((project) => {
    const projectTasks = tasks.filter((t) => t.projectId === project.id);
    const total = projectTasks.length;
    const completed = projectTasks.filter((t) => t.status === "DONE").length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      ...project,
      total,
      completed,
      percentage,
    };
  });

  // Top active projects to display
  const displayedProjects = isExpanded ? projectStats : projectStats.slice(0, 3);

  return (
    <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Folder className="size-4 text-[#3B82F6]" />
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#F5F7FA]">
            Progresso dos Projetos ({projects.length})
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#A7B0BF] hover:text-[#3B82F6] transition-colors"
        >
          <span>{isExpanded ? "Recolher" : "Ver todos"}</span>
          {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {displayedProjects.map((p) => {
          const isSelected = selectedProjectId === p.id;
          const isFinished = p.percentage === 100 && p.total > 0;

          return (
            <div
              key={p.id}
              onClick={() => onSelectProject(isSelected ? null : p.id)}
              className={`group cursor-pointer rounded-[10px] border p-3 transition-all ${
                isSelected
                  ? "border-[#3B82F6] bg-[#3B82F6]/10 shadow-[0_0_16px_rgba(59,130,246,0.15)]"
                  : "border-[#252C38] bg-[#151A23]/60 hover:border-[#3B82F6]/40 hover:bg-[#151A23]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-semibold text-[#F5F7FA] group-hover:text-white">
                    {p.name}
                  </h4>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-[#A7B0BF]">
                    <span className="truncate">{p.budget}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-[#667085]" />
                      {p.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isFinished
                        ? "text-[#22C55E]"
                        : p.percentage >= 60
                          ? "text-[#3B82F6]"
                          : "text-[#F5F7FA]"
                    }`}
                  >
                    {p.percentage}%
                  </span>
                  <span className="text-[10px] text-[#667085]">
                    {p.completed}/{p.total} tarefas
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#252C38]">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isFinished ? "bg-[#22C55E]" : "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"
                  }`}
                  style={{ width: `${Math.max(p.percentage, 4)}%` }}
                />
              </div>

              {isSelected && (
                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-[#3B82F6]">
                  <span>Filtrando por este projeto</span>
                  <span className="underline">Limpar</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
