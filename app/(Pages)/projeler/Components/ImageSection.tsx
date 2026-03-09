import Image from "next/image";
import { Section } from "@radix-ui/themes";

export default function ImageSection() {
  return (
    <Section size={"1"}>
      <Image
        src="/laboratorywallpaper2.webp"
        alt="Laboratory projects banner"
        width={1600}
        height={400}
        className="aspect-auto w-full block object-cover rounded bg-gray-200"
        priority
      />
    </Section>
  );
}
