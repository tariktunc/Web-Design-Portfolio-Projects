"use client";
// React
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider, useTheme, ThemeContext } from "@/utils/context";
// Redux
import { Provider } from "react-redux";
import store from "@/app/store";
// Clerk
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes"; // clerk dark light mode, default light olarak geliyor.
import { enUS, trTR } from "@clerk/localizations"; // clerk dil seçeneği
// Radix UI
import "@radix-ui/themes/styles.css"; // Radix UI theme
import "./theme-config.css";
import { Theme, ThemePanel } from "@radix-ui/themes"; // Radix UI theme

// export const metadata: Metadata = {
// 	title: "Portfolio",
// 	description: "Generated by create blakfy app",
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<html lang="en" suppressHydrationWarning>
					<body className={"light"}>
						<ClerkProvider localization={enUS}>
							<Theme
								appearance="light"
								accentColor="orange"
								grayColor="slate"
								panelBackground="solid"
								radius="small"
							>
								{children}
							</Theme>
						</ClerkProvider>
					</body>
				</html>
			</ThemeProvider>
		</Provider>
	);
}
