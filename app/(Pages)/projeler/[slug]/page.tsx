import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/app/lib/projects";
import ProjectDetailPage from "./ProjectDetailPage";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proje Bulunamadı" };

  const description = project.longDescription
    ? project.longDescription.slice(0, 160)
    : project.description;

  return {
    title: `${project.title} — Tarık Tunç Projesi`,
    description,
    openGraph: {
      title: `${project.title} | Tarik Tunç`,
      description,
      images: project.imageAdress ? [{ url: project.imageAdress }] : [],
      type: "article",
    },
    alternates: {
      canonical: `https://tariktunc.vercel.app/projeler/${slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
