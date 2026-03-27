import type { Metadata } from "next";
import { Heading } from "@radix-ui/themes";
import WeblogContent from "./Components/WeblogContent";
import {
  ClipReveal,
  ParallaxImage,
  TextReveal,
  MotionSection,
} from "@/app/Components/Motion/MotionWrappers";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Blog — React & Web Development",
  description:
    "Tarik Tunç'un React, Next.js, TypeScript ve modern web geliştirme hakkında teknik blog yazıları. useEffect, useState ve React hooks kullanımı üzerine Türkçe makaleler.",
  openGraph: {
    title: "Blog — React & Web Development | Tarik Tunç",
    description:
      "React, Next.js ve modern web geliştirme hakkında teknik yazılar.",
    images: [{ url: "/weblog/weblogbanner.webp", width: 1600, height: 600 }],
  },
  alternates: {
    canonical: "https://tariktunc.vercel.app/weblog",
  },
};

export default function WeblogPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Blog" }]} />
      <ClipReveal direction="bottom">
        <ParallaxImage
          src="/weblog/weblogbanner.webp"
          alt="Weblog - Technical articles by Tarik Tunç"
          width={1600}
          height={600}
          speed={0.15}
          className="mb-8 rounded"
          priority
        />
      </ClipReveal>

      <Heading as="h1" size={{ initial: "6", xs: "8" }} mb={"6"}>
        <TextReveal text="Blog" splitBy="char" staggerDelay={0.06} />
      </Heading>

      <MotionSection delay={0.2}>
        <WeblogContent />
      </MotionSection>
    </>
  );
}
