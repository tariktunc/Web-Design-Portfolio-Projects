"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/utils/context";

const DarkModeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			onClick={toggleTheme}
			className="icon-hover"
		>
			{theme === "dark" ? (
				<SunIcon width={"20"} height={"20"} />
			) : (
				<MoonIcon width={"20"} height={"20"} />
			)}
		</Button>
	);
};

export default DarkModeToggle;
