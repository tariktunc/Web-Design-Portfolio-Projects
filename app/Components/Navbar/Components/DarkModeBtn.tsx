"use context";
"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/utils/context";

const DarkModeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button variant="ghost" onClick={toggleTheme}>
			{theme === "dark" ? (
				<SunIcon width={"25"} height={"25"} />
			) : (
				<MoonIcon width={"25"} height={"25"} />
			)}
		</Button>
	);
};

export default DarkModeToggle;
