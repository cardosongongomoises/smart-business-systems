import { useState } from "react";
import {
  Settings,
  Bot,
  MessageSquare,
  ShieldCheck,
  Building2,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  Users,
  Smartphone,
  Sparkles,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";
import { ActiveTab } from "./OperationsSidebar";

interface SettingsViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export function SettingsView({ onNavigateTab }: SettingsViewProps) {
  const [companyName, setCompanyName] = useState("Agentes Digital");
  const [websiteUrl, setWebsiteUrl] = useState("https://agentes-digital.com");
  const [currency, setCurrency] = useState("AOA - Kwanza Angolano");
  const [whatsappNumber, setWhatsappNumber] = useState("+244 941 647 752");
  const [aiModel, setAiModel] = useState("claude-3-5-sonnet");
  const [temperature, setTemperature] = useState(0.2);
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Configurações atualizadas com sucesso!");
    }, 500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080A0F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <h1 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Settings className="size-5 text-[#3B82F6]" />
            <span>Configurações do Centro de Operações</span>
          </h1>
          <p className="text-xs text-[#A7B0BF] mt-1">
            Parâmetros da empresa, WhatsApp Business API e motor de IA
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <Save className="size-4" />
          <span>{isSaving ? "Salvando..." : "Salvar Alterações"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Section 1: Company Profile */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] space-y-4">
          <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-[#252C38]">
            <Building2 className="size-4 text-[#3B82F6]" />
            Dados da Empresa & Mercado
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#A7B0BF] block mb-1 font-medium">Nome da Organização</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-9 px-3 rounded-[8px] border border-[#252C38] bg-[#0E121A] text-[#F5F7FA] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="text-[#A7B0BF] block mb-1 font-medium">Domínio Principal</label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full h-9 px-3 rounded-[8px] border border-[#252C38] bg-[#0E121A] text-[#F5F7FA] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#A7B0BF] block mb-1 font-medium">Moeda Comercial</label>
                <input
                  type="text"
                  value={currency}
                  readOnly
                  className="w-full h-9 px-3 rounded-[8px] border border-[#252C38] bg-[#080A0F] text-[#22C55E] font-semibold cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="text-[#A7B0BF] block mb-1 font-medium">Fuso Horário</label>
                <input
                  type="text"
                  value="WAT (UTC+1 Luanda)"
                  readOnly
                  className="w-full h-9 px-3 rounded-[8px] border border-[#252C38] bg-[#080A0F] text-[#F5F7FA] font-mono cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: AI Engine Settings */}
        <div className="rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
            <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
              <Bot className="size-4 text-[#8B5CF6]" />
              Motor de IA & System Prompt
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#C084FC] text-[10px] font-mono font-bold">
              v3.2 Ativo
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#A7B0BF] block mb-1 font-medium">Modelo Principal LLM</label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full h-9 px-3 rounded-[8px] border border-[#252C38] bg-[#0E121A] text-[#F5F7FA] focus:outline-none focus:border-[#8B5CF6]"
              >
                <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Recomendado)</option>
                <option value="gemini-2-5-pro">Gemini 2.5 Pro (Google DeepMind)</option>
                <option value="gpt-4o">GPT-4o (OpenAI)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A7B0BF]">Temperatura de Resposta (Consistência)</span>
                <span className="font-mono text-[#8B5CF6] font-bold">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#8B5CF6]"
              />
              <p className="text-[10px] text-[#667085] mt-1">
                0.2 garante adesão estrita aos preços em Kwanzas e regras sem alucinação.
              </p>
            </div>

            <div className="p-3 rounded-[10px] bg-[#0E121A] border border-[#252C38] flex items-center justify-between">
              <div>
                <span className="text-[#F5F7FA] font-medium block">
                  Escalonamento Humano (Regra 7)
                </span>
                <span className="text-[10px] text-[#667085]">
                  Transferência automática se solicitada negociação de preço
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoEscalate}
                onChange={(e) => setAutoEscalate(e.target.checked)}
                className="size-4 accent-[#8B5CF6] rounded"
              />
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab("system_prompt" as ActiveTab)}
              className="w-full py-2 rounded-[8px] bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#C084FC] hover:bg-[#8B5CF6]/25 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="size-3.5" />
              <span>Abrir Sandbox & Editor do Prompt de Sistema</span>
            </button>
          </div>
        </div>

        {/* Section 3: WhatsApp Business API Integration */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
            <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="size-4 text-[#22C55E]" />
              WhatsApp Cloud API (Meta)
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              Online
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#A7B0BF] block mb-1 font-medium">
                Número Comercial Oficial
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full h-9 px-3 rounded-[8px] border border-[#252C38] bg-[#0E121A] text-[#F5F7FA] font-mono focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="text-[#A7B0BF] block mb-1 font-medium">Webhook Endpoint URL</label>
              <input
                type="text"
                readOnly
                value="https://api.agentes-digital.com/v1/webhook/whatsapp"
                className="w-full h-9 px-3 rounded-[8px] border border-[#252C38] bg-[#080A0F] text-[#A7B0BF] font-mono text-[11px]"
              />
            </div>

            <div className="p-3 rounded-[10px] bg-[#0E121A] border border-[#252C38] text-[11px] text-[#A7B0BF] flex items-center justify-between">
              <span>Token de Verificação SSL</span>
              <span className="text-[#22C55E] font-mono font-semibold">
                ● Ativo & Criptografado
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Team Members */}
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] space-y-4">
          <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-[#252C38]">
            <Users className="size-4 text-[#3B82F6]" />
            Membros da Equipa & Acessos
          </h3>

          <div className="space-y-2.5">
            {[
              {
                name: "Gestor Comercial",
                role: "Super Admin",
                email: "operacoes@agentes-digital.com",
              },
              {
                name: "Atendente WhatsApp",
                role: "Operador Humano",
                email: "suporte@agentes-digital.com",
              },
              {
                name: "Engenheiro de Prompt",
                role: "IA Master",
                email: "tech@agentes-digital.com",
              },
            ].map((member) => (
              <div
                key={member.email}
                className="p-3 rounded-[10px] bg-[#0E121A] border border-[#252C38] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-[#F5F7FA]">{member.name}</div>
                  <div className="text-[11px] text-[#667085] font-mono">{member.email}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#3B82F6]/15 text-[#60A5FA] text-[10px] font-semibold">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
