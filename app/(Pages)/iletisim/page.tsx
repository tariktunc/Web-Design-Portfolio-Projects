import type { Metadata } from "next";
import FadeInSection from "@/app/Components/FadeInSection";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Tarık Tunç ile iletişime geçin. Yeni projeler, işbirlikleri veya sorularınız için bana ulaşabilirsiniz.",
  robots: { index: true, follow: true },
};

const contactChannels = [
  {
    icon: EnvelopeClosedIcon,
    label: "E-posta",
    value: "me@tariktunc.com",
    href: "mailto:me@tariktunc.com",
  },
  {
    icon: GitHubLogoIcon,
    label: "GitHub",
    value: "github.com/tariktunc",
    href: "https://github.com/tariktunc",
    external: true,
  },
  {
    icon: LinkedInLogoIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/tarktunc",
    href: "https://linkedin.com/in/tarktunc",
    external: true,
  },
  {
    icon: TwitterLogoIcon,
    label: "Twitter",
    value: "@tarkktunc",
    href: "https://twitter.com/tarkktunc",
    external: true,
  },
];

export default function IletisimPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <Breadcrumb items={[{ label: "İletişim" }]} />
      <FadeInSection>
        <h1 className="text-3xl font-bold text-lightest-slate mb-4">
          İletişim
        </h1>
        <p className="text-slate-custom leading-relaxed mb-10 max-w-xl">
          Yeni projeler, işbirlikleri veya sadece merhaba demek için her zaman
          iletişime geçebilirsiniz. En hızlı yanıt e-posta ile olacaktır.
        </p>
      </FadeInSection>

      <FadeInSection delay={150}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex items-center gap-4 p-5 rounded-lg border border-navy-lighter hover:border-green/30 hover:bg-green/5 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-lighter group-hover:bg-green/10 transition-colors">
                <channel.icon className="h-5 w-5 text-green" />
              </div>
              <div>
                <p className="text-xs text-slate-custom uppercase tracking-wider mb-0.5">
                  {channel.label}
                </p>
                <p className="text-sm text-lightest-slate group-hover:text-green transition-colors">
                  {channel.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection delay={300}>
        <div className="mt-12 p-6 rounded-lg border border-navy-lighter">
          <h2 className="text-xl font-semibold text-lightest-slate mb-3">
            Freelance Projeler
          </h2>
          <p className="text-slate-custom leading-relaxed mb-4">
            Profesyonel web geliştirme hizmetleri için Blakfy üzerinden de
            iletişime geçebilirsiniz.
          </p>
          <a
            href="https://blakfy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-green/30 text-green text-sm font-medium hover:bg-green/10 hover:border-green/60 transition-all duration-300"
          >
            blakfy.com
          </a>
        </div>
      </FadeInSection>
    </div>
  );
}
