"use client";
// React
import { Suspense } from "react";
import React, { useEffect } from "react";
// Next
import Link from "next/link";
import { usePathname } from "next/navigation";
// Radix
import { Button, Text, Flex } from "@radix-ui/themes";
// Clerk
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// Components
import SelectLanguage from "./SelectLanguage";

//----------------------------------------------------------------

export default function Navbar() {
	const pathname = usePathname();
	const lang = "tr";

	useEffect(() => {
		const pathSegments = pathname.split("/");
		const lang = pathSegments[1];
		if (["tr", "en"].includes(lang)) {
			console.log(lang);
		}
	}, [pathname]);

	const navItems = [
		{ label: "Who am I ?", href: `/whoami` },
		{ label: "Works", href: `/works` },
		{ label: "Laboratory", href: `/laboratory` },
		{ label: "WeBlog", href: `/weblog` },
	];

	return (
		<nav className="grid grid-cols-3 h-16  shadow-md">
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
				{navItems.map((item) => (
					<Button asChild variant="ghost" size={"3"} key={item.label}>
						<Link href={item.href}>{item.label}</Link>
					</Button>
				))}
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
					{/* <SelectLanguage /> */}
				</Suspense>
			</Flex>
		</nav>
	);
}
