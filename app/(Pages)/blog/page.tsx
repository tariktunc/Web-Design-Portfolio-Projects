import type { Metadata } from "next";
import WeblogContent from "./Components/WeblogContent";

export const metadata: Metadata = {
  title: "Blog — Yazılar & Makaleler",
  description:
    "Tarik Tunç'un React, Next.js, TypeScript, AI ve modern web geliştirme hakkında teknik blog yazıları.",
  openGraph: {
    title: "Blog — Yazılar & Makaleler | Tarık Tunç",
    description:
      "React, Next.js, TypeScript ve modern web geliştirme üzerine teknik yazılar.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://tariktunc.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="py-12">
      <WeblogContent />
    </div>
  );
}
