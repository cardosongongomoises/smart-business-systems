import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { CTA } from "@/lib/site-config";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#automate-pro", label: "Automate Pro" },
  { href: "/#agente-ia", label: "Soluções IA" },
  { href: "/#canais", label: "Automação" },
  { href: "/#jornada", label: "Pipeline" },
  { href: "/#planos", label: "Planos" },
  { href: "/#resultados", label: "Resultados" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled
          ? "h-[72px] bg-[#080A0F]/90 backdrop-blur-[12px] border-b border-[#252C38] shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
          : "h-[72px] bg-[#080A0F]/70 backdrop-blur-sm border-b border-[#252C38]/40"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        {/* LOGO CORPORATIVO */}
        <a
          href="/#topo"
          className="flex items-center gap-3 group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
        >
          <div className="relative flex size-9 items-center justify-center rounded-[8px] border border-[#3B82F6]/40 bg-[#0E121A] text-sm font-extrabold text-[#F5F7FA] shadow-sm transition-all duration-200 group-hover:border-[#3B82F6] group-hover:shadow-[0_0_16px_rgba(59,130,246,0.3)]">
            <span className="bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent font-black tracking-tight">
              AD
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.14em] uppercase text-[#F5F7FA] transition-colors group-hover:text-white">
              Agentes Digital
            </span>
            <span className="text-[10px] font-medium tracking-wider text-[#A7B0BF]">
              Sistemas Digitais • IA
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold tracking-wide text-[#A7B0BF] transition-colors hover:text-[#F5F7FA] rounded py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Status + Operacoes + Primary CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/operacoes"
            className="inline-flex h-[40px] items-center justify-center gap-1.5 rounded-[8px] bg-violet-600/15 hover:bg-violet-600/25 border border-violet-500/40 px-3.5 text-xs font-semibold text-violet-200 hover:text-white transition-all shadow-sm"
            title="Acessar Centro de Operações e Assistente IA"
          >
            <ShieldCheck className="size-3.5 text-violet-400" />
            <span>Centro de Operações</span>
          </a>

          <a
            href={CTA.specialist}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[40px] items-center justify-center gap-2 rounded-[8px] bg-[#3B82F6] px-4 text-xs font-semibold text-white shadow-sm transition-[background-color,transform] hover:bg-[#2563EB] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F]"
          >
            <span>Falar com especialista</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-[8px] border border-[#252C38] bg-[#151A23] text-[#F5F7FA] transition-colors hover:border-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] lg:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 bg-black/75 backdrop-blur-md z-50 lg:hidden flex flex-col justify-start p-4 animate-in fade-in-20">
          <div className="w-full rounded-[16px] border border-[#252C38] bg-[#0E121A] p-5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col gap-1 max-h-[85vh] overflow-y-auto overscroll-contain">
            <div className="flex items-center justify-between pb-3 border-b border-[#252C38]/60">
              <span className="text-xs font-semibold tracking-wider text-[#A7B0BF] uppercase">
                Menu Corporativo
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#22C55E]">
                <span className="size-1.5 rounded-full bg-[#22C55E]" /> 24/7 ONLINE
              </span>
            </div>

            <nav className="flex flex-col divide-y divide-[#252C38]/60">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-sm font-medium text-[#A7B0BF] hover:text-[#F5F7FA] flex items-center justify-between rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                >
                  <span>{l.label}</span>
                  <ArrowRight className="size-3.5 text-[#667085]" aria-hidden="true" />
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-[#252C38] flex flex-col gap-2.5">
              <a
                href="/operacoes"
                onClick={() => setOpen(false)}
                className="flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-violet-600/20 border border-violet-500/40 px-5 text-xs font-semibold text-violet-200 transition-colors hover:bg-violet-600/30"
              >
                <ShieldCheck className="size-4 text-violet-400" />
                <span>Centro de Operações (Assistente IA)</span>
              </a>
              <a
                href={CTA.specialist}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#3B82F6] px-5 text-xs font-semibold uppercase tracking-wider text-white transition-[background-color,transform] hover:bg-[#2563EB] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                Falar com especialista <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="/#contacto"
                onClick={() => setOpen(false)}
                className="flex h-[44px] items-center justify-center rounded-[8px] border border-[#252C38] bg-[#151A23] text-xs font-semibold text-[#F5F7FA] hover:border-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                Solicitar Proposta Comercial
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
