"use client";
import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { useParallax } from "@/app/hooks/useParallax";
import { useCountUp } from "@/app/hooks/useCountUp";

/* ─── Shared easing ─── */
const smoothEase = [0.16, 1, 0.3, 1] as const;
const dramaticEase = [0.25, 0.46, 0.45, 0.94] as const;

/* ═══════════════════════════════════════════
   MotionSection — Dramatic scroll-triggered reveal
   ═══════════════════════════════════════════ */
export function MotionSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 80, filter: "blur(10px)", scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 80, filter: "blur(10px)", scale: 0.95 }
      }
      transition={{
        duration: 1,
        delay,
        ease: smoothEase,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   StaggerContainer — Parent that staggers children
   ═══════════════════════════════════════════ */
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   StaggerItem — Dramatic child animation
   ═══════════════════════════════════════════ */
const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.85, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SlideIn — Dramatic directional slide
   ═══════════════════════════════════════════ */
export function SlideIn({
  children,
  className = "",
  direction = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const directionMap = {
    left: { x: -100, y: 0, rotate: -3 },
    right: { x: 100, y: 0, rotate: 3 },
    up: { x: 0, y: 100, rotate: 0 },
    down: { x: 0, y: -100, rotate: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(6px)", ...offset }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(6px)", ...offset }
      }
      transition={{ duration: 0.9, delay, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PopIn — Spring pop-in for badges
   ═══════════════════════════════════════════ */
const popInVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 15 },
  },
};

export function PopIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={popInVariants}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HeroReveal — Zoom-out hero image
   ═══════════════════════════════════════════ */
export function HeroReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.5, ease: dramaticEase }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   AnimatedHeading — Heading with animated green underline
   ═══════════════════════════════════════════ */
export function AnimatedHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={className}>
      <motion.h2
        className="text-lg font-semibold mb-4 pb-2"
        style={{ color: "var(--lightest-slate)" }}
        initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
        animate={
          isInView
            ? { opacity: 1, x: 0, filter: "blur(0px)" }
            : { opacity: 0, x: -40, filter: "blur(6px)" }
        }
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="h-[2px] bg-green/50"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isInView
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 1.2, delay: 0.3, ease: smoothEase }}
        style={{
          transformOrigin: "left",
          boxShadow: "0 0 10px rgba(100, 255, 218, 0.3)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   HoverScale — Hover scale wrapper
   ═══════════════════════════════════════════ */
export function HoverScale({
  children,
  className = "",
  scale = 1.05,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   TextReveal — Dramatic character/word stagger reveal
   ═══════════════════════════════════════════ */
export function TextReveal({
  text,
  splitBy = "word",
  staggerDelay = 0.03,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  splitBy?: "word" | "char";
  staggerDelay?: number;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const units = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: splitBy === "word" ? "0.25em" : undefined }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "120%", opacity: 0, rotateX: 40 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, rotateX: 0 }
                : { y: "120%", opacity: 0, rotateX: 40 }
            }
            transition={{
              duration: 0.7,
              delay: i * staggerDelay,
              ease: smoothEase,
            }}
            aria-hidden="true"
          >
            {unit}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ═══════════════════════════════════════════
   ScrollProgress — Page scroll progress bar
   ═══════════════════════════════════════════ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--green), #00d4aa, var(--green))",
        boxShadow: "0 0 15px rgba(100, 255, 218, 0.6), 0 0 30px rgba(100, 255, 218, 0.3)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   ParallaxImage — Image with parallax scroll
   ═══════════════════════════════════════════ */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  speed = 0.2,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed?: number;
  className?: string;
  priority?: boolean;
}) {
  const { ref, y } = useParallax({ speed });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ClipReveal — Dramatic clip-path reveal
   ═══════════════════════════════════════════ */
export function ClipReveal({
  children,
  direction = "left",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  direction?: "left" | "right" | "top" | "bottom" | "circle";
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const clipMap = {
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0%)",
    },
    top: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)",
    },
    bottom: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)",
    },
    circle: {
      hidden: "circle(0% at 50% 50%)",
      visible: "circle(100% at 50% 50%)",
    },
  };

  const clips = clipMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clips.hidden, opacity: 0.3 }}
      animate={
        isInView
          ? { clipPath: clips.visible, opacity: 1 }
          : { clipPath: clips.hidden, opacity: 0.3 }
      }
      transition={{
        duration: 1.3,
        delay,
        ease: dramaticEase,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Tilt3D — 3D perspective tilt on hover
   ═══════════════════════════════════════════ */
export function Tilt3D({
  children,
  className = "",
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      rotateX.set(-y * intensity);
      rotateY.set(x * intensity);
    },
    [intensity, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      className={className}
      style={{
        perspective: 1000,
        rotateX: springX,
        rotateY: springY,
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CountUpNumber — Animated counter
   ═══════════════════════════════════════════ */
export function CountUpNumber({
  target,
  suffix = "",
  duration = 1.5,
  className = "",
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, displayValue } = useCountUp({ target, duration });

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════
   GlowLine — Dramatic glowing line
   ═══════════════════════════════════════════ */
export function GlowLine({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={`h-[2px] ${className}`}
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.6), transparent)",
        boxShadow: "0 0 15px rgba(100, 255, 218, 0.3), 0 0 30px rgba(100, 255, 218, 0.1)",
        transformOrigin: "left",
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={
        isInView
          ? { scaleX: 1, opacity: 1 }
          : { scaleX: 0, opacity: 0 }
      }
      transition={{
        duration: 1.5,
        delay,
        ease: smoothEase,
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   PageTransition — Full-page entrance animation
   ═══════════════════════════════════════════ */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   FloatingOrbs — Animated decorative background
   ═══════════════════════════════════════════ */
export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Large green orb */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, var(--green), transparent)",
          filter: "blur(60px)",
          top: "10%",
          right: "-5%",
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Medium orb */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #00d4aa, transparent)",
          filter: "blur(40px)",
          bottom: "20%",
          left: "-3%",
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Small orb */}
      <motion.div
        className="absolute w-[150px] h-[150px] rounded-full opacity-[0.025]"
        style={{
          background: "radial-gradient(circle, var(--green), transparent)",
          filter: "blur(30px)",
          top: "60%",
          right: "20%",
        }}
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}
