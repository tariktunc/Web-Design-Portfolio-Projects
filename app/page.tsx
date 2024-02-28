import { UserButton } from "@clerk/nextjs";
import Navbar from "@/app/Components/Navbar/Navbar";

export default function Home() {
	return (
		<div className="h-screen">
			<Navbar />
			<p>Coming Soon</p>
		</div>
	);
}
