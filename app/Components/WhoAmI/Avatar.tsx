import React from "react";
import { Flex, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";

export default function Avatars() {
	return (
		<Flex mr={"5"} direction={"column"} justify={"center"} align={"center"}>
			<Avatar size="9" src="/profilePhoto.jpg" radius="full" fallback="T" />
			<Flex align={"center"} justify={"center"} gap={"2"} height={"6"}>
				<Link href="https://linkedin.com/in/tarktunc" aria-label="LinkedIn profile">
					<Image
						src="https://skillicons.dev/icons?i=linkedin"
						alt="LinkedIn"
						width={20}
						height={20}
					/>
				</Link>
				<Link href="https://twitter.com/tarkktunc" aria-label="Twitter profile">
					<Image
						src="https://skillicons.dev/icons?i=twitter"
						alt="Twitter"
						width={20}
						height={20}
					/>
				</Link>
				<Link href="https://github.com/tariktunc" aria-label="GitHub profile">
					<Image
						src="https://skillicons.dev/icons?i=github"
						alt="GitHub"
						width={20}
						height={20}
					/>
				</Link>
			</Flex>
		</Flex>
	);
}
