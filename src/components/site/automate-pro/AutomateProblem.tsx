import { Clock, MessageSquareX, Shuffle, AlertCircle } from "lucide-react";
import { Reveal } from "../Reveal";

const problems = [
  {
    icon: Clock,
    title: "RESPOSTA DEMORADA",
    tag: "Atraso no Atendimento",
    description:
      "Clientes podem entrar em contacto quando a equipa não está disponível ou ocupada.",
    effect:
      "O visitante perde o interesse e procura o concorrente imediato no Google ou redes sociais.",
  },
  {
    icon: MessageSquareX,
    title: "ATENDIMENTO REPETITIVO",
    tag: "Sobrecarga Operacional",
    description:
      "A equipa responde as mesmas perguntas diariamente sobre preços, horários e localização.",
    effect: "Tempo valioso de profissionais séniores consumido por dúvidas triviais de triagem.",
  },
  {
    icon: Shuffle,
    title: "LEADS PERDIDOS",
    tag: "Desorganização de Dados",
    description: "Contactos podem ficar espalhados entre WhatsApp, e-mail e formulários soltos.",
    effect:
      "Sem centralização, ninguém sabe o status exato de cada potencial cliente ou oportunidade.",
  },
  {
    icon: AlertCircle,
    title: "FOLLOW-UP MANUAL",
    tag: "Esquecimento de Oportunidades",
    description: "Oportunidades dependem da memória da equipa para serem acompanhadas com rigor.",
    effect:
      "Propostas enviadas caem no esquecimento e negócios com alto potencial são abandonados.",
  },
];

export function AutomateProblem() {
  return (
    <div className="py-20 sm:py-28 relative">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#EF4444]/40 bg-[#EF4444]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#EF4444] uppercase">
              O Gargalo da Operação Atual
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#F5F7FA] sm:text-4xl leading-tight">
              Seu site recebe visitantes. Mas o que acontece depois?
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 text-base text-[#A7B0BF] leading-relaxed">
              Muitas empresas já possuem um website profissional, mas continuam dependendo de
              processos manuais para responder clientes, organizar contactos e acompanhar
              oportunidades.
            </p>
          </Reveal>
        </div>

        {/* 4 Problem Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 80}>
                <div className="glass-card group h-full rounded-2xl border border-[#252C38] bg-[#0E121A] p-6 transition-all duration-300 hover:border-[#EF4444]/40 hover:bg-[#151A23]">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-[#252C38] bg-[#151A23] text-[#EF4444] transition-transform group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-[10px] text-[#667085]">FALHA 0{idx + 1}</span>
                  </div>

                  <span className="mt-5 block font-mono text-[10px] font-bold tracking-wider text-[#A7B0BF] uppercase">
                    {item.tag}
                  </span>

                  <h4 className="mt-1 text-base font-bold text-[#F5F7FA]">{item.title}</h4>

                  <p className="mt-2.5 text-xs text-[#A7B0BF] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3.5 border-t border-[#252C38]/70 text-[11px] text-[#667085]">
                    <span className="font-semibold text-[#EF4444]">Impacto: </span>
                    {item.effect}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
