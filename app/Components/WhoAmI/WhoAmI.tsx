// Radix
import Link from "next/link";
import Image from "next/image";
import {
	Section,
	Text,
	Heading,
	Container,
	Flex,
	Avatar,
	Strong,
} from "@radix-ui/themes";

export default function Home() {
	return (
		<Section size={"1"}>
			<Flex justify={"center"} align={"center"}>
				<Flex mr={"5"} direction={"column"} style={{ maxWidth: 300 }}>
					<Avatar
						size="9"
						src="/profilePhoto.jpg"
						radius="full"
						fallback="T"
					/>
					<Flex align={"center"} justify={"center"} gap={"2"} height={"6"}>
						<Link href="https://linkedin.com/in/tarktunc">
							<Image
								src="https://skillicons.dev/icons?i=linkedin"
								alt="HTML"
								width={20}
								height={20}
							/>
						</Link>
						<Link href="https://twitter.com/tarkktunc">
							<Image
								src="https://skillicons.dev/icons?i=twitter"
								alt="HTML"
								width={20}
								height={20}
							/>
						</Link>
						<Link href="https://github.com/tariktunc">
							<Image
								src="https://skillicons.dev/icons?i=github"
								alt="HTML"
								width={20}
								height={20}
							/>
						</Link>
					</Flex>
				</Flex>
				<Flex direction={"column"} justify={"end"} gap="2">
					<Heading as="h1">Who Am I?</Heading>
					<Text as="p" size={"4"}>
						Hello there! I am <Strong>Tarik Tunc</Strong>, a passionate
						junior software developer based in Turkey. With a zeal for
						solving product-related problems, I am deeply committed to
						continuous learning and sharing knowledge with peers. Being a
						collaborative team player, I thrive in environments that
						challenge me to grow and innovate.
					</Text>
				</Flex>
			</Flex>
		</Section>
	);
}
