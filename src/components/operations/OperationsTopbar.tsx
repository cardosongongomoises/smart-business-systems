import { useState } from "react";
import { Search, Bot, Bell, Sparkles, RefreshCw, Plus, SlidersHorizontal } from "lucide-react";

interface TopbarProps {
  onOpenNewLead: () => void;
  onSimulateIncomingLead: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function OperationsTopbar({
  onOpenNewLead,
  onSimulateIncomingLead,
  searchQuery,
  onSearchChange,
}: TopbarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="h-[70px] border-b border-[#252C38] bg-[#0E121A]/90 backdrop-blur-md px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Section and Global Status */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base font-bold tracking-tight text-[#F5F7FA]">Centro de Operações</h1>
          <p className="text-[11px] text-[#A7B0BF]">
            Pipeline comercial e inteligência em tempo real
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[#252C38]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1 text-[11px] font-semibold text-[#22C55E]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#22C55E]" />
            </span>
            <span className="tracking-wide">AGENTE IA ONLINE</span>
            <span className="text-[10px] text-[#8B5CF6] font-mono border-l border-[#22C55E]/30 pl-2">
              38ms
            </span>
          </div>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#667085]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar por nome, clínica, empresa, telefone..."
            className="w-full h-10 rounded-[10px] border border-[#252C38] bg-[#080A0F] pl-10 pr-4 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* Simulate AI Lead Action */}
        <button
          type="button"
          onClick={onSimulateIncomingLead}
          title="Simular mensagem recebida no WhatsApp"
          className="hidden lg:inline-flex items-center gap-1.5 h-9 rounded-[8px] border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-3 text-xs font-semibold text-[#C084FC] hover:bg-[#8B5CF6]/20 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="size-3.5 text-[#8B5CF6]" />
          <span>Simular Lead WhatsApp</span>
        </button>

        {/* New Manual Lead AI Button */}
        <button
          type="button"
          onClick={onOpenNewLead}
          className="inline-flex items-center gap-1.5 h-9 rounded-[8px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-3.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <Plus className="size-3.5" />
          <span>+ Novo Lead Manual</span>
        </button>

        {/* Sync Button */}
        <button
          type="button"
          onClick={handleRefresh}
          aria-label="Atualizar dados"
          className="size-9 rounded-[8px] border border-[#252C38] bg-[#151A23] flex items-center justify-center text-[#A7B0BF] hover:text-[#F5F7FA] hover:border-[#3B82F6]/50 transition-colors"
        >
          <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin text-[#3B82F6]" : ""}`} />
        </button>

        {/* Operator Badge */}
        <div className="hidden xl:flex items-center gap-2.5 pl-2 border-l border-[#252C38]">
          <div className="size-8 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-xs font-bold text-[#3B82F6]">
            OP
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-[#F5F7FA] leading-tight">
              Equipa Operações
            </span>
            <span className="text-[10px] text-[#A7B0BF] leading-tight">Agentes Digital</span>
          </div>
        </div>
      </div>
    </header>
  );
}
