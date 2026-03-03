"use client";
import React from "react";

type AnimationVariant = "up" | "left" | "scale";

const variantClasses: Record<AnimationVariant, string> = {
  up: "fade-in-section",
  left: "fade-in-left",
  scale: "fade-in-scale",
};

export default function FadeInSection({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add("visible"), delay);
          } else {
            el.classList.add("visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
