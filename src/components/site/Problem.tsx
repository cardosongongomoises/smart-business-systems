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
} from "lucide-react";
import { Reveal } from "./Reveal";

const flow = [
  {
    icon: MessageSquare,
    title: "O cliente escreve às 19h ou ao sábado",
    text: "Ou enquanto a sua equipa está ocupada numa reunião. Tem interesse real e quer uma resposta rápida.",
    status: "À espera",
  },
  {
    icon: Clock,
    title: "Passam 5 minutos. Depois meia hora.",
    text: "Ninguém responde. Em Angola, muitas empresas demoram entre 2 e 24 horas a responder no WhatsApp.",
    status: "A procurar alternativa",
  },
  {
    icon: LogOut,
    title: "Escreve a outro fornecedor",
    text: "Quem responde primeiro fica com o cliente. A sua empresa ficou na lista, mas a venda já não é sua.",
    status: "Sem deixar rasto",
  },
];

const silentLosses = [
  {
    icon: Clock,
    title: "Respondem tarde",
    text: "O cliente escreve quando a equipa não está disponível e procura o concorrente seguinte.",
  },
  {
    icon: MessageSquareX,
    title: "A equipa repete as mesmas respostas",
    text: "Preços, horários, localização: o dia inteiro, em vez de fechar negócios.",
  },
  {
    icon: Shuffle,
    title: "Os contactos ficam espalhados",
    text: "WhatsApp, e-mail e formulários soltos. Ninguém sabe quantos são nem em que ponto estão.",
  },
  {
    icon: AlertCircle,
    title: "O acompanhamento depende da memória",
    text: "Propostas enviadas caem no esquecimento e o cliente nunca mais é retomado.",
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
          <p className="lume-eyebrow text-[#F36B32]">01 · O problema</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-[1.15] font-bold text-[#F5F3EE] sm:text-4xl text-balance">
            Cada mensagem sem resposta é um cliente a falar com outra empresa.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-5 max-w-[65ch] space-y-3 text-base leading-[1.65] text-[#B8C0D0]">
            <p>
              O seu serviço é bom e a sua reputação também.{" "}
              <strong className="text-[#F5F3EE]">O que falha é o tempo.</strong>
            </p>
            <p>
              Em Angola, onde o WhatsApp é o principal canal comercial, isto acontece todos os dias.
              E quase ninguém vê, porque o cliente que desiste antes de falar consigo não deixa
              rasto.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {flow.map((c, i) => (
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
                  <span className="text-[#B8C0D0]">Situação</span>
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

        {/* Stat + Concrete Cost Example */}
        <Reveal delay={80}>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 flex flex-col sm:flex-row sm:items-center gap-5">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#F4C542] tabular-nums shrink-0">
                70%
              </span>
              <p className="text-sm sm:text-base text-[#B8C0D0]">
                dos contactos desistem se não recebem resposta nos{" "}
                <strong className="text-[#F5F3EE]">primeiros 5 minutos</strong>. Em muitas empresas
                angolanas a resposta demora entre 2 e 24 horas.
              </p>
            </div>

            <div className="rounded-[16px] border border-[#F36B32]/50 bg-[#1A2A4A] p-6 flex flex-col justify-center">
              <p className="lume-eyebrow text-[#F36B32]">Quanto isto custa (exemplo real)</p>
              <p className="mt-2 text-sm sm:text-base text-[#B8C0D0]">
                60 contactos por mês, 25% sem resposta a tempo e ticket médio de Kz 150.000. São{" "}
                <strong className="text-[#F5F3EE]">15 clientes</strong> e{" "}
                <strong className="text-[#F4C542] tabular-nums">Kz 2.250.000 por mês</strong> que
                ficam à porta.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Four Silent Ways to Lose Clients */}
        <Reveal delay={110}>
          <div className="mt-12">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F3EE]">
              Quatro formas de perder clientes sem dar por isso
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {silentLosses.map((item) => (
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

        {/* Before/After Comparison */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-8">
            <div className="border-b border-[#2A3D63] pb-5">
              <p className="lume-eyebrow text-[#F36B32]">O que muda no dia a dia</p>
              <h3 className="mt-2 font-heading text-xl sm:text-2xl font-bold text-[#F5F3EE]">
                Atender horas depois vs. responder em menos de 10 segundos
              </h3>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-[12px] border border-[#D64545]/50 bg-[#101D35] p-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A3D63]">
                  <span className="inline-flex items-center gap-2 font-heading text-sm font-bold text-[#F5F3EE] uppercase tracking-wider">
                    <XCircle className="size-4 text-[#D64545]" aria-hidden="true" />
                    Como acontece hoje
                  </span>
                  <span className="text-xs font-medium text-[#D64545]">Clientes perdidos</span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#B8C0D0]">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Resposta em 2h a 24h:</strong> o
                      interessado fala com o concorrente primeiro.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Noites e fins de semana:</strong> ninguém
                      responde até ao dia útil seguinte.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Equipa a triar curiosos:</strong> repete
                      preços e horários o dia inteiro.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Sem registo:</strong> contactos perdidos em
                      telemóveis individuais.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[12px] border border-[#2E9E6B]/60 bg-[#101D35] p-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A3D63]">
                  <span className="inline-flex items-center gap-2 font-heading text-sm font-bold text-[#F5F3EE] uppercase tracking-wider">
                    <CheckCircle2 className="size-4 text-[#2E9E6B]" aria-hidden="true" />
                    Com a Agentes Digital
                  </span>
                  <span className="text-xs font-medium text-[#2E9E6B]">Zero esperas</span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#F5F3EE]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Resposta em menos de 10 segundos:</strong> 24h por dia, incluindo
                      noites e fins de semana.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Reuniões marcadas no chat:</strong> o cliente escolhe o horário e
                      recebe lembretes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Equipa focada no fecho:</strong> só atende quem já está qualificado e
                      quer comprar.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Cada contacto acompanhado:</strong> tudo guardado com histórico até à
                      assinatura.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-heading text-lg font-bold text-[#F5F3EE]">
                Quer saber quanto a sua empresa perde por mês em mensagens sem resposta?
              </p>
              <p className="mt-1 text-sm text-[#B8C0D0]">
                Simule com os seus próprios números abaixo ou peça o seu diagnóstico gratuito.
              </p>
            </div>
            <a
              href="#valor"
              className="lume-btn-primary shrink-0 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <span>Calcular quanto perco</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
