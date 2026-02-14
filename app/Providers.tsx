"use client";
import React from "react";
import { ThemeProvider, useTheme } from "@/utils/context";
import { Provider } from "react-redux";
import store from "@/app/store";
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

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RadixThemeWrapper>{children}</RadixThemeWrapper>
      </ThemeProvider>
    </Provider>
  );
}
