"use client";

/* ─────────────────────────────────────────────
   AnimatedBackground — Tüm sayfa boyunca sürekli
   hareket eden dekoratif SVG elementler.

   Tamamı CSS animasyonu (compositor thread, JS yok).
   position: fixed → scroll ile birlikte sabit kalır.
   ───────────────────────────────────────────── */

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* ── Yüzen daireler (floating circles) ── */}
        <circle
          className="bg-anim"
          cx={120}
          cy={180}
          r={3}
          fill="var(--green)"
          opacity={0.05}
          style={{ animation: "bgFloat 18s ease-in-out infinite" }}
        />
        <circle
          className="bg-anim"
          cx={1280}
          cy={320}
          r={4.5}
          fill="var(--accent-2)"
          opacity={0.04}
          style={{ animation: "bgFloat 22s ease-in-out infinite 3s" }}
        />
        <circle
          className="bg-anim"
          cx={350}
          cy={700}
          r={2.5}
          fill="var(--green)"
          opacity={0.06}
          style={{ animation: "bgFloat 16s ease-in-out infinite 7s" }}
        />
        <circle
          className="bg-anim"
          cx={950}
          cy={120}
          r={5}
          fill="var(--green)"
          opacity={0.03}
          style={{ animation: "bgFloat 25s ease-in-out infinite 1s" }}
        />

        {/* ── Kayan çizgiler (drifting lines) ── */}
        <line
          className="bg-anim"
          x1={100}
          y1={250}
          x2={300}
          y2={250}
          stroke="var(--green)"
          strokeWidth={0.6}
          opacity={0.03}
          style={{ animation: "bgDrift 35s ease-in-out infinite alternate" }}
        />
        <line
          className="bg-anim"
          x1={900}
          y1={550}
          x2={1150}
          y2={555}
          stroke="var(--accent-2)"
          strokeWidth={0.5}
          opacity={0.025}
          style={{ animation: "bgDrift 40s ease-in-out infinite alternate 5s" }}
        />
        <line
          className="bg-anim"
          x1={500}
          y1={100}
          x2={700}
          y2={105}
          stroke="var(--green)"
          strokeWidth={0.7}
          opacity={0.03}
          style={{ animation: "bgDrift 30s ease-in-out infinite alternate 12s" }}
        />
        <path
          className="bg-anim"
          d="M200 600 Q500 560 800 610"
          stroke="var(--green)"
          strokeWidth={0.4}
          opacity={0.025}
          style={{ animation: "bgDrift 38s ease-in-out infinite alternate 8s" }}
        />

        {/* ── Dönen poligonlar (rotating polygons) ── */}
        {/* Hexagon 1 */}
        <polygon
          className="bg-anim"
          points="1200,400 1210,393 1220,400 1220,414 1210,421 1200,414"
          stroke="var(--green)"
          strokeWidth={0.6}
          fill="none"
          opacity={0.05}
          style={{
            animation: "bgRotate 70s linear infinite",
            transformOrigin: "1210px 407px",
          }}
        />
        {/* Triangle */}
        <polygon
          className="bg-anim"
          points="180,470 195,445 210,470"
          stroke="var(--accent-2)"
          strokeWidth={0.5}
          fill="none"
          opacity={0.04}
          style={{
            animation: "bgRotate 90s linear infinite reverse",
            transformOrigin: "195px 462px",
          }}
        />
        {/* Hexagon 2 */}
        <polygon
          className="bg-anim"
          points="700,780 712,772 724,780 724,796 712,804 700,796"
          stroke="var(--green)"
          strokeWidth={0.5}
          fill="none"
          opacity={0.04}
          style={{
            animation: "bgRotate 60s linear infinite",
            transformOrigin: "712px 788px",
          }}
        />

        {/* ── Nabız atan noktalar (pulsing dots) ── */}
        <circle
          className="bg-anim"
          cx={600}
          cy={200}
          r={2}
          fill="var(--green)"
          style={{ animation: "bgPulse 5s ease-in-out infinite" }}
        />
        <circle
          className="bg-anim"
          cx={1100}
          cy={680}
          r={1.5}
          fill="var(--accent-2)"
          style={{ animation: "bgPulse 4s ease-in-out infinite 2s" }}
        />
        <circle
          className="bg-anim"
          cx={300}
          cy={400}
          r={2.5}
          fill="var(--green)"
          style={{ animation: "bgPulse 6s ease-in-out infinite 1s" }}
        />

        {/* ── Ek dekoratif eğriler ── */}
        <path
          className="bg-anim"
          d="M0 450 Q350 400 700 460 T1400 420"
          stroke="var(--green)"
          strokeWidth={0.3}
          opacity={0.02}
          style={{ animation: "bgDrift 45s ease-in-out infinite alternate 3s" }}
        />
        <path
          className="bg-anim"
          d="M1400 200 Q1050 250 700 190 T0 230"
          stroke="var(--accent-2)"
          strokeWidth={0.3}
          opacity={0.02}
          style={{ animation: "bgDrift 42s ease-in-out infinite alternate 10s" }}
        />
      </svg>
    </div>
  );
}
