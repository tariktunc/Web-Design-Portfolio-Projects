import type { Metadata } from "next";
import ProjectContainer from "./Components/GithubProjectData";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Projeler — Tarık Tunç",
  description:
    "Tarik Tunç'un kişisel projeleri. Next.js, React, TypeScript ve Tailwind CSS ile geliştirilen web projeleri, GitHub repoları ve kapalı kaynak çalışmalar.",
  alternates: {
    canonical: "https://tariktunc.com/projeler",
  },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      <Breadcrumb items={[{ label: "Projeler" }]} />

      <header className="mb-16">
        <span className="block font-mono text-sm text-green mb-3">
          {"// projeler"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-lightest-slate mb-4 tracking-tight">
          Geliştirdiklerim
        </h1>
        <p className="text-base text-slate-custom max-w-xl leading-relaxed">
          Kişisel projeler, kapalı kaynak sistemler ve açık kaynak çalışmalarından oluşan bir koleksiyon.
        </p>
      </header>

      {/* Kişisel Projeler */}
      <section className="mb-20">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-lightest-slate mb-8 flex items-center gap-4">
          <span className="text-green font-mono font-normal">01.</span>
          Kişisel Projeler
          <span className="flex-1 h-px bg-navy-lighter" />
        </h2>
        <ProjectContainer />
      </section>

      {/* Blakfy CTA */}
      <section>
        <a
          href="https://blakfy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-lg border border-navy-lighter p-8 transition-all duration-300 hover:bg-navy-lighter/20 hover:border-green/20"
        >
          <span className="text-green font-mono text-sm mb-2 block">02. Müşteri Çalışmaları</span>
          <h2 className="text-2xl font-bold text-lightest-slate mb-3">Blakfy Projeleri</h2>
          <p className="text-sm text-slate-custom max-w-xl leading-relaxed mb-4">
            E-ticaret, turizm, güzellik ve profesyonel hizmetler alanında 9+ müşteri projesi.
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-green">
            blakfy.com
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&#8599;</span>
          </span>
        </a>
      </section>
    </div>
  );
}
