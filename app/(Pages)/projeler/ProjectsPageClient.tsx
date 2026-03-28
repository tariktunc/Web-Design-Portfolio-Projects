"use client";

import { useState } from "react";
import ProjectContainer from "./Components/GithubProjectData";
import {
  MotionSection,
  SlideIn,
} from "@/app/Components/Motion/MotionWrappers";

const tabs = [
  { id: "personal", label: "Kişisel Projeler", number: "01" },
  { id: "client", label: "Müşteri Çalışmaları", number: "02" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ProjectsPageClient() {
  const [activeTab, setActiveTab] = useState<TabId>("personal");

  return (
    <>
      {/* Header */}
      <MotionSection>
        <header className="mb-12">
          <span className="block font-mono text-sm text-green mb-3">
            {"// projeler"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-lightest-slate mb-4 tracking-tight">
            Geliştirdiklerim
          </h1>
          <p className="text-base text-slate-custom max-w-xl leading-relaxed">
            Kişisel projeler, kapalı kaynak sistemler ve açık kaynak
            çalışmalarından oluşan bir koleksiyon.
          </p>
        </header>
      </MotionSection>

      {/* Category Tabs */}
      <MotionSection delay={0.1}>
        <div className="flex gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`group relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-green/10 text-green border border-green/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "text-slate-custom border border-navy-lighter hover:text-lightest-slate hover:border-green/20 hover:bg-navy-lighter/30"
              }`}
            >
              <span className="font-mono text-xs mr-2 opacity-60">
                {tab.number}.
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </MotionSection>

      {/* Content */}
      {activeTab === "personal" && (
        <SlideIn direction="up">
          <section className="mb-20">
            <ProjectContainer />
          </section>
        </SlideIn>
      )}

      {activeTab === "client" && (
        <SlideIn direction="up">
          <section>
            <a
              href="https://blakfy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-navy-lighter/60 bg-navy-light/50 p-8 transition-all duration-300 hover:bg-navy-lighter/20 hover:border-green/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.06)] border-t-2 border-t-accent2"
            >
              <span className="text-accent2 font-mono text-sm mb-2 block">
                Blakfy Digital Agency
              </span>
              <h2 className="text-2xl font-bold text-lightest-slate mb-3">
                Blakfy Projeleri
              </h2>
              <p className="text-sm text-slate-custom max-w-xl leading-relaxed mb-6">
                E-ticaret, turizm, güzellik ve profesyonel hizmetler alanında
                9+ müşteri projesi. Her biri modern teknolojilerle geliştirilmiş
                kurumsal düzeyde web uygulamaları.
              </p>

              {/* Client project cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  {
                    name: "Birincioğlu Trade",
                    url: "birinciogluticaret.com",
                    tech: "Next.js",
                  },
                  {
                    name: "Kübra Yılmaz Beauty",
                    url: "kubrayilmazbeauty.com",
                    tech: "Next.js",
                  },
                  {
                    name: "Özharbiye Döner",
                    url: "ozharbiyedoner.com",
                    tech: "Wix",
                  },
                  {
                    name: "Tripslab",
                    url: "trips-lab.com",
                    tech: "Next.js",
                  },
                  {
                    name: "Galata Hukuk",
                    url: "galatahukuk.com.tr",
                    tech: "WordPress",
                  },
                  {
                    name: "Saracyol İnşaat",
                    url: "saracyol.com",
                    tech: "WordPress",
                  },
                  {
                    name: "Tab Yapı",
                    url: "tabyapi.com",
                    tech: "WordPress",
                  },
                  {
                    name: "Vinart Design",
                    url: "vinartdesign",
                    tech: "Wix",
                  },
                ].map((project) => (
                  <div
                    key={project.name}
                    className="flex items-center justify-between p-3 rounded-lg border border-navy-lighter/40 bg-navy/30 group-hover:border-navy-lighter/60 transition-colors"
                  >
                    <span className="text-sm text-slate-custom-light">
                      {project.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-navy-lighter/80 text-slate-custom-light">
                      {project.tech}
                    </span>
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-green">
                blakfy.com
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#8599;
                </span>
              </span>
            </a>
          </section>
        </SlideIn>
      )}
    </>
  );
}
