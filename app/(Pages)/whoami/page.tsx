import { Text, Heading, Link, Box } from "@radix-ui/themes";
import Avatar from "@/app/Components/WhoAmI/Avatar";
import SoftwareLanguages from "./Components/SoftwareLanguages";
import WhoAmI from "@/app/Components/WhoAmI/WhoAmI";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Image
        src="/whoami/whoamitablo.webp"
        alt="Who am I"
        width={"1000"}
        height={"1000"}
        className="mb-10"
      />
      {/* WHO AM I ?  */}
      <Avatar />
      <WhoAmI />

      {/* Technologies */}
      <SoftwareLanguages />
      {/* Lest Connect */}

      <Box my={"5"}>
        <Heading as="h6" mb={"3"}>
          Let&apos;s Connect!
        </Heading>
        <Text as="p" weight={"light"} mb={"2"}>
          You can also email me at{" "}
          <Link href="mailto:me@tariktunc.com?subject=Web%20Sitemiz%20Hakkında&body=Merhaba,%20web%20sitenizle%20ilgili%20bir%20soruyum%20var.">
            <i>me@tariktunc.com</i>
          </Link>{" "}
          however, don&apos;t expect an immediate reply (or a reply at all).
        </Text>

        <Text as="p" weight={"light"}>
          Thanks for stopping by. May the source be with you 🦄, Tarik.
        </Text>
      </Box>
    </>
  );
}
