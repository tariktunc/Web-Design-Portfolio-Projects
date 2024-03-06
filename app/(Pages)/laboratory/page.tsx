"use client";
import React, { Suspense } from "react";
import {
	Container,
	Card,
	Flex,
	Text,
	Inset,
	Strong,
	Box,
	Section,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { Url } from "url";
import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";

// CardItem
interface MyComponentProps {
	title: string;
	description: string;
	link?: Url | string;
	github?: Url | string;
	imageAdress?: string;
}
// setProjects useState
interface Project {
	title: string;
	description: string;
	link?: Url | string; // Assuming Url is a type you have defined elsewhere
	github?: Url | string;
	imageAdress?: string;
}

const CardItem = (props: MyComponentProps) => {
	return (
		<Card size={"2"} className="grid grid-colums-1 ">
			{/* Image */}
			<Inset clip="padding-box" side="top" pb="current">
				<Link href={props.link || "/"}>
					<Image
						width={500}
						height={100}
						src={props.imageAdress || "/blakfy-orginal-icon.jpg"}
						alt={props.title}
						className="aspect-video block object-cover bg-gray-200"
					/>
				</Link>
			</Inset>

			{/* Title */}
			<Text
				as="p"
				size="3"
				className=" sm:min-h-40 sm:h-48 md:h-40 lg:h-40 xl:h-44"
			>
				<Strong>
					{props.title.length < 20
						? props.title
						: props.title.substring(0, 30).concat("...")}
				</Strong>{" "}
				<br />
				{props.description.length < 141
					? props.description.substring(0, 140)
					: props.description.substring(0, 140).concat("...")}
			</Text>
			{/* Stream Link */}
			<Flex gap={"5"} justify={"end"} align={"center"} className=" h-8">
				<Link href={props.github as string}>
					<GitHubLogoIcon className="w-auto h-6" />
				</Link>
				<Link href={props.link as string}>
					<Link2Icon className="w-auto h-6" />
				</Link>
			</Flex>
		</Card>
	);
};

const LoadingCardItem = () => {
	return (
		<Flex wrap={"wrap"} align={"center"}>
			{/* global.css */}
			<span className="loader" />
			<span className="loader" />
			<span className="loader" />
			<span className="loader" />
			<span className="loader" />
			<span className="loader" />
		</Flex>
	);
};

export default function Home() {
	const [projects, setProjects] = React.useState<Project[]>([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch("/Data/laboratory.json");
				const data = await response.json();
				setProjects(data.laboratory);
				setLoading(true);
			} catch (error) {
				console.error("Fetching projects failed:", error);
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);
	return (
		<Container size={"2"}>
			<Section size={"1"}>
				<Image
					src="/laboratorywallpaper2.webp"
					alt="laboratory wallpaper image"
					width={5000}
					height={100}
					className="aspect-auto w-full block object-cover rounded bg-gray-200"
				/>
			</Section>
			<Section size={"3"}>
				<Text as="p" size={"8"}>
					Our Laboratory
				</Text>
				<br />
				<Text as="p" size={"5"}>
					When creativity and technology come together, we have the power
					to transform our dreams into reality. Explore our projects and
					see how we can push the boundaries of creativity in the digital
					world together. Let's inspire each other on this journey and look
					towards the future with hope.
				</Text>
			</Section>
			<Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-6">
				{loading ? (
					projects.map((project) => (
						<CardItem
							key={project.title}
							title={project.title}
							description={project.description}
							link={project.link || "/"}
							imageAdress={project.imageAdress}
							github={project.github}
						/>
					))
				) : (
					<LoadingCardItem />
				)}
			</Box>
		</Container>
	);
}
