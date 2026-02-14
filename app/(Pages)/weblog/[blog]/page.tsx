import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blog: string }>;
}): Promise<Metadata> {
  const { blog } = await params;
  return {
    title: `${decodeURIComponent(blog)} — Blog`,
    description: `Blog post: ${decodeURIComponent(blog)} by Tarik Tunç.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ blog: string }>;
}) {
  const { blog } = await params;
  return <BlogContent blog={blog} />;
}
