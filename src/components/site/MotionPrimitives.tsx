import { useEffect, useRef, useState, type ReactNode } from "react";

export function HighlightWipe({
  children,
  highlightColor = "#FDE3D6",
  delay = 140,
}: {
  children: ReactNode;
  highlightColor?: string;
  delay?: number;
}) {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el || typeof window === "undefined") return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof el.animate !== "function") return;

    const animateWipe = () => {
      el.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
        duration: 520,
        delay,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "backwards",
      });
    };

    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.95) {
      animateWipe();
      return;
    }

    if (typeof IntersectionObserver !== "function") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            io.disconnect();
            animateWipe();
          }
        }
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <span className="relative inline-block max-w-full px-1 -mx-0.5 sm:px-1.5 sm:-mx-1">
      <span
        ref={barRef}
        aria-hidden="true"
        style={{ backgroundColor: highlightColor }}
        className="pointer-events-none absolute inset-x-0 bottom-[0.06em] h-[0.34em] origin-left rounded-[4px]"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  durationMs = 340,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousRef = useRef(value);

  useEffect(() => {
    const startVal = previousRef.current;
    const targetVal = value;
    if (startVal === targetVal) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof requestAnimationFrame !== "function") {
      previousRef.current = targetVal;
      setDisplayValue(targetVal);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // Cubic ease-out interpolation
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(startVal + (targetVal - startVal) * eased);
      setDisplayValue(next);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        previousRef.current = targetVal;
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [value, durationMs]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export function TypingDots({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const dotColor = variant === "light" ? "bg-[#5B6B8C]" : "bg-[#B8C0D0]";
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="A escrever resposta">
      <span
        className={`size-1.5 rounded-full ${dotColor} animate-[lume-typing-dot_1s_ease-in-out_infinite]`}
      />
      <span
        className={`size-1.5 rounded-full ${dotColor} animate-[lume-typing-dot_1s_ease-in-out_0.16s_infinite]`}
      />
      <span
        className={`size-1.5 rounded-full ${dotColor} animate-[lume-typing-dot_1s_ease-in-out_0.32s_infinite]`}
      />
    </span>
  );
}
