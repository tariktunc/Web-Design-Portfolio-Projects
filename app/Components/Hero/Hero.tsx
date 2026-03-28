"use client";
import { useRef, useEffect } from "react";
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
  { name: "Email", href: "mailto:me@tariktunc.com", icon: EnvelopeClosedIcon },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

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

    const items = el.querySelectorAll(".hero-anim");
    animate(items, {
      opacity: [0, 1],
      translateY: [30, 0],
      filter: ["blur(6px)", "blur(0px)"],
      duration: 800,
      ease: "outExpo",
      delay: stagger(100, { start: 200 }),
    });

    const icons = el.querySelectorAll(".social-icon");
    animate(icons, {
      opacity: [0, 1],
      scale: [0, 1],
      duration: 500,
      ease: spring({ stiffness: 300, damping: 18 }),
      delay: stagger(80, { start: 900 }),
    });

    // Background orbs
    if (orbsRef.current) {
      const orbs = orbsRef.current.querySelectorAll(".hero-orb") as NodeListOf<HTMLElement>;
      orbs.forEach((orb, i) => {
        waapi.animate(orb, {
          translateY: [0, -20 - i * 8, 0],
          translateX: [0, 10 - i * 5, 0],
          scale: [1, 1.06 + i * 0.03, 1],
          duration: 8000 + i * 2000,
          iterations: Infinity,
          easing: "ease-in-out",
        });
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Background orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="hero-orb absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(129,140,248,0.1), transparent 70%)",
            filter: "blur(100px)",
            top: "5%",
            right: "-10%",
          }}
        />
        <div
          className="hero-orb absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(52,211,153,0.08), transparent 70%)",
            filter: "blur(80px)",
            bottom: "10%",
            left: "-5%",
          }}
        />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-4xl mx-auto">
        {/* Greeting */}
        <p className="hero-anim opacity-0 text-green font-medium text-sm sm:text-base tracking-wide mb-4">
          Merhaba, ben
        </p>

        {/* Name */}
        <h1
          className="hero-anim opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-4"
          style={{
            background: "linear-gradient(135deg, var(--lightest-slate) 0%, var(--green) 50%, var(--accent-2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Tarık Tunç.
        </h1>

        {/* Subtitle */}
        <h2 className="hero-anim opacity-0 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-custom tracking-tight mb-6">
          Kod yazıyorum, ürün çıkarıyorum.
        </h2>

        {/* Description */}
        <p className="hero-anim opacity-0 text-base sm:text-lg text-slate-custom leading-relaxed max-w-2xl mb-8">
          <span className="text-lightest-slate font-medium">Full Stack Developer</span> ve{" "}
          <span className="text-lightest-slate font-medium">siber güvenlik araştırmacısıyım</span>.
          Next.js, React ve TypeScript ile kullanıcı odaklı web uygulamaları geliştiriyorum.{" "}
          <Link href="https://blakfy.com" target="_blank" rel="noopener noreferrer" className="text-green hover:text-accent2 transition-colors font-medium">
            Blakfy
          </Link>
          {" "}ile 9+ müşteriye dijital çözümler sundum.
        </p>

        {/* CTA Buttons */}
        <div className="hero-anim opacity-0 flex flex-wrap items-center gap-4 mb-10">
          <Link
            href="/projeler"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green text-navy font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Projeleri Gör
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-green/30 text-green font-medium text-sm hover:bg-green/10 transition-colors"
          >
            İletişime Geç
          </Link>
        </div>

        {/* Social icons */}
        <ul className="flex items-center gap-4" aria-label="Sosyal medya">
          {socials.map((social) => (
            <li key={social.name}>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon block p-2.5 rounded-lg text-slate-custom hover:text-green hover:bg-green/10 transition-all duration-300 opacity-0"
                aria-label={`${social.name}`}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
