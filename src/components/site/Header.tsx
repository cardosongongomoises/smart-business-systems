import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { CTA } from "@/lib/site-config";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#agente-ia", label: "Soluções IA" },
  { href: "#canais", label: "Automação" },
  { href: "#jornada", label: "Sistemas" },
  { href: "#planos", label: "Planos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-250 ${
        scrolled
          ? "h-[72px] bg-[#080A0F]/85 backdrop-blur-[12px] border-b border-[#252C38]"
          : "h-[72px] bg-[#080A0F]/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        {/* LOGO */}
        <a href="#topo" className="flex items-center gap-3 group">
          <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#3B82F6] text-sm font-extrabold text-white transition-transform group-hover:scale-105">
            AD
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.16em] uppercase text-[#F5F7FA]">
              Agentes Digital
            </span>
            <span className="text-[10px] font-medium tracking-wider text-[#A7B0BF]">
              Sistemas Digitais
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#A7B0BF] transition-colors hover:text-[#F5F7FA]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Primary CTA */}
        <div className="hidden lg:block">
          <a
            href={CTA.specialist}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#3B82F6] px-5 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] active:scale-[0.98]"
          >
            Falar com especialista <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-[8px] border border-[#252C38] bg-[#151A23] text-[#F5F7FA] transition-colors hover:border-[#3B82F6] lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="mx-5 mt-2 rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] lg:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#252C38] py-3 text-sm font-medium text-[#A7B0BF] last:border-0 hover:text-[#F5F7FA]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={CTA.specialist}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex h-[44px] items-center justify-center rounded-[8px] bg-[#3B82F6] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
          >
            Falar com especialista
          </a>
        </div>
      )}
    </header>
  );
}
