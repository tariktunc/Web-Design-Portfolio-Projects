"use client";
import React from "react";
import { Box } from "@radix-ui/themes";
import LoadingCardItem from "./LoadingCardItem";
import CardItem from "./CardItem";

// setProjects useState
interface Project {
  title: string;
  description: string;
  link?: string; // Assuming Url is a type you have defined elsewhere
  github?: string;
  imageAdress?: string;
}

export interface IAppProps {}
export default function App(props: IAppProps) {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/Data/laboratory.json");
        const data = await response.json();
        setProjects(data.laboratory);
        setLoading(true);
      } catch (error) {
        console.error("Fetching projects failed:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 lg:gap-6">
      {loading ? (
        projects.map((project) => (
          <CardItem
            key={project.title}
            title={project.title}
            description={project.description}
            link={project.link}
            imageAdress={project.imageAdress}
            github={project.github}
          />
        ))
      ) : (
        <LoadingCardItem />
      )}
    </Box>
  );
}
