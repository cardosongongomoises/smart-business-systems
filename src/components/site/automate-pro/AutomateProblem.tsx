import { Clock, MessageSquareX, Shuffle, AlertCircle } from "lucide-react";
import { Reveal } from "../Reveal";

const problems = [
  {
    icon: Clock,
    title: "Resposta demorada",
    tag: "Atraso no atendimento",
    description:
      "Clientes entram em contacto quando a equipa não está disponível ou está em atendimento.",
    effect:
      "O visitante perde o interesse e procura o concorrente imediato no Google ou redes sociais.",
  },
  {
    icon: MessageSquareX,
    title: "Atendimento repetitivo",
    tag: "Sobrecarga operacional",
    description:
      "A equipa responde às mesmas perguntas diariamente sobre preços, horários e localização.",
    effect: "Tempo valioso de profissionais séniores consumido por dúvidas triviais de triagem.",
  },
  {
    icon: Shuffle,
    title: "Leads perdidos",
    tag: "Desorganização de dados",
    description: "Contactos ficam espalhados entre WhatsApp, e-mail e formulários soltos.",
    effect:
      "Sem centralização, ninguém sabe o estado exato de cada potencial cliente ou oportunidade.",
  },
  {
    icon: AlertCircle,
    title: "Follow-up manual",
    tag: "Esquecimento de oportunidades",
    description: "Oportunidades dependem da memória da equipa para serem acompanhadas com rigor.",
    effect:
      "Propostas enviadas caem no esquecimento e negócios com alto potencial são abandonados.",
  },
];

export function AutomateProblem() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">O gargalo da operação atual</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-2xl font-bold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              Seu site recebe visitantes. Mas o que acontece depois?
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-4 max-w-[65ch] text-base text-[#B8C0D0] leading-relaxed">
              O website atrai visitantes, mas sem atendimento imediato e automação, cada lead
              torna-se uma oportunidade perdida — independentemente da qualidade do design.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 transition-colors duration-200 hover:border-[#F36B32]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#D64545]">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-xs font-bold text-[#B8C0D0] tabular-nums">
                        0{idx + 1}
                      </span>
                    </div>

                    <p className="mt-5 text-xs font-medium text-[#B8C0D0]">{item.tag}</p>
                    <h4 className="mt-1 font-heading text-base font-bold text-[#F5F3EE]">
                      {item.title}
                    </h4>
                    <p className="mt-2.5 text-xs text-[#B8C0D0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#2A3D63] text-xs text-[#B8C0D0]">
                    <span className="font-semibold text-[#F4C542]">Impacto: </span>
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
