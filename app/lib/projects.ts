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
  content?: string;
  readingTime?: string;
  tags?: string[];
  author?: string;
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

// Category-based JSON content files mapping
const CONTENT_FILES: Record<string, string> = {
  react: "weblog/data/posts-react.json",
  nextjs: "weblog/data/posts-nextjs.json",
  typescript: "weblog/data/posts-typescript.json",
  javascript: "weblog/data/posts-javascript.json",
  css: "weblog/data/posts-css.json",
  tailwind: "weblog/data/posts-css.json",
  nodejs: "weblog/data/posts-nodejs.json",
};

// Slug prefix → performance/seo/devops overrides
const SPECIAL_SLUGS: Record<string, string> = {};
const PERF_SLUGS = ["web-performance","core-web-vitals","lighthouse","image-optimization","javascript-bundle","critical-rendering","font-loading","caching-stratejileri","preload-prefetch","third-party-script","react-performance-profiling","web-vitals","lazy-loading","http2-http3","performance-budget"];
const SEO_SLUGS = ["teknik-seo","structured-data","meta-tags","sitemap-robots","canonical-url","schema-markup","seo-friendly","ai-seo","google-search","web-accessibility-seo","international-seo","page-speed-seo","nextjs-seo","eeat-seo","cookie-consent-seo"];
const DEVOPS_SLUGS = ["git-ileri","github-actions","docker-web","vercel-deployment","eslint-prettier","npm-package","monorepo-turborepo","vscode-","web-hosting","developer-tools"];

// Content cache to avoid re-reading files
const contentCache = new Map<string, Record<string, string>>();

function getContentFile(slug: string): string {
  // Check special categories first
  for (const prefix of PERF_SLUGS) {
    if (slug.startsWith(prefix)) return "weblog/data/posts-performance.json";
  }
  for (const prefix of SEO_SLUGS) {
    if (slug.startsWith(prefix)) return "weblog/data/posts-seo.json";
  }
  for (const prefix of DEVOPS_SLUGS) {
    if (slug.startsWith(prefix)) return "weblog/data/posts-devops.json";
  }

  // Standard prefix matching
  const prefix = slug.split("-")[0];
  return CONTENT_FILES[prefix] || "";
}

function loadContentFromJson(slug: string): string | undefined {
  const file = getContentFile(slug);
  if (!file) return undefined;

  try {
    if (!contentCache.has(file)) {
      const absolute = path.join(process.cwd(), "public", file);
      if (!fs.existsSync(absolute)) return undefined;
      contentCache.set(file, JSON.parse(fs.readFileSync(absolute, "utf-8")));
    }
    return contentCache.get(file)?.[slug];
  } catch {
    return undefined;
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const post = getAllBlogPosts().find((p) => p.slug === slug);
  if (!post) return undefined;

  // Load content from category JSON files
  if (!post.content) {
    const content = loadContentFromJson(slug);
    if (content) {
      post.content = content;
    }
  }

  return post;
}
