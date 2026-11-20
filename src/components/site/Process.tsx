import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Diagnóstico gratuito",
    text: "Analisamos o seu funil e mostramos onde está a perder clientes e quanto isso lhe custa. Recebe um plano com os seus números em 24 horas.",
  },
  {
    n: "02",
    title: "Montamos e ligamos",
    text: "Configuramos o atendimento, o WhatsApp, o calendário e o registo de contactos com a informação do seu negócio, e testamos tudo antes de arrancar.",
  },
  {
    n: "03",
    title: "Acompanhamos e melhoramos",
    text: "Medimos tempos de resposta e conversões e ajustamos todos os meses para que nenhum contacto volte a ficar sem resposta.",
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
          <p className="lume-eyebrow text-[#F4C542]">Como funciona</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#F5F3EE] sm:text-4xl text-balance">
            Em 3 passos, o seu atendimento deixa de perder clientes.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#B8C0D0] leading-[1.65]">
            Não precisa de saber programar nem de formar a equipa. Nós tratamos de tudo. Usa-se como
            se usa o WhatsApp.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-7 transition-colors hover:border-[#F36B32]">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-[8px] bg-[#F36B32] font-heading text-xs font-extrabold text-[#101D35] tabular-nums">
                    <span className="sr-only">Passo </span>
                    {s.n}
                  </span>
                  <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-[#F4C542] tabular-nums">
                    Passo {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-[#F5F3EE] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#B8C0D0]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
