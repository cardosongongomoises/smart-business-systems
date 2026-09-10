import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { clients, members, projects, seedTasks } from "./seedData";
import { Task, TaskStatus, STATUS_META } from "./types";

const STORAGE_KEY = "ad_ops_tasks_v1";
const CURRENT_USER = "m1";

interface TaskStoreValue {
  tasks: Task[];
  members: typeof members;
  clients: typeof clients;
  projects: typeof projects;
  currentUserId: string;
  createTask: (task: Task) => void;
  updateTask: (id: string, patch: Partial<Task>, activityText?: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  duplicateTask: (id: string) => void;
  addComment: (id: string, text: string) => void;
  toggleChecklistItem: (id: string, itemId: string) => void;
  addChecklistItem: (id: string, text: string) => void;
  addAttachment: (id: string, name: string, size: string) => void;
}

const TaskStoreContext = createContext<TaskStoreValue | null>(null);

export function nowIso() {
  return new Date().toISOString();
}

export function TaskStoreProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) setTasks(parsed as Task[]);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* ignore */
    }
  }, [tasks]);

  const patchTask = useCallback(
    (id: string, patch: Partial<Task>, activityText?: string) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) return task;
          const activity = activityText
            ? [
                { id: `act-${Date.now()}`, text: activityText, at: nowIso() },
                ...task.activity,
              ]
            : task.activity;
          return { ...task, ...patch, activity, updatedAt: nowIso() };
        }),
      );
    },
    [],
  );

  const value = useMemo<TaskStoreValue>(
    () => ({
      tasks,
      members,
      clients,
      projects,
      currentUserId: CURRENT_USER,
      createTask: (task) => setTasks((prev) => [task, ...prev]),
      updateTask: patchTask,
      moveTask: (id, status) => {
        setTasks((prev) =>
          prev.map((task) => {
            if (task.id !== id || task.status === status) return task;
            const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
            return {
              ...task,
              status,
              updatedAt: nowIso(),
              activity: [
                {
                  id: `act-${Date.now()}`,
                  text: `${me} moveu "${task.title}" de ${STATUS_META[task.status].label} para ${STATUS_META[status].label}`,
                  at: nowIso(),
                },
                ...task.activity,
              ],
            };
          }),
        );
      },
      deleteTask: (id) => setTasks((prev) => prev.filter((t) => t.id !== id)),
      duplicateTask: (id) =>
        setTasks((prev) => {
          const original = prev.find((t) => t.id === id);
          if (!original) return prev;
          const copy: Task = {
            ...original,
            id: `t-${Date.now()}`,
            title: `${original.title} (cópia)`,
            comments: [],
            activity: [{ id: `act-${Date.now()}`, text: "Tarefa duplicada", at: nowIso() }],
            createdAt: nowIso(),
            updatedAt: nowIso(),
          };
          return [copy, ...prev];
        }),
      addComment: (id, text) => {
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  comments: [
                    ...task.comments,
                    { id: `cm-${Date.now()}`, authorId: CURRENT_USER, text, createdAt: nowIso() },
                  ],
                  activity: [
                    { id: `act-${Date.now()}`, text: `${me} adicionou um comentário`, at: nowIso() },
                    ...task.activity,
                  ],
                  updatedAt: nowIso(),
                }
              : task,
          ),
        );
      },
      toggleChecklistItem: (id, itemId) =>
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  checklist: task.checklist.map((item) =>
                    item.id === itemId ? { ...item, done: !item.done } : item,
                  ),
                  updatedAt: nowIso(),
                }
              : task,
          ),
        ),
      addChecklistItem: (id, text) =>
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  checklist: [
                    ...task.checklist,
                    { id: `ck-${Date.now()}`, text, done: false },
                  ],
                }
              : task,
          ),
        ),
      addAttachment: (id, name, size) => {
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  attachments: [...task.attachments, { id: `at-${Date.now()}`, name, size }],
                  activity: [
                    { id: `act-${Date.now()}`, text: `${me} adicionou um arquivo`, at: nowIso() },
                    ...task.activity,
                  ],
                }
              : task,
          ),
        );
      },
    }),
    [tasks, patchTask],
  );

  return <TaskStoreContext.Provider value={value}>{children}</TaskStoreContext.Provider>;
}

export function useTaskStore() {
  const ctx = useContext(TaskStoreContext);
  if (!ctx) throw new Error("useTaskStore deve ser usado dentro de TaskStoreProvider");
  return ctx;
}
