import type { Metadata } from "next";
import { Box } from "@radix-ui/themes";
import ImageSection from "./Components/ImageSection";
import TextSection from "./Components/TextSection";
import ProjectContainer from "./Components/GithubProjectData";
import FadeInSection from "@/app/Components/FadeInSection";

export const metadata: Metadata = {
  title: "Laboratory",
  description:
    "Explore personal projects and experiments by Tarik Tunç. GitHub repositories, learning projects, and open-source contributions.",
};

export default function LaboratoryPage() {
  return (
    <>
      <FadeInSection>
        <ImageSection />
      </FadeInSection>
      <FadeInSection>
        <TextSection />
      </FadeInSection>
      <FadeInSection>
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          <ProjectContainer />
        </Box>
      </FadeInSection>
    </>
  );
}
