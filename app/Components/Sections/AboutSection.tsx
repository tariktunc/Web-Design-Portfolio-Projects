"use client";
import { useAnimeScrollReveal } from "@/app/hooks/useAnime";

const stats = [
  { value: "9+", label: "Müşteri Projesi" },
  { value: "796+", label: "Blog Yazısı" },
  { value: "3+", label: "Yıl Deneyim" },
  { value: "26+", label: "Tamamlanan Proje" },
];

export default function AboutSection() {
  const containerRef = useAnimeScrollReveal(".about-reveal", {
    translateY: [50, 0],
    filter: ["blur(6px)", "blur(0px)"],
    duration: 900,
    ease: "outExpo",
  });

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-6 sm:px-12">
      {/* Section header */}
      <div className="about-reveal mb-12">
        <span className="text-green text-sm font-semibold tracking-widest uppercase mb-3 block">
          01. Hakkımda
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lightest-slate tracking-tight">
          Ben Kimim?
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main intro card */}
        <div className="about-reveal md:col-span-2 group relative rounded-2xl border border-navy-lighter/60 bg-navy-light/40 p-8 transition-all duration-500 hover:border-green/30 hover:bg-navy-light/60">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green/5 via-transparent to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative space-y-4 text-slate-custom leading-relaxed text-base sm:text-lg">
            <p>
              Kariyerine{" "}
              <span className="font-semibold text-lightest-slate">siber güvenlik</span>{" "}
              alanında başlayan{" "}
              <span className="font-semibold text-green">Tarık Tunç</span>,
              aktif ve pasif saldırı vektörlerinin analizi, savunma sistemleri
              geliştirme ve penetrasyon testi süreçlerinde deneyim kazanmıştır.
            </p>
            <p>
              Full Stack Developer olarak{" "}
              <span className="font-semibold text-lightest-slate">
                Next.js, React, TypeScript ve Node.js
              </span>{" "}
              teknolojileriyle e-ticaret altyapıları, SaaS platformları ve kurumsal
              web uygulamaları geliştirmektedir.
            </p>
          </div>
        </div>

        {/* Stats cards */}
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`about-reveal group relative rounded-2xl border border-navy-lighter/60 bg-navy-light/40 p-6 transition-all duration-500 hover:border-green/30 hover:bg-navy-light/60 ${
              i < 2 ? "sm:col-span-1" : "sm:col-span-1"
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green to-accent2 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-custom font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </div>
        ))}

        {/* AI & SEO card */}
        <div className="about-reveal md:col-span-2 group relative rounded-2xl border border-navy-lighter/60 bg-navy-light/40 p-8 transition-all duration-500 hover:border-green/30 hover:bg-navy-light/60">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent2/5 via-transparent to-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative space-y-4 text-slate-custom leading-relaxed text-base sm:text-lg">
            <p>
              Yapay zekâ destekli otonom reklamcılık sistemleri, SEO mühendisliği
              araçları ve Google Ads veri madenciliği platformları geliştiren Tunç,
              kendi AI altyapısını kurarak reklam stratejisi optimizasyonu, bütçe
              yönetimi ve dönüşüm oranı analizi süreçlerini{" "}
              <span className="font-semibold text-accent2">otomatize</span>{" "}
              etmektedir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
