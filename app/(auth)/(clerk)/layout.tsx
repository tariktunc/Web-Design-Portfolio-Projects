import Navbar from "@/app/Components/Navbar/Navbar";
import { Flex } from "@radix-ui/themes";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<Flex justify={"center"} align={"center"} className="py-5">
				{children}
			</Flex>
		</>
	);
};

export default ClerkLayout;
