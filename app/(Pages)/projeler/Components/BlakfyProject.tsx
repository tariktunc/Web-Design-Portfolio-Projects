"use client";
import React from "react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/app/Components/Motion/MotionWrappers";
import LabProjectCard from "./LabProjectCard";

interface Project {
  title: string;
  slug: string;
  description: string;
  link?: string;
  github?: string;
  imageAdress?: string;
  status: string;
  techStack?: string[];
}

export default function BlakfyProject() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("/Data/blakfyProjectData.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.laboratory);
        setLoaded(true);
      })
      .catch((error) => console.error("Fetching projects failed:", error));
  }, []);

  if (!loaded) {
    return (
      <div className="py-8 text-center text-slate-custom text-sm">
        Loading projects...
      </div>
    );
  }

  return (
    <StaggerContainer>
      {projects.map((project) => (
        <StaggerItem key={project.title}>
          <LabProjectCard
            title={project.title}
            slug={project.slug}
            description={project.description}
            link={project.link}
            imageAdress={project.imageAdress}
            github={project.github}
            status={project.status}
            techStack={project.techStack}
          />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
