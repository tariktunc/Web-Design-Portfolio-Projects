"use client";
import {
  Box,
  Text,
  Heading,
  Avatar,
  Flex,
  Section,
} from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";

export default function BlogContent({ blog }: { blog: string }) {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/weblog");
  }, [router]);

  return (
    <Box>
      <Section size={"1"}>
        <Heading as={"h1"} size={"8"} mb={"7"}>
          {blog} page not found.
        </Heading>
        <Flex justify={"start"} align={"center"} gap={"2"}>
          <Avatar
            size="5"
            src="/profilePhoto.jpg"
            radius="full"
            fallback="T"
          />
          <Flex direction={"column"}>
            <Text as={"p"}>Tarik Tunç</Text>
          </Flex>
        </Flex>
      </Section>
      <Section></Section>
    </Box>
  );
}
