"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Flex, Text } from "@radix-ui/themes";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useScrollDirection } from "@/app/hooks/useScrollDirection";

type NavItem = { label: string; href: string };

/* ── Shared easing ── */
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Navbar hide/show ── */
const navbarVariants = {
	visible: { y: 0 },
	hidden: { y: "-100%" },
};

/* ── Mobile overlay ── */
const overlayVariants = {
	closed: { opacity: 0 },
	open: { opacity: 1 },
};

/* ── Mobile panel ── */
const panelVariants = {
	closed: { x: "100%" },
	open: { x: 0 },
};

/* ── Mobile menu item stagger ── */
const menuContainerVariants = {
	closed: {},
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.15 },
	},
};

const menuItemVariants = {
	closed: { opacity: 0, x: 30, filter: "blur(6px)" },
	open: {
		opacity: 1,
		x: 0,
		filter: "blur(0px)",
		transition: { duration: 0.4, ease: smoothEase },
	},
};

/* ── Desktop nav link stagger ── */
const navLinkContainerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.06, delayChildren: 0.3 },
	},
};

const navLinkItemVariants = {
	hidden: { opacity: 0, y: -12 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: smoothEase },
	},
};

/* ── Logo entrance ── */
const logoVariants = {
	hidden: { opacity: 0, x: -20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5, ease: smoothEase, delay: 0.1 },
	},
};

/* ═══════════════════════════════════════════
   HamburgerIcon — morphing 3-line → X
   ═══════════════════════════════════════════ */
function HamburgerIcon({
	isOpen,
	reduced,
}: {
	isOpen: boolean;
	reduced: boolean | null;
}) {
	const transition = reduced
		? { duration: 0 }
		: { duration: 0.3, ease: smoothEase };

	const lineStyle: React.CSSProperties = {
		width: 22,
		height: 2,
		backgroundColor: "var(--slate-light)",
		borderRadius: 2,
		position: "absolute",
		left: 0,
	};

	return (
		<div style={{ width: 22, height: 16, position: "relative" }}>
			<motion.div
				style={{ ...lineStyle, top: 0 }}
				animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
				transition={transition}
			/>
			<motion.div
				style={{ ...lineStyle, top: 7 }}
				animate={
					isOpen
						? { opacity: 0, scaleX: 0 }
						: { opacity: 1, scaleX: 1 }
				}
				transition={transition}
			/>
			<motion.div
				style={{ ...lineStyle, top: 14 }}
				animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
				transition={transition}
			/>
		</div>
	);
}

/* ═══════════════════════════════════════════
   NavLink — with layoutId indicators
   ═══════════════════════════════════════════ */
function NavLink({
	item,
	index,
	isActive,
	isHovered,
	onHoverStart,
	reduced,
}: {
	item: NavItem;
	index: number;
	isActive: boolean;
	isHovered: boolean;
	onHoverStart: () => void;
	reduced: boolean | null;
}) {
	const isExternal = item.href.startsWith("http");

	return (
		<Link
			href={item.href}
			className="nav-link"
			aria-current={isActive ? "page" : undefined}
			onMouseEnter={onHoverStart}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
		>
			{/* Hover-follow background */}
			{isHovered && (
				<motion.span
					layoutId="nav-hover"
					className="absolute inset-0 rounded-lg"
					style={{
						backgroundColor: "rgba(100, 255, 218, 0.08)",
						zIndex: -1,
					}}
					transition={{
						type: "spring",
						stiffness: 400,
						damping: 30,
					}}
				/>
			)}

			{/* Active sliding pill */}
			{isActive && (
				<motion.span
					layoutId="nav-active"
					className="absolute inset-0 rounded-lg"
					style={{
						backgroundColor: "rgba(100, 255, 218, 0.1)",
						zIndex: -1,
					}}
					transition={
						reduced
							? { duration: 0 }
							: { type: "spring", stiffness: 380, damping: 28 }
					}
				/>
			)}

			{/* Numbered prefix */}
			<span
				className="font-mono text-xs mr-1.5"
				style={{ color: "var(--green)" }}
			>
				{String(index + 1).padStart(2, "0")}.
			</span>

			<span style={{ color: isActive ? "var(--green)" : undefined }}>
				{item.label}
			</span>
		</Link>
	);
}

/* ═══════════════════════════════════════════
   Navbar
   ═══════════════════════════════════════════ */
