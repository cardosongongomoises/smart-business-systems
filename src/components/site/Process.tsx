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
      className="py-20 sm:py-28 bg-[#080A0F] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase mb-4">
            Metodologia de Implantação
          </span>
          <h2 className="text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Do primeiro contacto ao cliente recorrente.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#A7B0BF]">
            Um processo estruturado de 5 etapas para colocar a tecnologia a trabalhar pelo
            crescimento da sua empresa em Angola.
          </p>
        </Reveal>

        <ol className="relative mt-14 space-y-4 border-l border-[#252C38] pl-6 sm:pl-10">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80}>
              <div className="relative rounded-[16px] p-6 border border-[#252C38] bg-[#151A23] transition-colors hover:border-[#3B82F6]/50">
                <span
                  aria-hidden="true"
                  className="absolute top-7 -left-[1.95rem] size-3.5 rounded-full bg-[#3B82F6] border-2 border-[#080A0F] sm:-left-[2.95rem]"
                />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#3B82F6]">
                    <span className="sr-only">Etapa </span>
                    ETAPA {s.n}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-[#F5F7FA] tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#A7B0BF]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
