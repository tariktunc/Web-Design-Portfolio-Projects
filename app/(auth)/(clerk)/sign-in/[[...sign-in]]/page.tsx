"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";
import { ThemeContext } from "@/utils/context";
import { dark } from "@clerk/themes";

export default function Page() {
	const { theme } = React.useContext(ThemeContext) as { theme: string };

	return (
		<SignIn
			appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
		/>
	);
}
