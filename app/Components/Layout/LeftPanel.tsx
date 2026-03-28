"use client";
import React from "react";
import ScrollNav from "../Navigation/ScrollNav";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { TextReveal } from "../Motion/MotionWrappers";

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
    href: "mailto:developer@tariktunc.com",
    icon: EnvelopeClosedIcon,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.8 },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export default function LeftPanel() {
  return (
    <header className="md:sticky md:top-0 md:flex md:max-h-screen md:w-1/2 md:flex-col md:justify-between md:py-24">
      <div>
        {/* Name — character-level stagger reveal */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <Link
            href="/"
            className="text-gradient-animate hover:text-green transition-colors"
          >
            <TextReveal
              text="Tarik Tunç"
              splitBy="char"
              staggerDelay={0.04}
              className="inline"
            />
          </Link>
        </h1>

        {/* Title — typewriter effect */}
        <h2 className="animate-fade-in-up stagger-2 mt-3 text-lg font-medium tracking-tight text-lightest-slate sm:text-xl">
          <span className="typewriter inline-block">Full Stack Geliştirici</span>
        </h2>

        {/* Tagline — word-level stagger reveal */}
        <div className="mt-4 max-w-xs leading-normal text-slate-custom">
          <TextReveal
            text="React, Next.js ve TypeScript ile modern, erişilebilir web deneyimleri geliştiriyorum."
            splitBy="word"
            staggerDelay={0.05}
            as="p"
          />
        </div>

        {/* Nav — slide in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollNav className="mt-16 hidden md:block" />
        </motion.div>
      </div>

      {/* Social icons — staggered pop-in with float */}
      <motion.ul
        className="ml-1 mt-8 flex items-center gap-5"
        aria-label="Sosyal medya"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socials.map((social) => (
          <motion.li key={social.name} variants={iconVariants}>
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-slate-custom hover:text-green hover:drop-shadow-[0_0_8px_rgba(100,255,218,0.5)] transition-all duration-300"
              aria-label={`${social.name} (opens in new tab)`}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <social.icon className="h-6 w-6 hover:scale-125 transition-transform duration-300" />
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </header>
  );
}
