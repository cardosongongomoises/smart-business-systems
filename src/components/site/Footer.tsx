export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30 pt-7 pb-2 sm:pt-8 sm:pb-2.5">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#topo" className="flex items-center gap-3">
              <span className="bg-gradient-primary flex size-9 items-center justify-center rounded-lg text-sm font-extrabold text-primary-foreground">
                AD
              </span>
              <span className="text-sm font-extrabold tracking-[0.18em] uppercase">
                Agentes Digital
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Websites • Inteligência Artificial • Automação • Sistemas Digitais
            </p>
            <p className="mt-2 text-xs text-muted-foreground/80">
              Não construímos apenas presença digital. Construímos sistemas que trabalham para o seu
              negócio.
            </p>
            <p className="mt-4 text-xs font-semibold tracking-wider text-primary uppercase">
              Angola • Lusofonia • Digital First
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-foreground uppercase">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="#topo"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#agente-ia"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Soluções IA
                </a>
              </li>
              <li>
                <a
                  href="#canais"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Automação WhatsApp & E-mail
                </a>
              </li>
              <li>
                <a
                  href="#planos"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Planos & Preços
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-foreground uppercase">
              Legal & Informação
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="#faq"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/80">Política de Privacidade</span>
              </li>
              <li>
                <span className="text-muted-foreground/80">Termos de Serviço</span>
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-border/80 bg-surface-2/40 p-3 text-xs text-muted-foreground">
              Atendimento digital contínuo com suporte comercial especializado em Luanda e Angola.
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-border/40 pt-2 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>© 2026 Agentes Digital. Todos os direitos reservados.</p>
          <p>Sistemas Digitais que trabalham 24/7.</p>
        </div>
      </div>
    </footer>
  );
}
