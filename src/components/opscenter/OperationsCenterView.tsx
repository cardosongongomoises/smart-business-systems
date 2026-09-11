import { useState, useMemo, useEffect, useCallback } from "react";
import { useTaskStore, TaskStoreProvider } from "./useTaskStore";
import { Task, TaskStatus, TaskPriority, ViewMode, STATUS_META, TagSlug } from "./types";
import { isOverdue, isDueToday } from "./ui-bits";
import { OperationsHeader } from "./OperationsHeader";
import { OperationsMetrics } from "./OperationsMetrics";
import { AttentionPanel } from "./AttentionPanel";
import { ProjectProgress } from "./ProjectProgress";
import { OperationsToolbar, SortField } from "./OperationsToolbar";
import { FilterState } from "./FilterPanel";
import { KanbanBoard } from "./KanbanBoard";
import { TaskList } from "./TaskList";
import { EmptyState } from "./EmptyState";
import { TaskDetails } from "./TaskDetails";
import { TaskCreateModal } from "./TaskCreateModal";
import { TaskEditModal } from "./TaskEditModal";
import { ProjectCreateModal } from "./ProjectCreateModal";

interface OperationsCenterViewProps {
  onNavigateTab?: (tab: string) => void;
}

export function OperationsCenterView({ onNavigateTab }: OperationsCenterViewProps) {
  return <OperationsCenterMain onNavigateTab={onNavigateTab} />;
}

const INITIAL_FILTERS: FilterState = {
  status: "ALL",
  assigneeId: "ALL",
  projectId: "ALL",
  clientId: "ALL",
  priority: "ALL",
  dueRange: "ALL",
  tag: "ALL",
};

