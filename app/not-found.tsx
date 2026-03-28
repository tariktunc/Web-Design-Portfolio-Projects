import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/app/Components/Navbar/Navbar";
import FadeInSection from "@/app/Components/FadeInSection";

export const metadata: Metadata = {
  title: "404 — Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center"
      >
        <FadeInSection>
          {/* Animated 404 text */}
          <p className="text-[8rem] sm:text-[10rem] font-bold leading-none bg-gradient-to-r from-green via-accent2 to-green bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_ease-in-out_infinite] mb-2 select-none">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-lightest-slate mb-3">
            Sayfa Bulunamadı
          </h1>
          <p className="text-slate-custom max-w-md mx-auto mb-2 leading-relaxed">
            Bu sayfayı bulamadık. Belki de henüz kodlamadım!
          </p>
          <p className="text-slate-custom/60 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="hero-cta-primary px-6 py-3 rounded-xl bg-green text-white text-sm font-semibold shadow-xl shadow-green/25 hover:shadow-green/40 transition-all duration-300"
            >
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 rounded-xl border border-navy-lighter/60 bg-navy-light/40 text-slate-custom-light text-sm font-medium hover:text-green hover:border-green/30 transition-all duration-300"
            >
              Blog Yazılarına Göz At
            </Link>
          </div>
        </FadeInSection>
      </main>
    </>
  );
}
