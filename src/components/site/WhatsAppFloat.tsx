import { MessageCircle } from "lucide-react";
import { CTA } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={CTA.specialist}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a Agentes Digital"
      className="fixed right-5 bottom-5 z-50 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#F36B32] px-4 py-3 font-heading text-sm font-bold text-[#101D35] shadow-[0_12px_32px_rgba(16,29,53,0.16)] transition-colors hover:bg-[#D9531C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EE]"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
