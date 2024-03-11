// Radix
import { Container, Heading, Text, Section } from "@radix-ui/themes";
import Avatar from "@/app/Components/WhoAmI/Avatar";
// next
// Components
import Navbar from "@/app/Components/Navbar/Navbar";
import BlakfyProject from "@/app/(Pages)/laboratory/Components/BlakfyProject";
import ProjectsContainer from "@/app/(Pages)/laboratory/Components/ProjectsContainer";
// ------------------------------
export default function Home() {
  return (
    <>
      <Navbar />
      <Container size={"4"} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <Section size={"2"} p={"3"}>
          <Avatar />
        </Section>
        <Section size={"2"} p={"3"}>
          <Heading as="h1" size={{ initial: "6", xs: "9" }} m={"5"}>
            Github Projects
          </Heading>
          <Text as="p" size={{ initial: "3", xs: "5" }} m={"5"}>
            Kişisel olarak geliştirdiğim ve/veya geliştirmekte olduğum
            projelerim.
          </Text>
          <ProjectsContainer />
        </Section>
        <Section size={"2"} p={"3"}>
          <Heading as="h1" size={{ initial: "6", xs: "9" }} m={"5"}>
            Blakfy.com Projects
          </Heading>
          <Text as="p" size={{ initial: "3", xs: "5" }} m={"5"}>
            Blakfy.com üzerin de geliştirdiğimiz, kobi&apos;lerin dijitale
            dönüşümünü sağladığımız projeler.
          </Text>
          <BlakfyProject />
        </Section>
      </Container>
    </>
  );
}
