// React
import { Suspense } from "react";
// Next
import Link from "next/link";
// Radix
import { Button, Text, Flex } from "@radix-ui/themes";
// Clerk
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// Components

export default function Home() {
	return (
		<nav className="grid grid-cols-3 h-20 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
			{/* LOGO */}
			<Flex justify={"center"}>
				<Link
					href="/"
					className="flex flex-col justify-center items-center"
				>
					<Text size={"6"}>tariktunc</Text>
					<Text size={"1"}>operated by blakfy</Text>
				</Link>
			</Flex>
			{/* NAVIGATION */}
			<Flex justify={"center"} align={"center"} gap={"5"} height={"100%"}>
				<Button asChild variant="ghost" size={"3"}>
					<Link href="/whoami">Who am I ?</Link>
				</Button>
				<Button asChild variant="ghost" size={"3"}>
					<Link href="/works">Works</Link>
				</Button>
				<Button asChild variant="ghost" size={"3"}>
					<Link href="/laboratory">Laboratory</Link>
				</Button>
				<Button asChild variant="ghost" size={"3"}>
					<Link href="/weblog">WeBlog</Link>
				</Button>
			</Flex>
			{/* USER */}
			<Flex justify={"center"} align={"center"}>
				<Suspense fallback={<Text size={"9"}>Loading...</Text>}>
					<SignedIn>
						<UserButton />
						<Text size={"3"} m={"2"}>
							<Button asChild variant="ghost">
								<Link href="/user-profile">Profil</Link>
							</Button>
						</Text>
					</SignedIn>
					<SignedOut>
						<Button asChild>
							<Link href="/sign-in">Sign In</Link>
						</Button>
					</SignedOut>
				</Suspense>
			</Flex>
		</nav>
	);
}
