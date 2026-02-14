import type { Metadata } from "next";
import { Text, Heading, Link, Box } from "@radix-ui/themes";
import Avatar from "@/app/Components/WhoAmI/Avatar";
import SoftwareLanguages from "./Components/SoftwareLanguages";
import WhoAmI from "@/app/Components/WhoAmI/WhoAmI";
import Image from "next/image";
import FadeInSection from "@/app/Components/FadeInSection";

export const metadata: Metadata = {
  title: "Who Am I",
  description:
    "Learn about Tarik Tunç — Full Stack Developer. Technologies, skills, experience, and how to get in touch.",
};

export default function WhoAmIPage() {
  return (
    <>
      <FadeInSection>
        <Image
          src="/whoami/whoamitablo.webp"
          alt="Who am I - Tarik Tunç"
          width={1600}
          height={800}
          className="mb-10 w-full rounded"
          priority
        />
      </FadeInSection>
      <FadeInSection>
        <Avatar />
      </FadeInSection>
      <FadeInSection>
        <WhoAmI />
      </FadeInSection>
      <FadeInSection>
        <SoftwareLanguages />
      </FadeInSection>
      <FadeInSection>
        <Box my={"5"}>
          <Heading as="h2" size={{ initial: "4", xs: "5" }} mb={"3"}>
            Let&apos;s Connect!
          </Heading>
          <Text as="p" weight={"light"} mb={"2"}>
            You can also email me at{" "}
            <Link href="mailto:me@tariktunc.com?subject=Web%20Sitemiz%20Hakkında&body=Merhaba,%20web%20sitenizle%20ilgili%20bir%20soruyum%20var.">
              <em>me@tariktunc.com</em>
            </Link>{" "}
            however, don&apos;t expect an immediate reply (or a reply at all).
          </Text>
          <Text as="p" weight={"light"}>
            Thanks for stopping by. May the source be with you, Tarik.
          </Text>
        </Box>
      </FadeInSection>
    </>
  );
}
