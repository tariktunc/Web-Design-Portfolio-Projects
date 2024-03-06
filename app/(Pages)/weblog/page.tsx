import { Flex, Text, Container, Avatar, Grid, Box } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

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

	const ArticleCard = () => {
		return (
			<Flex gap={"4"}>
				<AvatarImage
					src="/public/WeBlog/reactjs.webp"
					alt="avatar"
					fallback="IMG"
				/>
				<Box>
					<Flex gap={"2"} wrap={"wrap"}>
						<ArticleDate date="Mar 5, 2024" />
						<ArticleCategories category="Technology" />
					</Flex>

					<Flex direction={"column"} gap={"2"}>
						<ArticleTitle title="The future of technology" />
						<ArticleSummary summary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the." />
					</Flex>
				</Box>
			</Flex>
		);
	};
	return (
		<Flex direction={"column"} gap={"9"}>
			<ArticleCard />
			<ArticleCard />
			<ArticleCard />
			<ArticleCard />
			<ArticleCard />
			<ArticleCard />
			<ArticleCard />
		</Flex>
	);
}
