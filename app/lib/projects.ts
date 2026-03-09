import fs from "fs";
import path from "path";

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface ProjectSection {
  title: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  link?: string;
  github?: string;
  imageAdress?: string;
  status: string;
  techStack: string[];
  features: string[];
  category: "personal" | "client";
  highlights?: ProjectHighlight[];
  sections?: ProjectSection[];
  screenshots?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  alt: string;
  imageSrc: string;
  categories: string;
  date: string;
  summary: string;
  fullSummary: string;
  link: string;
}

function readJson<T>(relativePath: string): T {
  const absolute = path.join(process.cwd(), "public", relativePath);
  return JSON.parse(fs.readFileSync(absolute, "utf-8"));
}

export function getAllProjects(): Project[] {
  const github = readJson<{ laboratory: Project[] }>(
    "Data/githubProjectData.json"
  );
  const blakfy = readJson<{ laboratory: Project[] }>(
    "Data/blakfyProjectData.json"
  );
  return [...github.laboratory, ...blakfy.laboratory];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  const data = readJson<{ weBlog: BlogPost[] }>("weblog/data/blog.json");
  return data.weBlog;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}
