import type { Metadata } from "next";
import { Container } from "@radix-ui/themes";
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer/Footer";
import JsonLd from "@/app/Components/JsonLd";
import BentoGrid from "@/app/Components/BentoGrid/BentoGrid";

export const metadata: Metadata = {
  title: "Tarik Tunç — Full Stack Developer",
  description:
    "Portfolio of Tarik Tunç, a Full Stack Developer building modern web applications with Next.js, React, and TypeScript.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <JsonLd />
        <Container
          size="4"
          px={{ initial: "4", xs: "5", sm: "6" }}
          style={{ maxWidth: 1600 }}
        >
          <BentoGrid />
        </Container>
      </main>
      <Footer />
    </>
  );
}
