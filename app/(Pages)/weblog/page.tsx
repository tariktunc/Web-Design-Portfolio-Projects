import { Flex, Text, Box, Heading, Container } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const Articals = () => {
		return (
			<Flex
				justify={"center"}
				align={"center"}
				width={"auto"}
				mx={"auto"}
				mb={"8"}
			>
				<Box className="w-[200px] h-full">
					<Image
						width={200}
						height={200}
						src="/WeBlog/Image/reactjs.webp"
						alt="ReactJS Logo"
						className="flex-none w-full h-full aspect-square rounded-lg"
					/>
				</Box>

				<Flex direction={"column"} ml={"4"} className="w-fit h-fit">
					<Flex justify={"start"} align={"center"} gap={"3"} mb={"2"}>
						<Text
							as="p"
							weight={"medium"}
							size={"2"}
							className="min-w-fit"
						>
							Mar 5, 2024
						</Text>
						<Text
							as="p"
							weight={"bold"}
							size={"1"}
							className="px-2 py-1 rounded min-w-fit"
							color="blue"
						>
							PONDERINGS
						</Text>
						<Text
							as="p"
							weight={"bold"}
							size={"1"}
							className="px-2 py-1 rounded min-w-fit"
							color="blue"
						>
							PERSONAL
						</Text>
					</Flex>

					<Text className="text-2xl font-bold mb-4">Closure</Text>

					<Text className="hidden md:flex">
						In the here and now, the concept of completeness arises from
						the limitations of our conscious mind to distinguish the
						indivisible unity of matter. When completeness is fragmented,
						it ceases to exist as a whole.
					</Text>
				</Flex>
			</Flex>
		);
	};
	return (
		<Flex
			justify={"center"}
			align={"center"}
			width={"auto"}
			mx={"auto"}
			mb={"8"}
		>
			<Box className="w-[200px] h-full">
				<Image
					width={200}
					height={200}
					src="/WeBlog/Image/reactjs.webp"
					alt="ReactJS Logo"
					className="flex-none w-full h-full aspect-square rounded-lg"
				/>
			</Box>

			<Flex direction={"column"} ml={"4"} className="w-fit h-fit">
				<Flex justify={"start"} align={"center"} gap={"3"} mb={"2"}>
					<Text as="p" weight={"medium"} size={"2"} className="min-w-fit">
						Mar 5, 2024
					</Text>
					<Text
						as="p"
						weight={"bold"}
						size={"1"}
						className="px-2 py-1 rounded min-w-fit"
						color="blue"
					>
						PONDERINGS
					</Text>
					<Text
						as="p"
						weight={"bold"}
						size={"1"}
						className="px-2 py-1 rounded min-w-fit"
						color="blue"
					>
						PERSONAL
					</Text>
				</Flex>

				<Text className="text-2xl font-bold mb-4">Closure</Text>

				<Text className="hidden md:flex">
					In the here and now, the concept of completeness arises from the
					limitations of our conscious mind to distinguish the indivisible
					unity of matter. When completeness is fragmented, it ceases to
					exist as a whole.
				</Text>
			</Flex>
		</Flex>
	);
}
