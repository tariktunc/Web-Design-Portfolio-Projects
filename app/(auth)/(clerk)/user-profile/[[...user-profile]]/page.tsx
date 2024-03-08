"use client";
import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes"; // clerk dark light mode, default light olarak geliyor.
import { ThemeContext } from "@/utils/context";

export default function Home() {
	const { theme } = React.useContext(ThemeContext) as { theme: string };

	return (
		<UserProfile
			appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
			path="/user-profile"
			routing="path"
		/>
	);
}
