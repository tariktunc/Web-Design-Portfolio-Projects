"use client";
import React from "react";
import { ThemeProvider } from "@/utils/context";
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

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Theme
          appearance="dark"
          accentColor="teal"
          grayColor="slate"
          panelBackground="solid"
          radius="medium"
        >
          <LenisProvider>{children}</LenisProvider>
        </Theme>
      </ThemeProvider>
    </Provider>
  );
}
