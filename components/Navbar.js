"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartContext } from "@/hooks/CartContext";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCartContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll for navbar styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-nox-black/95 backdrop-blur-md border-b border-nox-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-3xl text-nox-white tracking-widest group-hover:text-nox-accent transition-colors duration-200">
              NOX
            </span>
            <span className="hidden sm:block font-mono text-[9px] text-nox-gray tracking-[0.3em] mt-1 uppercase">
              Stick With Mou
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-200 relative group ${
                  pathname === href
                    ? "text-nox-accent"
                    : "text-nox-gray hover:text-nox-white"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-nox-accent transition-all duration-200 ${
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 group">
              <ShoppingCart
                size={20}
                className="text-nox-light group-hover:text-nox-accent transition-colors duration-200"
              />
              {/* Item count badge */}
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-nox-accent text-nox-black text-[9px] font-bold rounded-full flex items-center justify-center font-mono"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-nox-light hover:text-nox-accent transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-nox-black flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                <Link
                  href={href}
                  className={`font-display text-5xl tracking-widest ${
                    pathname === href ? "text-nox-accent" : "text-nox-white hover:text-nox-accent"
                  } transition-colors`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/cart"
                className="font-display text-5xl tracking-widest text-nox-gray hover:text-nox-accent transition-colors"
              >
                CART {totalItems > 0 && `(${totalItems})`}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
