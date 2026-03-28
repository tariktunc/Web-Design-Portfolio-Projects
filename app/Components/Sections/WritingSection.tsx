"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAnimeScrollReveal } from "@/app/hooks/useAnime";

interface BlogPost {
  title: string;
  slug: string;
  imageSrc?: string;
  categories: string;
  date: string;
  summary: string;
  link?: string;
}

function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const gridRef = useAnimeScrollReveal(".blog-card", {
    translateY: [50, 0],
    filter: ["blur(6px)", "blur(0px)"],
    duration: 900,
    ease: "outExpo",
  });

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => {
        const href = post.slug ? `/post/${post.slug}` : (post.link || "/blog");
        const isExternal = !post.slug && !!post.link;

        return (
          <article
            key={post.slug}
            className="blog-card group relative rounded-2xl border border-navy-lighter/60 bg-navy-light/40 overflow-hidden transition-all duration-500 hover:border-green/30 hover:bg-navy-light/60 flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-transparent to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Thumbnail */}
            {post.imageSrc && (
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={post.imageSrc}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="relative p-5 flex flex-col flex-1">
              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green/10 text-green border border-green/20">
                  {post.categories}
                </span>
                <span className="text-xs text-slate-custom">{post.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-lightest-slate mb-2 line-clamp-2 group-hover:text-green transition-colors duration-300">
                {isExternal ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                ) : (
                  <Link href={href}>{post.title}</Link>
                )}
              </h3>

              {/* Summary */}
              <p className="text-sm text-slate-custom leading-relaxed line-clamp-3 flex-1">
                {post.summary}
              </p>

              {/* Read more */}
              <div className="mt-4 pt-3 border-t border-navy-lighter/40">
                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-green hover:text-accent2 transition-colors duration-300"
                  >
                    Devamını Oku
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-green hover:text-accent2 transition-colors duration-300"
                  >
                    Devamını Oku
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function WritingSection() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  const headerRef = useAnimeScrollReveal(".blog-header", {
    translateY: [50, 0],
    filter: ["blur(6px)", "blur(0px)"],
    duration: 900,
    ease: "outExpo",
  });

  React.useEffect(() => {
    fetch("/weblog/data/blog.json")
      .then((r) => r.json())
      .then((data) => {
        const allPosts: BlogPost[] = data.weBlog || [];
        setPosts(allPosts.slice(0, 6));
        setLoaded(true);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-12">
        <div className="blog-header">
          <span className="text-green text-sm font-semibold tracking-widest uppercase mb-3 block">
            04. Blog
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lightest-slate tracking-tight">
            Son Yazılarım
          </h2>
        </div>
      </div>

      {loaded && posts.length > 0 && <BlogGrid posts={posts} />}

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-green/30 text-green font-medium hover:bg-green/10 hover:border-green/50 transition-all duration-300 group"
        >
          Tüm Yazıları Gör
          <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
