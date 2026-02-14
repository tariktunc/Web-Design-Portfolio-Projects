"use client";
import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const socialMedia = [
	{ name: "LinkedIn", icon: "https://skillicons.dev/icons?i=linkedin", link: "https://www.linkedin.com/in/tarktunc/" },
	{ name: "Github", icon: "https://skillicons.dev/icons?i=github", link: "https://github.com/tariktunc" },
	{ name: "Discord", icon: "https://skillicons.dev/icons?i=discord", link: "https://discord.com/kZWEEvmQAK" },
	{ name: "Twitter", icon: "https://skillicons.dev/icons?i=twitter", link: "https://twitter.com/tarkktunc" },
	{ name: "Blakfy", icon: "/blakfy-orginal-icon.jpg", link: "https://blakfy.com" },
	{ name: "Spotify", icon: "/spotify.png", link: "https://open.spotify.com/user/11177763987" },
	{ name: "Medium", icon: "/medium.png", link: "https://medium.com/@tariktunc" },
	{ name: "Instagram", icon: "https://skillicons.dev/icons?i=instagram", link: "https://www.instagram.com/tarkktunc/" },
	{ name: "Stack", icon: "https://skillicons.dev/icons?i=stackoverflow", link: "https://stackoverflow.com/users/21361438/tar%c4%b1k-tunc" },
];

export default function BentoSocialCard() {
	return (
		<div className="bento-card-inner">
			<Heading as="h3" size={{ initial: "2", xs: "3" }} mb={{ initial: "2", xs: "3" }}>
				Connect
			</Heading>
			<div className="bento-social-grid">
				{socialMedia.map((s, i) => (
					<Link key={i} href={s.link} target="_blank" className="bento-social-item">
						<Image src={s.icon} alt={s.name} width={24} height={24} className="rounded-sm" />
						<Text as="span" size="1" color="gray" mt="1">
							{s.name}
						</Text>
					</Link>
				))}
			</div>
		</div>
	);
}
