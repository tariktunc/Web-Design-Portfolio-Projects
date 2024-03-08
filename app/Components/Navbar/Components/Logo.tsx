"use client";
import React from "react";
import { ThemeContext } from "@/utils/context";
import Link from "next/link";
import Image from "next/image";
import { Text, Flex } from "@radix-ui/themes";

export default function App() {
	const { theme } = React.useContext(ThemeContext) as { theme: string };

	return (
		<Flex justify={"center"} align={"center"} gap={"2"}>
			<Image
				src={
					theme === "light"
						? "/Logo/Monochrome.webp"
						: "/Logo/Grayscale.webp"
				}
				alt="blakfy"
				width={40}
				height={100}
			/>
			<Link href="/">
				<Flex direction={"column"}>
					<Text size={"6"}>tariktunc</Text>
					<Text size={"1"}>operated by blakfy</Text>
				</Flex>
			</Link>
		</Flex>
	);
}
