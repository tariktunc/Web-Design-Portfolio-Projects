import type { Metadata } from "next";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Hakkımda — Tarık Tunç",
  description:
    "Tarık Tunç hakkında — Full Stack Developer ve Siber Güvenlik Araştırmacısı. React, Next.js, TypeScript, Python, AI agent sistemleri ve SEO mühendisliği.",
  alternates: {
    canonical: "https://tariktunc.com/ben-kimim",
  },
};

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "FastAPI", "MongoDB", "PostgreSQL"],
  },
  {
    category: "AI & Otomasyon",
    items: ["Claude AI", "OpenAI API", "LangChain", "Agent Sistemleri", "LLM"],
  },
  {
    category: "Güvenlik",
    items: ["Kali Linux", "Metasploit", "Burp Suite", "Nmap", "OWASP"],
  },
  {
    category: "SEO & Performans",
    items: ["Teknik SEO", "GEO", "Core Web Vitals", "llms.txt", "Google Analytics"],
  },
  {
    category: "Araçlar",
    items: ["Git", "Docker", "Vercel", "GitHub Actions", "Figma"],
  },
];

const timeline = [
  { year: "2020", title: "Web geliştirmeye başladım", desc: "HTML, CSS, JavaScript ile ilk projeleri tamamladım." },
  { year: "2021", title: "Siber güvenlik alanına yöneldim", desc: "Penetrasyon testi ve ağ güvenliği üzerine yoğunlaştım." },
  { year: "2022", title: "Full Stack Developer", desc: "React ve Node.js ekosistemiyle tam yığın uygulamalar geliştirdim." },
  { year: "2023", title: "Blakfy'ı kurdum", desc: "Profesyonel web geliştirme hizmetleri sunmaya başladım. 9+ müşteri projesi teslim ettim." },
  { year: "2024", title: "AI & Otomasyon", desc: "GPT entegrasyonları, AI kod analizi platformları ve SEO mühendisliği." },
  { year: "2025+", title: "AI Agents & LLM", desc: "Claude AI tabanlı multi-agent sistemler, GEO ve geleceğin web'i." },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <Breadcrumb items={[{ label: "Ben Kimim?" }]} />

      {/* Header */}
      <header className="mb-16">
        <span className="block font-mono text-sm text-green mb-3">
          {"// hakkımda"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-lightest-slate mb-6 tracking-tight">
          Ben Kimim?
        </h1>
        <div className="space-y-4 text-sm leading-relaxed text-slate-custom max-w-2xl">
          <p>
            <span className="text-lightest-slate font-medium">Full Stack Developer</span> ve{" "}
            <span className="text-lightest-slate font-medium">siber güvenlik araştırmacısıyım</span>.
            2020 yılından beri web teknolojileri ile çalışıyorum.
          </p>
          <p>
            <a href="https://blakfy.com" target="_blank" rel="noopener noreferrer" className="text-lightest-slate font-medium hover:text-green transition-colors">
              Blakfy
            </a>{" "}
            markası altında e-ticaret, turizm ve kurumsal sektörlerde 9+ müşteriye dijital çözümler sunuyorum.
            Next.js, React ve TypeScript ile kullanıcı odaklı, güvenli web uygulamaları geliştiriyorum.
          </p>
          <p>
            Son dönemde{" "}
            <span className="text-lightest-slate font-medium">AI agent sistemleri</span>,{" "}
            <span className="text-lightest-slate font-medium">LLM entegrasyonları</span> ve{" "}
            <span className="text-lightest-slate font-medium">GEO (Generative Engine Optimization)</span>{" "}
            üzerine yoğunlaşıyorum.
          </p>
        </div>
      </header>

      {/* Skills */}
      <section className="mb-20">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-lightest-slate mb-8 flex items-center gap-4">
          <span className="text-green font-mono font-normal">01.</span>
          Beceriler
          <span className="flex-1 h-px bg-navy-lighter" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-lightest-slate mb-3">{group.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full bg-green/10 px-3 py-1 text-[11px] font-medium text-green">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-20">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-lightest-slate mb-8 flex items-center gap-4">
          <span className="text-green font-mono font-normal">02.</span>
          Yolculuk
          <span className="flex-1 h-px bg-navy-lighter" />
        </h2>
        <div className="space-y-1">
          {timeline.map((step) => (
            <div
              key={step.year}
              className="flex gap-6 rounded-lg p-4 -mx-4 transition-colors duration-200 hover:bg-navy-lighter/20"
            >
              <span className="shrink-0 text-sm font-bold text-green font-mono w-14 mt-0.5">
                {step.year}
              </span>
              <div>
                <h3 className="text-sm font-medium text-lightest-slate">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-custom">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-lg border border-navy-lighter p-8">
        <h2 className="text-lg font-semibold text-lightest-slate mb-3">Birlikte çalışalım</h2>
        <p className="text-sm text-slate-custom mb-6 max-w-md">
          Yeni projeler, işbirlikleri veya sadece merhaba demek için iletişime geçebilirsiniz.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://wa.me/905059796134"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent2 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="mailto:developer@tariktunc.com"
            className="inline-flex items-center gap-2 rounded-lg border border-navy-lighter px-5 py-2.5 text-sm font-medium text-lightest-slate transition-colors hover:bg-navy-lighter/30"
          >
            developer@tariktunc.com
          </a>
        </div>
      </section>
    </div>
  );
}
