// Radix
import { Container } from "@radix-ui/themes";
// next
// Components
import Navbar from "@/app/Components/Navbar/Navbar";
import WhoAmI from "@/app/Components/WhoAmI/WhoAmI";
// ------------------------------

export default function Home() {
	return (
		<>
			<Navbar />
			<Container
				size={"3"}
				style={{ paddingLeft: "5%", paddingRight: "5%" }}
			>
			</Container>
		</>
	);
}
