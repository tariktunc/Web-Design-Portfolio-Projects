import Link from "next/link";
import Image from "next/image";
import { Section, Text, Heading, Flex } from "@radix-ui/themes";

import WhoAmI from "@/app/Components/WhoAmI/WhoAmI";

export default function Home() {
	return (
		<>
			{/* HEADER WHO AM I IMAGE  */}
			<Flex align={"center"} gap={"5"} justify={"center"}>
				<Image
					src="/whoami.webp"
					width={1200}
					height={1000}
					alt="blakfy.com"
				/>
			</Flex>
			{/* WHO AM I ?  */}
			<WhoAmI />
			{/* Technologies */}
			<Section size={"2"} className="light:bg-gray-100">
				<Heading as="h5" mt={"5"}>
					Programming languages I speak
				</Heading>
				<Text as="p">
					I have honed my skills across a wide array of technologies,
					constantly expanding my toolkit to stay at the forefront of the
					industry. My expertise includes:
				</Text>
				<Flex align={"center"} gap={"2"} height={"6"}>
					<Text as="p" weight="bold">
						Front-End Development:
					</Text>
					<Image
						src="https://skillicons.dev/icons?i=html"
						alt="HTML"
						width={25}
						height={25}
					/>{" "}
					<Image
						src="https://skillicons.dev/icons?i=css"
						alt="HTML"
						width={25}
						height={25}
					/>
					<Image
						src="https://skillicons.dev/icons?i=javascript"
						alt="HTML"
						width={25}
						height={25}
					/>
					<Image
						src="https://skillicons.dev/icons?i=react"
						alt="HTML"
						width={25}
						height={25}
					/>
					<Image
						src="https://skillicons.dev/icons?i=next"
						alt="HTML"
						width={25}
						height={25}
					/>
					<Image
						src="https://skillicons.dev/icons?i=redux"
						alt="HTML"
						width={25}
						height={25}
					/>
				</Flex>
				<Flex align={"center"} gap={"2"} height={"6"}>
					<Text as="p" weight="bold">
						Styling:
					</Text>
					<Image
						src="https://skillicons.dev/icons?i=tailwindcss"
						alt="HTML"
						width={25}
						height={25}
					/>
					<Image
						src="https://skillicons.dev/icons?i=sass"
						alt="HTML"
						width={25}
						height={25}
					/>
					<Image
						src="https://skillicons.dev/icons?i=scss"
						alt="HTML"
						width={25}
						height={25}
					/>
				</Flex>
				<Flex align={"center"} gap={"2"} height={"6"}>
					<Text as="p" weight="bold">
						Back-End Development:
					</Text>
					<Image
						src="https://skillicons.dev/icons?i=express"
						alt="HTML"
						width={25}
						height={25}
					/>
					<Image
						src="https://skillicons.dev/icons?i=c"
						alt="HTML"
						width={25}
						height={25}
					/>
				</Flex>
				<Flex align={"center"} gap={"2"} height={"6"}>
					<Text as="p" weight="bold">
						Database Management:
					</Text>
					<Image
						src="https://skillicons.dev/icons?i=mongodb"
						alt="HTML"
						width={25}
						height={25}
					/>
				</Flex>
			</Section>

			{/* Lest Connect */}
			<Section size={"2"}>
				<Heading as="h6">Let's Connect!</Heading>
				<Text as="p">
					Discover the platform that gives you the freedom to create,
					design, manage and develop your online presence exactly the way
					you want.
				</Text>
				<Link href="https://blakfy.com">
					<Image
						src="/blakfy-orginal-icon.jpg"
						width={"70"}
						height={"70"}
						alt="blakfy.com"
					/>
				</Link>
				<Text as="p">
					Join me on this journey as we explore the vast possibilities of
					technology together!
				</Text>
			</Section>
		</>
	);
}
