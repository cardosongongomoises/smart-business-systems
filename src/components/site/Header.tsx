import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { DEMO_CTA_LABEL } from "@/lib/site-config";

const links = [
  { href: "/#problema", label: "O problema" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#investimento", label: "Investimento" },
  { href: "/#faq", label: "Dúvidas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 sm:h-[72px] transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled
          ? "bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E7E3D9] shadow-[0_4px_24px_-8px_rgba(16,29,53,0.08)]"
          : "bg-[#F5F3EE]/88 backdrop-blur-sm border-b border-[#E7E3D9]/60"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#F36B32] transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/#topo"
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32]"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center rounded-[8px] bg-[#101D35] font-heading text-xs font-extrabold tracking-tight text-[#F5F3EE]"
          >
            AD
          </span>
          <span className="font-heading text-sm font-extrabold tracking-tight text-[#101D35] whitespace-nowrap">
            Agentes Digital
          </span>
        </a>

        {/* Zone 2: 4 Concise Single-line Navigation Links */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap shrink-0 text-[13px] font-medium text-[#5B6B8C] transition-colors duration-200 hover:text-[#101D35] hover:underline hover:underline-offset-4 decoration-[#F36B32] decoration-2 rounded py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href="/#demonstracao-final"
            className="lume-btn-primary inline-flex h-[40px] min-h-[40px] items-center justify-center gap-2 px-5 py-2 text-[13px] whitespace-nowrap shrink-0"
          >
            <span>{DEMO_CTA_LABEL}</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 items-center justify-center rounded-[8px] border border-[#E7E3D9] bg-[#FFFFFF] text-[#101D35] transition-colors cursor-pointer hover:border-[#101D35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] lg:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile & Tablet Drawer */}
      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          className="fixed inset-x-0 top-16 sm:top-[72px] bottom-0 bg-[#101D35]/50 backdrop-blur-sm z-50 lg:hidden flex flex-col justify-start p-4"
        >
          <div className="mx-auto w-full max-w-lg rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 shadow-[0_12px_32px_rgba(16,29,53,0.16)] flex flex-col gap-1 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain">
            <nav className="flex flex-col divide-y divide-[#E7E3D9]" aria-label="Menu móvel">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="min-h-[44px] py-3 text-sm font-medium text-[#101D35] hover:text-[#D9531C] flex items-center justify-between rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32]"
                >
                  <span>{l.label}</span>
                  <ArrowRight className="size-4 text-[#5B6B8C]" aria-hidden="true" />
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-[#E7E3D9] flex flex-col gap-2.5">
              <a
                href="/#demonstracao-final"
                onClick={() => setOpen(false)}
                className="lume-btn-primary flex items-center justify-center gap-2 text-xs sm:text-sm text-center"
              >
                <span>{DEMO_CTA_LABEL}</span>
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href="/#avaliacao-whatsapp"
                onClick={() => setOpen(false)}
                className="lume-btn-secondary-light flex items-center justify-center text-xs sm:text-sm text-center"
              >
                Avaliar o atendimento do meu WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
