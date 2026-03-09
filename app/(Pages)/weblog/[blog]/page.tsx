import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/app/lib/projects";
import BlogContent from "./BlogContent";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ blog: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blog: string }>;
}): Promise<Metadata> {
  const { blog } = await params;
  const post = getBlogPostBySlug(blog);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title}`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.imageSrc }],
      type: "article",
      locale: "tr_TR",
      authors: ["Tarik Tunç"],
    },
    alternates: {
      canonical: `https://tariktunc.vercel.app/weblog/${blog}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ blog: string }>;
}) {
  const { blog } = await params;
  const post = getBlogPostBySlug(blog);
  if (!post) notFound();
  return <BlogContent post={post} />;
}
