"use client";
import React from "react";
import { Theme, Flex, Box, Button, VisuallyHidden } from "@radix-ui/themes";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import DynamicNavButtons from "./Components/DynamicNavButtons";
import Logo from "./Components/Logo";
import DarkModeToggle from "../DarkModeBtn/DarkModeBtn";
import AuthButtons from "./Components/AuthButtons";

export default function Home() {
	const [openMenu, setOpenMenu] = React.useState(false);
	return (
		<Box height={"100%"} width={"100%"} className="shadow-md xs:hidden">
			{openMenu && (
				<Flex justify={"end"} align={"center"} gap={"5"} px={"2"} py={"3"}>
					<Button onClick={() => setOpenMenu(false)} variant="surface">
						<HamburgerMenuIcon width={"25"} height={"25"} /> Menu
					</Button>
				</Flex>
			)}
			{!openMenu && (
				<Box
					px={"2"}
					py={"3"}
					width={"100%"}
					className=" bg-white dark:bg-slate-950"
				>
					<Flex justify={"end"} align={"center"} gap={"5"}>
						<Button onClick={() => setOpenMenu(true)} variant="surface">
							<Cross1Icon width={"25"} height={"25"} /> Menu
						</Button>
					</Flex>

					<Flex direction={"column"} align={"center"} gap={"5"} pr={"4"}>
						<DynamicNavButtons />
					</Flex>

					<Flex
						direction={"column"}
						justify={"center"}
						py={"5"}
						align={"center"}
						gap={"5"}
						pr={"4"}
					>
						<DarkModeToggle />
						<AuthButtons />
						<Logo />
					</Flex>
				</Box>
			)}
		</Box>
	);
}
