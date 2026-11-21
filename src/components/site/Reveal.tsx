import { useEffect, useRef, type ReactNode } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "scale";

const startTransformMap: Record<RevealVariant, string> = {
  up: "translateY(14px)",
  down: "translateY(-14px)",
  left: "translateX(16px)",
  right: "translateX(-16px)",
  scale: "scale(0.97)",
};

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof el.animate !== "function") return;

    const rect = el.getBoundingClientRect();
    // Elements already in or above the viewport stay immediately visible without hiding
    if (rect.top <= window.innerHeight * 0.95) return;

    if (typeof IntersectionObserver !== "function") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            io.disconnect();
            el.animate(
              [
                { opacity: 0, transform: startTransformMap[variant] },
                { opacity: 1, transform: "none" },
              ],
              {
                duration: 380,
                delay: Math.min(delay, 260),
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "backwards",
              },
            );
          }
        }
      },
      { threshold: 0, rootMargin: "40px 0px -24px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, variant]);

  const Component = Tag as "div";

  return (
    <Component ref={ref} data-visible="true" className={`reveal min-w-0 ${className}`}>
      {children}
    </Component>
  );
}
