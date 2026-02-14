// Radix
import {
  Container,
  Heading,
  Flex,
  Grid,
  Text,
  Section,
} from "@radix-ui/themes";
import Avatar from "@/app/Components/WhoAmI/Avatar";
// Components
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer/Footer";
import BlakfyProject from "@/app/(Pages)/laboratory/Components/BlakfyProject";
import ProjectsContainer from "@/app/(Pages)/laboratory/Components/GithubProjectData";
import SocialMedia from "@/app/Components/SocialMedia/SocialMedia";
import RecentBlogPosts from "@/app/Components/RecentBlogPosts/RecentBlogPosts";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container size={"3"} px={{ initial: "4", xs: "5" }}>
        <Section size={"1"}>
          <Avatar />
          <Flex
            direction={"column"}
            align={"center"}
            justify={"center"}
            gap={"1"}
            mt={"3"}
            pb={"5"}
            className="border-b w-full"
          >
            <Text as="p" size={{ initial: "6", xs: "8" }} weight={"bold"}>
              Tarık Tunç
            </Text>
            <Text as="p" size={{ initial: "3", xs: "5" }} color="gray">
              Full Stack Developer
            </Text>
            <Text as="p" size={"2"} color="gray">
              I still fix myself every day
            </Text>
          </Flex>
        </Section>
        <Section size={"1"}>
          <RecentBlogPosts />
        </Section>
        <Section size={"1"}>
          <Heading as="h2" size={{ initial: "5", xs: "7" }} mb={"3"}>
            Github Projects
          </Heading>
          <Text as="p" size={{ initial: "2", xs: "3" }} color="gray" mb={"5"}>
            Kişisel olarak geliştirdiğim ve/veya geliştirmekte olduğum
            projelerim.
          </Text>
          <Grid columns={{ initial: "1", sm: "3" }} gap={"5"}>
            <ProjectsContainer />
          </Grid>
        </Section>
        <Section size={"1"}>
          <Heading as="h2" size={{ initial: "5", xs: "7" }} mb={"3"}>
            Blakfy.com Projects
          </Heading>
          <Text as="p" size={{ initial: "2", xs: "3" }} color="gray" mb={"5"}>
            Blakfy.com üzerinde geliştirdiğimiz, kobi&apos;lerin dijitale
            dönüşümünü sağladığımız projeler.
          </Text>
          <Grid columns={{ initial: "1", sm: "3" }} gap={"5"}>
            <BlakfyProject />
          </Grid>
        </Section>
        <SocialMedia />
      </Container>
      <Footer />
    </>
  );
}
