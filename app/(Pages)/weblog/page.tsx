"use client";
import { Flex, Text, Avatar, Box } from "@radix-ui/themes";
import { Project } from "next/dist/build/swc";
import React from "react";

export default function Home() {
	type DateProps = {
		date: string;
	};
	const ArticleDate = (props: DateProps) => {
		return (
			<Text as="p" size={{ initial: "1", xs: "2", md: "3" }}>
				{props.date}
			</Text>
		);
	};
	type CategoriesProps = {
		category: string;
	};
	const ArticleCategories = (props: CategoriesProps) => {
		return (
			<Text
				as="p"
				weight={"bold"}
				color="blue"
				size={{ initial: "1", xs: "2", md: "3" }}
			>
				{props.category}
			</Text>
		);
	};
	type SummaryProps = {
		summary: string;
	};
	const ArticleSummary = (props: SummaryProps) => {
		return (
			<Flex>
				<Text as="p">{props.summary}</Text>
			</Flex>
		);
	};
	type TitleProps = {
		title: string;
	};
	const ArticleTitle = (props: TitleProps) => {
		return (
			<Text as="p" weight={"bold"} size={{ xs: "5", md: "7" }}>
				{props.title}
			</Text>
		);
	};
	type AvatarProps = {
		src: string;
		alt: string;
		fallback: string;
	};
	const AvatarImage = (props: AvatarProps) => {
		return (
			<Avatar
				size={{
					initial: "6",
					xs: "7",
					sm: "8",
					md: "9",
				}}
				src={props.src}
				alt={props.alt}
				fallback={props.fallback}
			/>
		);
	};
	type ArticaleCardProps = {
		src?: string;
		alt?: string;
		date?: string;
		categories?: string;
		title?: string;
		summary?: string;
	};

	const ArticleCard = (props: ArticaleCardProps) => {
		return (
			<Flex gap={"4"}>
				<AvatarImage
					src={props.src || "/blakfy-orginal-icon.jpg"}
					alt={props.alt || "blakfy"}
					fallback="IMG"
				/>
				<Box>
					<Flex gap={"2"} wrap={"wrap"}>
						<ArticleDate date={props.date || "Mar 01 2024"} />
						<ArticleCategories
							category={props.categories || "Technology"}
						/>
					</Flex>

					<Flex direction={"column"} gap={"2"}>
						<ArticleTitle
							title={props.title || "The future of technology"}
						/>
						<ArticleSummary
							summary={props.summary || "This is summary"}
						/>
					</Flex>
				</Box>
			</Flex>
		);
	};

	type WeBlogDatas = {
		src?: string;
		alt?: string;
		date?: string;
		categories?: string;
		title?: string;
		summary?: string;
	};

	const [weBlogData, setWeBlogData] = React.useState<WeBlogDatas[]>([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch("/weblog/data/blog.json");
				const data = await response.json();
				setWeBlogData(data.weBlog);
				setLoading(true);
			} catch (error) {
				console.error("Fetching projects failed:", error);
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	return (
		<Flex direction={"column"} gap={"9"}>
			{loading ? (
				weBlogData.map((data) => (
					<ArticleCard
						key={data.title}
						src={data.src}
						alt={data.alt}
						categories={data.categories}
						date={data.date}
						title={data.title}
						summary={data.summary}
					/>
				))
			) : (
				<p>Loading...</p>
			)}
		</Flex>
	);
}
