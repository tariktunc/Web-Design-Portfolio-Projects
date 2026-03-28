import type { Metadata } from "next";
import WeblogContent from "./Components/WeblogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tarik Tunç'un React, Next.js, TypeScript, AI ve modern web geliştirme hakkında teknik blog yazıları.",
  alternates: {
    canonical: "https://tariktunc.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <WeblogContent />
    </div>
  );
}
