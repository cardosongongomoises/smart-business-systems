import { MessageSquare, Clock, LogOut, CheckCircle2, XCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const flow = [
  {
    icon: MessageSquare,
    title: "Cliente manda mensagem",
    text: "Olá, gostaria de saber mais sobre o serviço.",
    status: "Interessado",
  },
  {
    icon: Clock,
    title: "Ninguém responde",
    text: "5 minutos sem resposta. O lead começa a questionar se a empresa é ágil.",
    status: "A esfriar",
  },
  {
    icon: LogOut,
    title: "Cliente vai embora",
    text: "Enquanto procura outro fornecedor, já perdeu a oportunidade e a receita.",
    status: "Lead perdido",
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
          <p className="lume-eyebrow text-[#F36B32]">01 · O custo invisível</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-[1.15] font-bold text-[#F5F3EE] sm:text-4xl text-balance">
            Enquanto sua equipa trabalha, quantos negócios estão a ser fechados pela concorrência?
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-5 max-w-[65ch] space-y-3 text-base leading-[1.65] text-[#B8C0D0]">
            <p>
              Muitas empresas em Angola têm excelentes serviços, boa reputação e clientes
              interessados.
            </p>
            <p>
              O problema não é a qualidade — é a velocidade. Cada minuto sem resposta é um cliente
              que procura outro fornecedor. Onde o WhatsApp é o principal canal comercial, isto
              acontece <strong className="text-[#F5F3EE]">todos os dias</strong>.
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
                      Etapa 0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-[#F5F3EE]">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#B8C0D0]">{c.text}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#2A3D63] flex items-center justify-between text-xs">
                  <span className="text-[#B8C0D0]">Estado do lead</span>
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

        {/* Stat Callout */}
        <Reveal delay={80}>
          <div className="mt-10 rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 flex flex-col sm:flex-row sm:items-center gap-5">
            <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#F4C542] tabular-nums shrink-0">
              70%
            </span>
            <p className="text-sm sm:text-base text-[#B8C0D0] max-w-[65ch]">
              dos leads desistem se não receberem resposta nos{" "}
              <strong className="text-[#F5F3EE]">primeiros 5 minutos</strong>. Em Angola, a maioria
              das empresas leva 2 a 24 horas — ou deixa mensagens sem resposta.
            </p>
          </div>
        </Reveal>

        {/* Before/After Comparison */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-8">
            <div className="border-b border-[#2A3D63] pb-5">
              <p className="lume-eyebrow text-[#F36B32]">Diagnóstico diário</p>
              <h3 className="mt-2 font-heading text-xl sm:text-2xl font-bold text-[#F5F3EE]">
                Quanto dinheiro está a deixar na mesa?
              </h3>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-[12px] border border-[#D64545]/50 bg-[#101D35] p-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A3D63]">
                  <span className="inline-flex items-center gap-2 font-heading text-sm font-bold text-[#F5F3EE] uppercase tracking-wider">
                    <XCircle className="size-4 text-[#D64545]" aria-hidden="true" />
                    Sem sistema automatizado
                  </span>
                  <span className="text-xs font-medium text-[#D64545]">Perda diária</span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#B8C0D0]">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Tempo de resposta:</strong> 2h a 24h —
                      enquanto o lead procura outro fornecedor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Noites e fins de semana:</strong> 0% de
                      resposta — cada mensagem é um lead perdido.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Equipa sobrecarregada:</strong> Repetem as
                      mesmas perguntas o dia todo em vez de fechar negócios.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-[#D64545] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#F5F3EE]">Gestão dispersa:</strong> Mensagens
                      perdidas em telemóveis individuais sem rastreio.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[12px] border border-[#2E9E6B]/60 bg-[#101D35] p-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A3D63]">
                  <span className="inline-flex items-center gap-2 font-heading text-sm font-bold text-[#F5F3EE] uppercase tracking-wider">
                    <CheckCircle2 className="size-4 text-[#2E9E6B]" aria-hidden="true" />
                    Com o sistema a funcionar
                  </span>
                  <span className="text-xs font-medium text-[#2E9E6B]">Resultado diário</span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#F5F3EE]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Resposta imediata:</strong> Menos de 10 segundos, 24 horas por dia —
                      sem depender de ninguém.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Qualificação automática:</strong> Filtra quem está pronto para comprar
                      sem desperdiçar tempo.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Agendamento direto:</strong> Reuniões marcadas automaticamente no
                      calendário.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="size-4 text-[#2E9E6B] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Visibilidade total:</strong> Cada lead rastreado do primeiro contacto
                      ao contrato.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Social Proof — Results in Numbers */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-8">
            <p className="lume-eyebrow text-center text-[#F4C542]">
              Resultados reais de empresas em Angola
            </p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F5F3EE] tabular-nums">
                  +50
                </p>
                <p className="text-xs text-[#B8C0D0] mt-1.5">Empresas a fechar negócios 24/7</p>
              </div>
              <div>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F36B32] tabular-nums">
                  +40%
                </p>
                <p className="text-xs text-[#B8C0D0] mt-1.5">Mais agendamentos confirmados</p>
              </div>
              <div>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F4C542] tabular-nums">
                  -75%
                </p>
                <p className="text-xs text-[#B8C0D0] mt-1.5">Redução em faltas de reuniões</p>
              </div>
              <div>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2E9E6B] tabular-nums">
                  +35%
                </p>
                <p className="text-xs text-[#B8C0D0] mt-1.5">Aumento na taxa de conversão</p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#101D35] p-5">
                <p className="text-sm text-[#F5F3EE] leading-relaxed">
                  “O sistema agendou 23 reuniões numa semana sem que a minha equipa tocasse num
                  único WhatsApp.”
                </p>
                <p className="mt-3 text-xs font-medium text-[#B8C0D0]">
                  Diretor Comercial · Empresa de Construção Civil, Luanda
                </p>
              </div>
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#101D35] p-5">
                <p className="text-sm text-[#F5F3EE] leading-relaxed">
                  “Passámos de 2h para 8 segundos no primeiro contacto. A taxa de conversão subiu
                  35%.”
                </p>
                <p className="mt-3 text-xs font-medium text-[#B8C0D0]">
                  CEO · Clínica Médica em Luanda
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-heading text-lg font-bold text-[#F5F3EE]">
                Cada minuto sem automação são leads perdidos para a concorrência.
              </p>
              <p className="mt-1 text-sm text-[#B8C0D0]">
                Atendimento automático imediato, qualificação estruturada e agendamento direto na
                sua agenda.
              </p>
            </div>
            <a
              href="#como-funciona"
              className="lume-btn-primary shrink-0 inline-flex items-center justify-center text-xs uppercase tracking-wider whitespace-nowrap"
            >
              Ver como funciona
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
