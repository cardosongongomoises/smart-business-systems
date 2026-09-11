import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ALL_TAGS, Member, Project, TagSlug, Task, TaskPriority, TaskStatus } from "./types";

interface TaskEditModalProps {
  isOpen: boolean;
  task: Task | null;
  projects: Project[];
  members: Member[];
  onClose: () => void;
  onSave: (id: string, patch: Partial<Task>) => void;
}

export function TaskEditModal({
  isOpen,
  task,
  projects,
  members,
  onClose,
  onSave,
}: TaskEditModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagSlug[]>([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setProjectId(task.projectId);
      setAssigneeId(task.assigneeId ?? "");
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate ?? "");
      setSelectedTags(task.tags ?? []);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const toggleTag = (tag: TagSlug) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;

    onSave(task.id, {
      title: title.trim(),
      description: description.trim(),
      projectId,
      assigneeId: assigneeId || "",
      status,
      priority,
      dueDate: dueDate || null,
      tags: selectedTags,
      needsApproval: status === "REVIEW",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-20">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[16px] border border-[#252C38] bg-[#0E121A] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#252C38] px-6 py-4 bg-[#151A23]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F7FA]">
              Editar Tarefa Operacional
            </h3>
            <p className="text-xs text-[#A7B0BF]">Atualize os parâmetros e dados da demanda</p>
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
              className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
            />
          </div>

          {/* Project & Assignee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Projeto</label>
              <select
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
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Status</label>
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
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Prazo</label>
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
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">Tags</label>
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
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Descrição</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-[8px] border border-[#252C38] bg-[#151A23] p-2.5 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252C38]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[8px] border border-[#252C38] bg-[#151A23] px-4 py-2 text-xs font-semibold text-[#A7B0BF] hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-[8px] bg-[#3B82F6] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#2563EB]"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
