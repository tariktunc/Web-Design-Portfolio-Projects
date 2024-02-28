import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Text } from "@radix-ui/themes";
export default function Home() {
	return (
		<nav className="grid grid-cols-3 h-20  bg-orange-900">
			<div className="flex justify-center">
				<Link
					href="/"
					className="flex flex-col justify-center items-center"
				>
					<Text size={"6"}>tariktunc</Text>
					<Text size={"1"}>operated by blakfy</Text>
				</Link>
			</div>
			<div className="h-full flex justify-center items-center gap-5">
				<Link href="/whoami">
					<Button variant="ghost" size={"3"}>
						Who am I ?
					</Button>
				</Link>
				<Link href="/works">
					<Button variant="ghost" size={"3"}>
						Works
					</Button>
				</Link>
				<Link href="/laboratory">
					<Button variant="ghost" size={"3"}>
						Laboratory
					</Button>
				</Link>
				<Link href="/weblog">
					<Button variant="ghost" size={"3"}>
						WeBlog
					</Button>
				</Link>
			</div>
			<div className="flex justify-center items-center">
				<Link href="/sign-in">
					<Button variant="outline" size={"2"}>
						Sign In
					</Button>
				</Link>
			</div>
		</nav>
	);
}
