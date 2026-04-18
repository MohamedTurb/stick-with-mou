"use client";
import { motion } from "framer-motion";

/**
 * Reusable button component with NOX brand variants
 * @param {string} variant - "primary" | "secondary" | "ghost" | "danger"
 * @param {string} size - "sm" | "md" | "lg"
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  ...props
}) {
  const base =
    "btn-nox inline-flex items-center justify-center gap-2 font-mono tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-nox-accent text-nox-black hover:bg-nox-white active:scale-95",
    secondary:
      "bg-transparent border border-nox-border text-nox-white hover:border-nox-accent hover:text-nox-accent active:scale-95",
    ghost:
      "bg-transparent text-nox-gray hover:text-nox-white active:scale-95",
    danger:
      "bg-transparent border border-nox-red text-nox-red hover:bg-nox-red hover:text-nox-white active:scale-95",
  };

  const sizes = {
    sm: "text-[10px] px-4 py-2",
    md: "text-[11px] px-6 py-3",
    lg: "text-[12px] px-8 py-4",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : children}
    </motion.button>
  );
}
