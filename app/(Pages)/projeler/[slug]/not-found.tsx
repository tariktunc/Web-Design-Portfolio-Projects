"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Animated 404 number */}
      <motion.div
        className="text-8xl sm:text-9xl font-black mb-6"
        style={{
          background: "linear-gradient(135deg, var(--green), var(--lightest-slate))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        initial={{ scale: 0, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        404
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-4"
        style={{ color: "var(--lightest-slate)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
      >
        Proje bulunamadı
      </motion.h1>

      {/* Description */}
      <motion.p
        className="mb-8 max-w-md"
        style={{ color: "var(--slate)" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: smoothEase }}
      >
        Aradığınız proje bulunamadı veya kaldırılmış olabilir.
      </motion.p>

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: smoothEase }}
      >
        <Link
          href="/projeler"
          className="inline-flex items-center gap-2 rounded-lg border border-green px-5 py-2.5 text-sm font-semibold text-green hover:bg-green/10 hover:shadow-[0_0_20px_rgba(100,255,218,0.15)] transition-all duration-300"
        >
          &larr; Projelere Dön
        </Link>
      </motion.div>
    </div>
  );
}
