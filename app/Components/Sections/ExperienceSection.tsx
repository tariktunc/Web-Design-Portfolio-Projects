import Link from "next/link";
import ExperienceCard from "../Cards/ExperienceCard";
import FadeInSection from "@/app/Components/FadeInSection";

const experiences = [
  {
    period: "2023 — Present",
    title: "Full Stack Developer",
    company: "Blakfy",
    companyUrl: "https://blakfy.com",
    description:
      "Build and maintain web applications for diverse clients. Lead development of 9+ client projects spanning e-commerce, restaurant, tourism, and professional services industries using modern web technologies.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB"],
  },
  {
    period: "2023",
    title: "Piscine Participant",
    company: "42 Ecole",
    companyUrl: "https://42.fr",
    description:
      "Completed intensive coding bootcamp focused on C programming, algorithms, and peer-to-peer learning methodology. Developed problem-solving skills through collaborative projects.",
    technologies: ["C", "Shell", "Algorithms", "Git"],
  },
  {
    period: "2022 — 2023",
    title: "Self-Taught Developer",
    company: "FreeCodeCamp",
    companyUrl: "https://freecodecamp.org",
    description:
      "Completed JavaScript Algorithms & Data Structures certification. Built multiple projects including responsive web designs and front-end libraries with React.",
    technologies: ["JavaScript", "React", "HTML", "CSS", "SASS"],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 sm:mb-24 md:mb-36 md:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur sm:-mx-12 sm:px-12 md:sr-only md:relative md:top-auto md:mx-auto md:w-full md:px-0 md:py-0 md:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-lightest-slate md:sr-only">
          Experience
        </h2>
      </div>

      <ol className="group/list">
        {experiences.map((exp, i) => (
          <FadeInSection key={i}>
            <ExperienceCard {...exp} />
          </FadeInSection>
        ))}
      </ol>

      <div className="mt-12">
        <Link
          href="/whoami"
          className="inline-flex items-center font-medium text-lightest-slate hover:text-green transition-colors group"
        >
          View Full Resume
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
