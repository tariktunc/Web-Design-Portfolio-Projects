import { Flex, Text } from "@radix-ui/themes";

export interface IAppProps {
	title: string;
}

export default function App(props: IAppProps) {
	return (
		<Text as="p" weight={"bold"} size={{ xs: "5", md: "7" }}>
			{props.title}
		</Text>
	);
}
