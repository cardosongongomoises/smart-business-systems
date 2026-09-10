import { ArrowLeft, ShieldCheck, FileText, Printer, CheckCircle, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function PrivacyPolicy() {
  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: "1", title: "1. Identificação do Responsável" },
    { id: "2", title: "2. Que Dados Podemos Recolher" },
    { id: "3", title: "3. Como Recolhemos os Dados" },
    { id: "4", title: "4. Finalidades do Tratamento" },
    { id: "5", title: "5. Inteligência Artificial e Automação" },
    { id: "6", title: "6. Dados de Clientes dos Nossos Clientes" },
    { id: "7", title: "7. Partilha de Dados" },
    { id: "8", title: "8. Transferência Internacional de Dados" },
    { id: "9", title: "9. Segurança" },
    { id: "10", title: "10. Conservação dos Dados" },
    { id: "11", title: "11. Cookies" },
    { id: "12", title: "12. Comunicações de Marketing" },
    { id: "13", title: "13. Direitos do Titular dos Dados" },
    { id: "14", title: "14. Reclamações" },
    { id: "15", title: "15. Links para Terceiros" },
    { id: "16", title: "16. Actualizações desta Política" },
    { id: "17", title: "17. Contacto" },
  ];

  return (
    <div id="topo" className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Actions / Breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-border/60">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>Voltar à Página Inicial</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/termos"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
              >
                Ver Termos de Serviço →
              </Link>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-surface/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors cursor-pointer"
              >
                <Printer className="size-3.5" />
                <span>Imprimir / Salvar PDF</span>
              </button>
            </div>
          </div>

          {/* Title Header Card */}
          <div className="rounded-2xl border border-border/80 bg-surface/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden mb-10 shadow-sm">
            <div className="pointer-events-none absolute -right-12 -bottom-12 size-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <Lock className="size-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/15 text-primary border border-primary/30">
                Privacidade & Protecção de Dados
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              POLÍTICA DE PRIVACIDADE
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">Última atualização:</strong> 10 de Setembro de 2026
            </p>

            <div className="mt-6 pt-6 border-t border-border/60 text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                A <strong className="text-foreground font-semibold">Agentes Digital</strong> valoriza a privacidade e a segurança das informações dos seus visitantes, clientes e parceiros.
              </p>
              <p>
                Esta Política de Privacidade explica como recolhemos, utilizamos, armazenamos, protegemos e, quando necessário, partilhamos dados pessoais através do website{" "}
                <strong className="text-foreground font-semibold">agentes-digital.com</strong>, dos nossos canais de comunicação e dos serviços digitais que disponibilizamos.
              </p>
              <p className="p-3 rounded-lg bg-surface-2/60 border border-border/60 text-xs text-foreground/90 font-medium">
                Ao utilizar o nosso website ou fornecer voluntariamente os seus dados, o utilizador declara ter tomado conhecimento desta Política de Privacidade.
              </p>
            </div>
          </div>

          {/* Quick Navigation Drawer / Table of Contents */}
          <div className="rounded-xl border border-border/60 bg-surface-2/30 p-5 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <FileText className="size-3.5 text-primary" /> Índice das Cláusulas (1 a 17)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#secao-${sec.id}`}
                  className="p-1.5 rounded hover:bg-surface-2 text-muted-foreground hover:text-primary transition-colors truncate"
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Privacy Content Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
            {/* 1. IDENTIFICAÇÃO DO RESPONSÁVEL */}
            <section id="secao-1" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">1</span>
                IDENTIFICAÇÃO DO RESPONSÁVEL
              </h2>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p><strong className="text-foreground">Nome comercial:</strong> Agentes Digital</p>
                <p><strong className="text-foreground">Website:</strong> agentes-digital.com</p>
                <p><strong className="text-foreground">E-mail:</strong> [inserir e-mail oficial]</p>
                <p><strong className="text-foreground">Telefone/WhatsApp:</strong> [inserir contacto oficial]</p>
                <p><strong className="text-foreground">Endereço:</strong> [inserir endereço da empresa]</p>
                <p><strong className="text-foreground">NIF:</strong> [inserir NIF]</p>
              </div>
              <p className="mt-4 text-xs italic text-muted-foreground/80 pt-3 border-t border-border/40">
                A Agentes Digital actua como responsável pelo tratamento dos dados pessoais recolhidos directamente através dos seus canais, sem prejuízo das situações em que actue como prestador de serviços e trate dados por conta de um cliente.
              </p>
            </section>

            {/* 2. QUE DADOS PODEMOS RECOLHER */}
            <section id="secao-2" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">2</span>
                QUE DADOS PODEMOS RECOLHER
              </h2>
              <p className="mb-4">
                Dependendo da forma como o utilizador interage connosco, poderemos recolher:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-surface/30 border border-border/40">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    2.1. Dados de contacto
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    {["Nome", "Número de telefone", "Número de WhatsApp", "Endereço de e-mail", "Nome da empresa", "Cargo ou função profissional"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="size-3 text-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface/30 border border-border/40">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    2.2. Dados relacionados com projectos
                  </h3>
                  <p className="text-xs mb-2">
                    Quando solicitado um orçamento ou serviço, poderemos recolher informações necessárias para compreender o projecto, tais como:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    {[
                      "Tipo de negócio",
                      "Serviços pretendidos",
                      "Objectivos do projecto",
                      "Informações fornecidas voluntariamente pelo cliente",
                      "Preferências técnicas ou comerciais",
                      "Informações necessárias à execução do serviço",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="size-3 text-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface/30 border border-border/40">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    2.3. Dados técnicos
                  </h3>
                  <p className="text-xs mb-2">
                    Quando o utilizador visita o website, determinados dados técnicos poderão ser recolhidos automaticamente, incluindo:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs mb-3">
                    {[
                      "Endereço IP",
                      "Tipo de dispositivo",
                      "Sistema operativo",
                      "Navegador",
                      "Páginas visitadas",
                      "Data e hora de acesso",
                      "Dados de utilização e desempenho do website",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="size-3 text-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground/90">
                    A recolha destes dados poderá ser utilizada para segurança, diagnóstico, estatísticas e melhoria da experiência do utilizador.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. COMO RECOLHEMOS OS DADOS */}
            <section id="secao-3" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">3</span>
                COMO RECOLHEMOS OS DADOS
              </h2>
              <p className="mb-3">Os dados podem ser recolhidos através de:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-sm mb-4">
                {[
                  "Formulários do website",
                  "Formulários de contacto",
                  "Pedidos de orçamento",
                  "WhatsApp",
                  "E-mail",
                  "Chamadas telefónicas",
                  "Agendamento de reuniões",
                  "Processos de contratação",
                  "Comunicação durante a execução dos projectos",
                  "Ferramentas de análise e segurança do website",
                  "Sistemas de CRM e automação",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="size-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-border/40">
                Quando os dados forem recolhidos directamente junto do titular, procuraremos fornecer informação adequada sobre o responsável, finalidade e natureza do tratamento, em conformidade com a legislação aplicável.
              </p>
            </section>

            {/* 4. FINALIDADES DO TRATAMENTO */}
            <section id="secao-4" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">4</span>
                FINALIDADES DO TRATAMENTO
              </h2>
              <p className="mb-3">Os dados pessoais poderão ser utilizados para:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-sm mb-4">
                {[
                  "Responder a pedidos de contacto",
                  "Preparar propostas e orçamentos",
                  "Agendar reuniões",
                  "Prestar os serviços contratados",
                  "Gerir projectos e clientes",
                  "Prestar suporte técnico",
                  "Enviar informações relacionadas com serviços solicitados",
                  "Realizar acompanhamento comercial",
                  "Melhorar os nossos websites, serviços e processos",
                  "Detectar e prevenir actividades fraudulentas ou abusivas",
                  "Garantir segurança dos sistemas",
                  "Cumprir obrigações legais",
                  "Enviar comunicações de marketing quando exista fundamento legal adequado ou consentimento quando exigido",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="size-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-foreground/90 p-3 rounded-lg bg-surface-2/40 border border-border/40">
                Os dados não serão utilizados para finalidades incompatíveis com aquelas para as quais foram recolhidos, salvo quando permitido ou exigido pela legislação aplicável.
              </p>
            </section>

            {/* 5. INTELIGÊNCIA ARTIFICIAL E AUTOMAÇÃO */}
            <section id="secao-5" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">5</span>
                INTELIGÊNCIA ARTIFICIAL E AUTOMAÇÃO
              </h2>
              <p className="mb-3">
                A Agentes Digital disponibiliza soluções que podem utilizar Inteligência Artificial, automação, CRM e sistemas de atendimento.
              </p>
              <p className="mb-2">
                Quando um utilizador interage com um agente de IA disponibilizado pela Agentes Digital, determinadas informações poderão ser processadas para:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm mb-4">
                <li>responder a perguntas;</li>
                <li>compreender pedidos;</li>
                <li>qualificar oportunidades;</li>
                <li>agendar reuniões;</li>
                <li>encaminhar solicitações;</li>
                <li>realizar follow-up;</li>
                <li>executar tarefas automatizadas.</li>
              </ul>
              <p className="mb-3 text-xs text-muted-foreground/90">
                A Inteligência Artificial poderá cometer erros. Informações importantes, decisões comerciais ou questões que exijam análise humana poderão ser encaminhadas para um membro da equipa.
              </p>
              <p className="text-xs font-semibold text-primary">
                A Agentes Digital não utiliza a IA como substituição absoluta da intervenção humana quando esta seja necessária.
              </p>
            </section>

            {/* 6. DADOS DE CLIENTES DOS NOSSOS CLIENTES */}
            <section id="secao-6" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">6</span>
                DADOS DE CLIENTES DOS NOSSOS CLIENTES
              </h2>
              <p className="mb-3">
                Quando a Agentes Digital desenvolve websites, CRM, automações ou agentes de IA para uma empresa cliente, poderá processar dados pertencentes aos utilizadores dessa empresa.
              </p>
              <p className="mb-3">
                Nessas situações, dependendo da estrutura contratual e da natureza do tratamento, a empresa cliente poderá ser a responsável pelo tratamento dos dados e a Agentes Digital poderá actuar como prestadora de serviços ou subcontratada.
              </p>
              <p className="mb-3">
                O cliente é responsável por garantir que possui base legal adequada para recolher e utilizar os dados dos seus próprios clientes.
              </p>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-border/40">
                A Agentes Digital procurará tratar esses dados apenas de acordo com as instruções legítimas do cliente e com as obrigações contratuais e legais aplicáveis.
              </p>
            </section>

            {/* 7. PARTILHA DE DADOS */}
            <section id="secao-7" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">7</span>
                PARTILHA DE DADOS
              </h2>
              <p className="mb-3 font-semibold text-foreground">
                A Agentes Digital não comercializa dados pessoais dos seus utilizadores.
              </p>
              <p className="mb-2">Os dados poderão ser partilhados ou disponibilizados, quando necessário, com:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm mb-4">
                <li>fornecedores de alojamento;</li>
                <li>serviços de domínio e DNS;</li>
                <li>plataformas de e-mail;</li>
                <li>plataformas de CRM;</li>
                <li>plataformas de automação;</li>
                <li>fornecedores de Inteligência Artificial;</li>
                <li>serviços de WhatsApp ou comunicação;</li>
                <li>fornecedores de análise e segurança;</li>
                <li>prestadores técnicos;</li>
                <li>autoridades públicas quando exista obrigação legal.</li>
              </ul>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-border/40">
                Sempre que possível e adequado, procuraremos trabalhar com fornecedores que adoptem medidas razoáveis de segurança e protecção de dados.
              </p>
            </section>

            {/* 8. TRANSFERÊNCIA INTERNACIONAL DE DADOS */}
            <section id="secao-8" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">8</span>
                TRANSFERÊNCIA INTERNACIONAL DE DADOS
              </h2>
              <p className="mb-3">
                Alguns fornecedores tecnológicos utilizados pela Agentes Digital poderão armazenar ou processar informações fora de Angola.
              </p>
              <p className="text-xs text-foreground/90">
                Quando isso ocorrer, procuraremos adoptar medidas adequadas para proteger os dados e cumprir a legislação aplicável.
              </p>
            </section>

            {/* 9. SEGURANÇA */}
            <section id="secao-9" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">9</span>
                SEGURANÇA
              </h2>
              <p className="mb-3">
                Adoptamos medidas técnicas e organizacionais razoáveis destinadas a proteger os dados pessoais contra: acesso não autorizado, perda, destruição, alteração indevida, divulgação não autorizada e utilização abusiva.
              </p>
              <p className="mb-2">Entre as medidas poderão estar:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-sm mb-4">
                {[
                  "HTTPS / SSL",
                  "Controlo de acesso",
                  "Autenticação",
                  "Backups regulares",
                  "Monitorização contínua",
                  "Actualizações de software",
                  "Gestão rigorosa de permissões",
                  "Mecanismos de segurança de servidores e aplicações",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="size-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-border/40">
                Nenhum sistema conectado à Internet pode ser considerado absolutamente seguro.
              </p>
            </section>

            {/* 10. CONSERVAÇÃO DOS DADOS */}
            <section id="secao-10" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">10</span>
                CONSERVAÇÃO DOS DADOS
              </h2>
              <p className="mb-3">
                Os dados serão conservados apenas durante o período necessário para cumprir as finalidades para as quais foram recolhidos, cumprir obrigações legais, resolver litígios, executar contratos ou proteger os interesses legítimos da empresa.
              </p>
              <p className="text-xs text-muted-foreground/90">
                Quando os dados deixarem de ser necessários, poderão ser eliminados, anonimizados ou conservados quando existir obrigação legal que determine a sua manutenção.
              </p>
            </section>

            {/* 11. COOKIES */}
            <section id="secao-11" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">11</span>
                COOKIES
              </h2>
              <p className="mb-3">
                O website poderá utilizar cookies e tecnologias semelhantes para: funcionamento técnico, segurança, análise de utilização, melhoria da experiência, armazenamento de preferências, medição de desempenho e eventualmente marketing, quando aplicável.
              </p>
              <p className="mb-3">
                O utilizador poderá configurar o seu navegador para bloquear ou limitar determinados cookies.
              </p>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-border/40">
                O bloqueio de alguns cookies poderá afectar determinadas funcionalidades do website.
              </p>
            </section>

            {/* 12. COMUNICAÇÕES DE MARKETING */}
            <section id="secao-12" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">12</span>
                COMUNICAÇÕES DE MARKETING
              </h2>
              <p className="mb-2">
                A Agentes Digital poderá enviar comunicações comerciais sobre: novos serviços, actualizações, conteúdos, ofertas, eventos e soluções de tecnologia, IA e automação.
              </p>
              <p className="text-xs text-foreground/90 pt-3 border-t border-border/40">
                Quando aplicável, o utilizador poderá cancelar essas comunicações através do mecanismo disponibilizado na própria comunicação ou entrando em contacto connosco.
              </p>
            </section>

            {/* 13. DIREITOS DO TITULAR DOS DADOS */}
            <section id="secao-13" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">13</span>
                DIREITOS DO TITULAR DOS DADOS
              </h2>
              <p className="mb-3">
                Nos termos da legislação aplicável, o titular poderá exercer direitos relativos aos seus dados pessoais, incluindo, quando aplicável:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-sm mb-4">
                {[
                  "Direito à informação",
                  "Direito de acesso",
                  "Direito de rectificação",
                  "Direito de actualização",
                  "Direito de eliminação",
                  "Direito de oposição",
                  "Outros direitos previstos na legislação aplicável",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="size-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-lg bg-surface-2/60 border border-border/60 text-xs space-y-2 mb-3">
                <p className="font-semibold text-foreground">
                  A Agência de Protecção de Dados confirma estes direitos no âmbito da Lei n.º 22/11.
                </p>
                <p>
                  Para exercer os seus direitos, contacte:{" "}
                  <strong className="text-primary font-mono">privacidade@agentes-digital.com</strong>
                </p>
                <p className="text-muted-foreground/90">Assunto: Pedido de Protecção de Dados</p>
              </div>
              <p className="text-xs italic text-muted-foreground/80">
                Poderemos solicitar informações razoáveis para confirmar a identidade do solicitante antes de processar determinados pedidos.
              </p>
            </section>

            {/* 14. RECLAMAÇÕES */}
            <section id="secao-14" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">14</span>
                RECLAMAÇÕES
              </h2>
              <p className="mb-3">
                Caso o utilizador considere que os seus dados foram tratados de forma inadequada, poderá contactar primeiro a Agentes Digital para procurarmos resolver a situação.
              </p>
              <p className="text-xs text-foreground/90">
                O titular mantém também os direitos que lhe sejam conferidos pela legislação aplicável perante a autoridade competente de protecção de dados.
              </p>
            </section>

            {/* 15. LINKS PARA TERCEIROS */}
            <section id="secao-15" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">15</span>
                LINKS PARA TERCEIROS
              </h2>
              <p className="mb-3">
                O website poderá conter links para websites, plataformas ou serviços de terceiros.
              </p>
              <p className="text-xs italic text-muted-foreground/80">
                A Agentes Digital não controla as políticas de privacidade desses terceiros e recomenda que o utilizador consulte as respectivas políticas antes de fornecer dados pessoais.
              </p>
            </section>

            {/* 16. ACTUALIZAÇÕES DESTA POLÍTICA */}
            <section id="secao-16" className="scroll-mt-24 p-6 rounded-xl border border-border/60 bg-surface/20">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">16</span>
                ACTUALIZAÇÕES DESTA POLÍTICA
              </h2>
              <p className="mb-2">Esta Política poderá ser actualizada periodicamente para reflectir:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm mb-3">
                <li>alterações legais;</li>
                <li>alterações tecnológicas;</li>
                <li>novos serviços;</li>
                <li>alterações na forma como os dados são tratados.</li>
              </ul>
              <p className="text-xs text-muted-foreground/80 pt-3 border-t border-border/40">
                A versão mais recente estará disponível nesta página.
              </p>
            </section>

            {/* 17. CONTACTO */}
            <section id="secao-17" className="scroll-mt-24 p-6 rounded-xl border border-primary/40 bg-primary/5">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="size-6 rounded-md bg-primary text-white flex items-center justify-center text-xs font-mono font-bold">17</span>
                CONTACTO
              </h2>
              <p className="mb-3">Para questões relacionadas com privacidade e protecção de dados:</p>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p><strong className="text-foreground">Agentes Digital</strong></p>
                <p><strong className="text-foreground">Website:</strong> agentes-digital.com</p>
                <p><strong className="text-foreground">E-mail:</strong> [inserir e-mail]</p>
                <p><strong className="text-foreground">WhatsApp:</strong> [inserir número]</p>
                <p><strong className="text-foreground">Endereço:</strong> [inserir endereço]</p>
              </div>
              <p className="mt-4 text-xs font-bold text-primary pt-3 border-t border-primary/20">
                Última actualização: 10 de Setembro de 2026.
              </p>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 pt-6 border-t border-border/60 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              <span>Voltar à Página Inicial</span>
            </Link>
            <a
              href="#topo"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Voltar ao Topo ↑
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
