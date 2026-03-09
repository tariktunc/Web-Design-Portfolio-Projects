"use client";
import { useRef, useEffect, useState } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";

interface UseCountUpOptions {
  target: number;
  duration?: number;
  delay?: number;
}

export function useCountUp({
  target,
  duration = 1.5,
  delay = 0,
}: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!isInView) return;

    if (reduced) {
      setDisplayValue(target);
      return;
    }

    const timeout = setTimeout(() => {
      const controls = animate(motionValue, target, {
        duration,
        ease: "easeOut",
      });

      const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));

      return () => {
        controls.stop();
        unsubscribe();
      };
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, target, duration, delay, reduced, motionValue, rounded]);

  return { ref, displayValue };
}
