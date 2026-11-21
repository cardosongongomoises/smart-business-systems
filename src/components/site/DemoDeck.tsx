import { useState, type KeyboardEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  CalendarCheck,
  Users,
} from "lucide-react";

const slides = [
  {
    step: "01",
    tag: "Primeiro contacto",
    icon: MessageSquare,
    title: "A cliente pergunta a qualquer hora no WhatsApp.",
    body: "Mesmo quando a equipa está ocupada em atendimento ou depois do horário de fecho, o pedido recebe resposta clara e imediata.",
    highlight: "Sem deixar mensagens acumuladas à espera de resposta manual.",
  },
  {
    step: "02",
    tag: "Regras do espaço",
    icon: ShieldCheck,
    title: "Apresenta apenas os serviços e preços que autorizou.",
    body: "Toda a informação é configurada à medida do seu espaço. Não improvisa preços, não promete o que não existe e não dá aconselhamento clínico.",
    highlight: "Conteúdo validado consigo antes de entrar no ar.",
  },
  {
    step: "03",
    tag: "Agenda ligada",
    icon: CalendarCheck,
    title: "Consulta a disponibilidade e regista a marcação.",
    body: "Em vez de dezenas de mensagens para confirmar horas, mostra os horários livres compatíveis com a sua agenda e regista a escolha da cliente.",
    highlight: "Na demonstração vê a marcação entrar numa agenda de teste.",
  },
  {
    step: "04",
    tag: "Controlo humano",
    icon: Users,
    title: "Passa para a sua equipa sempre que for necessário.",
    body: "Situações especiais, dúvidas clínicas ou pedidos fora do padrão seguem diretamente para um responsável do espaço.",
    highlight: "A recepção digital apoia a equipa sem a substituir.",
  },
];

export function DemoDeck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const current = slides[index] ?? slides[0];

  const goTo = (target: number) => {
    setDirection(target >= index ? "next" : "prev");
    setIndex(target);
  };

  const prev = () => {
    setDirection("prev");
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  };

  const next = () => {
    setDirection("next");
    setIndex((i) => (i + 1) % slides.length);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  if (!current) return null;
  const Icon = current.icon;
  const slideAnimClass =
    direction === "next"
      ? "animate-[lume-slide-in-right_280ms_cubic-bezier(0.22,1,0.36,1)]"
      : "animate-[lume-slide-in-left_280ms_cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="apresentação"
      aria-label="Resumo interativo da demonstração de 7 minutos"
      className="mt-10 overflow-hidden rounded-[16px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F5F3EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32]"
    >
      {/* Top slide selector tabs */}
      <div className="grid grid-cols-4 border-b border-[#2A3D63] bg-[#101D35]/70">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => goTo(i)}
              aria-current={active ? "step" : undefined}
              className={`flex items-center justify-center sm:justify-start gap-2.5 px-3 sm:px-5 py-3.5 text-left transition-colors duration-200 cursor-pointer border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F36B32] ${
                active
                  ? "border-[#F36B32] bg-[#1A2A4A] text-[#F5F3EE]"
                  : "border-transparent text-[#B8C0D0] hover:bg-[#1A2A4A]/50 hover:text-[#F5F3EE]"
              }`}
            >
              <span
                className={`font-heading text-xs font-bold tabular-nums transition-colors duration-200 ${
                  active ? "text-[#F36B32]" : "text-[#B8C0D0]"
                }`}
              >
                {s.step}
              </span>
              <span className="hidden md:inline font-heading text-xs font-semibold truncate">
                {s.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Slide Content with directional transition */}
      <div className="p-6 sm:p-9 overflow-hidden">
        <div
          key={current.step}
          className={`grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center ${slideAnimClass}`}
        >
          <div>
            <div className="flex items-center gap-3 text-xs font-semibold text-[#F4C542]">
              <Icon className="size-4 text-[#F36B32]" aria-hidden="true" />
              <span>
                Etapa {current.step} · {current.tag}
              </span>
            </div>
            <h3 className="mt-3 font-heading text-xl sm:text-2xl font-bold text-[#F5F3EE] leading-snug text-balance">
              {current.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#B8C0D0] max-w-[60ch]">
              {current.body}
            </p>
          </div>

          <div className="rounded-[12px] border border-[#2A3D63] bg-[#101D35] p-5 flex flex-col justify-between gap-5">
            <div>
              <p className="font-heading text-xs font-bold text-[#2E9E6B]">O que valida aqui</p>
              <p className="mt-2 text-sm text-[#F5F3EE] leading-relaxed">{current.highlight}</p>
            </div>

            <div className="flex items-center justify-between border-t border-[#2A3D63] pt-4">
              <div className="flex items-center gap-1.5" aria-label="Progresso dos slides">
                {slides.map((s, i) => (
                  <button
                    key={s.step}
                    type="button"
                    aria-label={`Ir para etapa ${s.step}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      i === index ? "w-6 bg-[#F36B32]" : "w-2 bg-[#2A3D63] hover:bg-[#5B6B8C]"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Etapa anterior"
                  className="inline-flex size-9 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F5F3EE] transition-all duration-200 hover:border-[#F36B32] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32]"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Próxima etapa"
                  className="inline-flex size-9 items-center justify-center rounded-[8px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F5F3EE] transition-all duration-200 hover:border-[#F36B32] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32]"
                >
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
