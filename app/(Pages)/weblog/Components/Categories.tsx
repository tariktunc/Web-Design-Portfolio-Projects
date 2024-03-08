import { Text } from "@radix-ui/themes";

export interface IAppProps {
	category: string;
}
export default function App(props: IAppProps) {
	return (
		<Text
			as="p"
			weight={"bold"}
			color="blue"
			size={{ initial: "1", xs: "2", md: "3" }}
		>
			{props.category}
		</Text>
	);
}
