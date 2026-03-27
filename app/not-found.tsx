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
          <p className="text-8xl font-bold text-green mb-4">404</p>
          <h1 className="text-2xl font-bold text-lightest-slate mb-3">
            Sayfa Bulunamadı
          </h1>
          <p className="text-slate-custom max-w-md mx-auto mb-8 leading-relaxed">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg border border-green/30 text-green text-sm font-medium hover:bg-green/10 hover:border-green/60 transition-all duration-300"
            >
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/projeler"
              className="px-5 py-2.5 rounded-lg bg-navy-light text-slate-custom-light text-sm font-medium hover:text-green hover:bg-navy-lighter transition-all duration-300"
            >
              Projelere Göz At
            </Link>
          </div>
        </FadeInSection>
      </main>
    </>
  );
}
