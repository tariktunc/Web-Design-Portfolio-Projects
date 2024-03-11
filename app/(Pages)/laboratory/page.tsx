import { Container } from "@radix-ui/themes";
import ImageSection from "./Components/ImageSection";
import TextSection from "./Components/TextSection";
import ProjectContainer from "./Components/ProjectsContainer";
export default function Home() {
  return (
    <Container size={"2"}>
      <ImageSection />
      <TextSection />
      <ProjectContainer />
    </Container>
  );
}
