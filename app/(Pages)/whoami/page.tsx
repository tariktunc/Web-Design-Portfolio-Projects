import Link from "next/link";
import Image from "next/image";
import { Text, Heading, Flex, Box, Container } from "@radix-ui/themes";
import Avatar from "@/app/Components/WhoAmI/Avatar";
import SocialMedia from "@/app/Components/SocialMedia/SocialMedia";
import SoftwareLanguages from "./Components/SoftwareLanguages";
import WhoAmI from "@/app/Components/WhoAmI/WhoAmI";
export default function Home() {
  return (
    <Container size={"3"}>
      {/* WHO AM I ?  */}
      <Avatar />
      <WhoAmI />
      {/* Technologies */}
      <SoftwareLanguages />
      {/* Lest Connect */}
      <Box my={"5"}>
        <Heading as="h6">Let&apos;s Connect!</Heading>
        <Text as="p" weight={"light"}>
          You can also email me at{" "}
          <Link href="mailto:me@tariktunc.com?subject=Web%20Sitemiz%20Hakkında&body=Merhaba,%20web%20sitenizle%20ilgili%20bir%20soruyum%20var.">
            <b>me@tariktunc.com</b>
          </Link>{" "}
          however, don&apos;t expect an immediate reply (or a reply at all).
        </Text>
        <Text as="p" weight={"light"}>
          Thanks for stopping by. May the source be with you 🦄, Tarik.
        </Text>
      </Box>
      <SocialMedia />
    </Container>
  );
}
