import { Clock, Zap, Folders, Send, Users, TrendingUp } from "lucide-react";
import { Reveal } from "../Reveal";

const benefits = [
  {
    icon: Clock,
    title: "Atendimento 24 horas por dia",
    desc: "Respostas imediatas mesmo à noite, fins de semana e feriados. O cliente nunca fica sem resposta.",
    tag: "Disponibilidade",
  },
  {
    icon: Zap,
    title: "Respostas em menos de 10 segundos",
    desc: "Acaba com a espera. O visitante recebe resposta na hora em vez de ir falar com a concorrência.",
    tag: "Velocidade",
  },
  {
    icon: Folders,
    title: "Contactos registados e organizados",
    desc: "Cada pedido fica guardado com nome, origem e histórico. Passa a saber quantos negócios tem em curso.",
    tag: "Organização",
  },
  {
    icon: Send,
    title: "Acompanhamento que não falha",
    desc: "Lembretes automáticos por WhatsApp e e-mail retomam quem parou de responder.",
    tag: "Follow-up",
  },
  {
    icon: Users,
    title: "Equipa só fala com quem quer comprar",
    desc: "O sistema responde às dúvidas repetidas e entrega à equipa quem já tem interesse real.",
    tag: "Foco comercial",
  },
  {
    icon: TrendingUp,
    title: "Cresce sem aumentar a equipa",
    desc: "Receba 50 ou 500 contactos por mês, todos atendidos com a mesma rapidez e critério.",
    tag: "Escala",
  },
];

export function AutomateBenefits() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Benefícios concretos</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-3xl font-extrabold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              O que muda na sua empresa desde a primeira semana.
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-3 max-w-[65ch] text-sm sm:text-base text-[#B8C0D0]">
              Mais contactos respondidos na hora, mais reuniões confirmadas e menos vendas perdidas
              por demora.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 50}>
                <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] p-6 transition-colors duration-200 hover:border-[#F36B32]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#101D35] text-[#F36B32]">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-medium text-[#B8C0D0]">{item.tag}</span>
                    </div>

                    <h4 className="mt-5 font-heading text-base font-bold text-[#F5F3EE]">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs text-[#B8C0D0] leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#2A3D63] text-xs font-semibold text-[#2E9E6B]">
                    Medido no 1.º mês de operação
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
