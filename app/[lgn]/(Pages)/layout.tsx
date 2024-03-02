import Navbar from "@/app/Components/Navbar/Navbar";
export default function Home({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
