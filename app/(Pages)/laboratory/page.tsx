import { Container, Box } from "@radix-ui/themes";
import ImageSection from "./Components/ImageSection";
import TextSection from "./Components/TextSection";
import ProjectContainer from "./Components/GithubProjectData";

export default function Home() {
  return (
    <Container size={"3"}>
      <ImageSection />
      <TextSection />
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
        <ProjectContainer />
      </Box>
    </Container>
  );
}
