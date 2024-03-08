import * as React from "react";
import { Button, Text, Flex } from "@radix-ui/themes";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import DarkModeBtn from "../../DarkModeBtn/DarkModeBtn";
import Link from "next/link";

export interface IAppProps {}

export default function App(props: IAppProps) {
	return (
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
			</Suspense>
		</Flex>
	);
}
