// Radix
import Link from "next/link";
import Image from "next/image";
import {
	Section,
	Text,
	Heading,
	Container,
	Flex,
	Avatar,
	Strong,
} from "@radix-ui/themes";
// next
// Components
import Navbar from "@/app/Components/Navbar/Navbar";
import WhoAmI from "@/app/Components/WhoAmI/WhoAmI";
// ------------------------------

export default function Home() {
	return (
		<>
			<Navbar />
			<Container
				size={"4"}
				style={{ paddingLeft: "5%", paddingRight: "5%" }}
			>
				<WhoAmI />
			</Container>
		</>
	);
}
