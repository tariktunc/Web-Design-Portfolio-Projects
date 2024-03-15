import React from "react";
import { Text, Heading, Flex, Box, Section, Grid } from "@radix-ui/themes";
import Image from "next/image";
export interface IAppProps {}

export default function App(props: IAppProps) {
  const mySkills = [
    "html",
    "css",
    "javascript",
    "sass",
    "react",
    "nextjs",
    "redux",
    "tailwindcss",
    "express",
    "mongodb",
    "c",
  ];
  return (
    <Section size={"1"}>
      <Box my={"5"}>
        <Heading as="h5" mt={"5"} mb={"5"}>
          Programming languages I speak
        </Heading>
        <Text as="p">
          I have honed my skills across a wide array of technologies, constantly
          expanding my toolkit to stay at the forefront of the industry. My
          expertise includes:
        </Text>
      </Box>
      <Flex gap={"5"} justify={"center"} align={"center"} wrap={"wrap"}>
        {mySkills.map((skill) => {
          return (
            <Image
              key={skill}
              src={`https://skillicons.dev/icons?i=${skill}`}
              alt={skill}
              width={30}
              height={30}
              className="initial:w-7 xs:w-10 h-full"
            />
          );
        })}
      </Flex>
    </Section>
  );
}
