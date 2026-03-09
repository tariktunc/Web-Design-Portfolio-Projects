"use client";
import React from "react";
import Link from "next/link";
import ProjectCard from "../Cards/ProjectCard";
import { useAnimeStagger, useAnimeScrollReveal } from "@/app/hooks/useAnime";

interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
  imageAdress?: string;
  status: string;
  slug?: string;
}

function ProjectList({ projects }: { projects: Project[] }) {
  const staggerRef = useAnimeStagger(".proj-item", { delay: 150, from: "first" });
  return (
    <div ref={staggerRef}>
      <ul className="group/list">
        {projects.map((project) => (
          <div className="proj-item" key={project.title}>
            <ProjectCard project={project} />
          </div>
        ))}
      </ul>
    </div>
  );
}

function ProjectLink() {
  const linkRef = useAnimeScrollReveal(".proj-link", {
    translateY: [40, 0],
    duration: 800,
  });
  return (
    <div ref={linkRef}>
      <div className="proj-link mt-8">
        <Link
          href="/projeler"
          className="inline-flex items-center font-medium text-lightest-slate hover:text-green transition-colors group"
        >
          Tüm Proje Arşivini Gör
          <span
            className="ml-1 inline-block transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("/Data/githubProjectData.json")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.laboratory || []);
        setLoaded(true);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 sm:px-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lightest-slate mb-8 tracking-tight">
        Projeler
      </h2>

      {loaded && <ProjectList projects={projects} />}
      <ProjectLink />
    </div>
  );
}
