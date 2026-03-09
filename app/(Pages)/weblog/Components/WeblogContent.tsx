"use client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import ArticleCard from "./ArticleCard";
import LoadingCard from "./LoadingCard";
import {
  StaggerContainer,
  StaggerItem,
} from "@/app/Components/Motion/MotionWrappers";

type WeBlogDatas = {
  imageSrc?: string;
  alt?: string;
  date?: string;
  categories?: string;
  title?: string;
  summary?: string;
  link?: string;
  slug?: string;
};

export default function WeblogContent() {
  const [weBlogData, setWeBlogData] = React.useState<WeBlogDatas[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("/weblog/data/blog.json")
      .then((res) => res.json())
      .then((data) => {
        setWeBlogData(data.weBlog);
        setLoaded(true);
      })
      .catch((error) => console.error("Fetching blog posts failed:", error));
  }, []);

  return (
    <Flex direction={"column"} gap={"9"}>
      {loaded ? (
        <StaggerContainer>
          {weBlogData.map((data) => (
            <StaggerItem key={data.title}>
              <article>
                <ArticleCard
                  imageSrc={data.imageSrc}
                  alt={data.alt}
                  categories={data.categories}
                  date={data.date}
                  title={data.title}
                  summary={data.summary}
                  link={data.link}
                  slug={data.slug}
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <LoadingCard />
      )}
    </Flex>
  );
}
