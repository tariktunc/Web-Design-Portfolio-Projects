import React, { useEffect, useState, createContext, useContext } from "react";

export const ThemeContext = createContext({
	theme: "light",
	toggleTheme: () => {},
});

// Custom Hook to manage and update CSS variables/themes
const useManageTheme = () => {
	const [theme, setTheme] = useState<string | null>(null);

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || "light";
		setTheme(storedTheme);
	}, []);

	useEffect(() => {
		if (theme !== null) {
			localStorage.setItem("theme", theme);
			const root = document.documentElement;
			const prevTheme = theme === "dark" ? "light" : "dark";
			root.classList.remove(prevTheme);
			root.classList.add(theme);
			document.body.classList.remove(prevTheme);
			document.body.classList.add(theme);
		}
	}, [theme]);

	return { theme, setTheme };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const { theme, setTheme } = useManageTheme();

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	// Display nothing while theme is loading but prevent layout shifts or visibility of unstyled content
	if (theme === null) {
		return null; // You can choose to create a more visually appealing loading state or transition here.
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
