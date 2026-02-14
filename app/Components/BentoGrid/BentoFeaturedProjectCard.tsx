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

export default function BentoFeaturedProjectCard({ project }: Props) {
	return (
		<>
			<Image
				src={project.imageAdress || "/blakfy-orginal-icon.jpg"}
				alt={project.title}
				fill
				className="bento-featured-image"
				sizes="(max-width: 520px) 100vw, (max-width: 1024px) 100vw, 66vw"
			/>
			<div className="bento-featured-overlay">
				<Heading as="h3" size={{ initial: "4", xs: "5" }} style={{ color: "#fff" }}>
					{project.title}
				</Heading>
				<Text
					as="p"
					size={{ initial: "1", xs: "2" }}
					mt="1"
					style={{ color: "rgba(255,255,255,0.8)", maxWidth: "clamp(240px, 80%, 400px)" }}
				>
					{project.description}
				</Text>
				<Flex gap={{ initial: "2", xs: "3" }} mt={{ initial: "2", xs: "3" }} align="center">
					<Text as="span" size={{ initial: "1", xs: "2" }} style={{ color: project.status === "active" ? "#4ade80" : "#f87171" }}>
						{project.status}
					</Text>
					{project.github && (
						<Link href={project.github} target="_blank">
							<GitHubLogoIcon className="w-5 h-5" style={{ color: "#fff" }} />
						</Link>
					)}
					{project.link && (
						<Link href={project.link} target="_blank">
							<Link2Icon className="w-5 h-5" style={{ color: "#fff" }} />
						</Link>
					)}
				</Flex>
			</div>
		</>
	);
}
