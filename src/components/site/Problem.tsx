import {
  MessageSquare,
  Clock,
  LogOut,
  CheckCircle2,
  XCircle,
  ArrowRight,
  MessageSquareX,
  Shuffle,
  AlertCircle,
  CalendarClock,
  FileSpreadsheet,
  BarChart3,
} from "lucide-react";
import { Reveal } from "./Reveal";

const dailyFlow = [
  {
    icon: MessageSquare,
    title: "O cliente escreve quando precisa",
    text: "Envia mensagem no WhatsApp ou preenche o formulário fora de horas ou enquanto a equipa está em reunião.",
    status: "Contacto iniciado",
  },
  {
    icon: Clock,
    title: "A resposta fica para mais tarde",
    text: "Entre tarefas internas, chamadas e atendimento presencial, passam minutos ou horas até alguém responder.",
    status: "Sem retorno imediato",
  },
  {
    icon: LogOut,
    title: "O pedido esfria sem deixar rasto",
    text: "Quando finalmente respondem, o interessado já falou com outra empresa ou perdeu a urgência inicial.",
    status: "Oportunidade perdida",
  },
];

const operationalProblems = [
  {
    icon: Clock,
    title: "1. Demora no primeiro contacto",
    text: "Pedidos que chegam no WhatsApp ou no site ficam à espera enquanto a equipa resolve o expediente.",
  },
  {
    icon: MessageSquareX,
    title: "2. Perguntas repetitivas todos os dias",
    text: "Preços base, localização, horários e documentos consomem tempo que devia ir para fechar propostas.",
  },
  {
    icon: Shuffle,
    title: "3. Contactos espalhados sem histórico",
    text: "Conversas em vários telemóveis, e-mails e folhas soltas impedem saber quem já foi acompanhado.",
  },
  {
    icon: AlertCircle,
    title: "4. Falta de follow-up comercial",
    text: "Propostas enviadas ficam sem retorno porque ninguém tem um lembrete automático nos dias certos.",
  },
  {
    icon: CalendarClock,
    title: "5. Reuniões sem confirmação",
    text: "Trocas longas para marcar uma hora e ausências evitáveis por falta de lembretes automáticos.",
  },
  {
    icon: FileSpreadsheet,
    title: "6. Tarefas manuais repetitivas",
    text: "Copiar dados de clientes, atualizar registos e preparar resumos diários consome horas da equipa.",
  },
  {
    icon: BarChart3,
    title: "7. Pouca visibilidade para a gestão",
    text: "Sem organização centralizada, torna-se difícil acompanhar quantos pedidos entraram e avançaram.",
  },
];

