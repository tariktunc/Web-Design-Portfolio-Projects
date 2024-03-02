"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
const Languagei18next = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const pathSegments = pathname.split("/");
		const lang = pathSegments[1];
		if (!["tr", "en"].includes(lang)) {
			router.push("/");
		}
	}, [pathname]);
	return <>{children}</>;
};

export default Languagei18next;
