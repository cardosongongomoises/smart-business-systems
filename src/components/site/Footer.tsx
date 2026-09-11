export function Footer() {
  return (
    <footer className="border-t border-[#252C38] bg-[#080A0F] pt-14 pb-8 sm:pt-16 sm:pb-10">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#topo" className="flex items-center gap-3 group">
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
            <p className="mt-4 max-w-sm text-sm text-[#A7B0BF] leading-relaxed">
              “Não construímos apenas presença digital. Construímos sistemas que trabalham para o
              seu negócio.”
            </p>
            <p className="mt-2 text-xs text-[#667085]">
              Websites Corporativos • Agentes de Inteligência Artificial • Automação Comercial • CRM
            </p>
            <p className="mt-4 text-[11px] font-mono font-semibold tracking-wider text-[#3B82F6] uppercase">
              Malanje & Luanda, Angola • Lusofonia
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#F5F7FA] uppercase">
              Navegação Estrutural
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="/operacoes"
                  className="text-[#22C55E] font-semibold transition-colors hover:text-[#4ADE80] flex items-center gap-1.5"
                >
                  <span>Dashboard & Operações (MRR)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#22C55E]/20 text-[#22C55E]">
                    Gestão
                  </span>
                </a>
              </li>
              <li>
                <a href="/#topo" className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]">
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/#servicos"
                  className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="/#automate-pro"
                  className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]"
                >
                  Automate Pro
                </a>
              </li>
              <li>
                <a
                  href="/#agente-ia"
                  className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]"
                >
                  Soluções IA
                </a>
              </li>
              <li>
                <a
                  href="/#canais"
                  className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]"
                >
                  Automação WhatsApp & E-mail
                </a>
              </li>
              <li>
                <a
                  href="/#planos"
                  className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]"
                >
                  Planos & Preços
                </a>
              </li>
              <li>
                <a
                  href="/#como-funciona"
                  className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]"
                >
                  Metodologia de Implantação
                </a>
              </li>
              <li>
                <a
                  href="/#contato"
                  className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]"
                >
                  Contacto Institucional
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#F5F7FA] uppercase">
              Governança & Legal
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="/#faq" className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos" className="text-[#A7B0BF] transition-colors hover:text-[#3B82F6]">
                  Termos de Serviço
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-[12px] border border-[#252C38] bg-[#151A23] p-3.5 text-xs text-[#A7B0BF]">
              <div className="flex items-center gap-2 text-[#22C55E] font-mono text-[11px] mb-1">
                <span className="size-2 rounded-full bg-[#22C55E]" /> SLA 99.9% Operacional
              </div>
              Infraestrutura em Cloud com alta disponibilidade para atendimento 24/7 sem
              interrupções.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#252C38] pt-6 text-center text-xs text-[#667085] sm:flex-row sm:text-left">
          <p>© 2026 Agentes Digital. Todos os direitos reservados.</p>
          <p className="font-mono text-[11px]">Sistemas Digitais Corporativos</p>
        </div>
      </div>
    </footer>
  );
}
