"use client";
import * as React from "react";
import { Table, Link, Heading, Box } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

type BlogPost = {
  imageSrc?: string;
  alt?: string;
  date?: string;
  categories?: string;
  title?: string;
  summary?: string;
  link?: string;
};

export default function RecentBlogPosts() {
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("/weblog/data/blog.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data.weBlog);
        setLoaded(true);
      })
      .catch((error) => console.error("Fetching blog posts failed:", error));
  }, []);

  return (
    <Box>
      <Heading as="h2" size={{ initial: "4", xs: "5" }} mb={"4"}>
        Recent Blog Posts
      </Heading>
      <Table.Root variant="surface" aria-label="Recent blog posts">
        <Table.Body>
          {loaded &&
            blogPosts.map((item) => (
              <Table.Row key={item.title} className="row-hover">
                <Table.RowHeaderCell width={"120px"}>
                  <Link target="_blank" rel="noopener noreferrer" href={item.link} color="gray">
                    {item.date}
                  </Link>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Link target="_blank" rel="noopener noreferrer" href={item.link}>
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
