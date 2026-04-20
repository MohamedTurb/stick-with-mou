"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, Shield, Package } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";

// Fade-in-up animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const featuredProducts = getFeaturedProducts();

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax on hero text
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="bg-nox-black">
      {/* ═══ HERO SECTION ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay"
      >
        {/* Background grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Accent glow blob */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-nox-accent/5 blur-[120px] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          {/* Pre-label */}
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-mono text-[10px] tracking-[0.5em] text-nox-gray uppercase mb-8"
          >
            ✦ Premium Stickers ✦
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-[18vw] sm:text-[16vw] md:text-[14vw] leading-none tracking-wider text-nox-white"
          >
            STICK
          </motion.h1>
          <motion.h1
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-[18vw] sm:text-[16vw] md:text-[14vw] leading-none tracking-wider text-nox-accent -mt-4 md:-mt-6"
          >
            WITH
          </motion.h1>
          <motion.h1
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-[18vw] sm:text-[16vw] md:text-[14vw] leading-none tracking-wider text-nox-white -mt-4 md:-mt-6"
          >
            MOU
          </motion.h1>

          {/* Subtext + CTA */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <p className="text-nox-gray text-sm max-w-xs text-center sm:text-left">
              Die-cut precision. Weatherproof vinyl.
              <br />Made for surfaces that deserve it.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg" className="group">
                Shop Now
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] tracking-[0.4em] text-nox-muted uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-nox-muted to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══ TICKER STRIP ═══ */}
      <div className="border-y border-nox-border bg-nox-dark py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(6).fill(0).map((_, i) => (
            <span key={i} className="font-mono text-xs tracking-[0.3em] text-nox-gray uppercase mx-10">
              STICK WITH MOU STICKERS ✦ WEATHERPROOF ✦ DIE-CUT VINYL ✦ SHIPS WORLDWIDE ✦ HOLOGRAPHIC ✦ MATTE + GLOSS ✦
            </span>
          ))}
        </div>
      </div>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading
            label="New Drops"
            title="FEATURED"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/shop">
              <Button variant="ghost" size="sm" className="group">
                View All
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ ABOUT / BRAND ETHOS ═══ */}
      <section className="border-t border-nox-border">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: big statement */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[10px] tracking-[0.4em] text-nox-gray uppercase mb-6">
                ✦ About Stick With Mou
              </p>
              <h2 className="font-display text-6xl md:text-8xl tracking-widest text-nox-white leading-none mb-8">
                DARK.<br />
                <span className="text-nox-accent">MINIMAL.</span><br />
                REAL.
              </h2>
              <p className="text-nox-gray text-sm leading-relaxed mb-6 max-w-md">
                Stick With Mou was born from a simple idea: stickers should be art. Not an afterthought. Every design is crafted with obsessive attention to detail — the kind you notice when you peel the backing and feel the weight of the cut.
              </p>
              <p className="text-nox-gray text-sm leading-relaxed mb-8 max-w-md">
                Stick With Mou means committing to what you believe in. That's the ethos. That's the brand.
              </p>
              <Link href="/shop">
                <Button variant="secondary">
                  Explore Collection
                </Button>
              </Link>
            </motion.div>

            {/* Right: feature cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="grid grid-cols-1 gap-4"
            >
              {[
                {
                  icon: <Zap size={18} />,
                  title: "PREMIUM VINYL",
                  desc: "Outdoor-grade, UV-resistant vinyl that lasts years without peeling or fading.",
                },
                {
                  icon: <Shield size={18} />,
                  title: "WEATHERPROOF",
                  desc: "Rain, sun, cold — these stickers hold. Built for real environments.",
                },
                {
                  icon: <Package size={18} />,
                  title: "DIE-CUT PRECISION",
                  desc: "0.5mm tolerance cuts. Every edge is intentional. No white borders.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex gap-4 p-6 bg-nox-card border border-nox-border hover:border-nox-muted transition-colors group"
                >
                  <div className="text-nox-accent mt-0.5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-mono text-xs tracking-[0.2em] text-nox-white mb-2">{item.title}</h3>
                    <p className="text-nox-gray text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FULL-WIDTH CTA BANNER ═══ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-nox-accent noise-overlay py-24 px-6"
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0,0,0,0.4) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.4em] text-nox-white/60 uppercase mb-4">
            Limited drops. No restocks.
          </p>
          <h2 className="font-display text-6xl md:text-8xl tracking-widest text-nox-white leading-none mb-8">
            GET YOURS NOW
          </h2>
          <Link href="/shop">
            <Button variant="primary" size="lg" className="!bg-nox-black !text-nox-accent hover:!bg-nox-dark group">
              Browse Collection
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
