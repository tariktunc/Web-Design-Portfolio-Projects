import React, { useState } from "react";
import { ThemeContext } from "@/utils/context";
import { Button } from "@radix-ui/themes";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const DarkModeToggle: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const { themes, toggleTheme } = React.useContext(ThemeContext);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle("dark");
		// Add logic to toggle dark mode here
	};

	return (
		<Button
			variant="ghost"
			onClick={() => {
				toggleDarkMode(), toggleTheme();
			}}
		>
			{themes === "dark" ? <MoonIcon /> : <SunIcon />}
		</Button>
	);
};

export default DarkModeToggle;
