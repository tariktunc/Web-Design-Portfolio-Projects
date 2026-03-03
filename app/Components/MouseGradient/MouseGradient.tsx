"use client";
import React from "react";

export default function MouseGradient() {
  const gradientRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const mousePos = React.useRef({ x: 0, y: 0 });
  const currentPos = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = gradientRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth lerp animation loop
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentPos.current.x = lerp(
        currentPos.current.x,
        mousePos.current.x,
        0.08
      );
      currentPos.current.y = lerp(
        currentPos.current.y,
        mousePos.current.y,
        0.08
      );

      const { x, y } = currentPos.current;

      // Primary large gradient
      el.style.background = `radial-gradient(800px at ${x}px ${y}px, rgba(29, 78, 216, 0.12), transparent 70%)`;

      // Secondary smaller teal glow
      inner.style.background = `radial-gradient(400px at ${x}px ${y}px, rgba(100, 255, 218, 0.06), transparent 60%)`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={gradientRef}
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden="true"
      />
      <div
        ref={innerRef}
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden="true"
      />
    </>
  );
}
