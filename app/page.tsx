// Radix
import { Container, Heading, Text } from "@radix-ui/themes";
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
      <Container size={"3"} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <Heading as="h1" size={"9"} m={"5"}>
          Github Projects
        </Heading>
        <Text as="p" size={"3"} m={"5"}>
          Kişisel olarak geliştirdiğim ve/veya geliştirmekte olduğum projelerim.
          ettiğim projeler{" "}
        </Text>
        <ProjectsContainer />
        <Heading as="h1" size={"9"} m={"5"}>
          Blakfy.com Projects
        </Heading>
        <Text as="p" size={"3"} m={"5"}>
          Blakfy.com üzerin de geliştirdiğimiz, kobi'lerin dijitale dönüşümünü
          sağladığımız projeler.
        </Text>
        <BlakfyProject />
      </Container>
    </>
  );
}
