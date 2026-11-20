import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
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
                { opacity: 0, transform: "translateY(8px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 260,
                delay: Math.min(delay, 200),
                easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
                fill: "backwards",
              },
            );
          }
        }
      },
      { threshold: 0, rootMargin: "40px 0px -20px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Component = Tag as "div";

  return (
    <Component ref={ref} data-visible="true" className={`reveal ${className}`}>
      {children}
    </Component>
  );
}
