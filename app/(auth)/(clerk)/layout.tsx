import Navbar from "@/app/Components/Navbar/Navbar";
import { Button, Text, Flex } from "@radix-ui/themes";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<Flex justify={"center"} align={"center"}>
				{children}
			</Flex>
		</>
	);
};

export default ClerkLayout;
