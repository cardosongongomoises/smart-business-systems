import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface SearchTasksProps {
  value: string;
  onChange: (query: string) => void;
  onClear?: () => void;
}

export function SearchTasks({ value, onChange, onClear }: SearchTasksProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut "/" or "Ctrl+K" / "Cmd+K" to focus search
      if (
        (e.key === "/" &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA") ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative flex-1 min-w-[220px] max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#667085]">
        <Search className="size-4" />
      </div>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar tarefas, projetos, tags... (Ctrl+K)"
        className="w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] py-2 pl-9 pr-14 text-xs font-medium text-[#F5F7FA] placeholder-[#667085] transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
      />
      {value ? (
        <button
          type="button"
          aria-label="Limpar pesquisa"
          onClick={() => {
            onChange("");
            onClear?.();
            inputRef.current?.focus();
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#667085] hover:text-[#F5F7FA]"
        >
          <X className="size-3.5" />
        </button>
      ) : (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
          <kbd className="rounded border border-[#252C38] bg-[#151A23] px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#A7B0BF]">
            /
          </kbd>
        </div>
      )}
    </div>
  );
}
