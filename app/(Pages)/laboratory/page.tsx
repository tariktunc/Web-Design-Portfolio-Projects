"use client";
import React, { Suspense } from "react";
import { Container, Card, Flex, Text, Inset, Strong } from "@radix-ui/themes";

interface MyComponentProps {
	title: string;
	description: string;
	srcUrl?: string;
	streamLink?: string;
}

interface Project {
	title: string;
	description: string;
	srcUrl: string;
}

const CardItem = (props: MyComponentProps) => {
	return (
		<Card size={"2"} style={{ maxWidth: 300, height: 400 }}>
			<Inset clip="padding-box" side="top" pb="current">
				<img
					src={props.srcUrl || "/blakfy-orginal-icon.jpg"}
					alt="Bold typography"
					style={{
						display: "block",
						objectFit: "cover",
						width: "100%",
						height: 200,
						backgroundColor: "var(--gray-5)",
					}}
				/>
			</Inset>
			<Text as="p" size="3">
				<Strong>{props.title}</Strong>{" "}
				{props.description.substring(0, 140).concat("...")}
			</Text>
			<Text as="p" size="3">
				Stream Link
			</Text>
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
				const response = await fetch("/laboratory.json");
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
			<Flex align={"start"} wrap={"wrap"} justify={"center"} gap={"5"}>
				{loading ? (
					projects.map((project) => (
						<CardItem
							title={project.title}
							description={project.description}
							srcUrl={project.srcUrl}
							streamLink={"https://where-to-watch-blakfy.netlify.app/"}
						/>
					))
				) : (
					<LoadingCardItem />
				)}
			</Flex>
		</Container>
	);
}
