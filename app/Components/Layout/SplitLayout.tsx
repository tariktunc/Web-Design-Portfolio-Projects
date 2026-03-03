"use client";
import React from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export default function SplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 sm:px-12 sm:py-20 md:px-24 md:py-0">
      <div className="md:flex md:justify-between md:gap-4">
        <LeftPanel />
        <RightPanel>{children}</RightPanel>
      </div>
    </div>
  );
}
