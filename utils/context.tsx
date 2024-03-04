"use context";
import React from "react";

export const ThemeContext = React.createContext({
	themes: "dark",
	toggleTheme: () => {},
});

export const useTheme = () => {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [themes, setTheme] = React.useState("dark");
	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};
	return (
		<ThemeContext.Provider value={{ themes, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
