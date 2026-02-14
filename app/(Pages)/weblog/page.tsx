import type { Metadata } from "next";
import { Heading } from "@radix-ui/themes";
import Image from "next/image";
import WeblogContent from "./Components/WeblogContent";
import FadeInSection from "@/app/Components/FadeInSection";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical blog posts about React, Next.js, TypeScript, and modern web development by Tarik Tunç.",
};

export default function WeblogPage() {
  return (
    <>
      <FadeInSection>
        <Image
          src="/weblog/weblogbanner.webp"
          alt="Weblog - Technical articles by Tarik Tunç"
          width={1600}
          height={600}
          className="mb-8 w-full rounded"
          priority
        />
      </FadeInSection>
      <FadeInSection>
        <Heading as="h1" size={{ initial: "6", xs: "8" }} mb={"6"}>
          Blog
        </Heading>
      </FadeInSection>
      <FadeInSection>
        <WeblogContent />
      </FadeInSection>
    </>
  );
}
