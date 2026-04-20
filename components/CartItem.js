"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartContext } from "@/hooks/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCartContext();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 p-4 bg-nox-card border border-nox-border group"
    >
      {/* Product image */}
      <Link href={`/product/${item.id}`} className="flex-shrink-0">
        <div className="product-bg-pattern relative w-20 h-20 overflow-hidden p-1.5">
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/product/${item.id}`}>
              <h3 className="font-display text-xl tracking-widest text-nox-white hover:text-nox-accent transition-colors truncate">
                {item.name}
              </h3>
            </Link>
            <p className="font-mono text-[10px] text-nox-gray tracking-widest uppercase mt-0.5">
              {item.category} · {item.material || "Premium Vinyl"}
            </p>
          </div>
          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-1.5 text-nox-muted hover:text-nox-red transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Remove item"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Qty + Price */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity controls */}
          <div className="flex items-center border border-nox-border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-nox-gray hover:text-nox-white hover:bg-nox-muted transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center font-mono text-sm text-nox-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-nox-gray hover:text-nox-white hover:bg-nox-muted transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Line total */}
          <span className="font-mono text-sm text-nox-accent">
            {(item.price * item.quantity).toFixed(2)} EGP
          </span>
        </div>
      </div>
    </motion.div>
  );
}
