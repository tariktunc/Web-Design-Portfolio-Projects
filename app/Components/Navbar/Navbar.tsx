import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Text } from "@radix-ui/themes";
export default function Home() {
	return (
		<nav className="grid grid-cols-2 h-20  bg-orange-900">
			<div className="flex items-center mx-10 min-w-fit">
				<Text size={"8"}>tariktunc</Text>
			</div>
			<div className="h-full flex justify-center items-center gap-5 min-w-fit">
				<Link href="/">
					<Button>Home</Button>
				</Link>
				<Link href="/sign-in">
					<Button>Sign In</Button>
				</Link>
				<Link href="/sign-up">
					<Button>Sign Up</Button>
				</Link>
			</div>
		</nav>
	);
}
