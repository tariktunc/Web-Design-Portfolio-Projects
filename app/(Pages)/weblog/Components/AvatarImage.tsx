import { Avatar } from "@radix-ui/themes";

export interface IAppProps {
	src: string;
	alt: string;
	fallback: string;
}

export default function App(props: IAppProps) {
	return (
		<Avatar
			size={{
				initial: "6",
				xs: "7",
				sm: "8",
				md: "9",
			}}
			src={props.src}
			alt={props.alt}
			fallback={props.fallback}
		/>
	);
}
