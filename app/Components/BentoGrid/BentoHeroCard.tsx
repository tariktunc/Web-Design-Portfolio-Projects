import { Heading, Text } from "@radix-ui/themes";

export default function BentoHeroCard() {
	return (
		<div className="bento-card-inner bento-hero">
			<span className="hero-greeting">Full Stack Developer</span>
			<Heading as="h1" size={{ initial: "6", xs: "7", md: "8" }} mt="2">
				Tarık Tunç
			</Heading>
			<Text as="p" size={{ initial: "2", xs: "3" }} color="gray" mt="2">
				I still fix myself every day
			</Text>
			<Text
				as="p"
				size={{ initial: "1", xs: "2" }}
				color="gray"
				mt={{ initial: "3", xs: "4" }}
				style={{ maxWidth: "clamp(260px, 70%, 420px)" }}
			>
				Building modern web experiences with Next.js, React, and TypeScript.
				Currently crafting digital products at Blakfy.
			</Text>
		</div>
	);
}
