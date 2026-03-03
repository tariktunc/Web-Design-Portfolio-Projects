"use client";
import React from "react";
import ScrollNav from "../Navigation/ScrollNav";
import Link from "next/link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/tariktunc",
    icon: GitHubLogoIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/tarktunc",
    icon: LinkedInLogoIcon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/tarkktunc",
    icon: TwitterLogoIcon,
  },
  {
    name: "Email",
    href: "mailto:me@tariktunc.com",
    icon: EnvelopeClosedIcon,
  },
];

export default function LeftPanel() {
  return (
    <header className="md:sticky md:top-0 md:flex md:max-h-screen md:w-1/2 md:flex-col md:justify-between md:py-24">
      <div>
        {/* Name — blur-in with animated gradient text */}
        <h1 className="animate-blur-in text-4xl font-bold tracking-tight sm:text-5xl">
          <Link
            href="/"
            className="text-gradient-animate hover:text-green transition-colors"
          >
            Tarik Tunc
          </Link>
        </h1>

        {/* Title — typewriter effect */}
        <h2 className="animate-fade-in-up stagger-2 mt-3 text-lg font-medium tracking-tight text-lightest-slate sm:text-xl">
          <span className="typewriter inline-block">Full Stack Developer</span>
        </h2>

        {/* Tagline — fade in from left */}
        <p className="animate-fade-in-left stagger-3 mt-4 max-w-xs leading-normal text-slate-custom">
          I build modern, accessible web experiences with React, Next.js, and
          TypeScript.
        </p>

        {/* Nav — fade in with longer delay */}
        <div className="animate-fade-in-up stagger-5">
          <ScrollNav className="mt-16 hidden md:block" />
        </div>
      </div>

      {/* Social icons — staggered scale-in with glow hover */}
      <ul
        className="ml-1 mt-8 flex items-center gap-5"
        aria-label="Social media"
      >
        {socials.map((social, i) => (
          <li
            key={social.name}
            className={`animate-scale-in stagger-${i + 5}`}
          >
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-slate-custom hover:text-green hover:drop-shadow-[0_0_8px_rgba(100,255,218,0.5)] transition-all duration-300"
              aria-label={`${social.name} (opens in new tab)`}
            >
              <social.icon className="h-6 w-6 hover:scale-125 transition-transform duration-300" />
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
