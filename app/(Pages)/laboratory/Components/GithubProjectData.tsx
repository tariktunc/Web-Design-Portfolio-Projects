"use client";
import React from "react";
import LoadingCardItem from "./LoadingCardItem";
import CardItem from "@/app/Components/CardItem/CardItem";

interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
  imageAdress?: string;
  status: string;
}

export default function GithubProjectData() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("/Data/githubProjectData.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.laboratory);
        setLoaded(true);
      })
      .catch((error) => console.error("Fetching projects failed:", error));
  }, []);

  return (
    <>
      {loaded ? (
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
