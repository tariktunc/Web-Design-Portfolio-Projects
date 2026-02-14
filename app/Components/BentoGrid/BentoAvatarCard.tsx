import { Avatar, Flex } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";

export default function BentoAvatarCard() {
	return (
		<div className="bento-card-inner bento-avatar">
			<Avatar
				size={{ initial: "7", xs: "8", md: "9" }}
				src="/profilePhoto.jpg"
				radius="full"
				fallback="T"
			/>
			<Flex align="center" justify="center" gap={{ initial: "2", xs: "3" }} className="bento-avatar-icons">
				<Link href="https://linkedin.com/in/tarktunc" aria-label="LinkedIn" className="icon-hover">
					<Image src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" width={24} height={24} />
				</Link>
				<Link href="https://twitter.com/tarkktunc" aria-label="Twitter" className="icon-hover">
					<Image src="https://skillicons.dev/icons?i=twitter" alt="Twitter" width={24} height={24} />
				</Link>
				<Link href="https://github.com/tariktunc" aria-label="GitHub" className="icon-hover">
					<Image src="https://skillicons.dev/icons?i=github" alt="GitHub" width={24} height={24} />
				</Link>
			</Flex>
		</div>
	);
}
