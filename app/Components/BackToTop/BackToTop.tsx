"use client";
import { useState, useEffect } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-10 h-10 rounded-lg border border-green/30 bg-navy-light/80 backdrop-blur-sm text-green hover:bg-green/10 hover:border-green/60 hover:shadow-[0_0_16px_rgba(100,255,218,0.12)] transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Sayfanın başına dön"
    >
      <ArrowUpIcon className="h-4.5 w-4.5" />
    </button>
  );
}
