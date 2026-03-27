"use client";
import React from "react";
import { ThemeProvider } from "@/utils/context";
import { useTheme } from "next-themes";
import { Provider } from "react-redux";
import store from "@/app/store";
import { Theme } from "@radix-ui/themes";
import { useLenis, LenisContext } from "@/app/hooks/useLenis";

function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();
  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

function RadixThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  return (
    <Theme
      appearance={(resolvedTheme as "dark" | "light") ?? "dark"}
      accentColor="teal"
      grayColor="slate"
      panelBackground="solid"
      radius="medium"
    >
      {children}
    </Theme>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RadixThemeWrapper>
          <LenisProvider>{children}</LenisProvider>
        </RadixThemeWrapper>
      </ThemeProvider>
    </Provider>
  );
}
