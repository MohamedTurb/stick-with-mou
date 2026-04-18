"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { useCartContext } from "@/hooks/CartContext";
import toast from "react-hot-toast";

// Badge color map
const badgeColors = {
  BESTSELLER: "bg-nox-accent text-nox-black",
  NEW: "bg-white text-nox-black",
  LIMITED: "bg-nox-red text-white",
  PACK: "bg-nox-muted text-nox-white",
  FOIL: "bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 text-black",
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCartContext();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`, {
      icon: "✦",
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/product/${product.id}`} className="group block">
        <div className="bg-nox-card border border-nox-border hover:border-nox-muted transition-all duration-300 overflow-hidden">
          {/* Image Container */}
          <div className="product-img-wrap relative aspect-square bg-nox-dark overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-nox-black/0 group-hover:bg-nox-black/40 transition-all duration-300 flex items-center justify-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="hidden group-hover:flex items-center gap-3"
              >
                {/* Quick add to cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-10 h-10 bg-nox-accent text-nox-black flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={16} />
                </button>
                {/* View product */}
                <button
                  className="w-10 h-10 bg-nox-black/80 border border-nox-border text-nox-white flex items-center justify-center hover:border-nox-accent hover:text-nox-accent transition-colors"
                  aria-label="View product"
                >
                  <Eye size={16} />
                </button>
              </motion.div>
            </div>

            {/* Badge */}
            {product.badge && (
              <div className={`absolute top-3 left-3 px-2 py-0.5 font-mono text-[9px] tracking-widest font-bold ${badgeColors[product.badge] || "bg-nox-muted text-white"}`}>
                {product.badge}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-xl tracking-widest text-nox-white group-hover:text-nox-accent transition-colors duration-200 line-clamp-2">
                {product.name}
              </h3>
              <p className="font-mono text-[10px] text-nox-gray tracking-widest mt-1 uppercase">
                {product.category} · {product.finish || "vinyl"}
              </p>
            </div>
            <span className="font-mono text-sm text-nox-accent whitespace-nowrap mt-1">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Skeleton loading card
export function ProductCardSkeleton() {
  return (
    <div className="bg-nox-card border border-nox-border overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}
