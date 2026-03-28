"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  StaggerContainer,
  StaggerItem,
} from "@/app/Components/Motion/MotionWrappers";

type BlogPost = {
  imageSrc?: string;
  alt?: string;
  date?: string;
  categories?: string;
  title?: string;
  summary?: string;
  link?: string;
  slug?: string;
  readingTime?: string;
};

const ALL_CATEGORY = "Tümü";
const POSTS_PER_PAGE = 12;

function normalizeCategory(cat: string): string {
  const lower = cat.toLowerCase();
  const map: Record<string, string> = {
    react: "React",
    nextjs: "Next.js",
    typescript: "TypeScript",
    javascript: "JavaScript",
    css: "CSS",
    "node.js": "Node.js",
    nodejs: "Node.js",
    performance: "Performance",
    seo: "SEO",
    devops: "DevOps",
  };
  return map[lower] ?? cat;
}

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  React: "blog-tag--blue",
  "Next.js": "blog-tag--cyan",
  TypeScript: "blog-tag--purple",
  JavaScript: "blog-tag--yellow",
  CSS: "blog-tag--pink",
  "Node.js": "blog-tag--green",
  Performance: "blog-tag--orange",
  SEO: "blog-tag--emerald",
  DevOps: "blog-tag--red",
};

export default function WeblogContent() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState(ALL_CATEGORY);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetch("/weblog/data/blog.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.weBlog || []);
        setLoaded(true);
      })
      .catch((error) => console.error("Blog yüklenemedi:", error));
  }, []);

  const categoryMap = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const post of posts) {
      if (!post.categories) continue;
      const normalized = normalizeCategory(post.categories);
      map.set(normalized, (map.get(normalized) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const filtered = React.useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return posts;
    return posts.filter(
      (p) => p.categories && normalizeCategory(p.categories) === activeCategory
    );
  }, [posts, activeCategory]);

  // Reset page on category change
  React.useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Visible page numbers (max 5 around current)
  const pageNumbers = React.useMemo(() => {
    const pages: number[] = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [page, totalPages]);

  if (!loaded) {
    return (
      <div className="blog-page">
        <div className="blog-filters">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-[rgb(var(--navy-lighter-rgb)/0.5)] animate-pulse" />
          ))}
        </div>
        <div className="blog-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="blog-card-skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Header */}
      <div className="blog-header">
        <span className="blog-header-label">Blog</span>
        <h1 className="blog-header-title">Yazılar & Makaleler</h1>
        <p className="blog-header-desc">
          React, Next.js, TypeScript ve modern web geliştirme üzerine teknik yazılar.
        </p>
      </div>

      {/* Category Filters */}
      <div className="blog-filters">
        <button
          onClick={() => setActiveCategory(ALL_CATEGORY)}
          className={`blog-filter-btn ${activeCategory === ALL_CATEGORY ? "blog-filter-active" : ""}`}
        >
          Tümü <span className="blog-filter-count">{posts.length}</span>
        </button>
        {categoryMap.map(([cat, count]) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`blog-filter-btn ${activeCategory === cat ? "blog-filter-active" : ""}`}
          >
            {cat} <span className="blog-filter-count">{count}</span>
          </button>
        ))}
      </div>

      {/* Post Grid */}
      <StaggerContainer key={`${activeCategory}-${page}`} className="blog-grid">
        {paginated.map((post) => (
          <StaggerItem key={post.slug || post.title}>
            <Link
              href={post.slug ? `/post/${post.slug}` : (post.link || "/")}
              className="blog-card"
            >
              <div className="blog-card-image">
                {post.imageSrc && (
                  <Image
                    src={post.imageSrc}
                    alt={post.alt || post.title || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="blog-card-body">
                <div className="blog-card-top">
                  {post.categories && (
                    <span className={`blog-tag blog-tag--sm ${CATEGORY_COLORS[normalizeCategory(post.categories)] || ""}`}>
                      {normalizeCategory(post.categories)}
                    </span>
                  )}
                  {post.date && (
                    <time className="blog-card-date" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  )}
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                {post.summary && (
                  <p className="blog-card-summary">{post.summary}</p>
                )}
                <div className="blog-card-footer">
                  <span className="blog-card-read">Devamını oku →</span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <p className="text-center text-slate-custom py-16 text-lg">
          Bu kategoride henüz yazı bulunmuyor.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="blog-pagination" aria-label="Sayfalama">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="blog-page-btn blog-page-arrow"
            aria-label="Önceki sayfa"
          >
            ← Önceki
          </button>

          <div className="blog-page-numbers">
            {pageNumbers[0] > 1 && (
              <>
                <button onClick={() => goToPage(1)} className="blog-page-btn">1</button>
                {pageNumbers[0] > 2 && <span className="blog-page-dots">…</span>}
              </>
            )}
            {pageNumbers.map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`blog-page-btn ${p === page ? "blog-page-active" : ""}`}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            ))}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span className="blog-page-dots">…</span>
                )}
                <button onClick={() => goToPage(totalPages)} className="blog-page-btn">
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="blog-page-btn blog-page-arrow"
            aria-label="Sonraki sayfa"
          >
            Sonraki →
          </button>
        </nav>
      )}
    </div>
  );
}
