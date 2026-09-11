import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { TaskComment, Member } from "./types";

interface TaskCommentsProps {
  comments: TaskComment[];
  members: Member[];
  onAddComment: (text: string) => void;
}

export function TaskComments({ comments, members, onAddComment }: TaskCommentsProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  };

  const getAuthor = (authorId: string) => {
    return (
      members.find((m) => m.id === authorId) ?? {
        name: "Utilizador",
        role: "Membro",
        initials: "AD",
      }
    );
  };

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
        <MessageSquare className="size-4 text-[#3B82F6]" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">
          Comentários ({comments.length})
        </h4>
      </div>

      {/* Comment input */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreva um comentário ou atualização para a equipa..."
          className="w-full resize-none rounded-[8px] border border-[#252C38] bg-[#151A23] p-2.5 text-xs text-[#F5F7FA] placeholder-[#667085] focus:border-[#3B82F6] focus:outline-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!text.trim()}
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#3B82F6] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2563EB] disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            <Send className="size-3" />
            <span>Comentar</span>
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-2.5 pt-2">
        {comments.map((c) => {
          const author = getAuthor(c.authorId);
          return (
            <div
              key={c.id}
              className="rounded-[8px] border border-[#252C38] bg-[#151A23]/70 p-2.5 space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#3B82F6]/20 font-mono text-[10px] font-bold text-[#3B82F6]">
                    {author.initials}
                  </div>
                  <span className="text-xs font-semibold text-[#F5F7FA]">{author.name}</span>
                  <span className="text-[10px] text-[#667085]">({author.role})</span>
                </div>
                <span className="text-[10px] font-mono text-[#667085]">
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p className="text-xs text-[#A7B0BF] pl-7 whitespace-pre-line leading-relaxed">
                {c.text}
              </p>
            </div>
          );
        })}

        {comments.length === 0 && (
          <p className="text-xs text-[#667085] italic py-1 text-center">
            Nenhum comentário adicionado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
