"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useScrollDirection } from "@/app/hooks/useScrollDirection";

/* ── Nav items ── */
const NAV_ITEMS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Blog", href: "/blog" },
] as const;

/* ── Easing ── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ── Navbar show/hide ── */
const navVariants = {
  visible: { y: 0 },
  hidden: { y: "-100%" },
};

/* ── Mobile panel ── */
const panelEase: [number, number, number, number] = [0.32, 0.72, 0, 1];
const panelVariants = {
  closed: { x: "100%" },
  open: { x: 0, transition: { duration: 0.35, ease: panelEase } },
  exit: { x: "100%", transition: { duration: 0.25, ease: panelEase } },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
  exit: { opacity: 0 },
};

const menuStagger = {
  closed: {},
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const menuItem = {
  closed: { opacity: 0, x: 24 },
  open: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
};

/* ── Desktop link stagger ── */
const linkContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const linkItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

/* ══════════════════════════════════════════
   ThemeToggle — Dark / Light / System
   ══════════════════════════════════════════ */
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="navbar-toggle-placeholder"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const isSystem = theme === "system";

  const cycle = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  const label = isSystem ? "Sistem teması" : isDark ? "Koyu tema" : "Açık tema";

  return (
    <button
      onClick={cycle}
      className="navbar-toggle"
      aria-label={`${label} aktif. Tıklayarak tema değiştir.`}
      title={label}
    >
      {isDark ? (
        /* Moon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : isSystem ? (
        /* Monitor */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ) : (
        /* Sun */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

/* ══════════════════════════════════════════
   HamburgerIcon — 3 lines ↔ X morph
   ══════════════════════════════════════════ */
function HamburgerIcon({ isOpen, reduced }: { isOpen: boolean; reduced: boolean | null }) {
  const t = reduced ? { duration: 0 } : { duration: 0.3, ease };
  const bar: React.CSSProperties = {
    width: 22, height: 2, borderRadius: 2, position: "absolute", left: 0,
    backgroundColor: "currentColor",
  };

  return (
    <div style={{ width: 22, height: 16, position: "relative" }} aria-hidden="true">
      <motion.div style={{ ...bar, top: 0 }} animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={t} />
      <motion.div style={{ ...bar, top: 7 }} animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={t} />
      <motion.div style={{ ...bar, top: 14 }} animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={t} />
    </div>
  );
}

/* ══════════════════════════════════════════
   Navbar
   ══════════════════════════════════════════ */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [hoveredHref, setHoveredHref] = React.useState<string | null>(null);
  const pathname = usePathname();
  const { direction, atTop } = useScrollDirection(8);
  const reduced = useReducedMotion();
  const menuBtnRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  /* Close on route change */
  React.useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Body lock + focus management */
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        const first = panelRef.current?.querySelector("a") as HTMLElement | null;
        first?.focus();
      });
    } else {
      document.body.style.overflow = "";
      menuBtnRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Escape closes mobile menu */
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Fixed navbar ── */}
      <motion.nav
        className={`navbar-glass${!atTop ? " navbar-scrolled" : ""}`}
        aria-label="Ana gezinme"
        variants={navVariants}
        initial="visible"
        animate={
          reduced ? "visible"
            : direction === "down" && !atTop && !menuOpen ? "hidden" : "visible"
        }
        transition={reduced ? { duration: 0 } : { duration: 0.35, ease }}
      >
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6" style={{ maxWidth: 1280, height: 64 }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Ana sayfa — tariktunc">
            <Image src="/Logo/Grayscale.webp" alt="" width={28} height={70} aria-hidden="true" />
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold navbar-logo-text">tariktunc</span>
              <span className="text-[10px] navbar-sub-text">blakfy tarafından işletilmektedir</span>
            </span>
          </Link>

          {/* Desktop links */}
          <motion.ul
            className="hidden md:flex items-center gap-1"
            variants={linkContainer}
            initial={reduced ? "visible" : "hidden"}
            animate="visible"
            onMouseLeave={() => setHoveredHref(null)}
            role="list"
          >
            {NAV_ITEMS.map((item, i) => {
              const active = isActive(item.href);
              const hovered = hoveredHref === item.href;
              return (
                <motion.li key={item.href} variants={linkItem}>
                  <Link
                    href={item.href}
                    className="navbar-link"
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    data-active={active || undefined}
                  >
                    {/* Hover pill */}
                    {hovered && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 rounded-lg navbar-hover-bg"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {/* Active pill */}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg navbar-active-bg"
                        style={{ zIndex: -1 }}
                        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="font-mono text-[11px] mr-1.5 navbar-link-num">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuBtnRef}
              onClick={() => setMenuOpen((v) => !v)}
              className="navbar-toggle md:hidden"
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
            >
              <HamburgerIcon isOpen={menuOpen} reduced={reduced} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-16" aria-hidden="true" />

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="nav-overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="exit"
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 navbar-overlay"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="nav-panel"
              id="mobile-nav-panel"
              ref={panelRef}
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="exit"
              role="dialog"
              aria-modal={true}
              aria-label="Gezinme menüsü"
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] overflow-y-auto navbar-mobile-panel"
            >
              {/* Close button inside panel */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="navbar-toggle"
                  aria-label="Menüyü kapat"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobil gezinme" className="px-4 pt-4">
                <motion.ul variants={menuStagger} initial="closed" animate="open" exit="closed" role="list" className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, i) => {
                    const active = isActive(item.href);
                    return (
                      <motion.li key={item.href} variants={menuItem}>
                        <Link
                          href={item.href}
                          className={`navbar-mobile-link${active ? " navbar-mobile-active" : ""}`}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="font-mono text-xs mr-2 navbar-link-num">
                            {String(i + 1).padStart(2, "0")}.
                          </span>
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              {/* Mobile theme indicator */}
              <div className="px-4 mt-8 pt-6 border-t navbar-mobile-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs navbar-sub-text">Tema</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
