"use client";
import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12"
    >
      {label && (
        <p className="font-mono text-[10px] tracking-[0.4em] text-nox-gray uppercase mb-3">
          ✦ {label}
        </p>
      )}
      <h2 className={`font-display text-5xl md:text-7xl tracking-widest ${light ? "text-nox-black" : "text-nox-white"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-sm leading-relaxed max-w-lg ${light ? "text-nox-muted" : "text-nox-gray"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
