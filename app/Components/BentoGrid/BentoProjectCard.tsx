import Image from "next/image";
import Link from "next/link";
import { Heading, Text, Flex } from "@radix-ui/themes";
import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";

interface Props {
	project: {
		title: string;
		description: string;
		link?: string;
		github?: string;
		imageAdress?: string;
		status: string;
	};
}

export default function BentoProjectCard({ project }: Props) {
	return (
		<div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<div className="aspect-video overflow-hidden bento-project-image-wrap">
				<Link href={project.link || "/"}>
					<Image
						src={project.imageAdress || "/blakfy-orginal-icon.jpg"}
						alt={project.title}
						width={600}
						height={400}
						className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
					/>
				</Link>
			</div>
			<div className="bento-project-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
				<Heading as="h4" size={{ initial: "2", xs: "3" }}>
					{project.title}
				</Heading>
				<Text as="p" size={{ initial: "1", xs: "2" }} color="gray" mt="1" className="line-clamp-2" style={{ flex: 1 }}>
					{project.description}
				</Text>
				<Flex justify="end" align="center" gap={{ initial: "2", xs: "3" }} mt="2">
					<Text as="span" size="1" color={project.status === "active" ? "green" : "red"}>
						{project.status}
					</Text>
					{project.github && (
						<Link href={project.github} target="_blank">
							<GitHubLogoIcon className="w-4 h-4 icon-hover" />
						</Link>
					)}
					{project.link && (
						<Link href={project.link} target="_blank">
							<Link2Icon className="w-4 h-4 icon-hover" />
						</Link>
					)}
				</Flex>
			</div>
		</div>
	);
}
