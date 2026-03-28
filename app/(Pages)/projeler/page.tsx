import type { Metadata } from "next";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";
import ProjectsPageClient from "./ProjectsPageClient";

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
      <ProjectsPageClient />
    </div>
  );
}
