import React, { useState } from "react";
import { ThemeContext } from "@/utils/context";
import { Button } from "@radix-ui/themes";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const DarkModeToggle: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const { themes, toggleTheme } = React.useContext(ThemeContext);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		if (themes === "dark") {
			document.documentElement.classList.remove("light"); // `<html>` etiketine "dark" class'ını ekler
			document.body.classList.remove("light"); // `<body>` etiketine "dark" class'ını ekler
			document.documentElement.style.colorScheme = "dark";
			document.documentElement.classList.add("dark"); // `<html>` etiketine "dark" class'ını ekler
			document.body.classList.add("dark"); // `<body>` etiketine "dark" class'ını ekler
		} else {
			document.documentElement.classList.remove("dark"); // `<html>` etiketine "dark" class'ını ekler
			document.body.classList.remove("dark"); // `<body>` etiketine "dark" class'ını ekler
			document.documentElement.style.colorScheme = "light";
			document.documentElement.classList.add("light"); // `<html>` etiketine "dark" class'ını ekler
			document.body.classList.add("light"); // `<body>` etiketine "dark" class'ını ekler
		}

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
