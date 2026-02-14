"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Flex, Container, Text } from "@radix-ui/themes";
import {
	HamburgerMenuIcon,
	Cross1Icon,
	MoonIcon,
	SunIcon,
} from "@radix-ui/react-icons";
import { useTheme, ThemeContext } from "@/utils/context";

type NavItem = { label: string; href: string };

export default function Navbar() {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [navItems, setNavItems] = React.useState<NavItem[]>([]);
	const pathname = usePathname();
	const { theme, toggleTheme } = useTheme();
	const themeCtx = React.useContext(ThemeContext) as { theme: string };
	const navRef = React.useRef<HTMLElement>(null);

	// Fetch nav items
	React.useEffect(() => {
		fetch("/Data/navbarItem.json")
			.then((res) => res.json())
			.then((data) => setNavItems(data))
			.catch(() => {});
	}, []);

	// Close mobile menu on route change
	React.useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	// Scroll shadow detection (ref-based, no re-renders)
	React.useEffect(() => {
		const onScroll = () => {
			if (navRef.current) {
				navRef.current.classList.toggle("scrolled", window.scrollY > 8);
			}
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Lock body scroll when mobile menu is open
	React.useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	return (
		<>
			{/* Fixed glassmorphism navbar */}
			<nav ref={navRef} className="glass-navbar" aria-label="Main navigation">
				<Container size="3" px="4">
					<Flex justify="between" align="center" style={{ height: 64 }}>
						{/* Logo */}
						<Link href="/" className="link-hover">
							<Flex align="center" gap="2">
								<Image
									src={
										themeCtx.theme === "light"
											? "/Logo/Monochrome.webp"
											: "/Logo/Grayscale.webp"
									}
									alt="Tarik Tunc logo"
									width={32}
									height={80}
								/>
								<Flex direction="column">
									<Text size="5" weight="bold">
										tariktunc
									</Text>
									<Text size="1" color="gray">
										operated by blakfy
									</Text>
								</Flex>
							</Flex>
						</Link>

						{/* Desktop nav links */}
						<div className="hidden sm:flex">
							<Flex gap="2" align="center">
								{navItems.map((item) => {
									const isActive = pathname === item.href;
									return (
										<Link
											key={item.label}
											href={item.href}
											className={`nav-link ${isActive ? "nav-link-active" : ""}`}
											aria-current={isActive ? "page" : undefined}
										>
											{item.label}
										</Link>
									);
								})}
							</Flex>
						</div>

						{/* Right side actions */}
						<Flex align="center" gap="3">
							{/* Theme toggle */}
							<button
								onClick={toggleTheme}
								className="theme-toggle"
								aria-label={
									theme === "dark"
										? "Switch to light mode"
										: "Switch to dark mode"
								}
							>
								{theme === "dark" ? (
									<SunIcon width="18" height="18" />
								) : (
									<MoonIcon width="18" height="18" />
								)}
							</button>

							{/* Mobile hamburger */}
							<div className="sm:hidden">
								<button
									onClick={() => setMenuOpen(!menuOpen)}
									className="theme-toggle"
									aria-label={menuOpen ? "Close menu" : "Open menu"}
									aria-expanded={menuOpen}
								>
									{menuOpen ? (
										<Cross1Icon width="20" height="20" />
									) : (
										<HamburgerMenuIcon width="20" height="20" />
									)}
								</button>
							</div>
						</Flex>
					</Flex>
				</Container>
			</nav>

			{/* Spacer to push content below fixed navbar */}
			<div className="navbar-spacer" />

			{/* Mobile overlay */}
			<div
				className={`mobile-overlay ${menuOpen ? "open" : ""}`}
				onClick={() => setMenuOpen(false)}
				aria-hidden="true"
			/>

			{/* Mobile slide-in panel */}
			<div className={`mobile-panel ${menuOpen ? "open" : ""}`} role="dialog" aria-modal={menuOpen} aria-label="Navigation menu">
				<div style={{ paddingTop: 80 }}>
					<nav aria-label="Mobile navigation" style={{ padding: "8px 16px" }}>
						<Flex direction="column" gap="1">
							{navItems.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.label}
										href={item.href}
										className={`mobile-nav-item ${isActive ? "active" : ""}`}
										aria-current={isActive ? "page" : undefined}
										onClick={() => setMenuOpen(false)}
									>
										{item.label}
									</Link>
								);
							})}
						</Flex>
					</nav>
				</div>
			</div>
		</>
	);
}
