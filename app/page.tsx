import type { Metadata } from "next";
import SplitLayout from "@/app/Components/Layout/SplitLayout";
import AboutSection from "@/app/Components/Sections/AboutSection";
import ExperienceSection from "@/app/Components/Sections/ExperienceSection";
import ProjectsSection from "@/app/Components/Sections/ProjectsSection";
import WritingSection from "@/app/Components/Sections/WritingSection";
import JsonLd from "@/app/Components/JsonLd";

export const metadata: Metadata = {
  title: "Tarik Tunç — Full Stack Developer",
  description:
    "Portfolio of Tarik Tunç, a Full Stack Developer building modern web applications with Next.js, React, and TypeScript.",
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <SplitLayout>
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <WritingSection />

        <footer className="max-w-md pb-16 text-sm text-slate-custom">
          <p>
            Coded in{" "}
            <a
              href="https://code.visualstudio.com"
              className="font-medium text-slate-custom-light hover:text-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visual Studio Code
            </a>
            . Built with{" "}
            <a
              href="https://nextjs.org"
              className="font-medium text-slate-custom-light hover:text-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com"
              className="font-medium text-slate-custom-light hover:text-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS
            </a>
            . Deployed on{" "}
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
      </SplitLayout>
    </>
  );
}
