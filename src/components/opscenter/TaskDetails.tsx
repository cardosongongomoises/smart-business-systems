import { useState } from "react";
import {
  X,
  Calendar,
  AlertTriangle,
  Clock,
  User,
  Folder,
  Tag,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Edit3,
} from "lucide-react";
import {
  Client,
  Member,
  Project,
  Task,
  TaskPriority,
  TaskStatus,
  PRIORITY_META,
  STATUS_META,
} from "./types";
import { TaskChecklist } from "./TaskChecklist";
import { TaskComments } from "./TaskComments";
import { TaskActivity } from "./TaskActivity";
import { isOverdue } from "./ui-bits";

interface TaskDetailsProps {
  task: Task;
  project?: Project;
  client?: Client;
  members: Member[];
  onClose: () => void;
  onEdit: (task: Task) => void;
  onMoveStatus: (id: string, status: TaskStatus) => void;
  onUpdatePriority: (id: string, priority: TaskPriority) => void;
  onUpdateAssignee: (id: string, assigneeId: string) => void;
  onUpdateDueDate: (id: string, date: string | null) => void;
  onToggleChecklist: (taskId: string, itemId: string) => void;
  onAddChecklistItem: (taskId: string, text: string) => void;
  onAddComment: (taskId: string, text: string) => void;
  onAddAttachment: (taskId: string, name: string, size: string) => void;
  onApprove: (taskId: string) => void;
  onRequestChanges: (taskId: string, note: string) => void;
}

