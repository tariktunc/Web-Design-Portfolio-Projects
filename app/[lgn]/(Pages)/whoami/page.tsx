import { Flex, Text, Box, Container, Section } from "@radix-ui/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Who am I ?",
	description: "Generated by create blakfy app",
};

export default function Home() {
	return (
		<>
			<Flex justify={"center"}>
				<Text size={"9"}>{metadata.title?.toString() || "Başlik Yok"}</Text>
			</Flex>
		</>
	);
}
