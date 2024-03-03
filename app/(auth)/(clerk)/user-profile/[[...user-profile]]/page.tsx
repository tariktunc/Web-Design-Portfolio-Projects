import { UserProfile } from "@clerk/nextjs";
import { Button, Text, Flex } from "@radix-ui/themes";

export default function Home() {
	return (
		<Flex height={"100%"} direction={"column"} mt={"5"} mb={"5"}>
			<UserProfile path="/user-profile" routing="path" />
		</Flex>
	);
}
