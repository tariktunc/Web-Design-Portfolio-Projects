import type { Metadata } from "next";
import JsonLd from "@/app/Components/JsonLd";

export const metadata: Metadata = {
  title: "Tarık Tunç — Full Stack Geliştirici",
  description:
    "Tarik Tunç — Next.js, React ve TypeScript ile modern web uygulamaları geliştiren Full Stack Developer. 9+ müşteri projesi, açık kaynak çalışmaları ve teknik blog yazıları.",
  alternates: {
    canonical: "https://tariktunc.com",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd />
    </>
  );
}
