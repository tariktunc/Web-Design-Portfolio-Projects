"use client";
import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeContext } from "@/utils/context";

export default function Home() {
	const { theme } = React.useContext(ThemeContext) as { theme: string };

	return (
		<UserProfile
			appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
		/>
	);
}
