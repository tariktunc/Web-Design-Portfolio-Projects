import { Button, Flex } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function App() {
	return (
		<Flex justify={"start"} align={"center"}>
			<Button asChild variant="ghost">
				<MagnifyingGlassIcon width={"25"} height={"25"} />
			</Button>
		</Flex>
	);
}
