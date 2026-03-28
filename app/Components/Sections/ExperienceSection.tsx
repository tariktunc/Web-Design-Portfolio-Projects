"use client";
import Link from "next/link";
import { useAnimeScrollReveal } from "@/app/hooks/useAnime";

const experiences = [
  {
    period: "2023 — Günümüz",
    title: "Full Stack Geliştirici",
    company: "Blakfy",
    companyUrl: "https://blakfy.com",
    description:
      "Farklı müşteriler için web uygulamaları geliştirip sürdürüyorum. E-ticaret, restoran, turizm ve profesyonel hizmetler sektörlerinde 9'dan fazla müşteri projesinin geliştirme sürecini modern web teknolojileriyle yönetiyorum.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB"],
  },
  {
    period: "2023",
    title: "Piscine Katılımcısı",
    company: "42 Ecole",
    companyUrl: "https://42.fr",
    description:
      "C programlama, algoritmalar ve akran öğrenme metodolojisine odaklanan yoğun kodlama kampını tamamladım. İşbirlikçi projeler aracılığıyla problem çözme becerilerimi geliştirdim.",
    technologies: ["C", "Shell", "Algoritmalar", "Git"],
  },
  {
    period: "2022 — 2023",
    title: "Otodikat Geliştirici",
    company: "FreeCodeCamp",
    companyUrl: "https://freecodecamp.org",
    description:
      "JavaScript Algoritmaları ve Veri Yapıları sertifikasını tamamladım. Responsive web tasarımları ve React ile front-end kütüphaneleri dahil birçok proje geliştirdim.",
    technologies: ["JavaScript", "React", "HTML", "CSS", "SASS"],
  },
];

export default function ExperienceSection() {
  const containerRef = useAnimeScrollReveal(".exp-reveal", {
    translateY: [50, 0],
    filter: ["blur(6px)", "blur(0px)"],
    duration: 900,
    ease: "outExpo",
  });

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-6 sm:px-12">
      {/* Section header */}
      <div className="exp-reveal mb-12">
        <span className="text-green text-sm font-semibold tracking-widest uppercase mb-3 block">
          02. Deneyim
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lightest-slate tracking-tight">
          Kariyer Yolculuğum
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green via-accent2 to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="exp-reveal relative pl-8 sm:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-0 sm:left-8 top-1 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-green bg-navy flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green" />
              </div>

              {/* Card */}
              <div className="group relative rounded-2xl border border-navy-lighter/60 bg-navy-light/40 p-6 sm:p-8 transition-all duration-500 hover:border-green/30 hover:bg-navy-light/60">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Period badge */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green/10 text-green border border-green/20 mb-4">
                    {exp.period}
                  </span>

                  {/* Title & Company */}
                  <h3 className="text-lg sm:text-xl font-semibold text-lightest-slate mb-2">
                    {exp.title}
                    <span className="text-slate-custom font-normal"> · </span>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green hover:text-accent2 transition-colors duration-300 inline-flex items-baseline gap-1"
                    >
                      {exp.company}
                      <span className="text-sm" aria-hidden="true">&#8599;</span>
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="text-slate-custom leading-relaxed mb-4 text-sm sm:text-base">
                    {exp.description}
                  </p>

                  {/* Tech badges */}
                  <ul className="flex flex-wrap gap-2" aria-label="Kullanılan teknolojiler">
                    {exp.technologies.map((tech) => (
                      <li key={tech}>
                        <span className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-green bg-green/10 border border-green/20 transition-all duration-300 hover:border-green/40 hover:shadow-[0_0_12px_rgba(129,140,248,0.15)]">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="exp-reveal mt-12 pl-8 sm:pl-20">
        <Link
          href="/ben-kimim"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-green/30 text-green font-medium hover:bg-green/10 hover:border-green/50 transition-all duration-300 group"
        >
          Özgeçmişin Tamamını Gör
          <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
