import React from "react";
import { Text, Heading, Flex, Box, Container } from "@radix-ui/themes";
import Image from "next/image";
export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <>
      <Box my={"5"}>
        <Heading as="h5" mt={"5"}>
          Programming languages I speak
        </Heading>
        <Text as="p">
          I have honed my skills across a wide array of technologies, constantly
          expanding my toolkit to stay at the forefront of the industry. My
          expertise includes:
        </Text>
      </Box>
      <Box my={"5"}>
        <Flex align={"center"} gap={"2"} height={"6"}>
          <Text as="p" weight="bold">
            Front-End Development:
          </Text>
          <Image
            src="https://skillicons.dev/icons?i=html"
            alt="HTML"
            width={25}
            height={25}
          />{" "}
          <Image
            src="https://skillicons.dev/icons?i=css"
            alt="HTML"
            width={25}
            height={25}
          />
          <Image
            src="https://skillicons.dev/icons?i=javascript"
            alt="HTML"
            width={25}
            height={25}
          />
          <Image
            src="https://skillicons.dev/icons?i=react"
            alt="HTML"
            width={25}
            height={25}
          />
          <Image
            src="https://skillicons.dev/icons?i=next"
            alt="HTML"
            width={25}
            height={25}
          />
          <Image
            src="https://skillicons.dev/icons?i=redux"
            alt="HTML"
            width={25}
            height={25}
          />
        </Flex>
        <Flex align={"center"} gap={"2"} height={"6"}>
          <Text as="p" weight="bold">
            Styling:
          </Text>
          <Image
            src="https://skillicons.dev/icons?i=tailwindcss"
            alt="HTML"
            width={25}
            height={25}
          />
          <Image
            src="https://skillicons.dev/icons?i=sass"
            alt="HTML"
            width={25}
            height={25}
          />
          <Image
            src="https://skillicons.dev/icons?i=scss"
            alt="HTML"
            width={25}
            height={25}
          />
        </Flex>
        <Flex align={"center"} gap={"2"} height={"6"}>
          <Text as="p" weight="bold">
            Back-End Development:
          </Text>
          <Image
            src="https://skillicons.dev/icons?i=express"
            alt="HTML"
            width={25}
            height={25}
          />
          <Image
            src="https://skillicons.dev/icons?i=c"
            alt="HTML"
            width={25}
            height={25}
          />
        </Flex>
        <Flex align={"center"} gap={"2"} height={"6"}>
          <Text as="p" weight="bold">
            Database Management:
          </Text>
          <Image
            src="https://skillicons.dev/icons?i=mongodb"
            alt="HTML"
            width={25}
            height={25}
          />
        </Flex>
      </Box>
    </>
  );
}
