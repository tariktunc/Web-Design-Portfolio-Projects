"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import {
  MotionSection,
  StaggerContainer,
  StaggerItem,
  SlideIn,
  ClipReveal,
  ParallaxImage,
  TextReveal,
  Tilt3D,
  GlowLine,
  HoverScale,
  CountUpNumber,
} from "@/app/Components/Motion/MotionWrappers";
import type { Project } from "@/app/lib/projects";

const SKILL_ICON_MAP: Record<string, string> = {
  React: "react",
  "Next.js": "nextjs",
  "Tailwind CSS": "tailwindcss",
  TypeScript: "typescript",
  JavaScript: "javascript",
  MongoDB: "mongodb",
  Express: "express",
  Redux: "redux",
  "Redux Toolkit": "redux",
  HTML: "html",
  CSS: "css",
  SASS: "sass",
  C: "c",
  Vercel: "vercel",
  Git: "git",
  PHP: "php",
  WordPress: "wordpress",
  Netlify: "netlify",
};

/* Parse a highlight value like "7 Dil" → { num: 7, rest: " Dil" }
   or "Redux Toolkit" → null (no leading number) */
function parseHighlightValue(val: string): {
  num: number;
  rest: string;
} | null {
  const match = val.match(/^(\d+)(.*)/);
  if (!match) return null;
  return { num: parseInt(match[1], 10), rest: match[2] };
}

