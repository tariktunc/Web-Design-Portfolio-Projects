import { Text } from "@radix-ui/themes";

export interface IAppProps {
	date: string;
}

export default function App(props: IAppProps) {
	return (
		<Text as="p" size={{ initial: "1", xs: "2", md: "3" }}>
			{props.date}
		</Text>
	);
}
