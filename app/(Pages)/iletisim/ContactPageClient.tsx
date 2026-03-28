"use client";

import { useState, type FormEvent } from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import {
  MotionSection,
  StaggerContainer,
  StaggerItem,
  SlideIn,
  GlowLine,
} from "@/app/Components/Motion/MotionWrappers";

/* ─── Contact Channels ─── */
const channels = [
  {
    label: "WhatsApp",
    value: "+90 505 979 61 34",
    href: "https://wa.me/905059796134",
    desc: "En hızlı yanıt",
    external: true,
    primary: true,
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "E-posta (Kişisel)",
    value: "developer@tariktunc.com",
    href: "mailto:developer@tariktunc.com",
    desc: "Detaylı konular için",
    icon: <EnvelopeClosedIcon className="h-5 w-5" />,
  },
  {
    label: "E-posta (Blakfy)",
    value: "info@blakfy.com",
    href: "mailto:info@blakfy.com",
    desc: "Kurumsal projeler",
    icon: <EnvelopeClosedIcon className="h-5 w-5" />,
  },
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
    name: "Medium",
    href: "https://medium.com/@tariktunc",
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/tarkktunc/",
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

/* ─── Form Validation ─── */
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "İsim gereklidir";
  if (!data.email.trim()) {
    errors.email = "E-posta gereklidir";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Geçerli bir e-posta adresi girin";
  }
  if (!data.message.trim()) {
    errors.message = "Mesaj gereklidir";
  } else if (data.message.trim().length < 10) {
    errors.message = "Mesaj en az 10 karakter olmalıdır";
  }
  return errors;
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const subject = encodeURIComponent(
        `İletişim Formu: ${formData.name}`
      );
      const body = encodeURIComponent(
        `İsim: ${formData.name}\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`
      );
      window.location.href = `mailto:developer@tariktunc.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  return (
    <>
      {/* Header */}
      <MotionSection>
        <header className="mb-16">
          <span className="block font-mono text-sm text-green mb-3">
            {"// iletişim"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-lightest-slate mb-4 tracking-tight">
            İletişime Geç
          </h1>
          <p className="text-base text-slate-custom max-w-lg leading-relaxed">
            Yeni projeler, işbirlikleri veya sadece merhaba demek için her
            zaman iletişime geçebilirsiniz.
          </p>
        </header>
      </MotionSection>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* LEFT — Contact Form */}
        <SlideIn direction="left">
          <div className="rounded-2xl border border-navy-lighter/60 bg-navy-light/50 p-6 sm:p-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-green mb-6">
              Mesaj Gönder
            </h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent2/10 text-accent2 mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-lightest-slate font-medium mb-2">
                  E-posta istemciniz açılıyor!
                </p>
                <p className="text-sm text-slate-custom">
                  Mesajınızı e-posta uygulamanızdan gönderebilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="mt-6 text-sm text-green hover:text-accent-cyan transition-colors"
                >
                  Yeni mesaj gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm text-slate-custom-light mb-2"
                  >
                    İsim
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg bg-navy/80 border text-lightest-slate text-sm placeholder:text-slate-custom/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-green/30 ${
                      errors.name
                        ? "border-red-500/60"
                        : "border-navy-lighter hover:border-green/30 focus:border-green/50"
                    }`}
                    placeholder="Adınız Soyadınız"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm text-slate-custom-light mb-2"
                  >
                    E-posta
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg bg-navy/80 border text-lightest-slate text-sm placeholder:text-slate-custom/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-green/30 ${
                      errors.email
                        ? "border-red-500/60"
                        : "border-navy-lighter hover:border-green/30 focus:border-green/50"
                    }`}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm text-slate-custom-light mb-2"
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg bg-navy/80 border text-lightest-slate text-sm placeholder:text-slate-custom/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-green/30 resize-none ${
                      errors.message
                        ? "border-red-500/60"
                        : "border-navy-lighter hover:border-green/30 focus:border-green/50"
                    }`}
                    placeholder="Projeniz hakkında kısaca bilgi verin..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-green text-white font-medium text-sm shadow-xl shadow-green/25 hover:shadow-green/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Mesaj Gönder
                </button>
              </form>
            )}
          </div>
        </SlideIn>

        {/* RIGHT — Contact Channels */}
        <SlideIn direction="right">
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-green mb-6">
              Doğrudan İletişim
            </h2>

            <StaggerContainer>
              {channels.map((ch) => (
                <StaggerItem key={ch.label}>
                  <a
                    href={ch.href}
                    {...(ch.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`group flex items-center gap-5 rounded-2xl p-5 border transition-all duration-300 mb-3 ${
                      ch.primary
                        ? "border-accent2/30 hover:border-accent2/60 hover:bg-accent2/5 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                        : "border-navy-lighter hover:border-green/30 hover:bg-navy-lighter/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                        ch.primary
                          ? "bg-accent2/10 text-accent2 group-hover:bg-accent2/20 group-hover:scale-110"
                          : "bg-navy-lighter/60 text-green group-hover:bg-green/10 group-hover:scale-110"
                      }`}
                    >
                      {ch.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-lightest-slate">
                          {ch.label}
                        </span>
                        {ch.desc && (
                          <span className="text-[10px] text-slate-custom/60">
                            -- {ch.desc}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          ch.primary ? "text-accent2" : "text-slate-custom"
                        } group-hover:text-lightest-slate transition-colors`}
                      >
                        {ch.value}
                      </span>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SlideIn>
      </div>

      <GlowLine className="mb-12" />

      {/* Social Media Grid */}
      <MotionSection delay={0.2}>
        <section className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-lightest-slate mb-6">
            Sosyal Medya
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-2xl border border-navy-lighter bg-navy-light/30 text-slate-custom hover:text-green hover:border-green/30 hover:bg-green/5 hover:shadow-[0_0_24px_rgba(59,130,246,0.1)] hover:scale-105 transition-all duration-300"
                aria-label={s.name}
              >
                <s.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{s.name}</span>
              </a>
            ))}
          </div>
        </section>
      </MotionSection>

      {/* Blakfy CTA */}
      <MotionSection delay={0.3}>
        <section className="rounded-2xl border border-navy-lighter/60 bg-navy-light/50 p-8 border-t-2 border-t-accent2">
          <h2 className="text-lg font-semibold text-lightest-slate mb-2">
            Profesyonel Projeler
          </h2>
          <p className="text-sm text-slate-custom mb-5 max-w-lg leading-relaxed">
            Kurumsal web geliştirme, e-ticaret ve dijital dönüşüm hizmetleri
            için Blakfy üzerinden de iletişime geçebilirsiniz.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://blakfy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green text-white text-sm font-medium shadow-xl shadow-green/25 hover:shadow-green/40 hover:scale-[1.02] transition-all duration-200"
            >
              blakfy.com <span>&#8599;</span>
            </a>
            <a
              href="mailto:info@blakfy.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-navy-lighter bg-lightest-slate/[0.06] text-slate-custom-light text-sm font-medium hover:text-green hover:border-green/30 transition-all duration-200"
            >
              info@blakfy.com
            </a>
          </div>
        </section>
      </MotionSection>
    </>
  );
}
