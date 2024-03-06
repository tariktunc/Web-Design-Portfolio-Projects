import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["selector", '[data-mode="dark"]'],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			initial: "0px",
			xs: "520px", // "640px
			sm: "768px", // "768px
			md: "1024px", // "1024px
			lg: "1280px", // "1280px
			xl: "1640px", // "1280px
		},

		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;
