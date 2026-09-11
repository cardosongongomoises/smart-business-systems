import { useState } from "react";
import { X, FolderPlus } from "lucide-react";
import { Client, Project } from "./types";

interface ProjectCreateModalProps {
  isOpen: boolean;
  clients: Client[];
  onClose: () => void;
  onCreate: (project: Project) => void;
}

export function ProjectCreateModal({
  isOpen,
  clients,
  onClose,
  onCreate,
}: ProjectCreateModalProps) {
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [dueDate, setDueDate] = useState("2026-11-30");
  const [budget, setBudget] = useState("Kz 2.500.000");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      clientId,
      dueDate,
      budget: budget.trim() || "Interno",
    };

    onCreate(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-20">
      <div className="relative w-full max-w-lg rounded-[16px] border border-[#252C38] bg-[#0E121A] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#252C38] px-6 py-4 bg-[#151A23]">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#3B82F6]">
              <FolderPlus className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F7FA]">
                Novo Projeto Corporativo
              </h3>
              <p className="text-xs text-[#A7B0BF]">Cadastre um novo projeto operacional</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#667085] hover:bg-[#252C38] hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
              Nome do Projeto <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Agente Comercial IA — Banco Sol"
              className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] placeholder-[#667085] focus:border-[#3B82F6] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
              Cliente <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Prazo Estimado
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Orçamento Previsto
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ex: Kz 3.500.000"
                className="w-full rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 py-2 text-xs text-[#F5F7FA] focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
          </div>

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
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
