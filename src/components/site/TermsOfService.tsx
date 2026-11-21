import { ArrowLeft, ShieldCheck, FileText, Printer, CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { EMAIL, WHATSAPP_DISPLAY, LOCATION } from "@/lib/site-config";

export function TermsOfService() {
  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: "1", title: "1. Identificação" },
    { id: "2", title: "2. Objecto dos Serviços" },
    { id: "3", title: "3. Propostas e Orçamentos" },
    { id: "4", title: "4. Contratação" },
    { id: "5", title: "5. Pagamentos" },
    { id: "6", title: "6. Planos Mensais" },
    { id: "7", title: "7. Domínios" },
    { id: "8", title: "8. Alojamento e Serviços de Terceiros" },
    { id: "9", title: "9. Inteligência Artificial" },
    { id: "10", title: "10. Responsabilidade do Cliente" },
    { id: "11", title: "11. Conteúdos Fornecidos pelo Cliente" },
    { id: "12", title: "12. Propriedade Intelectual" },
    { id: "13", title: "13. Portfólio" },
    { id: "14", title: "14. Prazos" },
    { id: "15", title: "15. Alterações de Escopo" },
    { id: "16", title: "16. Manutenção e Suporte" },
    { id: "17", title: "17. Suspensão dos Serviços" },
    { id: "18", title: "18. Cancelamento" },
    { id: "19", title: "19. Garantia e Correcção de Erros" },
    { id: "20", title: "20. Disponibilidade dos Serviços" },
    { id: "21", title: "21. Limitação de Resultados" },
    { id: "22", title: "22. Utilização Proibida" },
    { id: "23", title: "23. Protecção de Dados" },
    { id: "24", title: "24. Segurança" },
    { id: "25", title: "25. Responsabilidade" },
    { id: "26", title: "26. Força Maior" },
    { id: "27", title: "27. Alterações dos Termos" },
    { id: "28", title: "28. Legislação Aplicável" },
    { id: "29", title: "29. Resolução de Conflitos" },
    { id: "30", title: "30. Contacto" },
  ];

  return (
    <div
      id="topo"
      className="min-h-screen bg-[#F5F3EE] text-[#101D35] flex flex-col selection:bg-[#F4C542] selection:text-[#101D35]"
    >
      <Header />

      <main className="flex-1 pt-24 sm:pt-28 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Actions / Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-8 pb-4 border-b border-[#E7E3D9]">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B6B8C] hover:text-[#D9531C] transition-colors"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Voltar à Página Inicial</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/privacidade"
                className="text-xs font-medium text-[#5B6B8C] hover:text-[#101D35] transition-colors hidden sm:inline"
              >
                Ver Política de Privacidade →
              </Link>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#E7E3D9] bg-[#FFFFFF] text-xs font-semibold text-[#101D35] hover:border-[#101D35] transition-colors cursor-pointer"
              >
                <Printer className="size-3.5" aria-hidden="true" />
                <span>Imprimir / Salvar PDF</span>
              </button>
            </div>
          </div>

          {/* Title Header Card */}
          <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-8 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-[10px] bg-[#101D35] flex items-center justify-center text-[#F4C542] shrink-0">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <span className="lume-eyebrow text-[#D9531C]">Documento Legal Oficial</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101D35]">
              TERMOS DE SERVIÇO
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#5B6B8C]">
              <strong className="text-[#101D35]">Última atualização:</strong> 10 de Setembro de 2026
            </p>

            <div className="mt-6 pt-6 border-t border-[#E7E3D9] text-sm text-[#5B6B8C] leading-relaxed space-y-3">
              <p>
                Bem-vindo à{" "}
                <strong className="text-[#101D35] font-semibold">Agentes Digital</strong>.
              </p>
              <p>
                Estes Termos de Serviço estabelecem as condições gerais aplicáveis à utilização do
                website{" "}
                <strong className="text-[#101D35] font-semibold">agentes-digital.com</strong>, à
                contratação dos nossos serviços e à utilização das soluções digitais fornecidas pela
                Agentes Digital.
              </p>
              <p className="p-3.5 rounded-[10px] bg-[#F5F3EE] border border-[#E7E3D9] text-xs text-[#101D35] font-medium">
                Ao utilizar o website, solicitar uma proposta ou contratar os nossos serviços, o
                utilizador declara que leu e compreendeu estes Termos.
              </p>
            </div>
          </div>

          {/* Quick Navigation Drawer / Table of Contents */}
          <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 mb-10">
            <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-[#5B6B8C] mb-3 flex items-center gap-2">
              <FileText className="size-3.5 text-[#D9531C]" aria-hidden="true" /> Índice Rápido das
              Cláusulas (1 a 30)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#secao-${sec.id}`}
                  className="p-2 rounded-[8px] hover:bg-[#F5F3EE] text-[#5B6B8C] hover:text-[#D9531C] font-medium transition-colors truncate"
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
            {/* 1. IDENTIFICAÇÃO */}
            <section
              id="secao-1"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  1
                </span>
                IDENTIFICAÇÃO
              </h2>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p>
                  <strong className="text-foreground">Nome comercial:</strong> Agentes Digital
                </p>
                <p>
                  <strong className="text-foreground">Website:</strong> agentes-digital.com
                </p>
                <p>
                  <strong className="text-foreground">E-mail:</strong> {EMAIL}
                </p>
                <p>
                  <strong className="text-foreground">Telefone/WhatsApp:</strong> {WHATSAPP_DISPLAY}
                </p>
                <p>
                  <strong className="text-foreground">Endereço:</strong> {LOCATION}
                </p>
                <p>
                  <strong className="text-foreground">NIF:</strong> Constante em fatura ou contrato
                  aplicável
                </p>
              </div>
              <p className="mt-4 text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                A identificação jurídica completa da entidade contratante deverá constar da
                proposta, factura ou contrato aplicável.
              </p>
            </section>

            {/* 2. OBJECTO DOS SERVIÇOS */}
            <section
              id="secao-2"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  2
                </span>
                OBJECTO DOS SERVIÇOS
              </h2>
              <p className="mb-3">
                A Agentes Digital presta serviços relacionados com tecnologia e transformação
                digital, incluindo, entre outros:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {[
                  "Desenvolvimento de websites",
                  "Landing pages",
                  "Sistemas web",
                  "Integrações",
                  "Automação de processos",
                  "Agentes de Inteligência Artificial",
                  "Atendimento automatizado",
                  "Integração com WhatsApp",
                  "Integração com e-mail",
                  "CRM",
                  "Agendamento online",
                  "SEO e presença digital",
                  "Google Business Profile",
                  "Dashboards",
                  "Desenvolvimento de soluções personalizadas",
                  "Manutenção e suporte técnico",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="size-3.5 text-[#2E9E6B] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                O serviço efectivamente contratado será definido na proposta comercial, orçamento,
                contrato, ordem de serviço ou documento equivalente.
              </p>
            </section>

            {/* 3. PROPOSTAS E ORÇAMENTOS */}
            <section
              id="secao-3"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  3
                </span>
                PROPOSTAS E ORÇAMENTOS
              </h2>
              <p className="mb-3">
                As informações apresentadas no website têm carácter informativo e não constituem
                necessariamente uma proposta contratual definitiva. Cada projecto poderá possuir
                requisitos, prazos, integrações e custos diferentes.
              </p>
              <p className="mb-2">
                A proposta comercial enviada ao cliente deverá indicar, conforme aplicável:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm mb-4">
                <li>serviços incluídos;</li>
                <li>entregáveis;</li>
                <li>preço;</li>
                <li>condições de pagamento;</li>
                <li>prazo estimado;</li>
                <li>responsabilidades do cliente;</li>
                <li>responsabilidades da Agentes Digital;</li>
                <li>limites de suporte;</li>
                <li>serviços de terceiros;</li>
                <li>condições específicas do projecto.</li>
              </ul>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                Em caso de conflito entre estes Termos e um contrato específico assinado pelas
                partes, prevalecerão as condições específicas do contrato, na medida permitida pela
                lei.
              </p>
            </section>

            {/* 4. CONTRATAÇÃO */}
            <section
              id="secao-4"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  4
                </span>
                CONTRATAÇÃO
              </h2>
              <p className="mb-3">
                A contratação será considerada concluída quando houver aceitação da proposta e/ou
                assinatura do contrato aplicável, acompanhada dos procedimentos de pagamento
                eventualmente previstos.
              </p>
              <p className="mb-3">
                Nos contratos celebrados electronicamente, serão observadas as regras legais
                aplicáveis aos contratos electrónicos.
              </p>
              <p className="text-xs text-muted-foreground/90">
                A legislação angolana prevê regras específicas para a celebração de contratos
                electrónicos e para a informação que deve ser disponibilizada aos destinatários
                antes da contratação.
              </p>
            </section>

            {/* 5. PAGAMENTOS */}
            <section
              id="secao-5"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  5
                </span>
                PAGAMENTOS
              </h2>
              <p className="mb-3">
                Os preços e condições de pagamento serão definidos na proposta comercial ou
                contrato. Dependendo do projecto, poderá ser solicitado:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm mb-4">
                <li>pagamento inicial para início do projecto;</li>
                <li>pagamentos por etapas;</li>
                <li>pagamento integral;</li>
                <li>mensalidade de manutenção;</li>
                <li>mensalidade de infraestrutura;</li>
                <li>mensalidade de automação ou IA.</li>
              </ul>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                Impostos, taxas de terceiros, serviços externos ou custos extraordinários serão
                tratados conforme indicado na proposta.
              </p>
            </section>

            {/* 6. PLANOS MENSAIS */}
            <section
              id="secao-6"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  6
                </span>
                PLANOS MENSAIS
              </h2>
              <p className="mb-3">
                Quando contratado um plano mensal, este poderá incluir, conforme o plano:
                alojamento, domínio, certificado SSL, backups, monitorização, actualizações,
                manutenção, suporte, pequenas alterações, automações, serviços de IA, CRM e
                integrações.
              </p>
              <p className="mb-3">
                Os limites de utilização, quantidade de alterações, horas de suporte, mensagens,
                contactos, conversas de IA ou outros recursos poderão variar conforme o plano
                contratado.
              </p>
              <p className="text-xs font-semibold text-[#D9531C]">
                Serviços que excedam os limites contratados poderão ser cobrados separadamente.
              </p>
            </section>

            {/* 7. DOMÍNIOS */}
            <section
              id="secao-7"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  7
                </span>
                DOMÍNIOS
              </h2>
              <p className="mb-3">
                Quando a Agentes Digital gerir o registo de um domínio para o cliente, procuraremos,
                sempre que tecnicamente e comercialmente possível, registar o domínio em nome do
                próprio cliente.
              </p>
              <p className="mb-3">
                A Agentes Digital poderá efectuar a configuração, gestão técnica e renovação do
                domínio conforme contratado. A disponibilidade, renovação, suspensão ou
                transferência de um domínio também poderá depender das regras da entidade
                registradora ou fornecedor utilizado.
              </p>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                A perda de um domínio causada por informações incorrectas fornecidas pelo cliente,
                falta de pagamento ou incumprimento das regras do registrador poderá não ser
                imputável à Agentes Digital.
              </p>
            </section>

            {/* 8. ALOJAMENTO E SERVIÇOS DE TERCEIROS */}
            <section
              id="secao-8"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  8
                </span>
                ALOJAMENTO E SERVIÇOS DE TERCEIROS
              </h2>
              <p className="mb-3">
                Os nossos serviços podem depender de plataformas externas, tais como: Vercel,
                provedores de alojamento, fornecedores de domínio, Google, Meta, WhatsApp, serviços
                de e-mail, plataformas de CRM, fornecedores de IA, gateways de pagamento, APIs e
                serviços de automação.
              </p>
              <p className="mb-3">
                A disponibilidade e funcionamento desses serviços dependem dos respectivos
                fornecedores. Alterações de preços, políticas, limites, APIs, interrupções ou
                encerramentos realizados por terceiros poderão afectar determinado serviço.
              </p>
              <p className="text-xs text-foreground/90">
                Quando uma alteração exigir trabalho adicional para manter ou substituir uma
                integração, esse trabalho poderá ser orçamentado separadamente.
              </p>
            </section>

            {/* 9. INTELIGÊNCIA ARTIFICIAL */}
            <section
              id="secao-9"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  9
                </span>
                INTELIGÊNCIA ARTIFICIAL
              </h2>
              <p className="mb-3">
                Alguns serviços da Agentes Digital utilizam Inteligência Artificial para:
                atendimento, respostas automáticas, qualificação de leads, agendamento, follow-up,
                processamento de linguagem, geração de conteúdos, classificação de informações e
                automação de tarefas.
              </p>
              <p className="mb-3">
                Embora sejam adoptadas medidas para melhorar a qualidade dos sistemas, respostas
                produzidas por IA podem conter erros, omissões ou interpretações incorrectas. O
                cliente deve definir quais decisões podem ser automatizadas e quais devem exigir
                intervenção humana.
              </p>
              <p className="text-xs font-semibold text-[#101D35] bg-[#FCF0C8] p-3.5 rounded-[10px] border border-[#F4C542]">
                A Agentes Digital não garante que uma solução de IA produzirá resultados comerciais
                específicos, determinado número de clientes, vendas, leads ou receitas.
              </p>
            </section>

            {/* 10. RESPONSABILIDADE DO CLIENTE */}
            <section
              id="secao-10"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  10
                </span>
                RESPONSABILIDADE DO CLIENTE
              </h2>
              <p className="mb-2">O cliente é responsável por:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm mb-4">
                <li>fornecer informações correctas;</li>
                <li>fornecer conteúdos necessários ao projecto;</li>
                <li>possuir os direitos de utilização dos conteúdos fornecidos;</li>
                <li>disponibilizar acessos necessários;</li>
                <li>efectuar pagamentos dentro dos prazos;</li>
                <li>validar materiais e funcionalidades;</li>
                <li>informar alterações relevantes;</li>
                <li>utilizar os sistemas de acordo com a legislação.</li>
              </ul>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                O cliente não deverá fornecer à Agentes Digital informações pessoais, confidenciais
                ou sensíveis que não sejam necessárias para a execução do serviço.
              </p>
            </section>

            {/* 11. CONTEÚDOS FORNECIDOS PELO CLIENTE */}
            <section
              id="secao-11"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  11
                </span>
                CONTEÚDOS FORNECIDOS PELO CLIENTE
              </h2>
              <p className="mb-3">
                O cliente declara possuir os direitos necessários sobre textos, imagens, vídeos,
                logótipos, bases de dados, marcas e outros materiais fornecidos à Agentes Digital.
              </p>
              <p className="text-xs text-foreground/90">
                O cliente será responsável por reclamações de terceiros relacionadas com conteúdos
                cuja utilização tenha sido autorizada ou fornecida pelo próprio cliente.
              </p>
            </section>

            {/* 12. PROPRIEDADE INTELECTUAL */}
            <section
              id="secao-12"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  12
                </span>
                PROPRIEDADE INTELECTUAL
              </h2>
              <p className="mb-3">
                Salvo disposição diferente no contrato, permanecem propriedade da Agentes Digital:
                código-fonte próprio, frameworks internos, componentes reutilizáveis, bibliotecas
                próprias, metodologias, templates, sistemas internos, processos, documentação
                proprietária e ferramentas desenvolvidas previamente.
              </p>
              <p className="mb-3">
                Os direitos sobre os entregáveis especificamente desenvolvidos para o cliente serão
                definidos na proposta ou contrato.
              </p>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                Licenças, software de terceiros, imagens licenciadas, fontes, plugins, APIs e outros
                componentes externos permanecem sujeitos às respectivas licenças.
              </p>
            </section>

            {/* 13. PORTFÓLIO */}
            <section
              id="secao-13"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  13
                </span>
                PORTFÓLIO
              </h2>
              <p className="mb-3">
                Salvo acordo escrito em contrário, a Agentes Digital poderá apresentar projectos
                realizados para clientes no seu portfólio, website, apresentações e materiais
                comerciais.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Quando o projecto ou informações forem confidenciais, a utilização poderá ser
                limitada conforme estabelecido contratualmente.
              </p>
            </section>

            {/* 14. PRAZOS */}
            <section
              id="secao-14"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  14
                </span>
                PRAZOS
              </h2>
              <p className="mb-3">
                Os prazos apresentados pela Agentes Digital são estimativas, salvo quando um prazo
                vinculativo estiver expressamente estabelecido no contrato.
              </p>
              <p className="mb-2">O prazo poderá ser afectado por:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                <li>atrasos na entrega de conteúdos;</li>
                <li>falta de aprovação;</li>
                <li>alterações de escopo;</li>
                <li>atrasos de terceiros;</li>
                <li>indisponibilidade de APIs;</li>
                <li>problemas de domínio ou alojamento;</li>
                <li>alterações solicitadas pelo cliente;</li>
                <li>situações de força maior.</li>
              </ul>
            </section>

            {/* 15. ALTERAÇÕES DE ESCOPO */}
            <section
              id="secao-15"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  15
                </span>
                ALTERAÇÕES DE ESCOPO
              </h2>
              <p className="mb-3">
                Pedidos adicionais que não estejam incluídos no escopo original poderão gerar:
                alteração de prazo, custo adicional e necessidade de nova proposta.
              </p>
              <p className="text-xs font-semibold text-[#D9531C]">
                Nenhuma alteração relevante deverá ser considerada incluída automaticamente apenas
                por ter sido solicitada durante o projecto.
              </p>
            </section>

            {/* 16. MANUTENÇÃO E SUPORTE */}
            <section
              id="secao-16"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  16
                </span>
                MANUTENÇÃO E SUPORTE
              </h2>
              <p className="mb-3">
                A manutenção poderá incluir, conforme o plano contratado: actualizações, correcções,
                monitorização, backups, pequenas alterações e suporte técnico.
              </p>
              <p className="mb-2">Não estão necessariamente incluídos:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm mb-3">
                <li>reconstrução completa do website;</li>
                <li>desenvolvimento de novas funcionalidades;</li>
                <li>alterações estruturais significativas;</li>
                <li>novos sistemas;</li>
                <li>integrações adicionais;</li>
                <li>grandes alterações de design.</li>
              </ul>
              <p className="text-xs text-muted-foreground/80">
                Esses serviços poderão ser contratados separadamente.
              </p>
            </section>

            {/* 17. SUSPENSÃO DOS SERVIÇOS */}
            <section
              id="secao-17"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  17
                </span>
                SUSPENSÃO DOS SERVIÇOS
              </h2>
              <p className="mb-3">
                A Agentes Digital poderá suspender determinados serviços quando: existam pagamentos
                vencidos; haja utilização ilegal ou abusiva; exista risco de segurança; o sistema
                esteja a ser utilizado para actividades fraudulentas; exista violação grave destes
                Termos; a suspensão seja necessária para proteger sistemas, clientes ou terceiros.
              </p>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                Quando possível, o cliente será informado antes da suspensão.
              </p>
            </section>

            {/* 18. CANCELAMENTO */}
            <section
              id="secao-18"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  18
                </span>
                CANCELAMENTO
              </h2>
              <p className="mb-3">
                As condições de cancelamento dependerão do contrato ou plano contratado. No caso de
                serviços mensais, o cliente poderá solicitar o cancelamento nos termos definidos na
                contratação.
              </p>
              <p className="mb-3">
                Valores correspondentes a serviços já prestados, períodos já iniciados, serviços de
                terceiros ou custos não recuperáveis poderão continuar devidos, conforme a
                legislação aplicável e o contrato.
              </p>
              <p className="text-xs text-foreground/90">
                Direitos legalmente conferidos ao consumidor não são prejudicados por esta cláusula.
              </p>
            </section>

            {/* 19. GARANTIA E CORRECÇÃO DE ERROS */}
            <section
              id="secao-19"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  19
                </span>
                GARANTIA E CORRECÇÃO DE ERROS
              </h2>
              <p className="mb-3">
                A Agentes Digital procurará corrigir erros técnicos atribuíveis ao nosso trabalho
                dentro do período e condições estabelecidos no contrato.
              </p>
              <p className="mb-2">A garantia não cobre problemas provocados por:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                <li>alterações realizadas por terceiros;</li>
                <li>alterações realizadas pelo cliente;</li>
                <li>plugins ou APIs de terceiros;</li>
                <li>actualizações externas;</li>
                <li>utilização incorrecta;</li>
                <li>alterações de infraestrutura;</li>
                <li>incompatibilidades introduzidas posteriormente.</li>
              </ul>
            </section>

            {/* 20. DISPONIBILIDADE DOS SERVIÇOS */}
            <section
              id="secao-20"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  20
                </span>
                DISPONIBILIDADE DOS SERVIÇOS
              </h2>
              <p className="mb-3">
                A Agentes Digital procura manter os serviços disponíveis e funcionais, mas não
                garante disponibilidade absoluta ou ininterrupta. Podem ocorrer interrupções por:
                manutenção; falhas de infraestrutura; ataques informáticos; falhas de fornecedores;
                problemas de conectividade; indisponibilidade de APIs; acontecimentos de força
                maior.
              </p>
            </section>

            {/* 21. LIMITAÇÃO DE RESULTADOS */}
            <section
              id="secao-21"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  21
                </span>
                LIMITAÇÃO DE RESULTADOS
              </h2>
              <p className="mb-3">
                A Agentes Digital fornece tecnologia, estratégia, automação e sistemas destinados a
                apoiar os objectivos do cliente. Não garantimos:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm mb-3">
                <li>posição específica no Google;</li>
                <li>número específico de clientes;</li>
                <li>determinado volume de vendas;</li>
                <li>determinado número de leads;</li>
                <li>determinado retorno financeiro;</li>
                <li>crescimento garantido;</li>
                <li>funcionamento perfeito de sistemas de terceiros.</li>
              </ul>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                Os resultados comerciais dependem de diversos factores que podem estar fora do
                controlo da Agentes Digital.
              </p>
            </section>

            {/* 22. UTILIZAÇÃO PROIBIDA */}
            <section
              id="secao-22"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  22
                </span>
                UTILIZAÇÃO PROIBIDA
              </h2>
              <p className="mb-2">É proibida a utilização dos nossos serviços para:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                <li>actividades ilegais;</li>
                <li>fraude;</li>
                <li>phishing;</li>
                <li>distribuição de malware;</li>
                <li>invasão de sistemas;</li>
                <li>envio de spam;</li>
                <li>actividades que violem direitos de terceiros;</li>
                <li>conteúdos ilícitos;</li>
                <li>utilização abusiva de sistemas de IA;</li>
                <li>qualquer actividade que possa comprometer a segurança de terceiros.</li>
              </ul>
            </section>

            {/* 23. PROTECÇÃO DE DADOS */}
            <section
              id="secao-23"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  23
                </span>
                PROTECÇÃO DE DADOS
              </h2>
              <p className="mb-3">
                O tratamento de dados pessoais será realizado de acordo com a legislação aplicável e
                com a nossa <strong className="text-foreground">Política de Privacidade</strong>.
              </p>
              <p className="mb-3">
                A legislação angolana estabelece princípios como tratamento lícito e de boa-fé,
                finalidades determinadas e recolha adequada e não excessiva dos dados.
              </p>
              <p className="text-xs text-muted-foreground/80">
                A Política de Privacidade disponível no website integra estes Termos para efeitos de
                informação sobre o tratamento de dados.
              </p>
            </section>

            {/* 24. SEGURANÇA */}
            <section
              id="secao-24"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  24
                </span>
                SEGURANÇA
              </h2>
              <p className="mb-3">
                Adoptamos medidas razoáveis para proteger os sistemas e informações sob a nossa
                responsabilidade. Contudo, nenhum sistema conectado à Internet é completamente imune
                a ataques, falhas ou acessos não autorizados.
              </p>
              <p className="text-xs font-semibold text-[#D9531C]">
                O cliente também é responsável por proteger as suas credenciais e acessos.
              </p>
            </section>

            {/* 25. RESPONSABILIDADE */}
            <section
              id="secao-25"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  25
                </span>
                RESPONSABILIDADE
              </h2>
              <p className="mb-3">
                A responsabilidade da Agentes Digital será determinada de acordo com a legislação
                aplicável e com o contrato celebrado com o cliente.
              </p>
              <p className="text-xs italic text-muted-foreground/80 pt-3 border-t border-[#E7E3D9]">
                Nada nestes Termos pretende excluir ou limitar responsabilidades que não possam
                legalmente ser excluídas ou limitadas.
              </p>
            </section>

            {/* 26. FORÇA MAIOR */}
            <section
              id="secao-26"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  26
                </span>
                FORÇA MAIOR
              </h2>
              <p className="mb-2">
                Nenhuma das partes será considerada responsável por atrasos ou falhas resultantes de
                acontecimentos que estejam razoavelmente fora do seu controlo, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                <li>catástrofes naturais;</li>
                <li>falhas generalizadas de Internet;</li>
                <li>guerras;</li>
                <li>actos governamentais;</li>
                <li>pandemias;</li>
                <li>falhas graves de fornecedores;</li>
                <li>ataques cibernéticos de terceiros;</li>
                <li>interrupções de energia;</li>
                <li>outros eventos de força maior.</li>
              </ul>
            </section>

            {/* 27. ALTERAÇÕES DOS TERMOS */}
            <section
              id="secao-27"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  27
                </span>
                ALTERAÇÕES DOS TERMOS
              </h2>
              <p className="mb-3">
                A Agentes Digital poderá actualizar estes Termos para reflectir alterações nos
                serviços, legislação, tecnologia ou modelo de negócio. A versão mais recente será
                disponibilizada no website.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Alterações relevantes às condições contratuais de clientes existentes serão tratadas
                de acordo com o contrato aplicável e a legislação.
              </p>
            </section>

            {/* 28. LEGISLAÇÃO APLICÁVEL */}
            <section
              id="secao-28"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  28
                </span>
                LEGISLAÇÃO APLICÁVEL
              </h2>
              <p className="mb-3">
                Estes Termos serão interpretados de acordo com as leis aplicáveis da República de
                Angola, sem prejuízo dos direitos imperativos que possam ser aplicáveis ao
                consumidor ou a qualquer outra parte protegida por lei.
              </p>
              <p className="text-xs text-foreground/90">
                A legislação angolana de defesa do consumidor reconhece, entre outros, direitos
                relacionados com qualidade dos serviços, informação, liberdade de escolha e
                protecção contra publicidade enganosa ou abusiva.
              </p>
            </section>

            {/* 29. RESOLUÇÃO DE CONFLITOS */}
            <section
              id="secao-29"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]"
            >
              <h2 className="font-heading text-base font-bold text-[#101D35] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#101D35] text-[#F4C542] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  29
                </span>
                RESOLUÇÃO DE CONFLITOS
              </h2>
              <p className="mb-3">
                Em caso de conflito, as partes procurarão inicialmente resolver a questão por
                negociação directa.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Quando não for possível alcançar uma solução amigável, poderão ser utilizados os
                mecanismos administrativos, extrajudiciais ou judiciais disponíveis nos termos da
                legislação aplicável.
              </p>
            </section>

            {/* 30. CONTACTO */}
            <section
              id="secao-30"
              className="scroll-mt-24 p-6 rounded-[16px] border border-[#2A3D63] bg-[#101D35] text-[#F5F3EE]"
            >
              <h2 className="font-heading text-base font-bold text-[#F5F3EE] mb-3 flex items-center gap-2">
                <span className="size-6 rounded-[6px] bg-[#F36B32] text-[#101D35] flex items-center justify-center font-heading text-xs font-bold tabular-nums">
                  30
                </span>
                CONTACTO
              </h2>
              <p className="mb-3 text-[#B8C0D0]">Para questões relacionadas com estes Termos:</p>
              <div className="space-y-1.5 text-xs sm:text-sm text-[#B8C0D0]">
                <p>
                  <strong className="text-[#F5F3EE]">Agentes Digital</strong>
                </p>
                <p>
                  <strong className="text-[#F5F3EE]">Website:</strong> agentes-digital.com
                </p>
                <p>
                  <strong className="text-[#F5F3EE]">E-mail:</strong> {EMAIL}
                </p>
                <p>
                  <strong className="text-[#F5F3EE]">WhatsApp:</strong> {WHATSAPP_DISPLAY}
                </p>
                <p>
                  <strong className="text-[#F5F3EE]">Endereço:</strong> {LOCATION}
                </p>
              </div>
              <p className="mt-4 text-xs font-bold text-[#F4C542] pt-3 border-t border-[#2A3D63]">
                Última actualização: 10 de Setembro de 2026.
              </p>
            </section>
          </div>

          {/* Bottom Back button */}
          <div className="mt-12 pt-6 border-t border-[#E7E3D9] flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D9531C] hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Voltar à Página Inicial</span>
            </Link>
            <a
              href="#topo"
              className="text-xs font-medium text-[#5B6B8C] hover:text-[#101D35] transition-colors"
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
