import { Flex, Text } from "@radix-ui/themes";

export interface IAppProps {
	summary: string;
}

export default function App(props: IAppProps) {
	return (
		<Flex>
			<Text as="p">{props.summary}</Text>
		</Flex>
	);
}
