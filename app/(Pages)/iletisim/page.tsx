import type { Metadata } from "next";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Tarık Tunç ile iletişime geçin. Projeler, işbirlikleri veya sorularınız için WhatsApp veya e-posta ile ulaşabilirsiniz.",
  alternates: {
    canonical: "https://tariktunc.com/iletisim",
  },
};

const channels = [
  {
    label: "WhatsApp",
    value: "+90 505 979 61 34",
    href: "https://wa.me/905059796134",
    desc: "En hızlı yanıt",
    external: true,
    primary: true,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "E-posta",
    value: "developer@tariktunc.com",
    href: "mailto:developer@tariktunc.com",
    desc: "Detaylı konular için",
    icon: <EnvelopeClosedIcon className="h-5 w-5" />,
  },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/tariktunc", icon: GitHubLogoIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/tarktunc", icon: LinkedInLogoIcon },
  { name: "Twitter", href: "https://twitter.com/tarkktunc", icon: TwitterLogoIcon },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <Breadcrumb items={[{ label: "İletişim" }]} />

      <header className="mb-16">
        <span className="block font-mono text-sm text-green mb-3">
          {"// iletişim"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-lightest-slate mb-4 tracking-tight">
          İletişime Geç
        </h1>
        <p className="text-base text-slate-custom max-w-lg leading-relaxed">
          Yeni projeler, işbirlikleri veya sadece merhaba demek için her zaman iletişime geçebilirsiniz.
        </p>
      </header>

      {/* Contact channels */}
      <section className="mb-16 space-y-3">
        {channels.map((ch) => (
          <a
            key={ch.label}
            href={ch.href}
            {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`group flex items-center gap-5 rounded-lg p-5 border transition-all duration-200 ${
              ch.primary
                ? "border-accent2/30 hover:border-accent2/60 hover:bg-accent2/5"
                : "border-navy-lighter hover:border-green/30 hover:bg-navy-lighter/20"
            }`}
          >
            <div className={`flex items-center justify-center w-11 h-11 rounded-lg transition-colors ${
              ch.primary
                ? "bg-accent2/10 text-accent2 group-hover:bg-accent2/20"
                : "bg-navy-lighter/60 text-green group-hover:bg-green/10"
            }`}>
              {ch.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-lightest-slate">{ch.label}</span>
                {ch.desc && (
                  <span className="text-[10px] text-slate-custom/60">— {ch.desc}</span>
                )}
              </div>
              <span className={`text-sm ${ch.primary ? "text-accent2" : "text-slate-custom"} group-hover:text-lightest-slate transition-colors`}>
                {ch.value}
              </span>
            </div>
          </a>
        ))}
      </section>

      {/* Social */}
      <section className="mb-16">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-lightest-slate mb-6">
          Sosyal Medya
        </h2>
        <div className="flex gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-navy-lighter text-slate-custom hover:text-green hover:border-green/30 hover:bg-green/5 transition-all duration-200"
              aria-label={s.name}
            >
              <s.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </section>

      {/* Blakfy */}
      <section className="rounded-lg border border-navy-lighter p-6">
        <h2 className="text-sm font-semibold text-lightest-slate mb-2">
          Profesyonel Projeler
        </h2>
        <p className="text-sm text-slate-custom mb-4">
          Kurumsal web geliştirme hizmetleri için Blakfy üzerinden de iletişime geçebilirsiniz.
        </p>
        <a
          href="https://blakfy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-green hover:text-accent-cyan transition-colors"
        >
          blakfy.com <span>&#8599;</span>
        </a>
      </section>
    </div>
  );
}
