"use client";
import React from "react";
import { Box } from "@radix-ui/themes";
import LoadingCardItem from "./LoadingCardItem";
import CardItem from "@/app/Components/CardItem/CardItem";

// setProjects useState
interface Project {
  title: string;
  description: string;
  link?: string; // Assuming Url is a type you have defined elsewhere
  github?: string;
  imageAdress?: string;
  status: string;
}

export interface IAppProps {}
export default function App(props: IAppProps) {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/Data/githubProjectData.json");
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
    <>
      {loading ? (
        projects.map((project) => (
          <CardItem
            key={project.title}
            title={project.title}
            description={project.description}
            link={project.link}
            imageAdress={project.imageAdress}
            github={project.github}
            size="initial:h-32 xs:h-40"
            status={project.status}
          />
        ))
      ) : (
        <LoadingCardItem />
      )}
    </>
  );
}
