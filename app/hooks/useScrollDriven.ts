"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { animate, onScroll, createTimeline, stagger, type AnimationParams } from "animejs";

/* ─────────────────────────────────────────────
   Shared: prefers-reduced-motion check
   ───────────────────────────────────────────── */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─────────────────────────────────────────────
   1. useScrollProgress — Scroll ilerleme oranı (0-1)
   Bir section'ın scroll pozisyonunu takip eder.
   animejs.com'daki her section'ın temel mekanizması.
   ───────────────────────────────────────────── */
export function useScrollProgress() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;

    const computeProgress = () => {
      const rect = el.getBoundingClientRect();
      const sectionH = el.scrollHeight;
      const viewH = window.innerHeight;
      // Progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      const raw = (viewH - rect.top) / (sectionH + viewH);
      const clamped = Math.min(1, Math.max(0, raw));
      if (Math.abs(clamped - progressRef.current) > 0.001) {
        progressRef.current = clamped;
        setProgress(clamped);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    computeProgress(); // initial

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { ref: sectionRef, progress };
}

/* ─────────────────────────────────────────────
   2. useScrollPinAnimation — Pinned section animasyonu
   Section sabitlenirken timeline'ı scroll ile senkronize eder.
   animejs.com'daki toolbox (3D lens dönen) section gibi.
   ───────────────────────────────────────────── */
export function useScrollPinAnimation(
  build: (tl: ReturnType<typeof createTimeline>) => void,
  options: {
    enter?: string;
    leave?: string;
  } = {}
) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const tl = createTimeline({
      defaults: { ease: "linear", duration: 500 },
      autoplay: false,
    });

    build(tl);

    const sub = onScroll({
      target: sectionRef.current,
      container: window,
      enter: options.enter ?? "bottom",
      leave: options.leave ?? "top",
    });

    // Link timeline to scroll progress
    const anim = animate(tl, {
      progress: [0, 100],
      ease: "linear",
      duration: 1000,
      composition: "replace",
      ...({ onScroll: sub } as Record<string, unknown>),
    } as AnimationParams);

    return () => {
      anim.pause();
      sub.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return sectionRef;
}

/* ─────────────────────────────────────────────
   3. useScrollRevealSection — Section giriş animasyonu
   animejs.com'daki feature section'lar gibi:
   Scroll ile text opacity + translateY değişir.
   ───────────────────────────────────────────── */
export function useScrollRevealSection(
  targets: Record<string, Partial<AnimationParams>>,
  options: {
    threshold?: number;
  } = {}
) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    const el = sectionRef.current;

    // Set initial hidden states
    Object.keys(targets).forEach((selector) => {
      const elements = el.querySelectorAll(selector);
      elements.forEach((e) => {
        (e as HTMLElement).style.opacity = "0";
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate each target group
            Object.entries(targets).forEach(([selector, props], i) => {
              const elements = el.querySelectorAll(selector);
              if (!elements.length) return;

              animate(elements, {
                opacity: [0, 1],
                translateY: [60, 0],
                filter: ["blur(8px)", "blur(0px)"],
                duration: 900,
                ease: "outExpo",
                delay: stagger(100, { start: i * 200 }),
                ...props,
              });
            });

            observer.disconnect();
          }
        });
      },
      { threshold: options.threshold ?? 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return sectionRef;
}

/* ─────────────────────────────────────────────
   4. useBackgroundTransition — Arka plan rengi geçişi
   animejs.com'daki koyu↔açık section geçişleri gibi.
   ───────────────────────────────────────────── */
export function useBackgroundTransition(
  fromColor: string,
  toColor: string
) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const sub = onScroll({
      target: sectionRef.current,
      container: window,
      enter: "bottom",
      leave: "top",
    });

    const anim = animate(document.body, {
      backgroundColor: [fromColor, toColor],
      duration: 1000,
      ease: "linear",
      composition: "replace",
      ...({ onScroll: sub } as Record<string, unknown>),
    } as AnimationParams);

    return () => {
      anim.pause();
      sub.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return sectionRef;
}

/* ─────────────────────────────────────────────
   5. useScrollLabels — Etiket belirme animasyonu
   animejs.com'daki sağ/sol etiketler gibi:
   Scroll progress'e göre opacity değişir.
   ───────────────────────────────────────────── */
export function useScrollLabels() {
  const containerRef = useRef<HTMLDivElement>(null);

  const updateLabels = useCallback((progress: number) => {
    if (!containerRef.current) return;

    const labels = containerRef.current.querySelectorAll("li");
    const count = labels.length;
    if (!count) return;

    labels.forEach((label, i) => {
      // Each label appears at a different scroll progress point
      const start = (i / count) * 0.6 + 0.1; // stagger from 0.1 to 0.7
      const end = start + 0.15;
      const labelProgress = Math.min(1, Math.max(0, (progress - start) / (end - start)));
      (label as HTMLElement).style.opacity = String(labelProgress);
    });
  }, []);

  return { ref: containerRef, updateLabels };
}

/* Re-export anime.js utilities */
export { animate, onScroll, createTimeline, stagger };
