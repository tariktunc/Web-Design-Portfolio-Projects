import { Text, Heading, Flex, Box, Section } from "@radix-ui/themes";
import Image from "next/image";

const skills = [
  "html", "css", "javascript", "sass", "react", "nextjs",
  "redux", "tailwindcss", "express", "mongodb", "c",
];

export default function SoftwareLanguages() {
  return (
    <Section size={"1"}>
      <Box my={"5"}>
        <Heading as="h2" size={{ initial: "4", xs: "5" }} mt={"5"} mb={"5"}>
          Programming languages I speak
        </Heading>
        <Text as="p" color="gray">
          I have honed my skills across a wide array of technologies, constantly
          expanding my toolkit to stay at the forefront of the industry. My
          expertise includes:
        </Text>
      </Box>
      <Flex gap={"5"} justify={"center"} align={"center"} wrap={"wrap"}>
        {skills.map((skill) => (
          <Image
            key={skill}
            src={`https://skillicons.dev/icons?i=${skill}`}
            alt={`${skill} icon`}
            width={30}
            height={30}
            className="initial:w-7 xs:w-10 h-full"
          />
        ))}
      </Flex>
    </Section>
  );
}
