"use client";
// React
import React from "react";
import { Flex, Container, Box } from "@radix-ui/themes";
// Components
import DynamicNavButtons from "./Components/DynamicNavButtons";
import Logo from "./Components/Logo";
import SearchButtons from "./Components/SearchButtons";
import AuthButtons from "./Components/AuthButtons";
import DarkModeToggle from "../DarkModeBtn/DarkModeBtn";
//----------------------------------------------------------------

export default function Navbar() {
	return (
		<Box shrink={"1"} mb={"5"} className="initial:hidden xs:flex xs:flex-col">
			{/* Header */}
			<Container size={"3"} p={"3"} className="border-b-2">
				<Flex wrap={"wrap"} justify={"between"}>
					{/* Search */}
					<SearchButtons />
					{/* LOGO */}

					<Logo />
					{/* USER */}
					<Flex align={"center"} gap={"5"}>
						<AuthButtons />
						<DarkModeToggle />
					</Flex>
				</Flex>
			</Container>
			{/* NAVIGATION */}
			<Container size={"3"} p={"3"} className="border-b-2">
				<Flex wrap={"wrap"} justify={"center"} gap={"5"} height={"100%"}>
					<DynamicNavButtons />
				</Flex>
			</Container>
		</Box>
	);
}
