import { Clock, Zap, Folders, Send, Users, TrendingUp, Sparkles } from "lucide-react";
import { Reveal } from "../Reveal";

const benefits = [
  {
    icon: Clock,
    title: "ATENDIMENTO 24/7",
    desc: "O sistema pode responder perguntas mesmo fora do horário comercial, conforme a configuração contratada.",
    tag: "Disponibilidade",
  },
  {
    icon: Zap,
    title: "RESPOSTAS MAIS RÁPIDAS",
    desc: "Reduz o tempo entre a entrada do contacto e o primeiro atendimento, gerando melhor experiência para o visitante.",
    tag: "Velocidade",
  },
  {
    icon: Folders,
    title: "LEADS ORGANIZADOS",
    desc: "Centraliza e estrutura as informações dos potenciais clientes em um repositório único e rastreável.",
    tag: "Organização",
  },
  {
    icon: Send,
    title: "FOLLOW-UP AUTOMÁTICO",
    desc: "Reduz a dependência de acompanhamento manual e garante que propostas enviadas recebam lembretes.",
    tag: "Acompanhamento",
  },
  {
    icon: Users,
    title: "EQUIPA MAIS PRODUTIVA",
    desc: "A equipa pode concentrar-se nas situações que realmente precisam de intervenção humana e negociação.",
    tag: "Eficiência",
  },
  {
    icon: TrendingUp,
    title: "PROCESSO ESCALÁVEL",
    desc: "A empresa pode automatizar mais etapas e absorver picos de procura sem inchar os custos operacionais.",
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
              Menos tarefas repetitivas. Mais organização.{" "}
              <span className="text-gradient">Mais velocidade.</span>
            </h3>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-3 text-sm sm:text-base text-[#A7B0BF]">
              Benefícios operacionais concretos para a rotina diária da sua empresa.
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
                    <span>IMPACTO OPERACIONAL</span>
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
