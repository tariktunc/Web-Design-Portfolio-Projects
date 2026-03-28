"use client";
import React from "react";
import ArticleCard from "./ArticleCard";
import LoadingCard from "./LoadingCard";
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

export default function WeblogContent() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState(ALL_CATEGORY);

  React.useEffect(() => {
    fetch("/weblog/data/blog.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.weBlog || []);
        setLoaded(true);
      })
      .catch((error) => console.error("Blog yüklenemedi:", error));
  }, []);

  /* Build unique categories with counts */
  const categoryMap = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const post of posts) {
      if (!post.categories) continue;
      const normalized = normalizeCategory(post.categories);
      map.set(normalized, (map.get(normalized) || 0) + 1);
    }
    /* Sort by count descending */
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  /* Filter posts */
  const filtered = React.useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return posts;
    return posts.filter(
      (p) => p.categories && normalizeCategory(p.categories) === activeCategory
    );
  }, [posts, activeCategory]);

  if (!loaded) return <LoadingCard />;

  return (
    <div className="flex flex-col gap-8">
      {/* Category filter bar */}
      <nav aria-label="Blog kategorileri">
        <ul className="flex flex-wrap gap-2" role="list">
          {/* All button */}
          <li>
            <button
              onClick={() => setActiveCategory(ALL_CATEGORY)}
              className={`blog-cat-btn ${activeCategory === ALL_CATEGORY ? "blog-cat-active" : ""}`}
              aria-pressed={activeCategory === ALL_CATEGORY}
            >
              {ALL_CATEGORY}
              <span className="blog-cat-count">{posts.length}</span>
            </button>
          </li>
          {categoryMap.map(([cat, count]) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`blog-cat-btn ${activeCategory === cat ? "blog-cat-active" : ""}`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
                <span className="blog-cat-count">{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Results count */}
      <p className="text-sm text-slate-custom">
        {filtered.length} yazı
        {activeCategory !== ALL_CATEGORY && (
          <>
            {" "}
            <span className="text-green font-medium">{activeCategory}</span> kategorisinde
          </>
        )}
      </p>

      {/* Posts */}
      <StaggerContainer key={activeCategory}>
        {filtered.map((data) => (
          <StaggerItem key={data.slug || data.title}>
            <article className="mb-8">
              <ArticleCard
                imageSrc={data.imageSrc}
                alt={data.alt}
                categories={data.categories}
                date={data.date}
                title={data.title}
                summary={data.summary}
                link={data.link}
                slug={data.slug}
              />
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <p className="text-center text-slate-custom py-12">
          Bu kategoride henüz yazı bulunmuyor.
        </p>
      )}
    </div>
  );
}
