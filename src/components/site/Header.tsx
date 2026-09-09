import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CTA } from "@/lib/site-config";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#agente-ia", label: "Soluções IA" },
  { href: "#planos", label: "Planos" },
  { href: "#como-funciona", label: "Sobre" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-x-0 border-t-0 py-3" : "border-b border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#topo" className="flex items-center gap-3">
          <span className="bg-gradient-primary flex size-9 items-center justify-center rounded-lg text-sm font-extrabold text-primary-foreground">
            AD
          </span>
          <span className="text-sm font-extrabold tracking-[0.18em] uppercase">
            Agentes Digital
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={CTA.specialist}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-primary inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Falar com especialista
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="glass-card mx-5 mt-3 rounded-2xl p-4 lg:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium text-muted-foreground last:border-0 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={CTA.specialist}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-primary mt-4 flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Falar com especialista
          </a>
        </div>
      )}
    </header>
  );
}