export default function ProjectDetailPage({
  project,
}: {
  project: Project;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="py-6">
      {/* ════════════════════════════════════════════
          HERO — ClipReveal circle + ParallaxImage
          ════════════════════════════════════════════ */}
      {project.imageAdress && (
        <div className="relative -mx-4 sm:-mx-6 mb-12">
          <ClipReveal direction="circle" className="overflow-hidden">
            <div className="relative">
              <ParallaxImage
                src={project.imageAdress}
                alt={project.title}
                width={1400}
                height={600}
                speed={0.2}
                priority
                className="aspect-[21/9] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d17] via-[#0b0d17]/70 to-transparent" />
            </div>
          </ClipReveal>

          {/* Content overlapping the image bottom */}
          <div className="relative -mt-20 z-10 px-4 sm:px-6">
            {/* Badges — staggered pop-in */}
            <StaggerContainer className="flex flex-wrap items-center gap-2 mb-3">
              <StaggerItem>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                    project.category === "personal"
                      ? "shimmer-badge text-green border-green/20"
                      : "bg-[var(--navy-light)] text-[var(--slate-light)] border-[var(--slate)]/20"
                  }`}
                >
                  {project.category === "personal"
                    ? "Kişisel Proje"
                    : "Müşteri Çalışması — Blakfy"}
                </span>
              </StaggerItem>
              <StaggerItem>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                    project.status === "active"
                      ? "shimmer-badge text-green border-green/20"
                      : "bg-[var(--slate)]/10 text-[var(--slate)] border-[var(--slate)]/20"
                  }`}
                >
                  {project.status === "active" ? "Aktif" : project.status === "private" ? "Gizli" : "Pasif"}
                </span>
              </StaggerItem>
            </StaggerContainer>

            {/* Title — TextReveal char-split */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-lightest-slate">
              <TextReveal
                text={project.title}
                splitBy="char"
                staggerDelay={0.03}
              />
            </h1>

            {/* Quick Links — slide-in */}
            <SlideIn direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-3">
                {project.link && (
                  <HoverScale>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-green px-4 py-2 text-sm font-semibold text-green hover:bg-green/10 hover:shadow-[0_0_20px_rgba(100,255,218,0.15)] transition-all duration-300"
                      aria-label="Canlı Demo (yeni sekmede açılır)"
                    >
                      <Link2Icon className="w-4 h-4" aria-hidden="true" />
                      Canlı Demo <span aria-hidden="true">&#8599;</span>
                    </Link>
                  </HoverScale>
                )}
                {project.github && (
                  <HoverScale>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--slate)]/30 px-4 py-2 text-sm font-semibold text-[var(--slate-light)] hover:border-green/50 hover:text-green hover:shadow-[0_0_20px_rgba(100,255,218,0.1)] transition-all duration-300"
                      aria-label="Kaynak Kod — GitHub (yeni sekmede açılır)"
                    >
                      <GitHubLogoIcon className="w-4 h-4" aria-hidden="true" />
                      Kaynak Kod
                    </Link>
                  </HoverScale>
                )}
              </div>
            </SlideIn>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          HIGHLIGHTS — Tilt3D cards with CountUp numbers
          ════════════════════════════════════════════ */}
      {project.highlights && project.highlights.length > 0 && (
        <>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {project.highlights.map((h) => {
              const parsed = parseHighlightValue(h.value);
              return (
                <StaggerItem key={h.label}>
                  <Tilt3D intensity={8}>
                    <motion.div
                      className="text-center p-4 rounded-xl bg-[var(--navy-light)] border border-transparent hover:border-green/20 transition-colors duration-300"
                      whileHover={{
                        boxShadow: "0 0 25px rgba(100,255,218,0.08)",
                      }}
                    >
                      <div
                        className="text-lg sm:text-xl font-bold mb-1"
                        style={{ color: "var(--green)" }}
                      >
                        {parsed ? (
                          <>
                            <CountUpNumber target={parsed.num} duration={1.5} />
                            {parsed.rest}
                          </>
                        ) : (
                          h.value
                        )}
                      </div>
                      <div className="text-xs" style={{ color: "var(--slate)" }}>
                        {h.label}
                      </div>
                    </motion.div>
                  </Tilt3D>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <GlowLine className="mb-10" />
        </>
      )}

      {/* ════════════════════════════════════════════
          ABOUT — ClipReveal left + blur text reveal
          ════════════════════════════════════════════ */}
      <ClipReveal direction="left" className="mb-10">
        <div className="border-l-2 border-green/30 pl-6">
          <h2 className="text-lg font-semibold mb-4 pb-2 text-lightest-slate">
            <TextReveal text="Proje Hakkında" splitBy="word" staggerDelay={0.06} />
          </h2>
          <motion.div
            className="h-px bg-green/30 mb-4"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <MotionSection delay={0.2}>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--slate-light)" }}
            >
              {project.longDescription}
            </p>
          </MotionSection>
        </div>
      </ClipReveal>

      <GlowLine className="mb-10" delay={0.1} />

      {/* ════════════════════════════════════════════
          RICH SECTIONS — Alternating ClipReveal directions
          ════════════════════════════════════════════ */}
      {project.sections &&
        project.sections.map((section, i) => {
          const direction = i % 2 === 0 ? "left" : "right";
          return (
            <div key={section.title}>
              <ClipReveal direction={direction} className="mb-10">
                {i % 2 === 0 ? (
                  <div className="border-l-2 border-green/30 pl-6">
                    <h2 className="text-lg font-semibold mb-2 pb-2 text-lightest-slate">
                      <TextReveal
                        text={section.title}
                        splitBy="word"
                        staggerDelay={0.05}
                      />
                    </h2>
                    <MotionSection delay={0.15}>
                      <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--slate-light)" }}
                      >
                        {section.content}
                      </p>
                    </MotionSection>
                  </div>
                ) : (
                  <div className="bg-[var(--navy-light)]/50 rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-2 pb-2 text-lightest-slate">
                      <TextReveal
                        text={section.title}
                        splitBy="word"
                        staggerDelay={0.05}
                      />
                    </h2>
                    <MotionSection delay={0.15}>
                      <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--slate-light)" }}
                      >
                        {section.content}
                      </p>
                    </MotionSection>
                  </div>
                )}
              </ClipReveal>
              {i < project.sections!.length - 1 && (
                <GlowLine className="mb-10" delay={0.1} />
              )}
            </div>
          );
        })}

      <GlowLine className="mb-10" delay={0.1} />

      {/* ════════════════════════════════════════════
          TECH STACK — Tilt3D icon cards with glow hover
          ════════════════════════════════════════════ */}
      <div className="mb-10">
        <SlideIn direction="left">
          <h2 className="text-lg font-semibold mb-4 pb-2 text-lightest-slate">
            <TextReveal text="Teknoloji Yığını" splitBy="char" staggerDelay={0.04} />
          </h2>
        </SlideIn>
        <StaggerContainer className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 mt-4">
          {project.techStack.map((tech) => {
            const iconKey = SKILL_ICON_MAP[tech];
            return (
              <StaggerItem key={tech}>
                <Tilt3D intensity={10}>
                  <motion.div
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--navy-light)] border border-transparent transition-colors duration-300 hover:border-green/20 cursor-default"
                    whileHover={{
                      y: -6,
                      boxShadow: "0 0 25px rgba(100,255,218,0.12)",
                    }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    {iconKey && (
                      <Image
                        src={`https://skillicons.dev/icons?i=${iconKey}&theme=dark`}
                        alt={tech}
                        width={28}
                        height={28}
                        className="rounded-sm"
                      />
                    )}
                    <span
                      className="text-xs text-center"
                      style={{ color: "var(--slate)" }}
                    >
                      {tech}
                    </span>
                  </motion.div>
                </Tilt3D>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      <GlowLine className="mb-10" delay={0.1} />

      {/* ════════════════════════════════════════════
          KEY FEATURES — Numbered list with stagger + slide
          ════════════════════════════════════════════ */}
      <div className="mb-10">
        <SlideIn direction="left">
          <h2 className="text-lg font-semibold mb-4 pb-2 text-lightest-slate">
            <TextReveal text="Temel Özellikler" splitBy="char" staggerDelay={0.04} />
          </h2>
        </SlideIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {project.features.map((feature, i) => (
            <StaggerItem key={i}>
              <SlideIn
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.04}
              >
                <motion.div
                  className="flex items-start gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-[var(--navy-light)]/50 cursor-default"
                  whileHover={{
                    x: 4,
                    boxShadow: "0 0 15px rgba(100,255,218,0.05)",
                  }}
                >
                  <motion.div
                    className="w-7 h-7 rounded-full bg-green/10 border border-green/30 flex items-center justify-center shrink-0 mt-0.5"
                    whileHover={{
                      scale: 1.2,
                      boxShadow: "0 0 12px rgba(100,255,218,0.3)",
                    }}
                  >
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: "var(--green)" }}
                    >
                      {i + 1}
                    </span>
                  </motion.div>
                  <span style={{ color: "var(--slate-light)" }}>{feature}</span>
                </motion.div>
              </SlideIn>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ════════════════════════════════════════════
          SCREENSHOTS — ClipReveal + Tilt3D hover
          ════════════════════════════════════════════ */}
      {project.screenshots && project.screenshots.length > 0 && (
        <>
          <GlowLine className="mb-10" delay={0.1} />
          <div className="mb-10">
            <SlideIn direction="left">
              <h2 className="text-lg font-semibold mb-4 pb-2 text-lightest-slate">
                <TextReveal
                  text="Ekran Görüntüleri"
                  splitBy="char"
                  staggerDelay={0.04}
                />
              </h2>
            </SlideIn>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {project.screenshots.map((src, i) => (
                <StaggerItem key={i}>
                  <ClipReveal
                    direction={i % 2 === 0 ? "left" : "right"}
                    delay={i * 0.1}
                  >
                    <Tilt3D intensity={5}>
                      <motion.div
                        className="overflow-hidden rounded-xl border border-[var(--navy-lighter)] transition-colors duration-300"
                        whileHover={{
                          borderColor: "rgba(100,255,218,0.3)",
                          boxShadow: "0 0 30px rgba(100,255,218,0.08)",
                        }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <Image
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          width={800}
                          height={450}
                          className="w-full aspect-video object-cover"
                        />
                      </motion.div>
                    </Tilt3D>
                  </ClipReveal>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </>
      )}

      <GlowLine className="mb-8" delay={0.1} />

      {/* ════════════════════════════════════════════
          CTA BUTTONS — Dramatic glow hover
          ════════════════════════════════════════════ */}
      <MotionSection>
        <div className="flex flex-wrap gap-4 mb-8">
          {project.link && (
            <HoverScale scale={1.06}>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-green px-6 py-3 text-sm font-semibold text-green hover:bg-green/10 hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] transition-all duration-300"
                aria-label="Canlı Siteyi Ziyaret Et (yeni sekmede açılır)"
              >
                Canlı Siteyi Ziyaret Et <span aria-hidden="true">&#8599;</span>
              </Link>
            </HoverScale>
          )}
          {project.github && (
            <HoverScale scale={1.06}>
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--slate)]/30 px-6 py-3 text-sm font-semibold text-[var(--slate-light)] hover:border-green/50 hover:text-green hover:shadow-[0_0_30px_rgba(100,255,218,0.15)] transition-all duration-300"
                aria-label="GitHub'da Görüntüle (yeni sekmede açılır)"
              >
                <GitHubLogoIcon className="w-4 h-4" aria-hidden="true" />
                GitHub&apos;da Görüntüle
              </Link>
            </HoverScale>
          )}
        </div>
      </MotionSection>

      {/* ── Back link — slide-in ── */}
      <SlideIn direction="left" delay={0.2}>
        <Link
          href="/projeler"
          className="inline-flex items-center gap-2 text-sm text-green hover:text-green/80 transition-colors duration-300 group"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
            &larr;
          </span>
          Projelere Dön
        </Link>
      </SlideIn>
    </div>
  );
}
