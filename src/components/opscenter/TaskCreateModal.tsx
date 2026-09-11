import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import {
  ALL_TAGS,
  Client,
  Member,
  Project,
  TagSlug,
  Task,
  TaskPriority,
  TaskStatus,
} from "./types";
import { nowIso } from "./useTaskStore";

interface TaskCreateModalProps {
  isOpen: boolean;
  initialStatus?: TaskStatus | undefined;
  initialProjectId?: string | undefined;
  projects: Project[];
  clients: Client[];
  members: Member[];
  onClose: () => void;
  onCreate: (task: Task) => void;
}

export function TaskCreateModal({
  isOpen,
  initialStatus = "TODO",
  initialProjectId,
  projects,
  clients,
  members,
  onClose,
  onCreate,
}: TaskCreateModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(initialProjectId ?? projects[0]?.id ?? "");
  const [assigneeId, setAssigneeId] = useState(members[0]?.id ?? "");
  const [status, setStatus] = useState<TaskStatus>(initialStatus);
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<TagSlug[]>(["Sistema"]);
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [newChecklistText, setNewChecklistText] = useState("");

  if (!isOpen) return null;

  const currentProject = projects.find((p) => p.id === projectId);
  const clientId = currentProject?.clientId ?? clients[0]?.id ?? "";

  const toggleTag = (tag: TagSlug) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const addChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    setChecklistItems((prev) => [...prev, newChecklistText.trim()]);
    setNewChecklistText("");
  };

  const removeChecklistItem = (index: number) => {
    setChecklistItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      projectId,
      clientId,
      assigneeId: assigneeId || "",
      status,
      priority,
      dueDate: dueDate || null,
      tags: selectedTags,
      checklist: checklistItems.map((text, idx) => ({
        id: `ck-${Date.now()}-${idx}`,
        text,
        done: false,
      })),
      comments: [],
      attachments: [],
      activity: [
        {
          id: `act-${Date.now()}`,
          text: "Tarefa criada no Centro de Operações",
          at: nowIso(),
        },
      ],
      needsApproval: status === "REVIEW",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    onCreate(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-20">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[16px] border border-[#252C38] bg-[#0E121A] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#252C38] px-6 py-4 bg-[#151A23]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F7FA]">
              Criar Nova Tarefa Operacional
            </h3>
            <p className="text-xs text-[#A7B0BF]">
              Adicione a demanda ao fluxo da equipa da Agentes Digital
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#667085] hover:bg-[#252C38] hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
              Nome da Tarefa <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Treinar modelo de linguagem para qualificação de leads"
              className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] placeholder-[#667085] focus:border-[#3B82F6] focus:outline-none"
            />
          </div>

          {/* Project & Assignee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Projeto <span className="text-[#EF4444]">*</span>
              </label>
              <select
                required
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Responsável</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
              >
                <option value="">Não atribuído</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status & Priority & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Status Inicial
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="TODO">A Fazer</option>
                <option value="IN_PROGRESS">Em Andamento</option>
                <option value="REVIEW">Em Revisão</option>
                <option value="DONE">Concluído</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Prioridade</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
              >
                <option value="LOW">● Baixa</option>
                <option value="MEDIUM">● Média</option>
                <option value="HIGH">● Alta</option>
                <option value="URGENT">● Urgente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Prazo de Entrega
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
              Tags & Especialidades
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      isSelected
                        ? "bg-[#3B82F6] text-white shadow-sm"
                        : "bg-[#151A23] text-[#A7B0BF] border border-[#252C38] hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
              Descrição Detalhada
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Instruções operacionais, escopo e requisitos técnicos..."
              className="w-full resize-none rounded-[8px] border border-[#252C38] bg-[#151A23] p-2.5 text-xs text-[#F5F7FA] placeholder-[#667085] focus:border-[#3B82F6] focus:outline-none"
            />
          </div>

          {/* Checklist creation */}
          <div>
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
              Checklist Inicial
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChecklistItem();
                  }
                }}
                placeholder="Item da checklist... (Enter para adicionar)"
                className="flex-1 rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-1.5 text-xs text-[#F5F7FA] placeholder-[#667085] focus:border-[#3B82F6] focus:outline-none"
              />
              <button
                type="button"
                onClick={addChecklistItem}
                className="rounded-[8px] bg-[#252C38] px-3 py-1.5 text-xs font-semibold text-[#F5F7FA] hover:bg-[#3B82F6] hover:text-white"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            {checklistItems.length > 0 && (
              <div className="mt-2 space-y-1">
                {checklistItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-[6px] border border-[#252C38] bg-[#151A23] px-2.5 py-1 text-xs text-[#F5F7FA]"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeChecklistItem(idx)}
                      className="text-[#667085] hover:text-[#EF4444]"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252C38]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[8px] border border-[#252C38] bg-[#151A23] px-4 py-2 text-xs font-semibold text-[#A7B0BF] hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-[8px] bg-[#3B82F6] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#2563EB] active:scale-[0.98] transition-all"
            >
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
