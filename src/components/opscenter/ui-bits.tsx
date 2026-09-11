import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PRIORITY_META, STATUS_META, TaskPriority, TaskStatus, TagSlug, Member } from "./types";
import { cn } from "@/lib/utils";

export function PriorityDot({
  priority,
  showLabel = true,
}: {
  priority: TaskPriority;
  showLabel?: boolean;
}) {
  const meta = PRIORITY_META[priority];
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: meta.color }}
        aria-hidden="true"
      />
      {showLabel && <span className="text-[#A7B0BF]">{meta.label}</span>}
      <span className="sr-only">Prioridade {meta.label}</span>
    </span>
  );
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium"
      style={{
        borderColor: `${meta.color}33`,
        backgroundColor: `${meta.color}14`,
        color: meta.color,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );
}

export function TagChip({ tag }: { tag: TagSlug }) {
  return (
    <span className="rounded-full border border-[#252C38] bg-[#1B212C] px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#A7B0BF]">
      {tag}
    </span>
  );
}

export function MemberAvatar({
  member,
  activeTasks,
  size = "sm",
}: {
  member: Member | undefined;
  activeTasks?: number;
  size?: "sm" | "md";
}) {
  if (!member) return null;
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-[#F5F7FA] ring-1 ring-[#252C38]",
              size === "sm" ? "h-6 w-6 text-[10px]" : "h-9 w-9 text-xs",
            )}
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
            aria-label={`${member.name}, ${member.role}`}
          >
            {member.initials}
          </span>
        </TooltipTrigger>
        <TooltipContent className="border-[#252C38] bg-[#151A23] text-[#F5F7FA]">
          <p className="text-xs font-semibold">{member.name}</p>
          <p className="text-[11px] text-[#A7B0BF]">{member.role}</p>
          {typeof activeTasks === "number" && (
            <p className="text-[11px] text-[#667085]">{activeTasks} tarefas ativas</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ProgressBar({ value, tone = "blue" }: { value: number; tone?: "blue" | "green" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#252C38]">
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          backgroundColor: tone === "green" ? "#22C55E" : "#3B82F6",
        }}
      />
    </div>
  );
}

const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export function formatShortDate(iso: string | null) {
  if (!iso) return "Sem prazo";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "Sem prazo";
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}`;
}

export function formatLongDate(iso: string | null) {
  if (!iso) return "Sem prazo";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "Sem prazo";
  return d.toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });
}

export function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}

export function isOverdue(dueDate: string | null, status?: TaskStatus) {
  if (!dueDate || status === "DONE") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateStr = dueDate.includes("T") ? dueDate : `${dueDate}T00:00:00`;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < today.getTime();
}

export function isDueToday(dueDate: string | null, status?: TaskStatus) {
  if (!dueDate || status === "DONE") return false;
  const today = new Date();
  const dateStr = dueDate.includes("T") ? dueDate : `${dueDate}T00:00:00`;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;
  return d.toDateString() === today.toDateString();
}
