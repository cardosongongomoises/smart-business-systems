import { CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#2A3D63] bg-[#101D35] text-[#F5F3EE] pt-14 pb-8 sm:pt-16 sm:pb-10">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="/#topo" className="inline-flex items-center gap-3 group">
              <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#F36B32] text-[#101D35] font-heading text-sm font-extrabold tracking-tight transition-colors group-hover:bg-[#F4C542]">
                AD
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-sm font-extrabold tracking-[0.06em] uppercase text-[#F5F3EE]">
                  Agentes Digital
                </span>
                <span className="text-[11px] font-medium text-[#B8C0D0]">
                  Inteligência Artificial · Automatização de Processos
                </span>
              </div>
            </a>
            <p className="mt-4 max-w-sm text-sm text-[#B8C0D0] leading-relaxed">
              Ajudamos empresas em Angola a atender melhor, acompanhar cada oportunidade comercial e
              reduzir tarefas repetitivas com inteligência artificial e automatização de processos.
            </p>
            <p className="mt-2 text-xs text-[#B8C0D0]/80">
              Atendimento com IA · Follow-up Comercial · Marcação de Reuniões · Integração de
              Processos
            </p>
            <p className="mt-4 font-heading text-[11px] font-bold tracking-wider text-[#F4C542] uppercase">
              Luanda, Angola
            </p>
          </div>

          <div>
            <p className="font-heading text-[11px] font-bold tracking-[0.14em] text-[#F5F3EE] uppercase">
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
                  O Problema
                </a>
              </li>
              <li>
                <a
                  href="/#servicos"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Soluções e Serviços
                </a>
              </li>
              <li>
                <a
                  href="/#beneficios"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Benefícios
                </a>
              </li>
              <li>
                <a
                  href="/#agente-ia"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Demonstração Prática
                </a>
              </li>
              <li>
                <a
                  href="/#como-funciona"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Como Trabalhamos
                </a>
              </li>
              <li>
                <a
                  href="/#automate-pro"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Automate Pro (Já tem site?)
                </a>
              </li>
              <li>
                <a
                  href="/#planos"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Planos e Investimento
                </a>
              </li>
              <li>
                <a
                  href="/#contacto"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Solicitar Diagnóstico
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-heading text-[11px] font-bold tracking-[0.14em] text-[#F5F3EE] uppercase">
              Transparência &amp; Legal
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="/#faq" className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos" className="text-[#B8C0D0] transition-colors hover:text-[#F36B32]">
                  Termos de Serviço
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-4 text-xs text-[#B8C0D0]">
              <div className="flex items-center gap-2 text-[#2E9E6B] font-heading font-bold text-[11px] uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                <span>Implementação Acompanhada</span>
              </div>
              Configuração personalizada, testes conjuntos antes do arranque e suporte técnico
              contínuo conforme o plano.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#2A3D63] pt-6 text-center text-xs text-[#B8C0D0] sm:flex-row sm:text-left">
          <p>© 2026 Agentes Digital. Todos os direitos reservados.</p>
          <p className="font-heading text-[11px] font-semibold uppercase tracking-wider">
            Inteligência Artificial e Automatização em Angola
          </p>
        </div>
      </div>
    </footer>
  );
}
