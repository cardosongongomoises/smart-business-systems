import { Clock, Zap, Folders, Send, Users, TrendingUp } from "lucide-react";
import { Reveal } from "../Reveal";

const benefits = [
  {
    icon: Clock,
    title: "Atendimento 24/7",
    desc: "Respostas automáticas mesmo fora do horário comercial. Enquanto a concorrência dorme, o seu site continua a atender.",
    tag: "Disponibilidade",
  },
  {
    icon: Zap,
    title: "Respostas em menos de 1 segundo",
    desc: "Elimina a fila de espera. O visitante não abandona o site por demora — a IA responde na hora, com precisão.",
    tag: "Velocidade",
  },
  {
    icon: Folders,
    title: "Leads organizados e classificados",
    desc: "Cada contacto fica registado com qualidade, origem e histórico. Ninguém cai no esquecimento.",
    tag: "Organização",
  },
  {
    icon: Send,
    title: "Follow-up que nunca esquece",
    desc: "Lembretes automáticos por WhatsApp e e-mail. Garante acompanhamento consistente de todos os leads.",
    tag: "Acompanhamento",
  },
  {
    icon: Users,
    title: "Equipa foca em leads quentes",
    desc: "A IA qualifica e filtra. Só chega à equipa comercial quem demonstrou intenção real de compra.",
    tag: "Eficiência",
  },
  {
    icon: TrendingUp,
    title: "Processo escalável sem inchar",
    desc: "10 ou 10.000 visitantes por mês — o sistema absorve o volume sem precisar aumentar a equipa.",
    tag: "Crescimento",
  },
];

export function AutomateBenefits() {
  return (
    <div className="py-20 sm:py-28 relative border-t border-[#2A3D63]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lume-eyebrow text-[#F36B32]">Ganhos de eficiência</p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mt-4 font-heading text-3xl font-extrabold text-[#F5F3EE] sm:text-4xl leading-tight text-balance">
              O que muda na operação quando a IA entra no atendimento.
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-3 max-w-[65ch] text-sm sm:text-base text-[#B8C0D0]">
              Benefícios reais que a sua equipa sente no primeiro mês de uso — sem exageros, sem
              promessas vazias.
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
