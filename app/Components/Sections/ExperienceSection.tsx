"use client";
import Link from "next/link";
import ExperienceCard from "../Cards/ExperienceCard";
import { useAnimeStagger, useAnimeScrollReveal } from "@/app/hooks/useAnime";

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
  const staggerRef = useAnimeStagger(".exp-item", { delay: 150, from: "first" });
  const linkRef = useAnimeScrollReveal(".exp-link", {
    translateY: [40, 0],
    duration: 800,
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-6 sm:px-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lightest-slate mb-8 tracking-tight">
        Deneyim
      </h2>

      <div ref={staggerRef}>
        <ol className="group/list">
          {experiences.map((exp, i) => (
            <div className="exp-item" key={i}>
              <ExperienceCard {...exp} />
            </div>
          ))}
        </ol>
      </div>

      <div ref={linkRef}>
        <div className="exp-link mt-8">
          <Link
            href="/ben-kimim"
            className="inline-flex items-center font-medium text-lightest-slate hover:text-green transition-colors group"
          >
            Özgeçmişin Tamamını Gör
            <span
              className="ml-1 inline-block transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