function OperationsCenterMain({ onNavigateTab }: OperationsCenterViewProps) {
  const {
    tasks,
    projects,
    members,
    clients,
    moveTaskStatus,
    updateTaskPriority,
    updateTaskAssignee,
    updateTaskDueDate,
    updateTaskData,
    createTask,
    duplicateTask,
    archiveTask,
    deleteTask,
    approveTask,
    requestTaskChanges,
    toggleChecklistItem,
    addChecklistItem,
    addComment,
    addAttachment,
    createProject,
  } = useTaskStore();

  // Local UI states
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortField>("due_asc");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [createInitialStatus, setCreateInitialStatus] = useState<TaskStatus>("TODO");
  const [createInitialProjectId, setCreateInitialProjectId] = useState<string | undefined>();
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  // Global Keyboard Shortcuts (K = kanban, L = lista, N = nova tarefa, Esc = fechar drawer)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      if (e.key === "k" || e.key === "K") {
        setViewMode("kanban");
      } else if (e.key === "l" || e.key === "L") {
        setViewMode("list");
      } else if ((e.key === "n" || e.key === "N") && !e.ctrlKey && !e.metaKey) {
        setCreateInitialStatus("TODO");
        setIsCreateTaskOpen(true);
      } else if (e.key === "Escape") {
        setSelectedTaskId(null);
        setIsCreateTaskOpen(false);
        setIsEditTaskOpen(false);
        setIsCreateProjectOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== "ALL") count++;
    if (filters.assigneeId !== "ALL") count++;
    if (filters.projectId !== "ALL") count++;
    if (filters.clientId !== "ALL") count++;
    if (filters.priority !== "ALL") count++;
    if (filters.dueRange !== "ALL") count++;
    if (filters.tag !== "ALL") count++;
    return count;
  }, [filters]);

  // Notifications calculation
  const notifications = useMemo(() => {
    const list: string[] = [];
    const overdueCount = tasks.filter((t) => isOverdue(t.dueDate, t.status)).length;
    const dueTodayCount = tasks.filter((t) => isDueToday(t.dueDate) && t.status !== "DONE").length;
    const reviewCount = tasks.filter((t) => t.status === "REVIEW" || t.needsApproval).length;

    if (overdueCount > 0)
      list.push(`${overdueCount} tarefas com prazo expirado necessitam atenção.`);
    if (dueTodayCount > 0) list.push(`${dueTodayCount} tarefas vencem hoje.`);
    if (reviewCount > 0) list.push(`${reviewCount} tarefas aguardando revisão e aprovação.`);
    return list;
  }, [tasks]);

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = task.description?.toLowerCase().includes(q) ?? false;
          const matchTag = task.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
          const project = projects.find((p) => p.id === task.projectId);
          const matchProj = project?.name.toLowerCase().includes(q) ?? false;
          const assignee = members.find((m) => m.id === task.assigneeId);
          const matchAssignee = assignee?.name.toLowerCase().includes(q) ?? false;

          if (!matchTitle && !matchDesc && !matchTag && !matchProj && !matchAssignee) {
            return false;
          }
        }

        // Status
        if (filters.status !== "ALL" && task.status !== filters.status) return false;

        // Assignee
        if (filters.assigneeId !== "ALL" && task.assigneeId !== filters.assigneeId) return false;

        // Project
        if (filters.projectId !== "ALL" && task.projectId !== filters.projectId) return false;

        // Client
        if (filters.clientId !== "ALL" && task.clientId !== filters.clientId) return false;

        // Priority
        if (filters.priority !== "ALL" && task.priority !== filters.priority) return false;

        // Tag
        if (filters.tag !== "ALL" && (!task.tags || !task.tags.includes(filters.tag as TagSlug)))
          return false;

        // Due Range
        if (filters.dueRange === "OVERDUE") {
          if (!isOverdue(task.dueDate, task.status)) return false;
        } else if (filters.dueRange === "TODAY") {
          if (!isDueToday(task.dueDate)) return false;
        } else if (filters.dueRange === "NO_DATE") {
          if (task.dueDate !== null) return false;
        } else if (filters.dueRange === "THIS_WEEK") {
          if (!task.dueDate) return false;
          const now = new Date();
          const target = new Date(task.dueDate);
          const diffDays = (target.getTime() - now.getTime()) / (1000 * 3600 * 24);
          if (diffDays < 0 || diffDays > 7) return false;
        } else if (filters.dueRange === "NEXT_WEEK") {
          if (!task.dueDate) return false;
          const now = new Date();
          const target = new Date(task.dueDate);
          const diffDays = (target.getTime() - now.getTime()) / (1000 * 3600 * 24);
          if (diffDays < 7 || diffDays > 14) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "priority_desc") {
          const weight: Record<TaskPriority, number> = {
            URGENT: 4,
            HIGH: 3,
            MEDIUM: 2,
            LOW: 1,
          };
          return weight[b.priority] - weight[a.priority];
        }
        if (sortBy === "due_asc") {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        if (sortBy === "title_asc") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "recent") {
          return b.createdAt.localeCompare(a.createdAt);
        }
        return 0;
      });
  }, [tasks, searchQuery, filters, sortBy, projects, members]);

  // Selected Task
  const selectedTask = useMemo(
    () => tasks.find((t) => t.id === selectedTaskId) ?? null,
    [tasks, selectedTaskId],
  );

  const selectedTaskProject = useMemo(
    () => (selectedTask ? projects.find((p) => p.id === selectedTask.projectId) : undefined),
    [selectedTask, projects],
  );

  const selectedTaskClient = useMemo(
    () => (selectedTask ? clients.find((c) => c.id === selectedTask.clientId) : undefined),
    [selectedTask, clients],
  );

  // Task Being Edited
  const editingTask = useMemo(
    () => (editingTaskId ? (tasks.find((t) => t.id === editingTaskId) ?? null) : null),
    [tasks, editingTaskId],
  );

  // Quick handlers
  const handleQuickAddTask = useCallback((status: TaskStatus) => {
    setCreateInitialStatus(status);
    setCreateInitialProjectId(undefined);
    setIsCreateTaskOpen(true);
  }, []);

  const handleOpenEdit = useCallback((task: Task) => {
    setEditingTaskId(task.id);
    setIsEditTaskOpen(true);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden w-full bg-[#080A0F] text-[#F5F7FA] font-sans antialiased select-none">
      {/* 1. Operations Header */}
      <OperationsHeader
        onNewTask={() => {
          setCreateInitialStatus("TODO");
          setIsCreateTaskOpen(true);
        }}
        onNewProject={() => setIsCreateProjectOpen(true)}
        onOpenMobileSidebar={() => {}}
        notifications={notifications}
      />

      {/* Scrollable Center Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        {/* 3. Fast Metrics Row */}
        <OperationsMetrics
          tasks={tasks}
          projectsCount={projects.length}
          teamCount={members.length}
          onFilterStatus={(st) =>
            setFilters((f) => ({ ...f, status: (st as TaskStatus) ?? "ALL" }))
          }
          onFilterOverdue={() => setFilters((f) => ({ ...f, dueRange: "OVERDUE" }))}
        />

        {/* 4. Attention Panel (Overdue, Due Today, Awaiting Approval) */}
        <AttentionPanel
          tasks={tasks}
          projects={projects}
          members={members}
          onSelectTask={(task) => setSelectedTaskId(task.id)}
        />

        {/* 5. Project Progress Overview */}
        <ProjectProgress
          projects={projects}
          tasks={tasks}
          clients={clients}
          onSelectProject={(projId) => {
            setFilters((f) => ({ ...f, projectId: projId }));
          }}
        />

        {/* 6. Operations Toolbar (Search, Advanced Filters, Quick selects, View switcher) */}
        <OperationsToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewChange={setViewMode}
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={() => {
            setFilters(INITIAL_FILTERS);
            setSearchQuery("");
          }}
          activeFilterCount={activeFilterCount}
          sortBy={sortBy}
          onSortChange={setSortBy}
          projects={projects}
          members={members}
          clients={clients}
        />

        {/* 7. Main View Canvas (Kanban or List or Empty State) */}
        {filteredTasks.length === 0 ? (
          <EmptyState
            hasActiveFilters={activeFilterCount > 0 || !!searchQuery}
            onResetFilters={() => {
              setFilters(INITIAL_FILTERS);
              setSearchQuery("");
            }}
            onNewTask={() => {
              setCreateInitialStatus("TODO");
              setIsCreateTaskOpen(true);
            }}
          />
        ) : viewMode === "kanban" ? (
          <KanbanBoard
            tasks={filteredTasks}
            projects={projects}
            members={members}
            onSelectTask={(task) => setSelectedTaskId(task.id)}
            onEditTask={handleOpenEdit}
            onMoveTask={moveTaskStatus}
            onAssigneeChange={updateTaskAssignee}
            onDuplicateTask={duplicateTask}
            onArchiveTask={archiveTask}
            onDeleteTask={deleteTask}
            onQuickAddTask={handleQuickAddTask}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            projects={projects}
            members={members}
            onSelectTask={(task) => setSelectedTaskId(task.id)}
            onEditTask={handleOpenEdit}
            onMoveTask={moveTaskStatus}
            onDuplicateTask={duplicateTask}
            onArchiveTask={archiveTask}
            onDeleteTask={deleteTask}
          />
        )}
      </main>

      {/* 8. Slide-over Task Details Drawer */}
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          project={selectedTaskProject}
          client={selectedTaskClient}
          members={members}
          onClose={() => setSelectedTaskId(null)}
          onEdit={handleOpenEdit}
          onMoveStatus={moveTaskStatus}
          onUpdatePriority={updateTaskPriority}
          onUpdateAssignee={updateTaskAssignee}
          onUpdateDueDate={updateTaskDueDate}
          onToggleChecklist={toggleChecklistItem}
          onAddChecklistItem={addChecklistItem}
          onAddComment={addComment}
          onAddAttachment={addAttachment}
          onApprove={approveTask}
          onRequestChanges={requestTaskChanges}
        />
      )}

      {/* 9. Create Task Modal */}
      <TaskCreateModal
        isOpen={isCreateTaskOpen}
        initialStatus={createInitialStatus}
        initialProjectId={createInitialProjectId}
        projects={projects}
        clients={clients}
        members={members}
        onClose={() => setIsCreateTaskOpen(false)}
        onCreate={createTask}
      />

      {/* 10. Edit Task Modal */}
      <TaskEditModal
        isOpen={isEditTaskOpen}
        task={editingTask}
        projects={projects}
        members={members}
        onClose={() => {
          setIsEditTaskOpen(false);
          setEditingTaskId(null);
        }}
        onSave={updateTaskData}
      />

      {/* 11. Create Project Modal */}
      <ProjectCreateModal
        isOpen={isCreateProjectOpen}
        clients={clients}
        onClose={() => setIsCreateProjectOpen(false)}
        onCreate={createProject}
      />
    </div>
  );
}
