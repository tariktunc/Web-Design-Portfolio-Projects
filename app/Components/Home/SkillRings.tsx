"use client";
import { useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   SkillRings — Gezegen Sistemi (Solar System)

   - Eliptik yörüngeler (SVG ellipse)
   - Gezegen noktaları + ok (arrow) + etiketler
   - Scroll ile dönüş (720° = 2 tam tur)
   - Sürekli otonom dönüş (10°/s)
   - Derinlik simülasyonu (arkadaki gezegenler soluk)
   ───────────────────────────────────────────── */

const D2R = Math.PI / 180;

interface Skill {
  readonly name: string;
  readonly color: string;
  readonly angle: number;
}

interface Orbit {
  readonly a: number;
  readonly b: number;
  readonly stroke: string;
  readonly width: number;
  readonly speed: number;
  readonly dir: 1 | -1;
  readonly skills: readonly Skill[];
}

const ORBITS: readonly Orbit[] = [
  {
    a: 120, b: 48,
    stroke: "rgba(100,255,218,0.4)", width: 1.8,
    speed: 1, dir: 1,
    skills: [
      { name: "TypeScript", color: "#3178c6", angle: 0 },
      { name: "React", color: "#61dafb", angle: 120 },
      { name: "Next.js", color: "#ccd6f6", angle: 240 },
    ],
  },
  {
    a: 215, b: 86,
    stroke: "rgba(97,218,251,0.28)", width: 1.3,
    speed: 0.7, dir: -1,
    skills: [
      { name: "Node.js", color: "#68a063", angle: 20 },
      { name: "Express", color: "#a8b2d1", angle: 110 },
      { name: "MongoDB", color: "#4db33d", angle: 200 },
      { name: "Redux", color: "#764abc", angle: 290 },
    ],
  },
  {
    a: 330, b: 132,
    stroke: "rgba(100,255,218,0.18)", width: 1,
    speed: 0.45, dir: 1,
    skills: [
      { name: "Tailwind", color: "#38bdf8", angle: 10 },
      { name: "Git", color: "#f05032", angle: 82 },
      { name: "REST API", color: "#64ffda", angle: 154 },
      { name: "Python", color: "#3776ab", angle: 226 },
      { name: "CSS", color: "#264de4", angle: 298 },
    ],
  },
];

const ALL_SKILLS = ORBITS.flatMap((o) => o.skills);

interface Props {
  progress: number;
}

export default function SkillRings({ progress }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<SVGSVGElement>(null);
  const autoRef = useRef(0);
  const pRef = useRef(0);
  const frameRef = useRef(0);

  pRef.current = progress;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let prev = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;

      if (!reduced) autoRef.current += dt * 10;

      const p = pRef.current;
      const scrollDeg = p * 720;
      const vis = Math.min(1, p * 3.5);

      /* ── Orbit paths ── */
      ORBITS.forEach((orbit, oi) => {
        const oEl = svg.querySelector(`[data-o="${oi}"]`) as SVGElement | null;
        if (oEl) oEl.style.opacity = String((vis * 0.7).toFixed(2));
      });

      /* ── Planets ── */
      ORBITS.forEach((orbit, oi) => {
        orbit.skills.forEach((skill, si) => {
          const g = svg.querySelector(
            `[data-s="${oi}-${si}"]`
          ) as SVGGElement | null;
          if (!g) return;

          const deg =
            skill.angle +
            (autoRef.current + scrollDeg) * orbit.speed * orbit.dir;
          const rad = deg * D2R;
          const x = orbit.a * Math.cos(rad);
          const y = orbit.b * Math.sin(rad);

          // Depth: sin → 0 = front (bright), 1 = back (dim)
          const depth = (Math.sin(rad) + 1) / 2;
          const dOp = 0.25 + 0.75 * (1 - depth);
          const op = dOp * vis;
          const sc = 0.6 + 0.4 * (1 - depth);

          g.setAttribute(
            "transform",
            `translate(${x.toFixed(1)},${y.toFixed(1)})`
          );
          g.style.opacity = op.toFixed(2);

          // Planet dot + glow scale
          const dot = g.querySelector(".dot") as SVGCircleElement | null;
          const glow = g.querySelector(".glow") as SVGCircleElement | null;
          if (dot) dot.setAttribute("r", (5.5 * sc).toFixed(1));
          if (glow) glow.setAttribute("r", (14 * sc).toFixed(1));

          // Arrow direction
          const right = x >= 0;
          const d = right ? 1 : -1;
          const aStart = 9 * d;
          const aEnd = 50 * d;
          const tip = (50 + 7) * d;

          const line = g.querySelector(".aline") as SVGLineElement | null;
          const head = g.querySelector(".ahead") as SVGPolygonElement | null;
          const txt = g.querySelector(".stxt") as SVGTextElement | null;

          if (line) {
            line.setAttribute("x1", String(aStart));
            line.setAttribute("x2", String(aEnd));
          }
          if (head) {
            if (right) {
              head.setAttribute(
                "points",
                `${aEnd},-3.5 ${aEnd},3.5 ${tip},0`
              );
            } else {
              head.setAttribute(
                "points",
                `${aEnd},-3.5 ${aEnd},3.5 ${tip},0`
              );
            }
          }
          if (txt) {
            txt.setAttribute("x", String((50 + 13) * d));
            txt.setAttribute("text-anchor", right ? "start" : "end");
          }
        });
      });

      /* ── Center glow ── */
      svg.querySelectorAll(".cglow").forEach((el) => {
        (el as SVGElement).style.opacity = vis.toFixed(2);
      });

      /* ── Heading ── */
      if (headRef.current) {
        const fi = Math.min(1, p / 0.08);
        const fo = Math.max(0, 1 - (p - 0.85) * 6);
        headRef.current.style.opacity = String(Math.min(fi, fo).toFixed(2));
        const ty = (1 - Math.min(1, p / 0.15)) * 30;
        headRef.current.style.transform = `translate(-50%, ${ty}px)`;
      }

      /* ── Background lines scroll parallax ── */
      if (bgRef.current) {
        const lines = bgRef.current.querySelectorAll(
          ".bgl"
        ) as NodeListOf<SVGElement>;
        lines.forEach((l, i) => {
          const offset = p * (80 + i * 40) * (i % 2 === 0 ? 1 : -1);
          l.style.transform = `translateY(${offset}px)`;
        });
      }

      frameRef.current = requestAnimationFrame(frame);
    };

    frameRef.current = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* ── Background flowing lines ── */}
      <svg
        ref={bgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1400 900"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="bgl" d="M0 200 Q350 150 700 200 T1400 180" stroke="var(--green)" strokeWidth="0.8" opacity="0.04" />
        <path className="bgl" d="M0 400 Q400 350 800 420 T1400 380" stroke="var(--green)" strokeWidth="0.6" opacity="0.03" />
        <path className="bgl" d="M0 600 Q300 650 600 580 T1400 620" stroke="var(--green)" strokeWidth="0.8" opacity="0.04" />
        <path className="bgl" d="M0 750 Q500 700 900 770 T1400 730" stroke="#61dafb" strokeWidth="0.5" opacity="0.03" />
        <path className="bgl" d="M300 0 Q280 450 320 900" stroke="var(--green)" strokeWidth="0.5" opacity="0.03" />
        <path className="bgl" d="M700 0 Q720 400 680 900" stroke="var(--green)" strokeWidth="0.6" opacity="0.04" />
        <path className="bgl" d="M1100 0 Q1080 500 1120 900" stroke="#61dafb" strokeWidth="0.5" opacity="0.03" />
        <path className="bgl" d="M0 0 Q700 450 1400 900" stroke="var(--green)" strokeWidth="0.4" opacity="0.02" />
        <path className="bgl" d="M1400 0 Q700 450 0 900" stroke="var(--green)" strokeWidth="0.4" opacity="0.02" />
      </svg>

      {/* ── Radial glow behind orbits ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(100,255,218,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: Math.min(1, progress * 3),
        }}
        aria-hidden="true"
      />

      {/* ── Heading ── */}
      <div
        ref={headRef}
        className="absolute z-20 text-center w-full max-w-2xl px-6 top-[8%] left-1/2"
        style={{ opacity: 0, transform: "translate(-50%, 30px)" }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-lightest-slate mb-4 leading-tight">
          Teknoloji Araç Kutum
        </h2>
        <p className="text-base sm:text-lg text-slate-custom max-w-lg mx-auto">
          Modern web teknolojileriyle performanslı ve erişilebilir uygulamalar
          geliştiriyorum.
        </p>
      </div>

      {/* ── Solar System SVG ── */}
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="-480 -220 960 440"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: 960 }}
        role="img"
        aria-label="Teknoloji yörünge haritası"
      >
        <defs>
          <radialGradient id="centerGradient">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow gradient */}
        <circle
          className="cglow"
          cx={0}
          cy={0}
          r={80}
          fill="url(#centerGradient)"
          style={{ opacity: 0 }}
        />

        {/* Orbit ellipses */}
        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            data-o={i}
            cx={0}
            cy={0}
            rx={o.a}
            ry={o.b}
            fill="none"
            stroke={o.stroke}
            strokeWidth={o.width}
            style={{ opacity: 0 }}
          />
        ))}

        {/* Center "star" */}
        <circle
          className="cglow"
          cx={0}
          cy={0}
          r={7}
          fill="var(--green)"
          style={{ opacity: 0 }}
        />
        <circle
          className="cglow"
          cx={0}
          cy={0}
          r={3}
          fill="#fff"
          style={{ opacity: 0 }}
        />

        {/* Planets + Arrows + Labels */}
        {ORBITS.map((orbit, oi) =>
          orbit.skills.map((skill, si) => (
            <g
              key={`${oi}-${si}`}
              data-s={`${oi}-${si}`}
              style={{ opacity: 0 }}
            >
              {/* Planet glow */}
              <circle
                className="glow"
                cx={0}
                cy={0}
                r={14}
                fill={skill.color}
                opacity={0.12}
              />
              {/* Planet dot */}
              <circle
                className="dot"
                cx={0}
                cy={0}
                r={5.5}
                fill={skill.color}
              />
              {/* Arrow line */}
              <line
                className="aline"
                x1={9}
                y1={0}
                x2={50}
                y2={0}
                stroke={skill.color}
                strokeWidth={1.5}
                opacity={0.55}
              />
              {/* Arrow head */}
              <polygon
                className="ahead"
                points="50,-4 50,4 57,0"
                fill={skill.color}
                opacity={0.55}
              />
              {/* Skill label */}
              <text
                className="stxt"
                x={63}
                y={6}
                fill={skill.color}
                fontSize={20}
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
                letterSpacing="0.01em"
              >
                {skill.name}
              </text>
            </g>
          ))
        )}
      </svg>

      {/* ── Mobile: skill badges ── */}
      <div className="absolute bottom-[8%] left-0 right-0 flex md:hidden flex-wrap justify-center gap-3 px-6">
        {ALL_SKILLS.map((skill) => (
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
