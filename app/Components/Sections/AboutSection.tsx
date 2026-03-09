"use client";
import { useAnimeScrollReveal } from "@/app/hooks/useAnime";

export default function AboutSection() {
  const containerRef = useAnimeScrollReveal(".about-reveal", {
    translateY: [60, 0],
    filter: ["blur(8px)", "blur(0px)"],
    duration: 1000,
    ease: "outExpo",
  });

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-6 sm:px-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lightest-slate mb-8 tracking-tight">
        Hakkımda
      </h2>

      <div className="space-y-5 text-slate-custom leading-relaxed text-base sm:text-lg">
        <div className="about-reveal">
          <p>
            Kariyerine{" "}
            <span className="font-medium text-lightest-slate">siber güvenlik</span>{" "}
            alanında başlayan{" "}
            <span className="font-medium text-lightest-slate">Tarık Tunç</span>,
            aktif ve pasif saldırı vektörlerinin analizi, savunma sistemleri
            geliştirme ve penetrasyon testi süreçlerinde deneyim kazanmıştır.
            Kali Linux, Metasploit, Burp Suite ve Wireshark gibi araçlarla
            güvenlik altyapıları üzerinde çalışmalar yürütmüştür.
          </p>
        </div>

        <div className="about-reveal">
          <p>
            Full Stack Developer olarak{" "}
            <span className="font-medium text-lightest-slate">
              Next.js, React, TypeScript ve Node.js
            </span>{" "}
            teknolojileriyle e-ticaret altyapıları, SaaS platformları ve kurumsal
            web uygulamaları geliştirmektedir. E-ticaret, turizm, güzellik ve
            profesyonel hizmetler sektörlerinde 9&apos;dan fazla müşteri projesi
            teslim etmiş; satış oranlarında{" "}
            <span className="font-medium text-lightest-slate">%200–%300</span>{" "}
            seviyelerinde artış sağlanmıştır.
          </p>
        </div>

        <div className="about-reveal">
          <p>
            Yapay zekâ destekli otonom reklamcılık sistemleri, SEO mühendisliği
            araçları ve Google Ads veri madenciliği platformları geliştiren Tunç,
            kendi AI altyapısını kurarak reklam stratejisi optimizasyonu, bütçe
            yönetimi ve dönüşüm oranı analizi süreçlerini otomatize etmektedir.
            Sosyal medya mühendisliği ve içerik stratejisi alanlarında da aktif
            çalışmalar sürdürmektedir.
          </p>
        </div>
      </div>
    </div>
  );
}
