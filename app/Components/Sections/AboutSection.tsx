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
            Merhaba! Ben{" "}
            <span className="font-medium text-lightest-slate">Tarık Tunç</span>,
            Türkiye merkezli tutkulu bir yazılım geliştiricisiyim. Ürün odaklı
            problemleri çözme konusundaki heyecanımla, sürekli öğrenmeye ve
            bilgimi meslektaşlarımla paylaşmaya derinden bağlıyım.
          </p>
        </div>

        <div className="about-reveal">
          <p>
            Şu anda{" "}
            <a
              href="https://blakfy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-lightest-slate hover:text-green transition-colors inline-block border-b border-green/0 hover:border-green/50"
              aria-label="Blakfy (yeni sekmede açılır)"
            >
              Blakfy
            </a>
            &apos;de dijital ürünler geliştiriyorum. Next.js, React ve
            TypeScript ile modern web deneyimleri oluşturuyorum. E-ticaret,
            turizm, güzellik ve profesyonel hizmetler alanlarında 9&apos;dan
            fazla müşteri projesi teslim ettim.
          </p>
        </div>

        <div className="about-reveal">
          <p>
            Bu günlerde asıl odak noktam erişilebilir, insan odaklı web
            uygulamaları geliştirmek. Tasarım ve mühendisliğin kesiştiği noktada
            çalışmaktan en çok keyif alıyorum — düşünceli etkileşimlerle
            piksel-mükemmel arayüzler yaratmak.
          </p>
        </div>
      </div>
    </div>
  );
}
