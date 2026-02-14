import Image from "next/image";
import Link from "next/link";
import { Heading, Text, Flex } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
	projects: Array<{
		title: string;
		link?: string;
		imageAdress?: string;
	}>;
}

export default function BentoBlakfyShowcase({ projects }: Props) {
	return (
		<div className="bento-card-inner">
			<Flex justify="between" align="center" mb={{ initial: "2", xs: "3" }}>
				<Heading as="h3" size={{ initial: "3", xs: "4" }} className="section-header">
					Client Work
				</Heading>
				<Link href="/laboratory" style={{ textDecoration: "none" }}>
					<Flex align="center" gap="1">
						<Text size={{ initial: "1", xs: "2" }} color="orange">
							View all
						</Text>
						<ArrowRightIcon style={{ color: "var(--accent-9)" }} />
					</Flex>
				</Link>
			</Flex>
			<div className="bento-showcase-strip">
				{projects.map((p, i) => (
					<Link key={i} href={p.link || "/"} target="_blank" className="bento-showcase-thumb">
						<Image
							src={p.imageAdress || "/blakfy-orginal-icon.jpg"}
							alt={p.title}
							fill
							sizes="(max-width: 520px) 100vw, (max-width: 768px) 50vw, 30vw"
							style={{ objectFit: "cover" }}
						/>
					</Link>
				))}
			</div>
		</div>
	);
}
