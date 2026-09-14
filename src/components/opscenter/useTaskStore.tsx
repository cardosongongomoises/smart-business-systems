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
import {
  Client,
  Member,
  Project,
  Task,
  TaskStatus,
  TaskPriority,
  STATUS_META,
  PRIORITY_META,
} from "./types";

const STORAGE_KEY = "ad_ops_tasks_v2";
const PROJECTS_STORAGE_KEY = "ad_ops_projects_v2";
const CLIENTS_STORAGE_KEY = "ad_ops_clients_v2";
const CURRENT_USER = "m1";

export interface TaskStoreValue {
  tasks: Task[];
  members: Member[];
  clients: Client[];
  projects: Project[];
  currentUserId: string;
  createTask: (task: Task) => void;
  updateTask: (id: string, patch: Partial<Task>, activityText?: string) => void;
  updateTaskData: (id: string, patch: Partial<Task>) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  moveTaskStatus: (id: string, status: TaskStatus) => void;
  updateTaskPriority: (id: string, priority: TaskPriority) => void;
  updateTaskAssignee: (id: string, assigneeId: string) => void;
  updateTaskDueDate: (id: string, dueDate: string | null) => void;
  deleteTask: (id: string) => void;
  archiveTask: (id: string) => void;
  duplicateTask: (id: string) => void;
  approveTask: (id: string) => void;
  requestTaskChanges: (id: string, note: string) => void;
  addComment: (id: string, text: string) => void;
  toggleChecklistItem: (id: string, itemId: string) => void;
  addChecklistItem: (id: string, text: string) => void;
  addAttachment: (id: string, name: string, size: string) => void;
  createProject: (project: Project, newClient?: Client) => void;
  createClient: (client: Client) => void;
}

const TaskStoreContext = createContext<TaskStoreValue | null>(null);

export function nowIso() {
  return new Date().toISOString();
}

