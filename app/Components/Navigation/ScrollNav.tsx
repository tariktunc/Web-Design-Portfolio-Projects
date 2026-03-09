"use client";
import React from "react";
import { useScrollSpy } from "@/app/hooks/useScrollSpy";

const NAV_ITEMS = [
  { id: "about", label: "Hakkımda" },
  { id: "experience", label: "Deneyim" },
  { id: "projects", label: "Projeler" },
  { id: "blog", label: "Blog" },
];

export default function ScrollNav({ className = "" }: { className?: string }) {
  const activeId = useScrollSpy(
    NAV_ITEMS.map((item) => item.id),
    100
  );

  return (
    <nav className={className} aria-label="In-page navigation">
      <ul className="w-max">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center py-3 transition-all duration-300 ${
                  isActive
                    ? "text-green"
                    : "text-slate-custom hover:text-lightest-slate"
                }`}
              >
                <span
                  className={`mr-4 h-px transition-all duration-500 ${
                    isActive
                      ? "w-16 bg-green shadow-[0_0_8px_rgba(100,255,218,0.6)]"
                      : "w-8 bg-navy-lighter group-hover:w-16 group-hover:bg-lightest-slate"
                  }`}
                />
                <span
                  className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? "drop-shadow-[0_0_6px_rgba(100,255,218,0.4)]"
                      : ""
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
