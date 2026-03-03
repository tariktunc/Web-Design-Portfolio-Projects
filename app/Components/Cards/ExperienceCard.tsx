interface ExperienceCardProps {
  period: string;
  title: string;
  company: string;
  companyUrl: string;
  description: string;
  technologies: string[];
}

export default function ExperienceCard({
  period,
  title,
  company,
  companyUrl,
  description,
  technologies,
}: ExperienceCardProps) {
  return (
    <li className="mb-12">
      <div className="group relative grid pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 md:hover:!opacity-100 md:group-hover/list:opacity-50">
        {/* Glass hover background with glow */}
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all duration-500 motion-reduce:transition-none md:-inset-x-6 md:block md:group-hover:bg-navy-light/50 md:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1),0_0_30px_rgba(100,255,218,0.03)] md:group-hover:drop-shadow-lg md:group-hover:backdrop-blur-sm" />

        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-custom/70 sm:col-span-2 transition-colors duration-300 group-hover:text-green/70">
          {period}
        </header>

        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-lightest-slate">
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-baseline text-base font-medium leading-tight text-lightest-slate hover:text-green focus-visible:text-green transition-colors duration-300"
            >
              {title} &middot;{" "}
              <span className="inline-block">
                {company}
                <span className="ml-1 inline-block transition-transform duration-300 group-hover/link:translate-x-2 group-hover/link:-translate-y-0.5">
                  &#8599;
                </span>
              </span>
            </a>
          </h3>
          <p className="mt-2 text-sm leading-normal text-slate-custom transition-colors duration-300 group-hover:text-slate-custom-light">
            {description}
          </p>
          {/* Technology badges with shimmer */}
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Technologies used">
            {technologies.map((tech) => (
              <li key={tech}>
                <span className="shimmer-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 text-green border border-green/20 transition-all duration-300 hover:border-green/50 hover:shadow-[0_0_8px_rgba(100,255,218,0.15)]">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
