import Navbar from "@/app/Components/Navbar/Navbar";
import { Container } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Suspense } from "react";

export default function Home({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{/* Tüm sayfa yapılarının eşit olunması için container kullanıldı. */}
			<Container size="4" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
				{children}
			</Container>
		</>
	);
}
