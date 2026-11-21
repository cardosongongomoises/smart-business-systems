import { CalendarCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { site, CTA } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-[#2A3D63] bg-[#101D35] text-[#F5F3EE] pt-12 pb-20 sm:pt-16 sm:pb-10">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/#topo" className="inline-flex items-center gap-3 group">
              <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#F36B32] text-[#101D35] font-heading text-sm font-extrabold tracking-tight transition-colors group-hover:bg-[#F4C542]">
                AD
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-sm font-extrabold tracking-tight text-[#F5F3EE]">
                  Agentes Digital
                </span>
                <span className="text-xs font-medium text-[#B8C0D0]">
                  Recepção digital para espaços de estética em Angola
                </span>
              </div>
            </a>
            <p className="mt-4 max-w-sm text-sm text-[#F5F3EE] font-medium leading-relaxed">
              A sua recepção continua a atender, mesmo quando a equipa está ocupada.
            </p>
            <p className="mt-3 text-xs text-[#B8C0D0] tabular-nums">
              {site.whatsapp.number} · {site.location}
            </p>
            <p className="mt-4 text-xs text-[#B8C0D0]/85 leading-relaxed">
              Também desenvolvemos websites e automações à medida para outros negócios.{" "}
              <a
                href={CTA.otherBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F4C542] underline-offset-4 hover:underline"
              >
                Falar connosco
              </a>
            </p>
          </div>

          <div>
            <p className="font-heading text-xs font-bold tracking-[0.06em] text-[#F5F3EE]">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="/#topo" className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]">
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/#problema"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  O problema
                </a>
              </li>
              <li>
                <a
                  href="/#como-fica"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Como fica a recepção
                </a>
              </li>
              <li>
                <a
                  href="/#servicos"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Recepção Inteligente
                </a>
              </li>
              <li>
                <a
                  href="/#como-funciona"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Como funciona
                </a>
              </li>
              <li>
                <a
                  href="/#investimento"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Investimento
                </a>
              </li>
              <li>
                <a
                  href="/#demonstracao-final"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Demonstração de 7 minutos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-heading text-xs font-bold tracking-[0.06em] text-[#F5F3EE]">
              Dúvidas e informação legal
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  to="/implementacao-ia-empresas-angola"
                  className="text-[#F4C542] font-medium transition-colors hover:text-[#F36B32]"
                >
                  IA para empresas em Angola
                </Link>
              </li>
              <li>
                <a href="/#faq" className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]">
                  Dúvidas frequentes
                </a>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/termos"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Termos de Serviço
                </Link>
              </li>
            </ul>
            <div className="mt-6 rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4 text-xs text-[#B8C0D0] leading-relaxed">
              <div className="flex items-center gap-2 text-[#2E9E6B] font-heading font-bold text-xs mb-1.5">
                <CalendarCheck className="size-3.5" aria-hidden="true" />
                <span>Demonstração prática</span>
              </div>
              Veja uma conversa de WhatsApp acabar numa marcação registada numa agenda de teste.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#2A3D63] pt-6 text-center text-xs text-[#B8C0D0] sm:flex-row sm:text-left">
          <p>© 2026 Agentes Digital. Todos os direitos reservados.</p>
          <p className="font-heading text-xs font-semibold text-[#B8C0D0]">
            Recepção Digital para Espaços de Estética em Angola
          </p>
        </div>
      </div>
    </footer>
  );
}
