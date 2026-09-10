import { useState } from "react";
import { X, Bot, Sparkles, UserPlus } from "lucide-react";
import { Lead, LeadStatus, LeadChannel } from "./types";

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateLead: (lead: Lead) => void;
}

export function NewLeadModal({ isOpen, onClose, onCreateLead }: NewLeadModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState<LeadChannel>("whatsapp");
  const [packageInterest, setPackageInterest] = useState<Lead["packageInterest"]>("Domínio IA");
  const [autoAiQualify, setAutoAiQualify] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      company: company.trim() || "Empresa a confirmar",
      role: "Responsável Comercial",
      phone: phone.trim(),
      email: email.trim() || "contacto@empresa.pt",
      channel,
      status: autoAiQualify ? "qualificado" : "novo",
      packageInterest,
      aiQualified: autoAiQualify,
      qualificationScore: autoAiQualify ? Math.floor(Math.random() * 20) + 80 : 50,
      estimatedValue:
        packageInterest === "Domínio IA"
          ? "Kz 700.000"
          : packageInterest === "Autoridade"
            ? "Kz 450.000"
            : packageInterest === "Profissional"
              ? "Kz 250.000"
              : "Kz 125.000",
      firstContactAt: "Agora mesmo",
      lastActive: "há 1m",
      aiProcessingStatus: "ativo",
      appointments: [],
      notes: [
        {
          id: `note-${Date.now()}`,
          author: "Operador Comercial",
          text: `Lead inserido manualmente via Centro de Operações com interesse no pacote ${packageInterest}.`,
          createdAt: "Agora mesmo",
        },
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: "capture",
          title: "Lead cadastrado manualmente",
          description: `Registado pelo painel operacional via canal ${channel}`,
          timestamp: "Agora mesmo",
        },
        ...(autoAiQualify
          ? [
              {
                id: `act-ai-${Date.now()}`,
                type: "ai_qualification" as const,
                title: "IA Qualificou Automaticamente",
                description: `Score de Qualificação 88/100 atribuído pela IA para ${packageInterest}`,
                timestamp: "Agora mesmo",
              },
            ]
          : []),
      ],
      conversation: [
        {
          id: `msg-init-${Date.now()}`,
          sender: "client",
          text: `Olá! Tenho interesse no pacote ${packageInterest} para a empresa ${company || "minha empresa"}. Podem apresentar uma proposta?`,
          timestamp: new Date().toLocaleTimeString("pt-PT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        {
          id: `msg-resp-${Date.now()}`,
          sender: "ai",
          text: `Olá ${name}! Obrigado pelo contacto. O Agente IA da Agentes Digital já identificou o seu perfil de negócio e preparou o pré-diagnóstico para o pacote ${packageInterest}.`,
          timestamp: new Date().toLocaleTimeString("pt-PT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    onCreateLead(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#252C38]">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-[8px] bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6]">
              <UserPlus className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Novo Lead Manual</h3>
              <p className="text-[11px] text-[#A7B0BF]">
                Cadastre um lead e inicie a qualificação automatizada
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-[6px] text-[#667085] hover:text-[#F5F7FA] hover:bg-[#252C38] flex items-center justify-center transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block text-[#A7B0BF] mb-1 font-semibold">Nome do Contacto *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Dr. Vasco Ribeiro"
              className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#A7B0BF] mb-1 font-semibold">Empresa / Negócio</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Ribeiro Advocacia"
                className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-[#A7B0BF] mb-1 font-semibold">
                Telefone / WhatsApp *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: +351 912 345 678"
                className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#A7B0BF] mb-1 font-semibold">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: vasco@ribeiro.pt"
                className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-[#A7B0BF] mb-1 font-semibold">Canal de Origem</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as LeadChannel)}
                className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="whatsapp">WhatsApp Direto</option>
                <option value="website">Website Oficial</option>
                <option value="google">Google / Tráfego Pago</option>
                <option value="email">E-mail Corporativo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#A7B0BF] mb-1 font-semibold">Pacote de Interesse</label>
            <select
              value={packageInterest}
              onChange={(e) => setPackageInterest(e.target.value as Lead["packageInterest"])}
              className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="Presença">Presença (Kz 125.000)</option>
              <option value="Profissional">Profissional ⭐ Mais Escolhido (Kz 250.000)</option>
              <option value="Autoridade">Autoridade (Kz 450.000)</option>
              <option value="Domínio IA">Domínio IA (Kz 700.000)</option>
            </select>
          </div>

          {/* AI Qualification Toggle */}
          <div className="rounded-[10px] border border-[#8B5CF6]/35 bg-[#8B5CF6]/10 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-[#8B5CF6]" />
              <div>
                <p className="font-bold text-[#F5F7FA]">Qualificação Instantânea por IA</p>
                <p className="text-[10px] text-[#A7B0BF]">
                  Gera score automático e inicia fluxo de atendimento
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={autoAiQualify}
              onChange={(e) => setAutoAiQualify(e.target.checked)}
              className="size-4 rounded accent-[#8B5CF6] cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-[#252C38] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-[8px] border border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA] hover:bg-[#252C38]/40"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-[8px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold flex items-center gap-1.5 hover:brightness-110 shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
            >
              <Sparkles className="size-3.5" />
              <span>Salvar e Processar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
