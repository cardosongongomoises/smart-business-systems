import { History } from "lucide-react";
import { TaskActivity as ITaskActivity } from "./types";

interface TaskActivityProps {
  activity: ITaskActivity[];
}

export function TaskActivity({ activity }: TaskActivityProps) {
  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <History className="size-4 text-[#A7B0BF]" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">
          Histórico Operacional ({activity.length})
        </h4>
      </div>

      <div className="relative pl-4 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#252C38]">
        {activity.map((act) => (
          <div key={act.id} className="relative text-xs">
            <span className="absolute -left-4 top-1 size-2 rounded-full border border-[#0E121A] bg-[#3B82F6]" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#A7B0BF]">{act.text}</span>
              <span className="font-mono text-[10px] text-[#667085] shrink-0">
                {formatDate(act.at)}
              </span>
            </div>
          </div>
        ))}

        {activity.length === 0 && (
          <p className="text-xs text-[#667085] italic">Nenhuma atividade registrada.</p>
        )}
      </div>
    </div>
  );
}