export default function Navbar() {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [navItems, setNavItems] = React.useState<NavItem[]>([]);
	const [hoveredHref, setHoveredHref] = React.useState<string | null>(null);
	const pathname = usePathname();
	const { direction, atTop } = useScrollDirection(8);
	const reduced = useReducedMotion();
	const menuButtonRef = React.useRef<HTMLButtonElement>(null);
	const panelRef = React.useRef<HTMLDivElement>(null);

	/* Fetch nav items */
	React.useEffect(() => {
		fetch("/Data/navbarItem.json")
			.then((res) => res.json())
			.then((data) => setNavItems(data))
			.catch(() => {});
	}, []);

	/* Close menu on route change */
	React.useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	/* Body overflow lock + focus management */
	React.useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
			requestAnimationFrame(() => {
				const firstLink = panelRef.current?.querySelector(
					"a"
				) as HTMLElement;
				if (firstLink) firstLink.focus();
			});
		} else {
			document.body.style.overflow = "";
			menuButtonRef.current?.focus();
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	/* Escape key closes mobile menu */
	React.useEffect(() => {
		if (!menuOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false);
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [menuOpen]);

	return (
		<>
			<motion.nav
				className={`glass-navbar ${!atTop ? "scrolled" : ""}`}
				aria-label="Main navigation"
				variants={navbarVariants}
				initial="visible"
				animate={
					reduced
						? "visible"
						: direction === "down" && !atTop && !menuOpen
							? "hidden"
							: "visible"
				}
				transition={
					reduced
						? { duration: 0 }
						: { duration: 0.35, ease: smoothEase }
				}
			>
				<div className="mx-auto px-4" style={{ maxWidth: 1600 }}>
					<Flex
						justify="between"
						align="center"
						style={{ height: 64 }}
					>
						{/* Logo — slide from left */}
						<motion.div
							variants={logoVariants}
							initial={reduced ? "visible" : "hidden"}
							animate="visible"
						>
							<Link
								href="/"
								className="link-hover"
								aria-label="Home — tariktunc"
							>
								<Flex align="center" gap="2">
									<Image
										src="/Logo/Grayscale.webp"
										alt="Tarik Tunç logo"
										width={32}
										height={80}
									/>
									<Flex direction="column">
										<Text
											size="5"
											weight="bold"
											style={{
												color: "var(--lightest-slate)",
											}}
										>
											tariktunc
										</Text>
										<Text
											size="1"
											style={{ color: "var(--slate)" }}
										>
											blakfy tarafından işletilmektedir
										</Text>
									</Flex>
								</Flex>
							</Link>
						</motion.div>

						{/* Desktop nav links — stagger from top */}
						<motion.div
							className="hidden sm:flex"
							variants={navLinkContainerVariants}
							initial={reduced ? "visible" : "hidden"}
							animate="visible"
							onMouseLeave={() => setHoveredHref(null)}
						>
							<Flex gap="2" align="center">
								{navItems.map((item, index) => {
									const isActive = pathname === item.href;
									return (
										<motion.div
											key={item.label}
											variants={navLinkItemVariants}
										>
											<NavLink
												item={item}
												index={index}
												isActive={isActive}
												isHovered={
													hoveredHref === item.href
												}
												onHoverStart={() =>
													setHoveredHref(item.href)
												}
												reduced={reduced}
											/>
										</motion.div>
									);
								})}
							</Flex>
						</motion.div>

						{/* Mobile hamburger */}
						<Flex align="center" gap="3">
							<div className="sm:hidden">
								<button
									ref={menuButtonRef}
									onClick={() => setMenuOpen(!menuOpen)}
									className="theme-toggle"
									aria-label={
										menuOpen ? "Close menu" : "Open menu"
									}
									aria-expanded={menuOpen}
								>
									<HamburgerIcon
										isOpen={menuOpen}
										reduced={reduced}
									/>
								</button>
							</div>
						</Flex>
					</Flex>
				</div>
			</motion.nav>

			<div className="navbar-spacer" />

			{/* Mobile overlay + panel */}
			<AnimatePresence>
				{menuOpen && (
					<>
						{/* Overlay */}
						<motion.div
							key="overlay"
							variants={overlayVariants}
							initial="closed"
							animate="open"
							exit="closed"
							transition={{ duration: 0.3 }}
							onClick={() => setMenuOpen(false)}
							aria-hidden="true"
							style={{
								position: "fixed",
								inset: 0,
								zIndex: 40,
								backgroundColor: "rgba(0, 0, 0, 0.6)",
							}}
						/>

						{/* Panel */}
						<motion.div
							key="panel"
							ref={panelRef}
							variants={panelVariants}
							initial="closed"
							animate="open"
							exit="closed"
							transition={
								reduced
									? { duration: 0 }
									: {
											duration: 0.35,
											ease: [0.32, 0.72, 0, 1],
										}
							}
							role="dialog"
							aria-modal={true}
							aria-label="Navigation menu"
							style={{
								position: "fixed",
								top: 0,
								right: 0,
								bottom: 0,
								zIndex: 45,
								width: "min(320px, 85vw)",
								backdropFilter:
									"blur(20px) saturate(180%)",
								WebkitBackdropFilter:
									"blur(20px) saturate(180%)",
								backgroundColor:
									"rgba(10, 25, 47, 0.92)",
								borderLeft:
									"1px solid rgba(255, 255, 255, 0.06)",
								overflowY: "auto",
							}}
						>
							<div style={{ paddingTop: 80 }}>
								<nav
									aria-label="Mobile navigation"
									style={{ padding: "8px 16px" }}
								>
									<motion.div
										variants={menuContainerVariants}
										initial="closed"
										animate="open"
										exit="closed"
									>
										<Flex direction="column" gap="1">
											{navItems.map((item, index) => {
												const isActive =
													pathname === item.href;
												return (
													<motion.div
														key={item.label}
														variants={
															menuItemVariants
														}
													>
														<Link
															href={item.href}
															className={`mobile-nav-item ${isActive ? "active" : ""}`}
															aria-current={
																isActive
																	? "page"
																	: undefined
															}
															onClick={() =>
																setMenuOpen(
																	false
																)
															}
															{...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
														>
															<span
																className="font-mono text-xs mr-2"
																style={{
																	color: "var(--green)",
																}}
															>
																{String(
																	index + 1
																).padStart(
																	2,
																	"0"
																)}
																.
															</span>
															{item.label}
														</Link>
													</motion.div>
												);
											})}
										</Flex>
									</motion.div>
								</nav>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
