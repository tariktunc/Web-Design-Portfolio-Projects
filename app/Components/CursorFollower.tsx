"use client";
import React from "react";

export default function CursorFollower() {
	const dotRef = React.useRef<HTMLDivElement>(null);
	const mouse = React.useRef({ x: -100, y: -100 });
	const pos = React.useRef({ x: -100, y: -100 });
	const rafId = React.useRef<number>(0);
	const visible = React.useRef(false);

	React.useEffect(() => {
		// Hide on touch devices
		if (window.matchMedia("(pointer: coarse)").matches) return;

		const dot = dotRef.current;
		if (!dot) return;

		const onMouseMove = (e: MouseEvent) => {
			mouse.current = { x: e.clientX, y: e.clientY };
			if (!visible.current) {
				visible.current = true;
				dot.style.opacity = "1";
			}
		};

		const onMouseLeave = () => {
			visible.current = false;
			dot.style.opacity = "0";
		};

		// Lerp factor: lower = more delay. 0.15 ≈ 30ms delay feel at 60fps
		const lerp = 0.15;

		const animate = () => {
			pos.current.x += (mouse.current.x - pos.current.x) * lerp;
			pos.current.y += (mouse.current.y - pos.current.y) * lerp;
			dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
			rafId.current = requestAnimationFrame(animate);
		};

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseleave", onMouseLeave);
		rafId.current = requestAnimationFrame(animate);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseleave", onMouseLeave);
			cancelAnimationFrame(rafId.current);
		};
	}, []);

	return (
		<div
			ref={dotRef}
			className="cursor-dot"
			style={{ opacity: 0 }}
			aria-hidden="true"
		/>
	);
}
