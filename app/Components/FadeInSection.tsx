"use client";
import React from "react";

export default function FadeInSection({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add("visible");
					observer.unobserve(el);
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className={`fade-in-section ${className}`.trim()}>
			{children}
		</div>
	);
}
