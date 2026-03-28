"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { animate, stagger, spring, waapi } from "animejs";

const socials = [
  { name: "GitHub", href: "https://github.com/tariktunc", icon: GitHubLogoIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/tarktunc", icon: LinkedInLogoIcon },
  { name: "Twitter", href: "https://twitter.com/tarkktunc", icon: TwitterLogoIcon },
  { name: "Email", href: "mailto:developer@tariktunc.com", icon: EnvelopeClosedIcon },
];

const roles = [
  "Full Stack Developer",
  "Vibe Coder",
  "Siber Güvenlik Uzmanı",
  "AI Enthusiast",
  "SEO Mühendisi",
];

function RollerText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % roles.length);
        setIsAnimating(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative overflow-hidden h-[1.2em] align-bottom">
      <span
        className={`inline-block transition-all duration-400 ${
          isAnimating
            ? "translate-y-full opacity-0 blur-sm"
            : "translate-y-0 opacity-100 blur-0"
        }`}
        style={{
          background: "linear-gradient(135deg, var(--green) 0%, var(--accent-2) 50%, var(--accent-cyan, #06b6d4) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {roles[currentIndex]}
      </span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.querySelectorAll(".hero-anim").forEach((e) => {
        (e as HTMLElement).style.opacity = "1";
        (e as HTMLElement).style.transform = "none";
      });
      return;
    }

    // Staggered entrance
    const items = el.querySelectorAll(".hero-anim");
    animate(items, {
      opacity: [0, 1],
      translateY: [40, 0],
      filter: ["blur(8px)", "blur(0px)"],
      duration: 900,
      ease: "outExpo",
      delay: stagger(120, { start: 300 }),
    });

    // Social icons with spring
    const icons = el.querySelectorAll(".social-icon");
    animate(icons, {
      opacity: [0, 1],
      scale: [0, 1],
      rotate: ["-15deg", "0deg"],
      duration: 600,
      ease: spring({ stiffness: 300, damping: 18 }),
      delay: stagger(80, { start: 1200 }),
    });

    // Background orbs
    if (orbsRef.current) {
      const orbs = orbsRef.current.querySelectorAll(".hero-orb") as NodeListOf<HTMLElement>;
      orbs.forEach((orb, i) => {
        waapi.animate(orb, {
          translateY: [0, -25 - i * 10, 0],
          translateX: [0, 15 - i * 8, 0],
          scale: [1, 1.08 + i * 0.04, 1],
          duration: 8000 + i * 2000,
          iterations: Infinity,
          easing: "ease-in-out",
        });
      });
    }

    // Dot grid parallax with mouse
    const grid = gridRef.current;
    if (grid) {
      const handleMouse = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        grid.style.transform = `translate(${x}px, ${y}px)`;
      };
      window.addEventListener("mousemove", handleMouse);
      return () => window.removeEventListener("mousemove", handleMouse);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Interactive dot grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, rgb(var(--green-rgb) / 0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="hero-orb absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)",
            filter: "blur(120px)",
            top: "0%",
            right: "-15%",
          }}
        />
        <div
          className="hero-orb absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)",
            filter: "blur(100px)",
            bottom: "5%",
            left: "-10%",
          }}
        />
        <div
          className="hero-orb absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)",
            filter: "blur(80px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-5xl mx-auto">
        {/* Status badge */}
        <div className="hero-anim opacity-0 flex items-center gap-2 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent2" />
          </span>
          <span className="text-accent2 text-sm font-medium tracking-wide">
            Yeni projelere açığım
          </span>
        </div>

        {/* Greeting */}
        <p className="hero-anim opacity-0 text-green font-semibold text-base sm:text-lg tracking-wide mb-3">
          Merhaba, ben
        </p>

        {/* Name */}
        <h1
          className="hero-anim opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] mb-3"
          style={{
            background: "linear-gradient(135deg, var(--lightest-slate) 0%, var(--green) 60%, var(--accent-2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Tarık Tunç.
        </h1>

        {/* Roller subtitle */}
        <h2 className="hero-anim opacity-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-custom tracking-tight mb-6">
          <RollerText />
        </h2>

        {/* Fun tagline */}
        <p className="hero-anim opacity-0 text-base sm:text-lg text-slate-custom/80 mb-2 italic">
          &ldquo;Kod yazarım, bug&apos;lar kaçar. Kahvem biterse dünya durur.&rdquo;
        </p>

        {/* Description */}
        <p className="hero-anim opacity-0 text-base sm:text-lg text-slate-custom leading-relaxed max-w-2xl mb-10">
          <span className="text-lightest-slate font-semibold">Next.js, React & TypeScript</span> ile
          kullanıcı odaklı web uygulamaları geliştiriyorum.{" "}
          <span className="text-lightest-slate font-semibold">Siber güvenlik</span> ve{" "}
          <span className="text-lightest-slate font-semibold">AI otomasyon</span> alanlarında çalışıyorum.{" "}
          <Link
            href="https://blakfy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:text-accent2 transition-colors font-semibold underline decoration-green/30 hover:decoration-accent2/50 underline-offset-4"
          >
            Blakfy
          </Link>
          {" "}ile 9+ müşteriye dijital çözümler sundum.
        </p>

        {/* CTA Buttons */}
        <div className="hero-anim opacity-0 flex flex-wrap items-center gap-4 mb-12">
          <Link
            href="/projeler"
            className="hero-cta-primary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-green text-navy font-bold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--green-rgb)/0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Projeleri Gör
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/iletisim"
            className="hero-cta-secondary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-green/40 text-green font-semibold text-sm transition-all duration-300 hover:bg-green/10 hover:border-green/60 hover:shadow-[0_0_20px_rgba(var(--green-rgb)/0.15)] active:scale-[0.98]"
          >
            <span className="w-2 h-2 rounded-full bg-green mr-1 animate-pulse" />
            Benimle Çalış
          </Link>
          <a
            href="https://wa.me/905059796134"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-accent2/30 text-accent2 font-medium text-sm transition-all duration-300 hover:bg-accent2/10 hover:border-accent2/50"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.82-6.293-2.188l-.44-.358-3.028 1.015 1.015-3.028-.358-.44A9.953 9.953 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Social icons */}
        <ul className="flex items-center gap-3" aria-label="Sosyal medya">
          {socials.map((social) => (
            <li key={social.name}>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon block p-3 rounded-xl text-slate-custom hover:text-green hover:bg-green/10 hover:shadow-[0_0_16px_rgba(var(--green-rgb)/0.15)] transition-all duration-300 opacity-0"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Scroll indicator */}
        <div className="hero-anim opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-slate-custom/50 tracking-widest uppercase">Keşfet</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-custom/20 flex justify-center pt-1.5">
            <div className="w-1 h-2.5 rounded-full bg-green animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
