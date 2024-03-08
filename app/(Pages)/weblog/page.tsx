"use client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import ArticleCard from "./Components/ArticleCard";
import LoadingCard from "./Components/LoadingCard";
// ----------------------------------------------

export default function Home() {
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
				<>
					<LoadingCard />
					<LoadingCard />
					<LoadingCard />
					<LoadingCard />
					<LoadingCard />
					<LoadingCard />
				</>
			)}
		</Flex>
	);
}
