import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    link?: string;
    github?: string;
    imageAdress?: string;
    status: string;
    slug?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li className="mb-12">
      <div className="group relative grid gap-4 pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 md:hover:!opacity-100 md:group-hover/list:opacity-50">
        {/* Glass hover background with glow */}
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all duration-500 motion-reduce:transition-none md:-inset-x-6 md:block md:group-hover:bg-navy-light/50 md:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1),0_0_30px_rgba(100,255,218,0.03)] md:group-hover:drop-shadow-lg" />

        {/* Project thumbnail with border glow on hover */}
        <div className="z-10 sm:order-1 sm:col-span-2">
          {project.imageAdress && (
            project.slug ? (
              <Link href={`/projeler/${project.slug}`}>
                <Image
                  src={project.imageAdress}
                  alt={project.title}
                  width={200}
                  height={120}
                  className="rounded border-2 border-lightest-slate/10 transition-all duration-500 group-hover:border-green/40 group-hover:shadow-[0_0_20px_rgba(100,255,218,0.1)] sm:translate-y-1 group-hover:scale-105"
                />
              </Link>
            ) : (
              <Image
                src={project.imageAdress}
                alt={project.title}
                width={200}
                height={120}
                className="rounded border-2 border-lightest-slate/10 transition-all duration-500 group-hover:border-green/40 group-hover:shadow-[0_0_20px_rgba(100,255,218,0.1)] sm:translate-y-1 group-hover:scale-105"
              />
            )
          )}
        </div>

        <div className="z-10 sm:order-2 sm:col-span-6">
          <h3 className="font-medium leading-snug text-lightest-slate">
            {project.slug ? (
              <Link
                href={`/projeler/${project.slug}`}
                className="group/link inline-flex items-baseline text-base font-medium leading-tight text-lightest-slate hover:text-green focus-visible:text-green transition-colors duration-300"
              >
                {project.title}
                <span className="ml-1 inline-block transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            ) : (
              <a
                href={project.link || project.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-baseline text-base font-medium leading-tight text-lightest-slate hover:text-green focus-visible:text-green transition-colors duration-300"
                aria-label={`${project.title} (yeni sekmede açılır)`}
              >
                {project.title}
                <span className="ml-1 inline-block transition-transform duration-300 group-hover/link:translate-x-2 group-hover/link:-translate-y-0.5" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            )}
          </h3>
          <p className="mt-2 text-sm leading-normal text-slate-custom line-clamp-3 transition-colors duration-300 group-hover:text-slate-custom-light">
            {project.description}
          </p>
          {project.github && (
            <div className="mt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-custom hover:text-green transition-colors duration-300"
                aria-label={`${project.title} GitHub deposu (yeni sekmede açılır)`}
              >
                GitHub <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          )}
          <span
            className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 border transition-all duration-300 ${
              project.status === "active"
                ? "shimmer-badge text-green border-green/20 hover:border-green/50"
                : "bg-slate-custom/10 text-slate-custom border-slate-custom/20"
            }`}
          >
            {project.status === "active" ? "aktif" : project.status === "private" ? "gizli" : project.status}
          </span>
        </div>
      </div>
    </li>
  );
}
