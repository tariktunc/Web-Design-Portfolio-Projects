"use client";
// React
import React from "react";
import "./globals.css";
import { ThemeProvider } from "@/utils/context";
// Redux
import { Provider } from "react-redux";
import store from "@/app/store";
// Clerk
import { ClerkProvider } from "@clerk/nextjs";
import { enUS, trTR } from "@clerk/localizations"; // clerk dil seçeneği
// Radix UI
import "@radix-ui/themes/styles.css"; // Radix UI theme
import "./theme-config.css";
import { Theme } from "@radix-ui/themes"; // Radix UI theme

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en" suppressHydrationWarning>
        <body className={"light "}>
          <ClerkProvider
            appearance={{
              variables: {
                colorPrimary: "#FC6A03",
              },
            }}
            localization={enUS}
          >
            <ThemeProvider>
              <Theme
                appearance="light"
                accentColor="orange"
                grayColor="slate"
                panelBackground="solid"
                radius="small"
              >
                {children}
              </Theme>
            </ThemeProvider>
          </ClerkProvider>
        </body>
      </html>
    </Provider>
  );
}
