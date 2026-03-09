"use client";
import { useRef, useEffect, useCallback } from "react";
import {
  animate,
  createTimeline,
  stagger,
  createDraggable,
  onScroll,
  createDrawable,
  spring,
  waapi,
  splitText,
  type AnimationParams,
} from "animejs";

/* ─────────────────────────────────────────────
   Shared: prefers-reduced-motion check
   ───────────────────────────────────────────── */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─────────────────────────────────────────────
   1. useAnimeTimeline — Sıralı animasyon zinciri
   Hero giriş sekansı, sayfa yüklenme animasyonları
   ───────────────────────────────────────────── */
export function useAnimeTimeline(
  build: (tl: ReturnType<typeof createTimeline>) => void,
  deps: unknown[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<ReturnType<typeof createTimeline> | null>(null);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const tl = createTimeline({ defaults: { ease: "outExpo", duration: 900 } });
    build(tl);
    tlRef.current = tl;
    return () => {
      tl.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref: containerRef, timeline: tlRef };
}

/* ─────────────────────────────────────────────
   2. useAnimeScrollReveal — Scroll tetiklemeli reveal
   Section'lar, kartlar, paragraflar
   ───────────────────────────────────────────── */
export function useAnimeScrollReveal(
  targets: string,
  animProps: Partial<AnimationParams> = {},
  options: { threshold?: number; staggerDelay?: number } = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const elements = containerRef.current.querySelectorAll(targets);
    if (!elements.length) return;

    // Set initial state
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(60px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [60, 0],
              filter: ["blur(8px)", "blur(0px)"],
              duration: 900,
              ease: "outExpo",
              ...animProps,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold ?? 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}

/* ─────────────────────────────────────────────
   3. useAnimeStagger — Dalga efektiyle sıralı belirme
   Kart grid'leri, liste öğeleri, badge'ler
   ───────────────────────────────────────────── */
export function useAnimeStagger(
  targets: string,
  options: {
    from?: "first" | "last" | "center" | number;
    delay?: number;
    direction?: "normal" | "reverse";
    grid?: [number, number];
  } = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const elements = containerRef.current.querySelectorAll(targets);
    if (!elements.length) return;

    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(40px) scale(0.95)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (animatedRef.current) return;
        const anyVisible = entries.some((e) => e.isIntersecting);
        if (!anyVisible) return;
        animatedRef.current = true;

        animate(elements, {
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.95, 1],
          duration: 800,
          ease: "outExpo",
          delay: stagger(options.delay ?? 120, {
            from: options.from ?? "first",
            grid: options.grid,
          }),
        });
        observer.disconnect();
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}

/* ─────────────────────────────────────────────
   4. useAnimeSVGDraw — SVG çizim efekti
   Proje kapak SVG'leri, ikonlar
   ───────────────────────────────────────────── */
export function useAnimeSVGDraw(options: { duration?: number; delay?: number } = {}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion()) return;
    const paths = svgRef.current.querySelectorAll("path, line, circle, rect, polyline, polygon");
    if (!paths.length) return;

    const drawables = Array.from(paths).map((el) => createDrawable(el as SVGGeometryElement));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          animate(drawables, {
            draw: ["0 0", "0 1"],
            duration: options.duration ?? 1500,
            delay: stagger(100),
            ease: "inOutQuart",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(svgRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return svgRef;
}

/* ─────────────────────────────────────────────
   5. useAnimeDraggable — Sürüklenebilir öğeler
   Skill badge'leri, galeri
   ───────────────────────────────────────────── */
export function useAnimeDraggable(options: Record<string, unknown> = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<ReturnType<typeof createDraggable> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    draggableRef.current = createDraggable(containerRef.current, {
      ...options,
    } as Parameters<typeof createDraggable>[1]);

    return () => {
      draggableRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref: containerRef, draggable: draggableRef };
}

/* ─────────────────────────────────────────────
   6. useAnimeTextSplit — Metin bölme animasyonu
   Başlıklar, hero text
   ───────────────────────────────────────────── */
export function useAnimeTextSplit(options: {
  splitBy?: "chars" | "words" | "lines";
  staggerDelay?: number;
  duration?: number;
  autoPlay?: boolean;
} = {}) {
  const textRef = useRef<HTMLElement>(null);
  const splitRef = useRef<ReturnType<typeof splitText> | null>(null);

  const play = useCallback(() => {
    if (!textRef.current || prefersReducedMotion()) return;
    const split = splitText(textRef.current);
    splitRef.current = split;

    const targets =
      options.splitBy === "words"
        ? split.words
        : options.splitBy === "lines"
          ? split.lines
          : split.chars;

    animate(targets, {
      opacity: [0, 1],
      translateY: [40, 0],
      rotateX: [90, 0],
      duration: options.duration ?? 800,
      ease: "outExpo",
      delay: stagger(options.staggerDelay ?? 30),
    });
  }, [options.splitBy, options.staggerDelay, options.duration]);

  useEffect(() => {
    if (options.autoPlay !== false) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(play, 50);
      return () => clearTimeout(timer);
    }
  }, [play, options.autoPlay]);

  return { ref: textRef, play, split: splitRef };
}

/* ─────────────────────────────────────────────
   7. useAnimeHover — CSS/Transform hover efekti
   Kartlar, butonlar, ikonlar
   ───────────────────────────────────────────── */
export function useAnimeHover(
  enterProps: Partial<AnimationParams> = {},
  leaveProps: Partial<AnimationParams> = {}
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const handleEnter = () => {
      animate(el, {
        scale: 1.05,
        duration: 300,
        ease: spring({ stiffness: 400, damping: 25 }),
        ...enterProps,
      });
    };

    const handleLeave = () => {
      animate(el, {
        scale: 1,
        duration: 300,
        ease: spring({ stiffness: 400, damping: 25 }),
        ...leaveProps,
      });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────
   8. useAnimeWAAPI — Web Animations API (60fps)
   Sürekli animasyonlar, parallax, arka plan
   ───────────────────────────────────────────── */
export function useAnimeWAAPI(
  props: Record<string, unknown>
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const anim = waapi.animate(el, {
      duration: 3000,
      iterations: Infinity,
      easing: "ease-in-out",
      ...props,
    } as Parameters<typeof waapi.animate>[1]);

    return () => {
      anim?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────
   9. useAnimeScrollProgress — Scroll ilerleme
   Progress bar, parallax değerler
   ───────────────────────────────────────────── */
export function useAnimeScrollProgress(targets: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const elements = containerRef.current.querySelectorAll(targets);
    if (!elements.length) return;

    const sub = onScroll({
      target: containerRef.current,
      container: window,
      enter: "bottom",
      leave: "top",
    });

    const anim = animate(elements, {
      opacity: [0, 1],
      translateY: [100, 0],
      scale: [0.9, 1],
      filter: ["blur(10px)", "blur(0px)"],
      duration: 1000,
      ease: "outExpo",
      composition: "replace",
      ...({ onScroll: sub } as Record<string, unknown>),
    });

    return () => {
      anim.pause();
      sub.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}

/* ─────────────────────────────────────────────
   10. useAnimeLayout — Enter/exit animasyonları
   Sayfa geçişleri, modal, dropdown
   ───────────────────────────────────────────── */
export function useAnimeEnter(
  animProps: Partial<AnimationParams> = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    animate(ref.current, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      ease: "outExpo",
      ...animProps,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────
   Utility: animate helper (imperative)
   ───────────────────────────────────────────── */
export { animate, createTimeline, stagger, spring, onScroll, createDrawable, splitText, waapi };
