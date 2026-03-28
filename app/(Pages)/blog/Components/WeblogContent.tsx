"use client";
import React from "react";
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
};

const ALL_CATEGORY = "Tümü";

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
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function WeblogContent() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState(ALL_CATEGORY);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

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

  // Close sidebar on category select (mobile)
  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    setSidebarOpen(false);
  };

  if (!loaded) {
    return (
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-inner">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 rounded-lg bg-[rgb(var(--navy-lighter-rgb)/0.5)] animate-pulse mb-1" />
            ))}
          </div>
        </aside>
        <div className="docs-content">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[rgb(var(--navy-lighter-rgb)/0.5)] animate-pulse mb-4" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="docs-layout">
      {/* Mobile toggle */}
      <button
        className="docs-sidebar-toggle"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-expanded={sidebarOpen}
        aria-controls="blog-sidebar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        Kategoriler
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="docs-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="blog-sidebar"
        className={`docs-sidebar ${sidebarOpen ? "docs-sidebar-open" : ""}`}
      >
        <div className="docs-sidebar-inner">
          <h2 className="docs-sidebar-title">Kategoriler</h2>

          <nav aria-label="Blog kategorileri">
            <ul className="docs-nav-list" role="list">
              <li>
                <button
                  onClick={() => selectCategory(ALL_CATEGORY)}
                  className={`docs-nav-item ${activeCategory === ALL_CATEGORY ? "docs-nav-active" : ""}`}
                  aria-pressed={activeCategory === ALL_CATEGORY}
                >
                  <span>{ALL_CATEGORY}</span>
                  <span className="docs-nav-count">{posts.length}</span>
                </button>
              </li>
              {categoryMap.map(([cat, count]) => (
                <li key={cat}>
                  <button
                    onClick={() => selectCategory(cat)}
                    className={`docs-nav-item ${activeCategory === cat ? "docs-nav-active" : ""}`}
                    aria-pressed={activeCategory === cat}
                  >
                    <span>{cat}</span>
                    <span className="docs-nav-count">{count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="docs-content">
        <div className="docs-content-header">
          <h2 className="docs-content-title">
            {activeCategory === ALL_CATEGORY ? "Tüm Yazılar" : activeCategory}
          </h2>
          <span className="docs-content-count">{filtered.length} yazı</span>
        </div>

        <StaggerContainer key={activeCategory}>
          {filtered.map((post) => (
            <StaggerItem key={post.slug || post.title}>
              <Link
                href={post.slug ? `/post/${post.slug}` : (post.link || "/")}
                className="docs-post-item"
              >
                <div className="docs-post-main">
                  <h3 className="docs-post-title">{post.title}</h3>
                  {post.summary && (
                    <p className="docs-post-summary">{post.summary}</p>
                  )}
                </div>
                <div className="docs-post-meta">
                  {post.categories && (
                    <span className="docs-post-tag">
                      {normalizeCategory(post.categories)}
                    </span>
                  )}
                  {post.date && (
                    <time className="docs-post-date" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  )}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <p className="text-center text-slate-custom py-12">
            Bu kategoride henüz yazı bulunmuyor.
          </p>
        )}
      </div>
    </div>
  );
}