export function TaskStoreProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [clientList, setClientList] = useState<Client[]>([]);

  useEffect(() => {
    try {
      // Purge old mock storage keys
      localStorage.removeItem("ad_ops_tasks_v1");
      localStorage.removeItem("ad_ops_projects_v1");

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Exclude any legacy mock tasks
          const validTasks = parsed.filter(
            (t: Task) => t && t.id && !/^t([1-9]|1\d|2[0-2])$/.test(t.id),
          );
          setTasks(validTasks);
        }
      }

      const rawProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (rawProjects) {
        const parsedProjects = JSON.parse(rawProjects);
        if (Array.isArray(parsedProjects)) {
          // Exclude any legacy mock projects
          const validProjects = parsedProjects.filter(
            (p: Project) => p && p.id && !/^p[1-8]$/.test(p.id),
          );
          setProjectList(validProjects);
        }
      }

      const rawClients = localStorage.getItem(CLIENTS_STORAGE_KEY);
      if (rawClients) {
        const parsedClients = JSON.parse(rawClients);
        if (Array.isArray(parsedClients)) {
          setClientList(parsedClients);
        }
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

  useEffect(() => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projectList));
    } catch {
      /* ignore */
    }
  }, [projectList]);

  useEffect(() => {
    try {
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clientList));
    } catch {
      /* ignore */
    }
  }, [clientList]);

  const patchTask = useCallback((id: string, patch: Partial<Task>, activityText?: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const activity = activityText
          ? [{ id: `act-${Date.now()}`, text: activityText, at: nowIso() }, ...task.activity]
          : task.activity;
        return { ...task, ...patch, activity, updatedAt: nowIso() };
      }),
    );
  }, []);

  const value = useMemo<TaskStoreValue>(
    () => ({
      tasks,
      members,
      clients: clientList,
      projects: projectList,
      currentUserId: CURRENT_USER,
      createTask: (task) => setTasks((prev) => [task, ...prev]),
      createProject: (project, newClient) => {
        setProjectList((prev) => [project, ...prev]);
        if (newClient) {
          setClientList((prev) => {
            if (
              prev.some(
                (c) =>
                  c.id === newClient.id || c.name.toLowerCase() === newClient.name.toLowerCase(),
              )
            ) {
              return prev;
            }
            return [...prev, newClient];
          });
        }
      },
      createClient: (client) => {
        setClientList((prev) => {
          if (
            prev.some(
              (c) => c.id === client.id || c.name.toLowerCase() === client.name.toLowerCase(),
            )
          ) {
            return prev;
          }
          return [...prev, client];
        });
      },
      updateTask: patchTask,
      updateTaskData: (id, patch) => {
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        patchTask(id, patch, `${me} actualizou os dados da tarefa`);
      },
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
      moveTaskStatus: (id, status) => {
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
      updateTaskPriority: (id, priority) => {
        const meta = PRIORITY_META[priority];
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        patchTask(id, { priority }, `${me} alterou a prioridade para ${meta.label}`);
      },
      updateTaskAssignee: (id, assigneeId) => {
        const member = members.find((m) => m.id === assigneeId);
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        patchTask(
          id,
          { assigneeId },
          `${me} atribuiu a tarefa a ${member?.name ?? "novo responsável"}`,
        );
      },
      updateTaskDueDate: (id, dueDate) => {
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        patchTask(id, { dueDate }, `${me} actualizou o prazo da tarefa`);
      },
      deleteTask: (id) => setTasks((prev) => prev.filter((t) => t.id !== id)),
      archiveTask: (id) => {
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: "DONE" as TaskStatus,
                  activity: [
                    { id: `act-${Date.now()}`, text: `${me} arquivou a tarefa`, at: nowIso() },
                    ...t.activity,
                  ],
                  updatedAt: nowIso(),
                }
              : t,
          ),
        );
      },
      approveTask: (id) => {
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  needsApproval: false,
                  status: "DONE" as TaskStatus,
                  activity: [
                    {
                      id: `act-${Date.now()}`,
                      text: `${me} aprovou a entrega com sucesso`,
                      at: nowIso(),
                    },
                    ...t.activity,
                  ],
                  updatedAt: nowIso(),
                }
              : t,
          ),
        );
      },
      requestTaskChanges: (id, note) => {
        const me = members.find((m) => m.id === CURRENT_USER)?.name ?? "Utilizador";
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: "IN_PROGRESS" as TaskStatus,
                  comments: [
                    ...t.comments,
                    {
                      id: `cm-${Date.now()}`,
                      authorId: CURRENT_USER,
                      text: `[Alterações Solicitadas]: ${note}`,
                      createdAt: nowIso(),
                    },
                  ],
                  activity: [
                    {
                      id: `act-${Date.now()}`,
                      text: `${me} solicitou alterações: "${note}"`,
                      at: nowIso(),
                    },
                    ...t.activity,
                  ],
                  updatedAt: nowIso(),
                }
              : t,
          ),
        );
      },
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
                    {
                      id: `act-${Date.now()}`,
                      text: `${me} adicionou um comentário`,
                      at: nowIso(),
                    },
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
                  checklist: [...task.checklist, { id: `ck-${Date.now()}`, text, done: false }],
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
    [tasks, projectList, clientList, patchTask],
  );

  return <TaskStoreContext.Provider value={value}>{children}</TaskStoreContext.Provider>;
}

const defaultStoreValue: TaskStoreValue = {
  tasks: [],
  members,
  clients: [],
  projects: [],
  currentUserId: CURRENT_USER,
  createTask: () => {},
  createProject: () => {},
  createClient: () => {},
  updateTask: () => {},
  updateTaskData: () => {},
  moveTask: () => {},
  moveTaskStatus: () => {},
  updateTaskPriority: () => {},
  updateTaskAssignee: () => {},
  updateTaskDueDate: () => {},
  deleteTask: () => {},
  archiveTask: () => {},
  duplicateTask: () => {},
  approveTask: () => {},
  requestTaskChanges: () => {},
  addComment: () => {},
  toggleChecklistItem: () => {},
  addChecklistItem: () => {},
  addAttachment: () => {},
};

export function useTaskStore(): TaskStoreValue {
  const ctx = useContext(TaskStoreContext);
  return ctx ?? defaultStoreValue;
}
