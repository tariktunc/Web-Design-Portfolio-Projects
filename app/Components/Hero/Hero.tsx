"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import {
  animate,
  createTimeline,
  createDrawable,
  stagger,
  splitText,
  spring,
  waapi,
} from "animejs";

const socials = [
  { name: "GitHub", href: "https://github.com/tariktunc", icon: GitHubLogoIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/tarktunc", icon: LinkedInLogoIcon },
  { name: "Twitter", href: "https://twitter.com/tarkktunc", icon: TwitterLogoIcon },
  { name: "Email", href: "mailto:me@tariktunc.com", icon: EnvelopeClosedIcon },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLUListElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!nameRef.current || !titleRef.current || !taglineRef.current) return;

    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      nameRef.current.style.visibility = "visible";
      titleRef.current.style.visibility = "visible";
      taglineRef.current.style.visibility = "visible";
      if (socialsRef.current) {
        socialsRef.current.querySelectorAll(".social-icon").forEach((el) => {
          (el as HTMLElement).style.opacity = "1";
        });
      }
      if (scrollRef.current) scrollRef.current.style.opacity = "1";
      return;
    }

    // Store original HTML for cleanup (React strict mode runs effects twice)
    const nameHTML = nameRef.current.innerHTML;
    const titleHTML = titleRef.current.innerHTML;
    const taglineHTML = taglineRef.current.innerHTML;

    // Split text for character-level animation
    const nameSplit = splitText(nameRef.current);
    const titleSplit = splitText(titleRef.current);
    const taglineSplit = splitText(taglineRef.current);

    // Set initial hidden state
    nameRef.current.style.visibility = "visible";
    titleRef.current.style.visibility = "visible";
    taglineRef.current.style.visibility = "visible";

    // ── TIMELINE: Apple-style sequential entrance ──
    const tl = createTimeline({
      defaults: { ease: "outExpo", duration: 1000 },
    });

    // 1. Name chars — dramatic 3D reveal
    tl.add(nameSplit.chars, {
      opacity: [0, 1],
      translateY: [80, 0],
      rotateX: [90, 0],
      scale: [0.5, 1],
      filter: ["blur(12px)", "blur(0px)"],
      duration: 1200,
      delay: stagger(40, { from: "center" }),
    });

    // 2. Title words — slide up with blur
    tl.add(titleSplit.words, {
      opacity: [0, 1],
      translateY: [50, 0],
      filter: ["blur(8px)", "blur(0px)"],
      duration: 900,
      delay: stagger(80),
    }, "-=600");

    // 3. Tagline — word by word fade
    tl.add(taglineSplit.words, {
      opacity: [0, 1],
      translateY: [30, 0],
      filter: ["blur(4px)", "blur(0px)"],
      duration: 700,
      delay: stagger(50),
    }, "-=400");

    // 4. Social icons — stagger pop-in
    if (socialsRef.current) {
      const icons = socialsRef.current.querySelectorAll(".social-icon");
      tl.add(icons, {
        opacity: [0, 1],
        scale: [0, 1],
        translateY: [20, 0],
        duration: 600,
        ease: spring({ stiffness: 300, damping: 18 }),
        delay: stagger(100),
      }, "-=300");
    }

    // 5. Scroll indicator — fade in
    if (scrollRef.current) {
      tl.add(scrollRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      }, "-=200");
    }

    // 6. SVG decorative lines — draw effect
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path") as NodeListOf<SVGGeometryElement>;
      const drawables = Array.from(paths).map((p) => createDrawable(p));
      tl.add(drawables, {
        draw: ["0 0", "0 1"],
        duration: 1500,
        delay: stagger(200),
        ease: "inOutQuart",
      }, "-=800");
    }

    // ── WAAPI: Continuous background orb animation (60fps) ──
    if (orbsRef.current) {
      const orbs = orbsRef.current.querySelectorAll(".hero-orb") as NodeListOf<HTMLElement>;
      orbs.forEach((orb, i) => {
        waapi.animate(orb, {
          translateY: [0, -30 - i * 10, 0],
          translateX: [0, 15 - i * 8, 0],
          scale: [1, 1.1 + i * 0.05, 1],
          duration: 6000 + i * 2000,
          iterations: Infinity,
          easing: "ease-in-out",
        });
      });
    }

    // ── Scroll indicator bounce ──
    if (scrollRef.current) {
      const arrow = scrollRef.current.querySelector(".scroll-arrow") as HTMLElement | null;
      if (arrow) {
        waapi.animate(arrow, {
          translateY: [0, 8, 0],
          duration: 1500,
          iterations: Infinity,
          easing: "ease-in-out",
        });
      }
    }

    // Cleanup: restore original HTML (prevents splitText duplication on strict mode re-run)
    return () => {
      if (nameRef.current) nameRef.current.innerHTML = nameHTML;
      if (titleRef.current) titleRef.current.innerHTML = titleHTML;
      if (taglineRef.current) taglineRef.current.innerHTML = taglineHTML;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full h-full flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background orbs — WAAPI 60fps */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="hero-orb absolute w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, var(--green), transparent 70%)",
            filter: "blur(80px)",
            top: "15%",
            right: "-5%",
            willChange: "transform",
          }}
        />
        <div
          className="hero-orb absolute w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #00d4aa, transparent 70%)",
            filter: "blur(60px)",
            bottom: "20%",
            willChange: "transform",
            left: "-3%",
          }}
        />
        <div
          className="hero-orb absolute w-[200px] h-[200px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, var(--green), transparent 70%)",
            filter: "blur(40px)",
            top: "60%",
            right: "25%",
            willChange: "transform",
          }}
        />
      </div>

      {/* Center grid lines — Apple style subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />
      </div>

      {/* SVG decorative lines — draw animation */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
        viewBox="0 0 1200 800"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 400 Q300 300 600 400 T1200 400"
          stroke="var(--green)"
          strokeWidth="1"
        />
        <path
          d="M0 500 Q400 350 800 450 T1200 350"
          stroke="var(--green)"
          strokeWidth="0.5"
        />
        <path
          d="M200 0 Q250 400 200 800"
          stroke="var(--green)"
          strokeWidth="0.5"
        />
        <path
          d="M1000 0 Q950 400 1000 800"
          stroke="var(--green)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Name — splitText character reveal */}
        <h1
          ref={nameRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6"
          style={{
            visibility: "hidden",
            background: "linear-gradient(135deg, var(--lightest-slate) 0%, var(--green) 50%, var(--lightest-slate) 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Tarik Tunc
        </h1>

        {/* Title — word reveal */}
        <h2
          ref={titleRef}
          className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight mb-8"
          style={{ visibility: "hidden", color: "var(--lightest-slate)" }}
        >
          Full Stack Gelistirici
        </h2>

        {/* Tagline — word-by-word fade */}
        <p
          ref={taglineRef}
          className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ visibility: "hidden", color: "var(--slate)" }}
        >
          React, Next.js ve TypeScript ile modern, erisilebilir web deneyimleri gelistiriyorum.
        </p>

        {/* Social icons — stagger pop-in */}
        <ul
          ref={socialsRef}
          className="flex items-center justify-center gap-6 mb-8"
          aria-label="Sosyal medya"
        >
          {socials.map((social) => (
            <li key={social.name}>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon block p-3 rounded-full text-slate-custom hover:text-green hover:bg-green/10 hover:shadow-[0_0_20px_rgba(100,255,218,0.15)] transition-all duration-300 opacity-0"
                aria-label={`${social.name} (yeni sekmede acilir)`}
              >
                <social.icon className="h-6 w-6" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-slate-custom">
          Kesfet
        </span>
        <div className="scroll-arrow text-green">
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
