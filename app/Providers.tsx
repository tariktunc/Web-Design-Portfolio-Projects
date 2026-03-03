"use client";
import React from "react";
import { ThemeProvider } from "@/utils/context";
import { Provider } from "react-redux";
import store from "@/app/store";
import { Theme } from "@radix-ui/themes";

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
          {children}
        </Theme>
      </ThemeProvider>
    </Provider>
  );
}
