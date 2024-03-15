"use client";
import { Flex, Container } from "@radix-ui/themes";
import React from "react";
import ArticleCard from "./Components/ArticleCard";
import LoadingCard from "./Components/LoadingCard";
import Image from "next/image";
// ----------------------------------------------

export default function Home() {
  type WeBlogDatas = {
    imageSrc?: string;
    alt?: string;
    date?: string;
    categories?: string;
    title?: string;
    summary?: string;
    link?: string;
  };

  const [weBlogData, setWeBlogData] = React.useState<WeBlogDatas[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/weblog/data/blog.json");
        const data = await response.json();
        setWeBlogData(data.weBlog);
        setLoading(true);
      } catch (error) {
        console.error("Fetching projects failed:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container size={"3"}>
      <Flex direction={"column"} gap={"9"}>
        <Image
          src="/weblog/weblogbanner.webp"
          alt="Weblog"
          width={"1000"}
          height={"1000"}
        />
        {loading ? (
          weBlogData.map((data) => (
            <ArticleCard
              key={data.title}
              imageSrc={data.imageSrc}
              alt={data.alt}
              categories={data.categories}
              date={data.date}
              title={data.title}
              summary={data.summary}
              link={data.link}
            />
          ))
        ) : (
          <LoadingCard />
        )}
      </Flex>
    </Container>
  );
}