export function Problem() {
  return (
    <section
      id="problema"
      className="relative py-24 sm:py-32 bg-[#101D35] text-[#F5F3EE] border-t border-[#2A3D63] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#F36B32]">01 · O problema no dia a dia</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-[1.15] font-bold text-[#F5F3EE] sm:text-4xl text-balance">
            Muitas empresas não perdem clientes por falta de qualidade. Perdem por demora no
            atendimento e falhas no acompanhamento.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-5 max-w-[65ch] space-y-3 text-base leading-[1.65] text-[#B8C0D0]">
            <p>
              Quando uma empresa cresce, o WhatsApp enche, os e-mails acumulam-se e a equipa tenta
              atender clientes ao mesmo tempo que executa o trabalho diário.
            </p>
            <p>
              Sem um sistema organizado, o atendimento abranda, os follow-ups falham e oportunidades
              que custaram esforço a atrair acabam por não avançar.
            </p>
          </div>
        </Reveal>

        {/* Hook: 3 stages of a missed contact */}
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {dailyFlow.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 80}>
              <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 transition-colors duration-200 hover:border-[#F36B32]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#F36B32]">
                      <c.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-xs font-bold text-[#B8C0D0] tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-[#F5F3EE]">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#B8C0D0]">{c.text}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#2A3D63] flex items-center justify-between text-xs">
                  <span className="text-[#B8C0D0]">Etapa</span>
                  <span
                    className={
                      i === 2 ? "text-[#F4C542] font-semibold" : "text-[#F5F3EE] font-medium"
                    }
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Agitation without invented stats */}
        <Reveal delay={80}>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6">
              <p className="lume-eyebrow text-[#F4C542]">Impacto nas vendas</p>
              <h3 className="mt-2 font-heading text-lg font-bold text-[#F5F3EE]">
                Oportunidades que não avançam por falta de acompanhamento
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#B8C0D0]">
                Em mercados onde o cliente envia mensagem para duas ou três empresas ao mesmo tempo,
                quem responde com clareza e acompanha o pedido ganha vantagem logo no primeiro
                contacto.
              </p>
            </div>

            <div className="rounded-[16px] border border-[#F36B32]/50 bg-[#1A2A4A] p-6">
              <p className="lume-eyebrow text-[#F36B32]">Impacto na equipa</p>
              <h3 className="mt-2 font-heading text-lg font-bold text-[#F5F3EE]">
                Horas perdidas em tarefas que podiam estar automatizadas
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#B8C0D0]">
                Responder sempre às mesmas dúvidas, copiar dados entre aplicações e lembrar cada
                follow-up à mão reduz a produtividade e aumenta a margem de erro operacional.
              </p>
            </div>
          </div>
        </Reveal>

        {/* 7 Concrete Problems */}
        <Reveal delay={110}>
          <div className="mt-12">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F3EE]">
              Sete entraves que travam o atendimento e a operação comercial
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {operationalProblems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[14px] border border-[#2A3D63] bg-[#1A2A4A] p-5"
                >
                  <item.icon className="size-5 text-[#F36B32]" aria-hidden="true" />
                  <h4 className="mt-3.5 font-heading text-sm font-bold text-[#F5F3EE]">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#B8C0D0]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Illustrative Story (Before / After) */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-8">
            <div className="border-b border-[#2A3D63] pb-5">
              <p className="lume-eyebrow text-[#F4C542]">Cenário ilustrativo</p>
              <h3 className="mt-2 font-heading text-xl sm:text-2xl font-bold text-[#F5F3EE]">
                Como um dia normal muda quando o atendimento e os processos estão organizados
              </h3>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-[12px] border border-[#D64545]/50 bg-[#101D35] p-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A3D63]">
                  <span className="inline-flex items-center gap-2 font-heading text-sm font-bold text-[#F5F3EE] uppercase tracking-wider">
                    <XCircle className="size-4 text-[#D64545]" aria-hidden="true" />
                    Sem estrutura automática
                  </span>
                  <span className="text-xs font-medium text-[#D64545]">Desgaste diário</span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#B8C0D0]">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Mensagens acumuladas:</strong> pedidos da
                      tarde e da noite só são vistos no dia seguinte, já sem o mesmo interesse.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Informação fragmentada:</strong> perguntas
                      básicas respondidas à mão e orçamentos sem seguimento.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Equipa sobrecarregada:</strong> comerciais
                      a fazer trabalho administrativo em vez de negociar com clientes prontos.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[12px] border border-[#2E9E6B]/60 bg-[#101D35] p-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A3D63]">
                  <span className="inline-flex items-center gap-2 font-heading text-sm font-bold text-[#F5F3EE] uppercase tracking-wider">
                    <CheckCircle2 className="size-4 text-[#2E9E6B]" aria-hidden="true" />
                    Com IA e automatização
                  </span>
                  <span className="text-xs font-medium text-[#2E9E6B]">Operação fluida</span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#F5F3EE]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Primeiro atendimento imediato:</strong> dúvidas comuns esclarecidas na
                      hora, mesmo fora do horário habitual.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Dados e agenda organizados:</strong> contactos qualificados ficam
                      registados, com reuniões confirmadas e follow-ups programados.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Controlo humano nas decisões:</strong> a equipa recebe conversas
                      prontas com contexto completo para concluir o atendimento.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Epiphany banner */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-heading text-lg font-bold text-[#F5F3EE]">
                A sua empresa não precisa de trabalhar mais horas. Precisa de um atendimento e de
                processos que trabalhem de forma organizada.
              </p>
              <p className="mt-1 text-sm text-[#B8C0D0]">
                Veja abaixo como aplicamos inteligência artificial e automatização ao seu negócio.
              </p>
            </div>
            <a
              href="#servicos"
              className="lume-btn-primary shrink-0 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <span>Ver soluções</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
