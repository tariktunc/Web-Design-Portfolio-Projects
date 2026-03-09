"use client";
import { useRef, useEffect, useState, type ReactNode } from "react";

/* ─────────────────────────────────────────────
   ScrollSection — animejs.com tarzı pinned scroll section

   Progress hesaplama:
   - 0 = section top viewport top'a ulaştı (sticky başlıyor)
   - 1 = son spacer geçti (sticky bitiyor)
   ───────────────────────────────────────────── */

interface ScrollSectionProps {
  children: ReactNode | ((progress: number) => ReactNode);
  spacers?: number;
  className?: string;
  light?: boolean;
  id?: string;
  chapter?: string;
  label?: string;
}

export default function ScrollSection({
  children,
  spacers = 1,
  className = "",
  light = false,
  id,
  chapter,
  label,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const sectionH = el.scrollHeight;
      const viewH = window.innerHeight;
      // scrolled = how far past the section top we've scrolled
      const scrolled = -rect.top;
      // scrollRange = total distance the section can scroll (section height minus one viewport)
      const scrollRange = sectionH - viewH;
      if (scrollRange <= 0) return;
      const raw = scrolled / scrollRange;
      const clamped = Math.min(1, Math.max(0, raw));
      if (Math.abs(clamped - progressRef.current) > 0.002) {
        progressRef.current = clamped;
        setProgress(clamped);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-section ${light ? "scroll-section-light" : ""} ${className}`.trim()}
      data-chapter={chapter}
      data-label={label}
    >
      <div className="fixed-section">
        {typeof children === "function" ? children(progress) : children}
      </div>
      {Array.from({ length: spacers }, (_, i) => (
        <div key={i} className="section-spacer" aria-hidden="true" />
      ))}
    </section>
  );
}
