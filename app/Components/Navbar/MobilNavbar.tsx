"use client";
import React from "react";
import { Flex, Box, Button } from "@radix-ui/themes";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import DynamicNavButtons from "./Components/DynamicNavBtn";
import Logo from "./Components/Logo";
import DarkModeToggle from "./Components/DarkModeBtn";
import AuthButtons from "./Components/AuthBtn";

export default function Home() {
	const [openMenu, setOpenMenu] = React.useState(false);
	return (
		<Box height={"100%"} width={"100%"} className="shadow-sm xs:hidden">
			<Flex justify={"between"} align={"center"} px={"3"} py={"3"}>
				<Logo />
				<Button
					onClick={() => setOpenMenu(!openMenu)}
					variant="surface"
				>
					{openMenu ? (
						<Cross1Icon width={"20"} height={"20"} />
					) : (
						<HamburgerMenuIcon width={"20"} height={"20"} />
					)}
					Menu
				</Button>
			</Flex>
			{openMenu && (
				<Box px={"3"} pb={"4"} className="mobile-menu-enter">
					<Flex direction={"column"} align={"center"} gap={"4"}>
						<DynamicNavButtons />
					</Flex>

					<Flex
						justify={"center"}
						py={"4"}
						align={"center"}
						gap={"4"}
					>
						<DarkModeToggle />
						<AuthButtons />
					</Flex>
				</Box>
			)}
		</Box>
	);
}
