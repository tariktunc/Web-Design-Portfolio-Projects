import { Suspense } from "react";
import { ThemeContext } from "@/utils/context";
// Next
import Link from "next/link";
import Image from "next/image";
// Radix
import {
	Button,
	Text,
	Flex,
	Container,
	Grid,
	Box,
	Section,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
// Clerk
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// Components
import DarkModeBtn from "../DarkModeBtn/DarkModeBtn";

//----------------------------------------------------------------

	const navItems = [
		{ label: "Home", href: `/` },
		{ label: "Laboratory", href: `/laboratory` },
		{ label: "WeBlog", href: `/weblog` },
		{ label: "Who am I ?", href: `/whoami` },
	];
	const { themes } = React.useContext(ThemeContext);

	return (
		<Box>
			{/* Header */}
			<Flex justify={"between"} align={"center"}>
				{/* Search */}
				<Flex justify={"start"} align={"center"}>
					<Button asChild variant="ghost">
						<MagnifyingGlassIcon />
					</Button>
				</Flex>
				{/* LOGO */}

				<Flex justify={"center"} align={"center"} gap={"2"}>
					<Image
						src={
							themes === "dark"
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
				{/* USER */}
				<Flex justify={"end"} align={"center"} gap={"4"}>
					<Suspense fallback={<Text size={"9"}>Loading...</Text>}>
						<SignedIn>
							<UserButton />
							<Button asChild variant="ghost">
								<Link href="/user-profile">Profil</Link>
							</Button>
						</SignedIn>
						<SignedOut>
							<Button asChild>
								<Link href="/sign-in">Sign In</Link>
							</Button>
						</SignedOut>
						{/* <SelectLanguage /> */}
						<DarkModeBtn />
					</Suspense>
				</Flex>
			</Flex>
			{/* NAVIGATION */}
			<Flex
				className="border-b"
				justify={"center"}
				gap={"5"}
				height={"100%"}
			>
				{navItems.map((item) => (
					<Button asChild variant="ghost" size={"3"} key={item.label}>
						<Link href={item.href}>{item.label}</Link>
					</Button>
				))}
			</Flex>
		</Box>
	);
}
NavigationMenu;
