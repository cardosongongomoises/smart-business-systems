import { Clock, Zap, Folders, Send, Users, TrendingUp, Sparkles } from "lucide-react";
import { Reveal } from "../Reveal";

const benefits = [
  {
    icon: Clock,
    title: "ATENDIMENTO 24/7",
    desc: "Respostas automáticas mesmo fora do horário comercial. Enquanto a concorrência dorme, o seu site continua a vender.",
    tag: "Disponibilidade",
  },
  {
    icon: Zap,
    title: "RESPOSTAS EM MENOS DE 1 SEGUNDO",
    desc: "Elimina a fila de espera. O visitante não abandona o site por demora — a IA responde na hora, com precisão.",
    tag: "Velocidade",
  },
  {
    icon: Folders,
    title: "LEADS ORGANIZADOS E CLASSIFICADOS",
    desc: "Cada contacto fica registrado com score de qualidade, origem e histórico. Ninguém cai no esquecimento.",
    tag: "Organização",
  },
  {
    icon: Send,
    title: "FOLLOW-UP QUE NUNCA ESQUECE",
    desc: "Lembretes automáticos multicanal — WhatsApp, e-mail, SMS. Enquanto o vendedor manual esquece 70% dos leads, o sistema lembra todos.",
    tag: "Acompanhamento",
  },
  {
    icon: Users,
    title: "EQUIPA SÓ LIDA COM LEADS QUENTES",
    desc: "A IA qualifica e filtra. Só chega à equipa comercial quem já demonstrou intenção real de compra.",
    tag: "Eficiência",
  },
  {
    icon: TrendingUp,
    title: "PROCESSO ESCALÁVEL SEM INCHAR",
    desc: "10 ou 10.000 visitantes por mês — o sistema absorve o volume sem precisar contratar mais gente.",
    tag: "Crescimento",
  },
];

export function AutomateBenefits() {
  return (
    <div className="py-20 sm:py-28 relative">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#60A5FA] uppercase">
              Ganhos de Eficiência
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[#F5F7FA] sm:text-5xl leading-tight">
              O que muda na operação{" "}
              <span className="text-gradient">quando a IA entra no atendimento.</span>
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-3 text-sm sm:text-base text-[#A7B0BF]">
              Benefícios reais que a sua equipa sente no primeiro mês de uso — sem exageros, sem promessas vazias.
            </p>
          </Reveal>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="glass-card group h-full rounded-2xl border border-[#252C38] bg-[#0E121A] p-6 transition-all duration-300 hover:border-[#3B82F6]/50 hover:bg-[#151A23]">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-[#252C38] bg-[#151A23] text-[#3B82F6] transition-transform group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-[10px] text-[#667085]">{item.tag}</span>
                  </div>

                  <h4 className="mt-5 text-base font-bold text-[#F5F7FA]">{item.title}</h4>

                  <p className="mt-2 text-xs text-[#A7B0BF] leading-relaxed">{item.desc}</p>

                  <div className="mt-4 pt-3 border-t border-[#252C38]/60 flex items-center gap-1.5 font-mono text-[10px] text-[#22C55E]">
                    <Sparkles className="size-3" />
                    <span>MEDIDO NO 1º MÊS</span>
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
