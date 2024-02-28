import Navbar from "@/app/Components/Navbar/Navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="flex h-screen justify-center items-center">
				<h1 className="text-3xl">We Blog</h1>
			</div>
		</>
	);
}
