import { Heading, Text, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

interface Props {
	posts: Array<{
		title?: string;
		date?: string;
		link?: string;
		categories?: string;
	}>;
	loaded: boolean;
}

export default function BentoBlogCard({ posts, loaded }: Props) {
	return (
		<div className="bento-card-inner">
			<Heading as="h3" size={{ initial: "3", xs: "4" }} mb={{ initial: "2", xs: "3" }} className="section-header">
				Recent Posts
			</Heading>
			<Flex direction="column" style={{ flex: 1, justifyContent: "center" }}>
				{loaded &&
					posts.map((post, i) => (
						<Link
							key={i}
							href={post.link || "#"}
							target="_blank"
							className="bento-blog-entry"
						>
							<Text as="p" size="1" color="gray">
								{post.date}
							</Text>
							<Flex align="center" gap="1" mt="1">
								<Text
									as="p"
									size="2"
									weight="medium"
									style={{ color: "var(--gray-12)" }}
								>
									{post.title}
								</Text>
								<ExternalLinkIcon
									className="w-3 h-3"
									style={{ color: "var(--gray-9)", flexShrink: 0 }}
								/>
							</Flex>
							{post.categories && (
								<Text
									as="span"
									size="1"
									color="orange"
									mt="1"
									style={{ display: "inline-block" }}
								>
									{post.categories}
								</Text>
							)}
						</Link>
					))}
				{!loaded && (
					<Text size="2" color="gray">
						Loading...
					</Text>
				)}
			</Flex>
		</div>
	);
}
