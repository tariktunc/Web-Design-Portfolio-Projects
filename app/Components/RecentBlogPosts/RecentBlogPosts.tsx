"use client";
import * as React from "react";
import { Table, Link } from "@radix-ui/themes";

export interface IAppProps {}

export default function App(props: IAppProps) {
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
    <Table.Root>
      <Table.Body>
        {loading &&
          weBlogData.map((weBlogData) => (
            <>
              <Table.Row>
                <Table.RowHeaderCell>
                  <Link target="_blank" href={weBlogData.link}>
                    {weBlogData.date}
                  </Link>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Link target="_blank" href={weBlogData.link}>
                    {weBlogData.title}
                  </Link>
                </Table.Cell>
              </Table.Row>
            </>
          ))}
      </Table.Body>
    </Table.Root>
  );
}
