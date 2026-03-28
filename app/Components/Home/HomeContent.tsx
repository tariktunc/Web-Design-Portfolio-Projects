"use client";
import Link from "next/link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

const socials = [
  { name: "GitHub", href: "https://github.com/tariktunc", icon: GitHubLogoIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/tarktunc", icon: LinkedInLogoIcon },
  { name: "Twitter", href: "https://twitter.com/tarkktunc", icon: TwitterLogoIcon },
  { name: "Email", href: "mailto:developer@tariktunc.com", icon: EnvelopeClosedIcon },
];

export default function HomeContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <main id="main-content" className="max-w-lg text-center lg:text-left lg:max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight text-lightest-slate sm:text-5xl">
          Tarık Tunç
        </h1>
        <h2 className="mt-3 text-lg font-medium text-lightest-slate/80">
          Full Stack Developer & Siber Güvenlik Araştırmacısı
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-custom max-w-md mx-auto lg:mx-0">
          Güvenli, erişilebilir ve performanslı dijital deneyimler inşa ediyorum.
          AI agent sistemleri ve GEO üzerine çalışıyorum.
        </p>

        {/* Navigation */}
        <nav className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4" aria-label="Sayfa gezinme">
          <Link href="/blog" className="text-sm text-slate-custom hover:text-green transition-colors">
            Blog
          </Link>
          <Link href="/ben-kimim" className="text-sm text-slate-custom hover:text-green transition-colors">
            Ben Kimim?
          </Link>
          <Link href="/iletisim" className="text-sm text-slate-custom hover:text-green transition-colors">
            İletişim
          </Link>
        </nav>

        {/* Social */}
        <ul className="mt-8 flex items-center justify-center lg:justify-start gap-4" aria-label="Sosyal medya">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-custom hover:text-lightest-slate transition-colors duration-200"
                aria-label={s.name}
              >
                <s.icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <p className="mt-16 text-xs text-slate-custom/50 leading-relaxed">
          <a href="https://blakfy.com" target="_blank" rel="noopener noreferrer" className="hover:text-green transition-colors">
            Blakfy
          </a>{" "}
          tarafından desteklenmektedir.
        </p>
      </main>
    </div>
  );
}
