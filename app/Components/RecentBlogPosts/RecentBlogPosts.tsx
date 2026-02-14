"use client";
import * as React from "react";
import { Table, Link, Heading, Box } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

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
    <Box>
      <Heading as="h2" size={{ initial: "4", xs: "5" }} mb={"4"}>
        Recent Blog Posts
      </Heading>
      <Table.Root variant="surface">
        <Table.Body>
          {loading &&
            weBlogData.map((item) => (
              <Table.Row key={item.title} className="row-hover">
                <Table.RowHeaderCell width={"120px"}>
                  <Link target="_blank" href={item.link} color="gray">
                    {item.date}
                  </Link>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Link target="_blank" href={item.link}>
                    {item.title} <ExternalLinkIcon className="inline-block ml-1" />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
