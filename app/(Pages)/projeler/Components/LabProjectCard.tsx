"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClipReveal } from "@/app/Components/Motion/MotionWrappers";

interface LabProjectCardProps {
  title: string;
  slug: string;
  description: string;
  link?: string;
  github?: string;
  imageAdress?: string;
  status: string;
  techStack?: string[];
}

export default function LabProjectCard({
  title,
  slug,
  description,
  link,
  github,
  imageAdress,
  status,
  techStack,
}: LabProjectCardProps) {
  return (
    <li className="mb-12">
      <div className="group relative grid gap-4 pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 md:hover:!opacity-100 md:group-hover/list:opacity-50">
        {/* Full-card clickable overlay */}
        <Link
          href={`/projeler/${slug}`}
          className="absolute -inset-x-4 -inset-y-4 z-20 rounded-md md:-inset-x-6"
          aria-label={`View ${title} project details`}
        />

        {/* Glass hover background */}
        <div className="absolute -inset-x-4 -inset-y-4 z-0 rounded-md transition-all duration-500 motion-reduce:transition-none md:-inset-x-6 group-hover:bg-navy-light/50 group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1),0_0_30px_rgba(100,255,218,0.03)] group-hover:drop-shadow-lg cursor-pointer" />

        {/* Thumbnail — ClipReveal + hover lift */}
        <div className="z-10 sm:order-1 sm:col-span-2">
          {imageAdress && (
            <ClipReveal direction="left">
              <motion.div
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              >
                <Image
                  src={imageAdress}
                  alt={title}
                  width={200}
                  height={120}
                  className="rounded border-2 border-lightest-slate/10 transition-all duration-500 group-hover:border-green/40 group-hover:shadow-[0_0_20px_rgba(100,255,218,0.1)] sm:translate-y-1"
                />
              </motion.div>
            </ClipReveal>
          )}
        </div>

        {/* Content */}
        <div className="z-10 sm:order-2 sm:col-span-6">
          <h3 className="font-medium leading-snug">
            <span className="inline-flex items-baseline text-base font-medium leading-tight text-lightest-slate group-hover:text-green transition-colors duration-300">
              {title}
              <span
                className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-2"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </span>
          </h3>

          <p className="mt-2 text-sm leading-normal text-slate-custom line-clamp-3 transition-colors duration-300 group-hover:text-slate-custom-light">
            {description}
          </p>

          {/* External links — z-30 to be above the full-card overlay */}
          <div className="relative z-30 mt-2 flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-custom hover:text-green transition-colors duration-300 underline decoration-slate-custom/30 hover:decoration-green/50"
                aria-label={`${title} GitHub repository (opens in new tab)`}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub <span aria-hidden="true">&#8599;</span>
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-custom hover:text-green transition-colors duration-300 underline decoration-slate-custom/30 hover:decoration-green/50"
                aria-label={`Visit ${title} live site (opens in new tab)`}
                onClick={(e) => e.stopPropagation()}
              >
                Live <span aria-hidden="true">&#8599;</span>
              </a>
            )}
          </div>

          {/* Status badge + tech stack row */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 border transition-all duration-300 ${
                status === "active"
                  ? "shimmer-badge text-green border-green/20"
                  : "bg-slate-custom/10 text-slate-custom border-slate-custom/20"
              }`}
            >
              {status}
            </span>

            {/* Tech stack pills */}
            {techStack && techStack.length > 0 && (
              <>
                <span className="text-slate-custom/30 mx-1">·</span>
                {techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-slate-custom"
                  >
                    {tech}
                  </span>
                ))}
                {techStack.length > 5 && (
                  <span className="text-xs font-mono text-slate-custom">
                    +{techStack.length - 5}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
