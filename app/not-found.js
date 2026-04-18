"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="bg-nox-black min-h-screen pt-16 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-mono text-[10px] tracking-[0.5em] text-nox-gray uppercase mb-6">
          Error 404
        </p>
        <h1 className="font-display text-[20vw] leading-none tracking-widest text-nox-border mb-4">
          LOST
        </h1>
        <p className="font-mono text-xs text-nox-gray tracking-widest mb-10">
          This page doesn't exist. Maybe it never did.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">Back to Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}
