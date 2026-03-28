"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAnimeScrollReveal } from "@/app/hooks/useAnime";

interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
  imageAdress?: string;
  status: string;
  slug?: string;
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  const gridRef = useAnimeScrollReveal(".proj-card", {
    translateY: [50, 0],
    filter: ["blur(6px)", "blur(0px)"],
    duration: 900,
    ease: "outExpo",
  });

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => {
        const href = project.slug
          ? `/projeler/${project.slug}`
          : project.link || project.github || "#";
        const isExternal = !project.slug;

        return (
          <div
            key={project.title}
            className="proj-card group relative rounded-2xl border border-navy-lighter/60 bg-navy-light/40 overflow-hidden transition-all duration-500 hover:border-green/30 hover:bg-navy-light/60"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-transparent to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Thumbnail */}
            {project.imageAdress && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.imageAdress}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="relative p-6">
              {/* Status badge */}
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-4 border ${
                  project.status === "active"
                    ? "bg-accent2/10 text-accent2 border-accent2/20"
                    : "bg-slate-custom/10 text-slate-custom border-slate-custom/20"
                }`}
              >
                {project.status === "active" ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent2 mr-2 animate-pulse" />
                    Aktif
                  </>
                ) : project.status === "private" ? (
                  "Gizli"
                ) : (
                  project.status
                )}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-lightest-slate mb-2">
                {project.slug ? (
                  <Link
                    href={href}
                    className="hover:text-green transition-colors duration-300 inline-flex items-baseline gap-1"
                  >
                    {project.title}
                    <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green transition-colors duration-300 inline-flex items-baseline gap-1"
                  >
                    {project.title}
                    <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">&#8599;</span>
                  </a>
                )}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-custom leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </p>

              {/* GitHub link */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-custom hover:text-green transition-colors duration-300"
                  aria-label={`${project.title} GitHub deposu`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  const headerRef = useAnimeScrollReveal(".proj-header", {
    translateY: [50, 0],
    filter: ["blur(6px)", "blur(0px)"],
    duration: 900,
    ease: "outExpo",
  });

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
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-12">
        <div className="proj-header">
          <span className="text-green text-sm font-semibold tracking-widest uppercase mb-3 block">
            03. Projeler
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lightest-slate tracking-tight">
            Neler Yaptım?
          </h2>
        </div>
      </div>

      {loaded && <ProjectGrid projects={projects} />}

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/projeler"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-green/30 text-green font-medium hover:bg-green/10 hover:border-green/50 transition-all duration-300 group"
        >
          Tüm Proje Arşivini Gör
          <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
