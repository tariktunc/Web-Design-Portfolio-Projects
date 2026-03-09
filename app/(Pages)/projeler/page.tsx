import type { Metadata } from "next";
import {
  MotionSection,
  SlideIn,
  TextReveal,
  GlowLine,
} from "@/app/Components/Motion/MotionWrappers";
import ProjectContainer from "./Components/GithubProjectData";

export const metadata: Metadata = {
  title: "Projeler — Tarık Tunç",
  description:
    "Tarik Tunç'un kişisel projeleri. Next.js, React, TypeScript ve Tailwind CSS ile geliştirilen 12+ web projesi, GitHub repoları ve açık kaynak katkıları.",
  openGraph: {
    title: "Projeler | Tarık Tunç",
    description:
      "Kişisel projeler ve açık kaynak çalışmaları. Modern web teknolojileri ile geliştirilen uygulamalar.",
  },
  alternates: {
    canonical: "https://tariktunc.vercel.app/projeler",
  },
};

export default function LaboratoryPage() {
  return (
    <>
      {/* ── Typographic Hero ── */}
      <div className="pt-8 pb-12 md:pt-16 md:pb-16">
        <SlideIn direction="down" delay={0}>
          <span className="block font-mono text-sm text-green mb-2">
            {"// projeler"}
          </span>
        </SlideIn>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lightest-slate mb-4">
          <TextReveal
            text="Geliştirdiklerim"
            splitBy="char"
            staggerDelay={0.03}
          />
        </h1>
        <MotionSection delay={0.3}>
          <p className="text-base md:text-lg text-slate-custom max-w-2xl leading-relaxed">
            Kişisel projeler ve açık kaynak çalışmalarından oluşan bir koleksiyon.
            Yaratıcılık ve teknoloji bir araya geldiğinde, hayallerimizi
            gerçeğe dönüştürme gücüne sahibiz.
          </p>
        </MotionSection>
      </div>

      {/* ── Personal Projects ── */}
      <section className="mb-12 scroll-mt-16">
        <SlideIn direction="left">
          <h2 className="text-lg font-bold uppercase tracking-widest text-lightest-slate mb-8 flex items-center gap-4">
            <span className="text-green font-mono text-sm font-normal">
              01.
            </span>
            Projeler
            <span className="flex-1 h-px bg-navy-lighter" />
          </h2>
        </SlideIn>

        <ul className="group/list">
          <ProjectContainer />
        </ul>
      </section>

      {/* ── Gradient Separator ── */}
      <GlowLine className="my-8" delay={0.2} />

      {/* ── Blakfy CTA Banner ── */}
      <MotionSection delay={0.2}>
        <a
          href="https://blakfy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative overflow-hidden rounded-xl border border-navy-lighter hover:border-green/30 transition-all duration-500 p-8 sm:p-10 mb-16"
        >
          {/* Glow background on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-green/5 via-transparent to-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-green font-mono text-sm mb-2 block">
                02. Müşteri Çalışmaları
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-lightest-slate mb-3">
                Blakfy Projeleri
              </h2>
              <p className="text-slate-custom text-sm sm:text-base max-w-xl leading-relaxed">
                E-ticaret, turizm, güzellik ve profesyonel hizmetler alanında
                9&apos;dan fazla müşteri projesi. Tüm çalışmalar Blakfy
                bünyesinde geliştirilmiştir.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green/10 text-green font-medium text-sm whitespace-nowrap group-hover:bg-green/20 group-hover:shadow-[0_0_20px_rgba(100,255,218,0.15)] transition-all duration-300">
              blakfy.com
              <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                &#8599;
              </span>
            </span>
          </div>
        </a>
      </MotionSection>
    </>
  );
}
