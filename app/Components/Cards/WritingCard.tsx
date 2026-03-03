interface WritingCardProps {
  post: {
    title?: string;
    date?: string;
    link?: string;
    categories?: string;
  };
}

export default function WritingCard({ post }: WritingCardProps) {
  return (
    <li className="mb-4">
      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 md:hover:!opacity-100 md:group-hover/list:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition md:-inset-x-6 md:block md:group-hover:bg-navy-light/50 md:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] md:group-hover:drop-shadow-lg" />

        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-custom/70 sm:col-span-2">
          {post.date}
        </header>

        <div className="z-10 sm:col-span-6">
          <h3>
            <a
              href={post.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-baseline text-base font-medium leading-tight text-lightest-slate hover:text-green focus-visible:text-green"
            >
              {post.title}
              <span className="ml-1 inline-block transition-transform group-hover/link:translate-x-1">
                &#8599;
              </span>
            </a>
          </h3>
          {post.categories && (
            <span className="mt-2 inline-flex items-center rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green">
              {post.categories}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
