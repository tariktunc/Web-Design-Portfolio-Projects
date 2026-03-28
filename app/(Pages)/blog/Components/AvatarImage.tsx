import { Avatar } from "@radix-ui/themes";
import Link from "next/link";

export interface IAppProps {
  imageSrc: string;
  alt: string;
  fallback: string;
  link?: string | undefined;
  internal?: boolean;
}

export default function App(props: IAppProps) {
  return (
    <Link
      target={props.internal ? undefined : "_blank"}
      href={props.link || "/"}
    >
      <Avatar
        size={{
          initial: "6",
          xs: "7",
          sm: "8",
          md: "9",
        }}
        src={props.imageSrc}
        alt={props.alt}
        fallback={props.fallback}
      />
    </Link>
  );
}
