import { Flex, Text, Box, Avatar, Heading, Container } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<Container size={"2"}>
			<article className="flex border-box items-center">
				<Container mr={"3"}>
					<Avatar
						size={"9"}
						src="/WeBlog/Image/reactjs.webp"
						fallback="A"
					/>
				</Container>
				<Box width={"100%"}>
					<Flex direction={"column"}>
						<Flex gap={"3"} my={"2"} width={"max-content"}>
							<Text as="span" size={"2"} className="opacity-70 ">
								MAR 5, 2024
							</Text>
							<Text as="span" size={"2"} weight={"bold"}>
								<Link
									href="/"
									className="px-1 text-blue-900 hover:opacity-80"
								>
									PONDERINGS,
								</Link>
								<Link
									href="/"
									className="px-1 text-blue-900 hover:opacity-80"
								>
									PERSONAL
								</Link>
							</Text>
						</Flex>
						<Heading my={"3"} as="h2" size={"8"} weight={"bold"}>
							Closure
						</Heading>
						<Text as="p">
							In the here and now, the concept of completeness arises
							from the limitations of our conscious mind to distinguish
							the indivisible unity of matter. When completeness is
							fragmented, it ceases to exist as a whole.
						</Text>
					</Flex>
				</Box>
			</article>
		</Container>
	);
}
