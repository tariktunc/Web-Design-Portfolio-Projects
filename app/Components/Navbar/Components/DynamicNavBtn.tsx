import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

type NavbarData = {
	label: string;
	href: string;
};

export default function DynamicNavButtons() {
	const [navbarData, setNavbarData] = React.useState<NavbarData[]>([]);
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		const response = async () => {
			try {
				const res = await fetch("/Data/navbarItem.json");
				const data = await res.json();
				setNavbarData(data);
				setLoading(true);
			} catch (error) {
				console.log("error => ", error);
				setLoading(false);
			}
		};

		response();
	}, []);
	return (
		<>
			{loading &&
				navbarData.map((item) => (
					<Button asChild variant="ghost" size={"4"} key={item.label}>
						<Link href={item.href}>{item.label}</Link>
					</Button>
				))}
		</>
	);
}
