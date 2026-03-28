import type { Metadata } from "next";
import JsonLd from "@/app/Components/JsonLd";
import Hero from "@/app/Components/Hero/Hero";
import AboutSection from "@/app/Components/Sections/AboutSection";
import SkillRingsSection from "@/app/Components/Home/SkillRingsSection";
import ExperienceSection from "@/app/Components/Sections/ExperienceSection";
import ProjectsSection from "@/app/Components/Sections/ProjectsSection";
import WritingSection from "@/app/Components/Sections/WritingSection";

export const metadata: Metadata = {
  title: "Tarık Tunç — Full Stack Geliştirici & Vibe Coder",
  description:
    "Tarik Tunç — Next.js, React ve TypeScript ile modern web uygulamaları geliştiren Full Stack Developer. 9+ müşteri projesi, 796+ blog yazısı ve açık kaynak çalışmaları.",
  alternates: {
    canonical: "https://tariktunc.com",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <section className="py-24 sm:py-32" id="hakkimda">
        <AboutSection />
      </section>
      <section className="py-24 sm:py-32" id="yetenekler">
        <SkillRingsSection />
      </section>
      <section className="py-24 sm:py-32" id="deneyim">
        <ExperienceSection />
      </section>
      <section className="py-24 sm:py-32" id="projeler">
        <ProjectsSection />
      </section>
      <section className="py-24 sm:py-32" id="blog">
        <WritingSection />
      </section>
    </>
  );
}
