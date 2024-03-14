import { Avatar } from "@radix-ui/themes";
import Link from "next/link";

export interface IAppProps {
  imageSrc: string;
  alt: string;
  fallback: string;
  link?: string | undefined;
}

export default function App(props: IAppProps) {
  return (
    // _blank new window or tab
    <Link target="_blank" href={props.link || "/"}>
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
