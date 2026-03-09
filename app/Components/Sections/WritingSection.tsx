"use client";
import { useAnimeScrollReveal } from "@/app/hooks/useAnime";

export default function WritingSection() {
  const containerRef = useAnimeScrollReveal(".blog-reveal", {
    translateY: [50, 0],
    duration: 900,
  });

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-6 sm:px-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lightest-slate mb-8 tracking-tight">
        Blog
      </h2>

      <div className="blog-reveal">
        <div className="group relative rounded-md p-6 transition-all duration-500 hover:bg-navy-light/50 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1),0_0_30px_rgba(100,255,218,0.03)]">
          <p className="text-base sm:text-lg leading-relaxed text-slate-custom mb-6">
            Yazılım geliştirme, modern web teknolojileri ve Full Stack deneyimlerim
            hakkındaki blog yazılarımı Blakfy Blog üzerinden takip edebilirsiniz.
          </p>
          <a
            href="https://blakfy.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-medium text-lightest-slate hover:text-green transition-colors group/link"
            aria-label="Blakfy Blog (yeni sekmede açılır)"
          >
            Blakfy Blog&apos;u Ziyaret Et
            <span
              className="ml-1 inline-block transition-transform group-hover/link:translate-x-2 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            >
              &#8599;
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
