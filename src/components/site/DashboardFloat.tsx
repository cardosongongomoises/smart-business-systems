import { Coins, LayoutDashboard } from "lucide-react";

export function DashboardFloat() {
  return (
    <a
      href="/operacoes"
      id="floating-dashboard-btn"
      title="Aceder ao Dashboard Principal & Indicador de MRR"
      className="fixed left-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/60 bg-[#0E141D]/95 backdrop-blur-md px-4 py-3 text-xs font-bold text-[#22C55E] shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(34,197,94,0.25)] hover:bg-[#13231B] hover:border-[#22C55E] hover:scale-105 active:scale-95 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]"
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-[#22C55E]" />
      </span>
      <Coins className="size-4 text-[#22C55E] group-hover:rotate-12 transition-transform" />
      <span>Dashboard • MRR</span>
    </a>
  );
}
