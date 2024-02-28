import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Text } from "@radix-ui/themes";
export default function Home() {
	return (
		<nav className="grid grid-cols-3 h-20  bg-orange-900">
			<div className="flex flex-col justify-center items-center">
				<Text size={"6"}>tariktunc</Text>
				<Text size={"1"}>operated by blakfy</Text>
			</div>
			<div className="h-full flex justify-center items-center gap-5">
				<Link href="/">
					<Button variant="ghost" size={"4"}>
						Home
					</Button>
				</Link>
				<Link href="/sign-in">
					<Button variant="ghost" size={"4"}>
						About
					</Button>
				</Link>
				<Link href="/sign-up">
					<Button variant="ghost" size={"4"}>
						Contact
					</Button>
				</Link>
			</div>
			<div className="flex justify-center items-center items-center">
				<Button variant="outline" size={"2"}>
					Sign Up
				</Button>
			</div>
		</nav>
	);
}
