"use client";
import Hero from "@/app/Components/Hero/Hero";
import SkillRings from "@/app/Components/Home/SkillRings";
import ScrollSection from "@/app/Components/Home/ScrollSection";
import AboutSection from "@/app/Components/Sections/AboutSection";
import ExperienceSection from "@/app/Components/Sections/ExperienceSection";
import ProjectsSection from "@/app/Components/Sections/ProjectsSection";
import WritingSection from "@/app/Components/Sections/WritingSection";
import ScrollNav from "@/app/Components/Navigation/ScrollNav";

/* ─────────────────────────────────────────────
   HomeContent — animejs.com tarzı scroll-driven anasayfa

   Sadece Hero ve SkillRings pinned (sticky).
   Diğer bölümler normal scroll + anime.js scroll-reveal.
   ───────────────────────────────────────────── */
export default function HomeContent() {
  return (
    <>
      {/* Floating nav — sticky left side on desktop, inside container */}
      <div className="hidden md:block fixed top-1/2 -translate-y-1/2 z-50 left-[max(2rem,calc((100vw-1600px)/2+2rem))]">
        <ScrollNav className="" />
      </div>

      {/* ── Section 1: Hero Intro (pinned) ── */}
      <ScrollSection id="hero" chapter="intro" label="HERO" spacers={1}>
        <Hero />
      </ScrollSection>

      {/* ── Section 2: Skill Rings (pinned, scroll rotates rings) ── */}
      <ScrollSection id="skills" chapter="toolbox" label="SKILLS" spacers={2}>
        {(progress) => <SkillRings progress={progress} />}
      </ScrollSection>

      {/* ── Section 3: About (normal scroll) ── */}
      <section id="about" data-chapter="about" data-label="HAKKIMDA" className="py-24 sm:py-32">
        <AboutSection />
      </section>

      {/* ── Section 4: Experience (normal scroll) ── */}
      <section id="experience" data-chapter="experience" data-label="DENEYİM" className="py-24 sm:py-32">
        <ExperienceSection />
      </section>

      {/* ── Section 5: Projects (normal scroll) ── */}
      <section id="projects" data-chapter="projects" data-label="PROJELER" className="py-24 sm:py-32">
        <ProjectsSection />
      </section>

      {/* ── Section 6: Writing (normal scroll) ── */}
      <section id="blog" data-chapter="writing" data-label="BLOG" className="py-24 sm:py-32">
        <WritingSection />
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 pb-16 text-sm text-slate-custom text-center px-6">
        <p>
          Kodland&#305;:{" "}
          <a
            href="https://code.visualstudio.com"
            className="font-medium text-slate-custom-light hover:text-green transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visual Studio Code
          </a>
          . Geli&#351;tirildi:{" "}
          <a
            href="https://nextjs.org"
            className="font-medium text-slate-custom-light hover:text-green transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>{" "}
          ve{" "}
          <a
            href="https://tailwindcss.com"
            className="font-medium text-slate-custom-light hover:text-green transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>
          . Yay&#305;nda:{" "}
          <a
            href="https://vercel.com"
            className="font-medium text-slate-custom-light hover:text-green transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
          .
        </p>
      </footer>
    </>
  );
}
