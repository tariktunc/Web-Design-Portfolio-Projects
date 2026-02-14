"use client";
import React from "react";
import { ThemeContext } from "@/utils/context";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
	const { theme } = React.useContext(ThemeContext) as { theme: string };

	return (
		<SignUp
			appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
		/>
	);
}
