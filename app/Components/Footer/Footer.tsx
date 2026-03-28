"use client";
import Link from "next/link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
  ArrowTopRightIcon,
} from "@radix-ui/react-icons";
import {
  MotionSection,
  StaggerContainer,
  StaggerItem,
  GlowLine,
} from "../Motion/MotionWrappers";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Projeler", href: "/projeler" },
  { label: "Blog", href: "/blog" },
  { label: "Ben Kimim?", href: "/ben-kimim" },
  { label: "İletişim", href: "/iletisim" },
];

const legalLinks = [
  { label: "Gizlilik Politikası", href: "/gizlilik" },
  { label: "Kullanım Şartları", href: "/kullanim-sartlari" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];

const socialLinks = [
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

const techStack = [
  { name: "Next.js", href: "https://nextjs.org" },
  { name: "React", href: "https://react.dev" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com" },
  { name: "Vercel", href: "https://vercel.com" },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-16 border-t border-navy-lighter"
      role="contentinfo"
    >
      <GlowLine className="mb-0" />

      {/* ─── "Benimle Çalış" CTA Banner ─── */}
      <div className="max-w-5xl mx-auto px-6 pt-12 sm:pt-16">
        <MotionSection>
          <div className="rounded-2xl border border-green/20 bg-green/[0.04] p-8 sm:p-10 mb-12 relative overflow-hidden">
            {/* Decorative gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(59,130,246,0.06), transparent 60%)",
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-lightest-slate mb-2 tracking-tight">
                  Bir projeniz mi var?{" "}
                  <span className="text-green">Birlikte çalışalım.</span>
                </h3>
                <p className="text-sm text-slate-custom leading-relaxed max-w-md">
                  Web geliştirme, e-ticaret veya dijital dönüşüm projeniz için
                  hemen iletişime geçin. Ücretsiz ön görüşme ile başlayalım.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://wa.me/905059796134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green text-white text-sm font-medium shadow-xl shadow-green/25 hover:shadow-green/40 hover:scale-[1.02] transition-all duration-200"
                >
                  WhatsApp ile Ulaş
                  <ArrowTopRightIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href="mailto:developer@tariktunc.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-navy-lighter bg-lightest-slate/[0.06] text-slate-custom-light text-sm font-medium hover:text-green hover:border-green/30 transition-all duration-200"
                >
                  E-posta Gönder
                </a>
              </div>
            </div>
          </div>
        </MotionSection>
      </div>

      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-6 pb-12 sm:pb-16">
        <MotionSection>
          {/* Top section — Nav + Social + Tech */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            {/* Left — Brand & Description */}
            <div className="md:col-span-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-lightest-slate mb-4 tracking-tight">
                Birlikte bir şeyler
                <br />
                <span className="text-green">inşa edelim.</span>
              </h3>
              <p className="text-sm text-slate-custom leading-relaxed max-w-sm mb-6">
                Yeni projeler, işbirlikleri veya sadece merhaba demek için her
                zaman iletişime geçebilirsiniz.
              </p>

              {/* Email links */}
              <div className="space-y-2">
                <a
                  href="mailto:developer@tariktunc.com"
                  className="group flex items-center gap-2 text-sm text-green hover:text-accent-cyan transition-colors"
                >
                  developer@tariktunc.com
                  <ArrowTopRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="mailto:info@blakfy.com"
                  className="group flex items-center gap-2 text-sm text-slate-custom hover:text-green transition-colors"
                >
                  info@blakfy.com
                  <ArrowTopRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Middle — Navigation */}
            <nav className="md:col-span-3" aria-label="Footer navigation">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-lightest-slate mb-4">
                Sayfalar
              </h4>
              <StaggerContainer>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <StaggerItem key={link.href}>
                      <li>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-custom hover:text-green hover:translate-x-1 inline-block transition-all duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </nav>

            {/* Right — Social + Tech */}
            <div className="md:col-span-4">
              {/* Social icons */}
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-lightest-slate mb-4">
                Beni Takip Edin
              </h4>
              <StaggerContainer>
                <ul className="flex gap-3 mb-8">
                  {socialLinks.map((social) => (
                    <StaggerItem key={social.name}>
                      <li>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-lg border border-navy-lighter text-slate-custom hover:text-green hover:border-green/40 hover:bg-green/5 hover:shadow-[0_0_16px_rgba(59,130,246,0.1)] transition-all duration-300"
                          aria-label={`${social.name} (yeni sekmede açılır)`}
                        >
                          <social.icon className="h-4.5 w-4.5" />
                        </a>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>

              {/* Built with */}
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-lightest-slate mb-3">
                Teknolojiler
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <a
                    key={tech.name}
                    href={tech.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-md border border-navy-lighter text-slate-custom hover:text-green hover:border-green/30 transition-all duration-200"
                  >
                    {tech.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Legal links */}
        <div className="border-t border-navy-lighter pt-6 mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-slate-custom hover:text-green transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-cookie-settings"));
              }
            }}
            className="text-xs text-slate-custom hover:text-green transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Çerez Tercihleri
          </button>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-lighter pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-custom">
            &copy; {new Date().getFullYear()} Tarık Tunç. Tüm hakları
            saklıdır.
          </p>
          <p className="text-xs text-slate-custom">
            Tasarım ve geliştirme{" "}
            <a
              href="https://blakfy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-custom-light hover:text-green transition-colors"
            >
              Blakfy
            </a>{" "}
            tarafından desteklenmektedir.
          </p>
        </div>
      </div>
    </footer>
  );
}
