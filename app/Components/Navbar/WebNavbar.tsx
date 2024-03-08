"use client";
// React
import React from "react";
import { Flex, Container, Box } from "@radix-ui/themes";
// Components
import DynamicNavBtn from "./Components/DynamicNavBtn";
import Logo from "./Components/Logo";
import SearchBtn from "./Components/SearchBtn";
import AuthBtn from "./Components/AuthBtn";
import DarkModeBtn from "./Components/DarkModeBtn";
//----------------------------------------------------------------

export default function Navbar() {
	return (
		<Box shrink={"1"} mb={"5"} className="initial:hidden xs:flex xs:flex-col">
			{/* Header */}
			<Container size={"3"} py={"5"} className="border-b">
				<Flex wrap={"wrap"} justify={"between"}>
					{/* Search */}
					<SearchBtn />
					{/* LOGO */}

					<Logo />
					{/* USER */}
					<Flex align={"center"} gap={"5"}>
						<AuthBtn />
						<DarkModeBtn />
					</Flex>
				</Flex>
			</Container>
			{/* NAVIGATION */}
			<Container size={"3"} py={"5"} className="border-b">
				<Flex wrap={"wrap"} justify={"center"} gap={"5"} height={"100%"}>
					<DynamicNavBtn />
				</Flex>
			</Container>
		</Box>
	);
}
