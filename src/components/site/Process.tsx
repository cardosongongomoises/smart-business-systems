import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Diagnóstico & Descoberta",
    text: "Mapeamos os gargalos operacionais da empresa, perfil de público e rotinas de atendimento.",
  },
  {
    n: "02",
    title: "Arquitetura & Estratégia",
    text: "Desenhamos o funil, scripts corporativos e réguas de qualificação do agente digital.",
  },
  {
    n: "03",
    title: "Desenvolvimento & IA",
    text: "Construímos o website de alta conversão e configuramos os modelos de IA e automações.",
  },
  {
    n: "04",
    title: "Integração & Homologação",
    text: "Conectamos WhatsApp corporativo, e-mail empresarial, Google Calendar e CRM com testes rigorosos.",
  },
  {
    n: "05",
    title: "Operação & Otimização",
    text: "Monitoramento contínuo de conversões, métricas de tempo de resposta e refinamento de prompts.",
  },
];

export function Process() {
  return (
    <section
      id="como-funciona"
      className="py-20 sm:py-28 bg-[#101D35] text-[#F5F3EE] border-t border-[#2A3D63] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#F4C542]">Metodologia de Implantação</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#F5F3EE] sm:text-4xl text-balance">
            Do primeiro contacto ao cliente recorrente.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#B8C0D0] leading-[1.65]">
            Um processo estruturado de 5 etapas para colocar a tecnologia a trabalhar pelo
            crescimento da sua empresa em Angola.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 60}>
              <div className="flex h-full flex-col rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 transition-colors hover:border-[#F36B32]">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-9 items-center justify-center rounded-[8px] bg-[#F36B32] font-heading text-xs font-extrabold text-[#101D35] tabular-nums">
                    <span className="sr-only">Etapa </span>
                    {s.n}
                  </span>
                  <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-[#F4C542] tabular-nums">
                    Etapa {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-base font-bold text-[#F5F3EE] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#B8C0D0]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
