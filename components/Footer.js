"use client";
import Link from "next/link";
import { Instagram, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-nox-border bg-nox-black mt-32">
      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-nox-border py-3 bg-nox-dark">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill(0).map((_, i) => (
            <span key={i} className="font-display text-sm tracking-[0.4em] text-nox-muted mx-8">
              NOX ✦ STICK WITH MOU ✦ PREMIUM VINYL ✦ GEN Z ENERGY ✦ DARK MODE FOREVER ✦
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <span className="font-display text-5xl text-nox-white tracking-widest block mb-3">NOX</span>
          <p className="font-mono text-[10px] text-nox-gray tracking-[0.3em] uppercase mb-6">
            Stick With Mou
          </p>
          <p className="text-nox-gray text-sm leading-relaxed max-w-xs">
            Premium streetwear stickers. Die-cut precision. Weatherproof vinyl. Made for surfaces that deserve it.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-mono text-[10px] tracking-[0.3em] text-nox-gray uppercase mb-6">
            Navigation
          </h4>
          <ul className="space-y-3">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop" },
              { href: "/cart", label: "Cart" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-nox-light text-sm hover:text-nox-accent transition-colors flex items-center gap-1 group"
                >
                  {label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-mono text-[10px] tracking-[0.3em] text-nox-gray uppercase mb-6">
            Connect
          </h4>
          <div className="space-y-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-nox-light hover:text-nox-accent transition-colors group"
            >
              <Instagram size={16} />
              <span className="text-sm">@nox.stickers</span>
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-nox-light hover:text-nox-accent transition-colors group"
            >
              <MessageCircle size={16} />
              <span className="text-sm">WhatsApp Orders</span>
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <div className="mt-8">
            <p className="font-mono text-[10px] text-nox-gray tracking-widest uppercase mb-2">
              Ships from Cairo 🇪🇬
            </p>
            <p className="font-mono text-[10px] text-nox-muted tracking-widest uppercase">
              Worldwide Delivery
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-nox-border px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[10px] text-nox-muted tracking-widest">
          © {new Date().getFullYear()} NOX. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-[10px] text-nox-muted tracking-widest">
          PREMIUM VINYL • WEATHERPROOF • DIE-CUT
        </p>
      </div>
    </footer>
  );
}
