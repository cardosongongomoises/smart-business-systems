import { MessageCircle } from "lucide-react";
import { CTA } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={CTA.specialist}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a Agentes Digital"
      className="bg-gradient-primary shadow-elegant fixed right-5 bottom-5 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
