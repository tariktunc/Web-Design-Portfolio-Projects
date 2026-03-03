"use client";
import React from "react";
import Link from "next/link";
import WritingCard from "../Cards/WritingCard";
import FadeInSection from "@/app/Components/FadeInSection";

interface BlogPost {
  title?: string;
  date?: string;
  link?: string;
  categories?: string;
}

export default function WritingSection() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("/weblog/data/blog.json")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.weBlog || []);
        setLoaded(true);
      })
      .catch(console.error);
  }, []);

  return (
    <section
      id="writing"
      className="mb-16 scroll-mt-16 sm:mb-24 md:mb-36 md:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur sm:-mx-12 sm:px-12 md:sr-only md:relative md:top-auto md:mx-auto md:w-full md:px-0 md:py-0 md:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-lightest-slate md:sr-only">
          Writing
        </h2>
      </div>

      <ul className="group/list">
        {loaded &&
          posts.map((post) => (
            <FadeInSection key={post.title}>
              <WritingCard post={post} />
            </FadeInSection>
          ))}
      </ul>

      <div className="mt-12">
        <Link
          href="/weblog"
          className="inline-flex items-center font-medium text-lightest-slate hover:text-green transition-colors group"
        >
          View All Posts
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
