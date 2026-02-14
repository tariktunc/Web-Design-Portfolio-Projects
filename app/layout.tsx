"use client";
// React
import React from "react";
import "./globals.css";
import { ThemeProvider, useTheme } from "@/utils/context";
// Redux
import { Provider } from "react-redux";
import store from "@/app/store";
// Clerk
import { ClerkProvider } from "@clerk/nextjs";
import { enUS } from "@clerk/localizations";
// Radix UI
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Theme } from "@radix-ui/themes";

function RadixThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Theme
      appearance={theme === "dark" ? "dark" : "light"}
      accentColor="orange"
      grayColor="slate"
      panelBackground="solid"
      radius="medium"
    >
      {children}
    </Theme>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ClerkProvider
            appearance={{
              variables: {
                colorPrimary: "#FC6A03",
              },
            }}
            localization={enUS}
          >
            <ThemeProvider>
              <RadixThemeWrapper>{children}</RadixThemeWrapper>
            </ThemeProvider>
          </ClerkProvider>
        </body>
      </html>
    </Provider>
  );
}
