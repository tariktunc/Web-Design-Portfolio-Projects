"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
    >
      <p className="text-6xl font-bold text-green mb-4">500</p>
      <h1 className="text-2xl font-bold text-lightest-slate mb-3">
        Bir şeyler ters gitti
      </h1>
      <p className="text-slate-custom max-w-md mb-8 leading-relaxed">
        Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin
        veya ana sayfaya dönün.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-lg border border-green/30 text-green text-sm font-medium hover:bg-green/10 hover:border-green/60 transition-all duration-300"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-green/10 text-green text-sm font-medium hover:bg-green/20 transition-all duration-300"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}
