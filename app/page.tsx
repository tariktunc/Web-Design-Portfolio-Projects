// Radix
import { Container, Heading, Flex, Text, Section } from "@radix-ui/themes";
import Avatar from "@/app/Components/WhoAmI/Avatar";
// next
// Components
import Navbar from "@/app/Components/Navbar/Navbar";
import BlakfyProject from "@/app/(Pages)/laboratory/Components/BlakfyProject";
import ProjectsContainer from "@/app/(Pages)/laboratory/Components/ProjectsContainer";
import SocialMedia from "@/app/Components/SocialMedia/SocialMedia";
// ------------------------------
export default function Home() {
  return (
    <>
      <Navbar />
      <Container size={"4"} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <Section size={"2"} p={"3"}>
          <Avatar />
          <Flex
            direction={"column"}
            align={"center"}
            justify={"center"}
            gap={"1"}
            mt={"3"}
            className="border-b-2 border-gray-300 pb-5 w-full"
          >
            <Text as="p" size={"8"}>
              Tarık Tunç
            </Text>
            <Text as="p" size={"5"}>
              Full Stack Developer
            </Text>
            <Text as="p" size={"1"}>
              I still fix myself every day 🥷🏽
            </Text>
          </Flex>
        </Section>
        <Section size={"2"} p={"3"}>
          <Heading as="h1" size={{ initial: "5", xs: "8" }} m={"5"}>
            Github Projects
          </Heading>
          <Text as="p" size={{ initial: "2", xs: "4" }} m={"5"}>
            Kişisel olarak geliştirdiğim ve/veya geliştirmekte olduğum
            projelerim.
          </Text>
          <ProjectsContainer />
        </Section>
        <Section size={"2"} p={"3"}>
          <Heading as="h1" size={{ initial: "5", xs: "8" }} m={"5"}>
            Blakfy.com Projects
          </Heading>
          <Text as="p" size={{ initial: "2", xs: "4" }} m={"5"}>
            Blakfy.com üzerin de geliştirdiğimiz, kobi&apos;lerin dijitale
            dönüşümünü sağladığımız projeler.
          </Text>
          <BlakfyProject />
        </Section>
        <SocialMedia />
      </Container>
    </>
  );
}
