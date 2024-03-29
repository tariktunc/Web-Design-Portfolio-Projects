"use client"
import {
	Container,
	Box,
	Text,
	Heading,
	Avatar,
	Flex,
	Section,
} from "@radix-ui/themes";
import React from "react";
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { blog: string } }) {
	// Fetch the blog post data from an API or database
	const router = useRouter();
	React.useEffect(() => {
		window.onload = () => {	
			router.push("/weblog");
		}
	}, []);

	return (
		<Box>
			<Box>
				{/* HEADER KISMI BURADA OLACAK. */}
				<Section size={"1"}>
					<Heading as={"h1"} size={"8"} mb={"7"}>
						{params.blog} page not found.
					</Heading>
					<Flex justify={"start"} align={"center"} gap={"2"}>
						<Avatar
							size="5"
							src="/profilePhoto.jpg"
							radius="full"
							fallback="T"
						/>
						<Flex direction={"column"}>
							<Text as={"p"}>Tarik Tunç</Text>
						</Flex>
					</Flex>
				</Section>
				{/* İÇERİK KISMI BURADA OLACAK. */}
				<Section></Section>
			</Box>
		</Box>
	);
}