export function TaskDetails({
  task,
  project,
  client,
  members,
  onClose,
  onEdit,
  onMoveStatus,
  onUpdatePriority,
  onUpdateAssignee,
  onUpdateDueDate,
  onToggleChecklist,
  onAddChecklistItem,
  onAddComment,
  onAddAttachment,
  onApprove,
  onRequestChanges,
}: TaskDetailsProps) {
  const [showRequestChangesBox, setShowRequestChangesBox] = useState(false);
  const [changeNotes, setChangeNotes] = useState("");
  const [newAttachmentName, setNewAttachmentName] = useState("");

  const overdue = isOverdue(task.dueDate, task.status);
  const assignee = members.find((m) => m.id === task.assigneeId);
  const statusMeta = STATUS_META[task.status];
  const priorityMeta = PRIORITY_META[task.priority];

  const handleSendChangeRequest = () => {
    if (!changeNotes.trim()) return;
    onRequestChanges(task.id, changeNotes.trim());
    setChangeNotes("");
    setShowRequestChangesBox(false);
  };

  const handleAddAttachment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttachmentName.trim()) return;
    onAddAttachment(task.id, newAttachmentName.trim(), "2.4 MB");
    setNewAttachmentName("");
  };

  return (
    <aside
      aria-label="Painel de detalhes da tarefa"
      className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-[#252C38] bg-[#0E121A] shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#252C38] px-6 py-4 bg-[#151A23]/60">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: statusMeta.color }} />
          <span className="text-xs font-bold uppercase tracking-wider text-[#A7B0BF]">
            {project ? project.name : "Operação Agentes Digital"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            title="Editar dados da tarefa"
            className="flex size-8 items-center justify-center rounded-lg border border-[#252C38] bg-[#151A23] text-[#A7B0BF] hover:border-[#3B82F6] hover:text-white transition-colors"
          >
            <Edit3 className="size-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Fechar (Esc)"
            className="flex size-8 items-center justify-center rounded-lg border border-[#252C38] bg-[#151A23] text-[#A7B0BF] hover:border-[#EF4444] hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Main scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-lg font-bold text-[#F5F7FA] leading-snug">{task.title}</h2>
          {client && (
            <p className="mt-1 text-xs text-[#667085]">
              Cliente: <span className="text-[#A7B0BF] font-semibold">{client.name}</span>
            </p>
          )}
        </div>

        {/* Approval Card if in Review or needsApproval */}
        {(task.needsApproval || task.status === "REVIEW") && (
          <div className="rounded-[12px] border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#8B5CF6]">
                <Sparkles className="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Validação & Aprovação Necessária
                </span>
              </div>
              <span className="rounded-full bg-[#8B5CF6]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#8B5CF6]">
                Aguardando Decisão
              </span>
            </div>
            <p className="text-xs text-[#A7B0BF] leading-relaxed">
              Esta tarefa foi submetida pela equipa e requer validação da liderança ou cliente antes
              de ser movida para concluída.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onApprove(task.id)}
                className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#22C55E] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#16A34A] transition-all"
              >
                <CheckCircle2 className="size-3.5" />
                <span>Aprovar Entrega</span>
              </button>

              <button
                type="button"
                onClick={() => setShowRequestChangesBox(!showRequestChangesBox)}
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#8B5CF6]/50 bg-[#151A23] px-3.5 py-1.5 text-xs font-semibold text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-all"
              >
                <AlertCircle className="size-3.5" />
                <span>Solicitar Alterações</span>
              </button>
            </div>

            {/* Request changes note input */}
            {showRequestChangesBox && (
              <div className="mt-3 space-y-2 rounded-[8px] border border-[#252C38] bg-[#0E121A] p-3 animate-in fade-in-20">
                <label className="block text-[11px] font-semibold text-[#A7B0BF]">
                  Descreva as correções necessárias:
                </label>
                <textarea
                  rows={2}
                  value={changeNotes}
                  onChange={(e) => setChangeNotes(e.target.value)}
                  placeholder="Ex: Ajustar o botão no mobile e corrigir o texto..."
                  className="w-full resize-none rounded-[6px] border border-[#252C38] bg-[#151A23] p-2 text-xs text-[#F5F7FA] placeholder-[#667085] focus:border-[#8B5CF6] focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestChangesBox(false)}
                    className="rounded px-2.5 py-1 text-xs text-[#667085] hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSendChangeRequest}
                    disabled={!changeNotes.trim()}
                    className="rounded-[6px] bg-[#8B5CF6] px-3 py-1 text-xs font-semibold text-white hover:bg-[#7C3AED] disabled:opacity-50"
                  >
                    Enviar solicitação
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-2 gap-4 rounded-[12px] border border-[#252C38] bg-[#151A23]/50 p-4">
          {/* Status */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#667085] mb-1">
              Status da Tarefa
            </span>
            <select
              value={task.status}
              onChange={(e) => onMoveStatus(task.id, e.target.value as TaskStatus)}
              className="w-full rounded-[6px] border border-[#252C38] bg-[#0E121A] px-2.5 py-1.5 text-xs font-semibold text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none cursor-pointer"
              style={{ color: statusMeta.color }}
            >
              {Object.entries(STATUS_META).map(([st, m]) => (
                <option key={st} value={st} className="bg-[#0E121A] text-[#F5F7FA]">
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#667085] mb-1">
              Prioridade
            </span>
            <select
              value={task.priority}
              onChange={(e) => onUpdatePriority(task.id, e.target.value as TaskPriority)}
              className="w-full rounded-[6px] border border-[#252C38] bg-[#0E121A] px-2.5 py-1.5 text-xs font-semibold text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none cursor-pointer"
              style={{ color: priorityMeta.color }}
            >
              <option value="LOW" className="bg-[#0E121A] text-[#667085]">
                ● Baixa
              </option>
              <option value="MEDIUM" className="bg-[#0E121A] text-[#3B82F6]">
                ● Média
              </option>
              <option value="HIGH" className="bg-[#0E121A] text-[#8B5CF6]">
                ● Alta
              </option>
              <option value="URGENT" className="bg-[#0E121A] text-[#EF4444]">
                ● Urgente
              </option>
            </select>
          </div>

          {/* Assignee */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#667085] mb-1">
              Responsável
            </span>
            <select
              value={task.assigneeId ?? ""}
              onChange={(e) => onUpdateAssignee(task.id, e.target.value)}
              className="w-full rounded-[6px] border border-[#252C38] bg-[#0E121A] px-2.5 py-1.5 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none cursor-pointer"
            >
              <option value="">Não atribuído</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role})
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#667085] mb-1">
              Prazo de Entrega
            </span>
            <div className="relative">
              <input
                type="date"
                value={task.dueDate ?? ""}
                onChange={(e) => onUpdateDueDate(task.id, e.target.value || null)}
                className={`w-full rounded-[6px] border bg-[#0E121A] px-2.5 py-1.5 text-xs focus:outline-none cursor-pointer ${
                  overdue
                    ? "border-[#EF4444] text-[#EF4444] font-bold"
                    : "border-[#252C38] text-[#F5F7FA] focus:border-[#3B82F6]"
                }`}
              />
              {overdue && (
                <span className="mt-1 block text-[10px] font-semibold text-[#EF4444]">
                  ⚠ Prazo expirado
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#A7B0BF] mb-2">
            Descrição da Demanda
          </h4>
          <div className="rounded-[8px] border border-[#252C38] bg-[#151A23]/40 p-3 text-xs text-[#A7B0BF] leading-relaxed whitespace-pre-line">
            {task.description || (
              <span className="text-[#667085] italic">Nenhuma descrição informada.</span>
            )}
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A7B0BF] mb-2">
              Tags & Categorias
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#252C38] bg-[#151A23] px-2.5 py-1 text-xs text-[#F5F7FA]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attachments Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A7B0BF]">
              <Paperclip className="size-3.5" />
              <span>Anexos ({task.attachments.length})</span>
            </h4>
          </div>

          <div className="space-y-1.5">
            {task.attachments.map((at) => (
              <div
                key={at.id}
                className="flex items-center justify-between rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA]"
              >
                <div className="flex items-center gap-2 truncate">
                  <Paperclip className="size-3.5 text-[#3B82F6] shrink-0" />
                  <span className="truncate">{at.name}</span>
                </div>
                <span className="font-mono text-[10px] text-[#667085]">{at.size}</span>
              </div>
            ))}
          </div>

          {/* Quick upload simulator */}
          <form onSubmit={handleAddAttachment} className="mt-2 flex items-center gap-2">
            <input
              type="text"
              value={newAttachmentName}
              onChange={(e) => setNewAttachmentName(e.target.value)}
              placeholder="Nome do arquivo para anexar..."
              className="flex-1 rounded-[6px] border border-[#252C38] bg-[#0E121A] px-2.5 py-1 text-xs text-[#F5F7FA] placeholder-[#667085] focus:border-[#3B82F6] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!newAttachmentName.trim()}
              className="rounded-[6px] bg-[#252C38] px-3 py-1 text-xs font-semibold text-[#F5F7FA] hover:bg-[#3B82F6] hover:text-white disabled:opacity-40 transition-colors"
            >
              Anexar
            </button>
          </form>
        </div>

        {/* Checklist */}
        <div className="border-t border-[#252C38] pt-5">
          <TaskChecklist
            items={task.checklist}
            onToggle={(itemId) => onToggleChecklist(task.id, itemId)}
            onAdd={(text) => onAddChecklistItem(task.id, text)}
          />
        </div>

        {/* Comments */}
        <div className="border-t border-[#252C38] pt-5">
          <TaskComments
            comments={task.comments}
            members={members}
            onAddComment={(text) => onAddComment(task.id, text)}
          />
        </div>

        {/* Activity history */}
        <div className="border-t border-[#252C38] pt-5">
          <TaskActivity activity={task.activity} />
        </div>
      </div>
    </aside>
  );
}
