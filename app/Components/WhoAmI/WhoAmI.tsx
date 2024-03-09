// Radix
import Link from "next/link";
import Image from "next/image";
import {
	Section,
	Text,
	Heading,
	Flex,
	Strong,
} from "@radix-ui/themes";

export default function Home() {
	return (
		<Section size={"1"}>
			<Flex direction={"column"} justify={"end"} gap="2">
				<Heading as="h1">Who Am I?</Heading>
				<Text as="p" size={"4"} weight={"light"}>
					Hello there! I am <Strong>Tarik Tunc</Strong>, a passionate
					junior software developer based in Turkey. With a zeal for
					solving product-related problems, I am deeply committed to
					continuous learning and sharing knowledge with peers. Being a
					collaborative team player, I thrive in environments that
					challenge me to grow and innovate.
				</Text>
			</Flex>
		</Section>
	);
}
