// Radix
import {
  Container,
  Heading,
  Flex,
  Grid,
  Text,
  Section,
  Box,
} from "@radix-ui/themes";
import Avatar from "@/app/Components/WhoAmI/Avatar";
// next
// Components
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer/Footer";
import BlakfyProject from "@/app/(Pages)/laboratory/Components/BlakfyProject";
import ProjectsContainer from "@/app/(Pages)/laboratory/Components/GithubProjectData";
import SocialMedia from "@/app/Components/SocialMedia/SocialMedia";
import RecentBlogPosts from "@/app/Components/RecentBlogPosts/RecentBlogPosts";
// ------------------------------
export default function Home() {
  return (
    <>
      <Navbar />
      <Container size={"3"} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <Section size={"1"}>
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
        <Section size={"1"}>
          <RecentBlogPosts />
        </Section>
        <Section size={"1"}>
          <Heading as="h1" size={{ initial: "5", xs: "8" }} m={"5"}>
            Github Projects
          </Heading>
          <Text as="p" size={{ initial: "2", xs: "4" }} m={"5"}>
            Kişisel olarak geliştirdiğim ve/veya geliştirmekte olduğum
            projelerim.
          </Text>
          <Grid columns={{ initial: "1", sm: "3" }} gap={"5"}>
            <ProjectsContainer />
          </Grid>
        </Section>
        <Section size={"1"}>
          <Heading as="h1" size={{ initial: "5", xs: "8" }} m={"5"}>
            Blakfy.com Projects
          </Heading>
          <Text as="p" size={{ initial: "2", xs: "4" }} m={"5"}>
            Blakfy.com üzerin de geliştirdiğimiz, kobi&apos;lerin dijitale
            dönüşümünü sağladığımız projeler.
          </Text>
          <Grid columns={{ initial: "1", sm: "4" }} gap={"5"}>
            <BlakfyProject />
          </Grid>
        </Section>
        <SocialMedia />
      </Container>
      <Footer />
    </>
  );
}
