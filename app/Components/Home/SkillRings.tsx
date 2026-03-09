"use client";
import { useRef, useEffect, useCallback } from "react";
import { waapi } from "animejs";

/* ─────────────────────────────────────────────
   SkillRings — animejs.com toolbox section karşılığı.
   progress prop'u ScrollSection'dan gelir (0-1).

   Özellikler:
   - Scroll ile dönen 3D halkalar (daha büyük, daha parlak)
   - Etiketler scroll ile büyüyüp küçülür (scale + opacity + slide)
   - Hareketli arka plan çizgileri
   - Başlık ortada üstte, scroll ile fade in/out
   ───────────────────────────────────────────── */

const skillsLeft = [
  { name: "TypeScript", color: "var(--green)" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "var(--lightest-slate)" },
  { name: "Node.js", color: "#68a063" },
  { name: "MongoDB", color: "#4db33d" },
];

const skillsRight = [
  { name: "Tailwind", color: "#38bdf8" },
  { name: "Redux", color: "#764abc" },
  { name: "Express", color: "var(--slate)" },
  { name: "Git", color: "#f05032" },
  { name: "REST API", color: "var(--green)" },
  { name: "CSS", color: "#264de4" },
];

interface SkillRingsProps {
  progress: number;
}

export default function SkillRings({ progress }: SkillRingsProps) {
  const ringsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const labelsLeftRef = useRef<HTMLDivElement>(null);
  const labelsRightRef = useRef<HTMLDivElement>(null);
  const bgLinesRef = useRef<SVGSVGElement>(null);

  // Continuous background line animation (WAAPI 60fps)
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const anims: ReturnType<typeof waapi.animate>[] = [];

    // Animate background SVG lines
    if (bgLinesRef.current) {
      const lines = bgLinesRef.current.querySelectorAll(".bg-line") as NodeListOf<SVGElement>;
      lines.forEach((line, i) => {
        anims.push(
          waapi.animate(line, {
            opacity: [0.03 + i * 0.01, 0.08 + i * 0.02, 0.03 + i * 0.01],
            duration: 3000 + i * 1000,
            iterations: Infinity,
            easing: "ease-in-out",
          })
        );
      });
    }

    // Animate ring glow pulse
    if (ringsRef.current) {
      const rings = ringsRef.current.querySelectorAll(".ring") as NodeListOf<HTMLElement>;
      rings.forEach((ring, i) => {
        anims.push(
          waapi.animate(ring, {
            opacity: [0.15 + i * 0.05, 0.35 + i * 0.08, 0.15 + i * 0.05],
            duration: 3500 + i * 1200,
            iterations: Infinity,
            easing: "ease-in-out",
          })
        );
      });
    }

    return () => {
      anims.forEach((a) => a?.pause());
    };
  }, []);

  // Update labels: opacity + scale + slide based on progress
  const updateLabels = useCallback((container: HTMLDivElement | null, p: number, side: "left" | "right") => {
    if (!container) return;
    const labels = container.querySelectorAll(".skill-label") as NodeListOf<HTMLElement>;
    const count = labels.length;
    if (!count) return;

    labels.forEach((label, i) => {
      // Each label has its own activation window
      const start = (i / count) * 0.45 + 0.08;
      const end = start + 0.15;
      const labelProgress = Math.min(1, Math.max(0, (p - start) / (end - start)));

      // Scale: 0.5 → 1.0
      const scale = 0.5 + labelProgress * 0.5;
      // Slide: ±60px → 0
      const slideX = (1 - labelProgress) * 60 * (side === "left" ? -1 : 1);
      // Opacity: 0 → 1
      label.style.opacity = String(labelProgress);
      label.style.transform = `translateX(${slideX}px) scale(${scale})`;
    });
  }, []);

  // Scroll-driven: rotate rings + show labels + fade text + move bg lines
  useEffect(() => {
    if (!ringsRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      if (textRef.current) textRef.current.style.opacity = "1";
      return;
    }

    // Rotate rings based on scroll
    const rings = ringsRef.current.querySelectorAll(".ring") as NodeListOf<HTMLElement>;
    rings.forEach((ring, i) => {
      const speed = 360 + i * 220;
      const xTilt = 60 - i * 8;
      const zRotation = progress * speed * (i % 2 === 0 ? 1 : -1);
      const ringScale = 0.8 + progress * 0.4; // Rings grow as you scroll
      ring.style.transform = `rotateX(${xTilt}deg) rotateZ(${zRotation}deg) scale(${ringScale})`;
    });

    // Update labels
    updateLabels(labelsLeftRef.current, progress, "left");
    updateLabels(labelsRightRef.current, progress, "right");

    // Heading fade
    if (textRef.current) {
      const fadeIn = Math.min(1, progress / 0.08);
      const fadeOut = Math.max(0, 1 - (progress - 0.85) * 6);
      textRef.current.style.opacity = String(Math.min(fadeIn, fadeOut));
      // Slight upward movement
      const translateY = (1 - Math.min(1, progress / 0.15)) * 30;
      textRef.current.style.transform = `translate(-50%, ${translateY}px)`;
    }

    // Move background lines based on scroll
    if (bgLinesRef.current) {
      const lines = bgLinesRef.current.querySelectorAll(".bg-line") as NodeListOf<SVGElement>;
      lines.forEach((line, i) => {
        const offset = progress * (80 + i * 40) * (i % 2 === 0 ? 1 : -1);
        line.style.transform = `translateY(${offset}px)`;
      });
    }
  }, [progress, updateLabels]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Animated background grid lines */}
      <svg
        ref={bgLinesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1400 900"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {/* Horizontal flowing lines */}
        <path className="bg-line" d="M0 200 Q350 150 700 200 T1400 180" stroke="var(--green)" strokeWidth="0.8" opacity="0.04" />
        <path className="bg-line" d="M0 400 Q400 350 800 420 T1400 380" stroke="var(--green)" strokeWidth="0.6" opacity="0.03" />
        <path className="bg-line" d="M0 600 Q300 650 600 580 T1400 620" stroke="var(--green)" strokeWidth="0.8" opacity="0.04" />
        <path className="bg-line" d="M0 750 Q500 700 900 770 T1400 730" stroke="#61dafb" strokeWidth="0.5" opacity="0.03" />
        {/* Vertical flowing lines */}
        <path className="bg-line" d="M300 0 Q280 450 320 900" stroke="var(--green)" strokeWidth="0.5" opacity="0.03" />
        <path className="bg-line" d="M700 0 Q720 400 680 900" stroke="var(--green)" strokeWidth="0.6" opacity="0.04" />
        <path className="bg-line" d="M1100 0 Q1080 500 1120 900" stroke="#61dafb" strokeWidth="0.5" opacity="0.03" />
        {/* Diagonal accents */}
        <path className="bg-line" d="M0 0 Q700 450 1400 900" stroke="var(--green)" strokeWidth="0.4" opacity="0.02" />
        <path className="bg-line" d="M1400 0 Q700 450 0 900" stroke="var(--green)" strokeWidth="0.4" opacity="0.02" />
      </svg>

      {/* Radial glow behind rings */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(100,255,218,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: Math.min(1, progress * 3),
        }}
        aria-hidden="true"
      />

      {/* Heading — centered above rings */}
      <div
        ref={textRef}
        className="absolute z-20 text-center w-full max-w-2xl px-6 top-[8%] left-1/2"
        style={{ opacity: 0, transform: "translate(-50%, 30px)" }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-lightest-slate mb-4 leading-tight">
          Teknoloji Araç Kutum
        </h2>
        <p className="text-base sm:text-lg text-slate-custom max-w-lg mx-auto">
          Modern web teknolojileriyle performanslı ve erişilebilir uygulamalar geliştiriyorum.
        </p>
      </div>

      {/* 3D Rings — larger and more visible */}
      <div ref={ringsRef} className="rings-container" style={{ minHeight: "450px" }}>
        <div
          className="ring ring-glow"
          style={{
            width: "min(440px, 75vw)",
            height: "min(440px, 75vw)",
            borderColor: "var(--green)",
            borderWidth: "2px",
            opacity: 0.2,
            transform: "rotateX(60deg) rotateZ(0deg)",
          }}
        />
        <div
          className="ring ring-glow"
          style={{
            width: "min(340px, 60vw)",
            height: "min(340px, 60vw)",
            borderColor: "#61dafb",
            borderWidth: "1.5px",
            opacity: 0.25,
            transform: "rotateX(52deg) rotateZ(0deg)",
          }}
        />
        <div
          className="ring ring-glow"
          style={{
            width: "min(240px, 45vw)",
            height: "min(240px, 45vw)",
            borderColor: "var(--green)",
            borderWidth: "2.5px",
            opacity: 0.3,
            transform: "rotateX(44deg) rotateZ(0deg)",
          }}
        />
        <div
          className="ring ring-glow"
          style={{
            width: "min(150px, 28vw)",
            height: "min(150px, 28vw)",
            borderColor: "var(--green)",
            borderWidth: "3px",
            opacity: 0.4,
            transform: "rotateX(36deg) rotateZ(0deg)",
          }}
        />
        {/* Center glow dot */}
        <div
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: "var(--green)",
            boxShadow: "0 0 30px var(--green), 0 0 80px rgba(100,255,218,0.4)",
            opacity: Math.min(1, progress * 4),
          }}
        />
      </div>

      {/* Labels Left — large, animated */}
      <div
        ref={labelsLeftRef}
        className="absolute hidden md:flex flex-col justify-center gap-5 pointer-events-none"
        style={{ left: "12%", top: "50%", transform: "translateY(-50%)" }}
      >
        {skillsLeft.map((skill) => (
          <div
            key={skill.name}
            className="skill-label flex items-center gap-3"
            style={{ opacity: 0, transform: "translateX(-60px) scale(0.5)" }}
          >
            <span
              className="block w-10 h-[2px] rounded-full"
              style={{ background: skill.color, opacity: 0.6 }}
            />
            <span
              className="text-lg md:text-xl lg:text-2xl font-bold tracking-wide whitespace-nowrap"
              style={{ color: skill.color }}
            >
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Labels Right — large, animated */}
      <div
        ref={labelsRightRef}
        className="absolute hidden md:flex flex-col justify-center items-end gap-5 pointer-events-none"
        style={{ right: "12%", top: "50%", transform: "translateY(-50%)" }}
      >
        {skillsRight.map((skill) => (
          <div
            key={skill.name}
            className="skill-label flex items-center gap-3"
            style={{ opacity: 0, transform: "translateX(60px) scale(0.5)" }}
          >
            <span
              className="text-lg md:text-xl lg:text-2xl font-bold tracking-wide whitespace-nowrap"
              style={{ color: skill.color }}
            >
              {skill.name}
            </span>
            <span
              className="block w-10 h-[2px] rounded-full"
              style={{ background: skill.color, opacity: 0.6 }}
            />
          </div>
        ))}
      </div>

      {/* Mobile: skill labels below rings */}
      <div className="absolute bottom-[8%] left-0 right-0 flex md:hidden flex-wrap justify-center gap-3 px-6">
        {[...skillsLeft, ...skillsRight].map((skill) => (
          <span
            key={skill.name}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{
              color: skill.color,
              borderColor: skill.color,
              opacity: Math.min(1, progress * 3),
              transform: `scale(${0.8 + Math.min(1, progress * 2) * 0.2})`,
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
