"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="theme-toggle" style={{ width: 36, height: 36 }} />;
  }

  const isDark = resolvedTheme === "dark";

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  return (
    <button
      onClick={cycleTheme}
      className="theme-toggle"
      aria-label={`Tema: ${theme === "system" ? "Sistem" : isDark ? "Koyu" : "Açık"}. Tıklayarak değiştir.`}
      title={theme === "system" ? "Sistem teması" : isDark ? "Koyu tema" : "Açık tema"}
    >
      {isDark ? (
        <MoonIcon className="h-4.5 w-4.5" />
      ) : theme === "system" ? (
        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 2.5C1 1.67157 1.67157 1 2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V10.5C14 11.3284 13.3284 12 12.5 12H2.5C1.67157 12 1 11.3284 1 10.5V2.5ZM2.5 2C2.22386 2 2 2.22386 2 2.5V10.5C2 10.7761 2.22386 11 2.5 11H12.5C12.7761 11 13 10.7761 13 10.5V2.5C13 2.22386 12.7761 2 12.5 2H2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
          <path d="M4.5 13.5C4.5 13.2239 4.72386 13 5 13H10C10.2761 13 10.5 13.2239 10.5 13.5C10.5 13.7761 10.2761 14 10 14H5C4.72386 14 4.5 13.7761 4.5 13.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
        </svg>
      ) : (
        <SunIcon className="h-4.5 w-4.5" />
      )}
    </button>
  );
}
