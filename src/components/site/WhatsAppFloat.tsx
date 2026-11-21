import { MessageCircle } from "lucide-react";
import { CTA } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={CTA.demo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir demonstração da recepção digital no WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6 z-50 inline-flex h-11 items-center gap-2 rounded-full bg-[#2E9E6B] px-3.5 sm:px-4 font-heading text-sm font-bold text-[#FFFFFF] shadow-[0_10px_28px_-4px_rgba(16,29,53,0.28)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#258559] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E6B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EE]"
    >
      <span className="relative flex size-5 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#FFFFFF]/40 animate-[lume-ping-ring_2.8s_cubic-bezier(0,0,0.2,1)_infinite]"
        />
        <MessageCircle className="relative size-5" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
