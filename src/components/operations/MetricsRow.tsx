import { Users, Bot, CalendarCheck, TrendingUp, ArrowUpRight } from "lucide-react";
import { MetricData } from "./types";

interface MetricsRowProps {
  metrics: MetricData[];
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  const getIcon = (type: MetricData["type"]) => {
    switch (type) {
      case "leads":
        return <Users className="size-5 text-[#3B82F6]" />;
      case "qualification":
        return <Bot className="size-5 text-[#8B5CF6]" />;
      case "appointments":
        return <CalendarCheck className="size-5 text-[#3B82F6]" />;
      case "conversion":
        return <TrendingUp className="size-5 text-[#22C55E]" />;
    }
  };

  const getBorderHighlight = (type: MetricData["type"]) => {
    switch (type) {
      case "qualification":
        return "hover:border-[#8B5CF6]/50";
      case "conversion":
        return "hover:border-[#22C55E]/50";
      default:
        return "hover:border-[#3B82F6]/50";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div
          key={m.title}
          className={`rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 ${getBorderHighlight(
            m.type,
          )}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A7B0BF] tracking-wide">{m.title}</span>
            <div className="p-2 rounded-[10px] bg-[#0E121A] border border-[#252C38]">
              {getIcon(m.type)}
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-[#F5F7FA]">
              {m.value}
            </span>
            <div
              className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                m.isPositive
                  ? "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
                  : "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20"
              }`}
            >
              <ArrowUpRight className="size-3 mr-0.5" />
              {m.change}
            </div>
          </div>

          <p className="mt-2 text-[11px] text-[#667085]">{m.timeframe}</p>
        </div>
      ))}
    </div>
  );
}
