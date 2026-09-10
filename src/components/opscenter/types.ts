export type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TagSlug =
  | "Website"
  | "IA"
  | "Automação"
  | "Sistema"
  | "Design"
  | "Marketing"
  | "Cliente"
  | "Interno"
  | "Bug"
  | "Urgente";

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface TaskComment {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface TaskAttachment {
  id: string;
  name: string;
  size: string;
}

export interface ActivityEntry {
  id: string;
  text: string;
  at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  clientId: string;
  assigneeId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null; // ISO yyyy-mm-dd
  tags: TagSlug[];
  checklist: ChecklistItem[];
  comments: TaskComment[];
  attachments: TaskAttachment[];
  activity: ActivityEntry[];
  needsApproval?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface Client {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  dueDate: string;
  budget: string;
}

export type ViewMode = "kanban" | "list";

export const STATUS_ORDER: TaskStatus[] = ["BACKLOG", "TODO", "IN_PROGRESS", "REVIEW", "DONE"];

export const STATUS_META: Record<TaskStatus, { label: string; color: string }> = {
  BACKLOG: { label: "BACKLOG", color: "#667085" },
  TODO: { label: "A FAZER", color: "#A7B0BF" },
  IN_PROGRESS: { label: "EM ANDAMENTO", color: "#3B82F6" },
  REVIEW: { label: "EM REVISÃO", color: "#8B5CF6" },
  DONE: { label: "CONCLUÍDO", color: "#22C55E" },
};

export const PRIORITY_META: Record<TaskPriority, { label: string; color: string }> = {
  LOW: { label: "BAIXA", color: "#667085" },
  MEDIUM: { label: "MÉDIA", color: "#3B82F6" },
  HIGH: { label: "ALTA", color: "#8B5CF6" },
  URGENT: { label: "URGENTE", color: "#EF4444" },
};

export const ALL_TAGS: TagSlug[] = [
  "Website",
  "IA",
  "Automação",
  "Sistema",
  "Design",
  "Marketing",
  "Cliente",
  "Interno",
  "Bug",
  "Urgente",
];
