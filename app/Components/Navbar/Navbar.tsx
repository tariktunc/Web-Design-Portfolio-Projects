"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Flex, Container, Text } from "@radix-ui/themes";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

type NavItem = { label: string; href: string };

export default function Navbar() {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [navItems, setNavItems] = React.useState<NavItem[]>([]);
	const pathname = usePathname();
	const navRef = React.useRef<HTMLElement>(null);

	React.useEffect(() => {
		fetch("/Data/navbarItem.json")
			.then((res) => res.json())
			.then((data) => setNavItems(data))
			.catch(() => {});
	}, []);

	React.useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

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
			<nav ref={navRef} className="glass-navbar" aria-label="Main navigation">
				<Container size="3" px="4">
					<Flex justify="between" align="center" style={{ height: 64 }}>
						<Link href="/" className="link-hover">
							<Flex align="center" gap="2">
								<Image
									src="/Logo/Grayscale.webp"
									alt="Tarik Tunc logo"
									width={32}
									height={80}
								/>
								<Flex direction="column">
									<Text
										size="5"
										weight="bold"
										style={{ color: "var(--lightest-slate)" }}
									>
										tariktunc
									</Text>
									<Text size="1" style={{ color: "var(--slate)" }}>
										operated by blakfy
									</Text>
								</Flex>
							</Flex>
						</Link>

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

						<Flex align="center" gap="3">
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

			<div className="navbar-spacer" />

			<div
				className={`mobile-overlay ${menuOpen ? "open" : ""}`}
				onClick={() => setMenuOpen(false)}
				aria-hidden="true"
			/>

			<div
				className={`mobile-panel ${menuOpen ? "open" : ""}`}
				role="dialog"
				aria-modal={menuOpen}
				aria-label="Navigation menu"
			>
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
