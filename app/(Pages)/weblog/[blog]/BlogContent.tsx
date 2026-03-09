"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Box,
  Text,
  Heading,
  Avatar,
  Flex,
  Section,
} from "@radix-ui/themes";
import {
  MotionSection,
  HeroReveal,
  SlideIn,
  HoverScale,
} from "@/app/Components/Motion/MotionWrappers";
import type { BlogPost } from "@/app/lib/projects";

export default function BlogContent({ post }: { post: BlogPost }) {
  return (
    <Box>
      {/* ── Banner Image ── */}
      <HeroReveal className="overflow-hidden rounded-xl mb-8">
        <Image
          src={post.imageSrc}
          alt={post.alt}
          width={1400}
          height={600}
          className="w-full aspect-[21/9] object-cover"
          priority
        />
      </HeroReveal>

      {/* ── Meta row: category + date ── */}
      <SlideIn direction="left" delay={0.3}>
        <Flex gap="3" align="center" mb="4">
          <motion.span
            className="shimmer-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-green border border-green/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
          >
            {post.categories}
          </motion.span>
          <Text size="2" style={{ color: "var(--slate)" }}>
            {post.date}
          </Text>
        </Flex>
      </SlideIn>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Heading
          as="h1"
          size={{ initial: "6", xs: "8" }}
          mb="6"
          style={{ color: "var(--lightest-slate)" }}
        >
          {post.title}
        </Heading>
      </motion.div>

      {/* ── Author ── */}
      <SlideIn direction="left" delay={0.5}>
        <Flex align="center" gap="3" mb="8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.6 }}
          >
            <Avatar
              size="3"
              src="/profilePhoto.jpg"
              radius="full"
              fallback="T"
              alt="Tarik Tunç"
            />
          </motion.div>
          <Flex direction="column">
            <Text
              weight="medium"
              style={{ color: "var(--lightest-slate)" }}
            >
              Tarik Tunç
            </Text>
            <Text size="2" style={{ color: "var(--slate)" }}>
              Full Stack Developer
            </Text>
          </Flex>
        </Flex>
      </SlideIn>

      {/* ── Full Summary ── */}
      <MotionSection delay={0.3}>
        <Section size="1">
          <Text
            as="p"
            size="4"
            style={{ color: "var(--slate-light)", lineHeight: 1.8 }}
          >
            {post.fullSummary}
          </Text>
        </Section>
      </MotionSection>

      {/* ── Read on Medium CTA ── */}
      <MotionSection delay={0.4}>
        <Flex justify="center" my="8">
          <HoverScale>
            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-green px-6 py-3 text-sm font-semibold text-green hover:bg-green/10 hover:shadow-[0_0_20px_rgba(100,255,218,0.15)] transition-all duration-300"
              aria-label="Read full article on Medium (opens in new tab)"
            >
              Read full article on Medium <span aria-hidden="true">&#8599;</span>
            </Link>
          </HoverScale>
        </Flex>
      </MotionSection>

      {/* ── Back link ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          href="/weblog"
          className="inline-flex items-center gap-2 text-sm text-green hover:text-green/80 transition-colors duration-300"
        >
          &larr; Back to Weblog
        </Link>
      </motion.div>
    </Box>
  );
}
