import * as React from "react";
import { Button, Flex } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export interface IAppProps {}

export default function App(props: IAppProps) {
	return (
		<Flex justify={"start"} align={"center"}>
			<Button asChild variant="ghost">
				<MagnifyingGlassIcon />
			</Button>
		</Flex>
	);
}
