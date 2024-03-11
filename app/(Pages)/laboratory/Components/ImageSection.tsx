import * as React from "react";
import Image from "next/image";
import { Section } from "@radix-ui/themes";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <Section size={"1"}>
      <Image
        src="/laboratorywallpaper2.webp"
        alt="laboratory wallpaper image"
        width={5000}
        height={100}
        className="aspect-auto w-full block object-cover rounded bg-gray-200"
      />
    </Section>
  );
}
