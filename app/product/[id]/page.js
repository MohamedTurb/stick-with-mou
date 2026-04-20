"use client";
import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCartContext } from "@/hooks/CartContext";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/Button";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) notFound();

  const { addToCart } = useCartContext();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  // Related products (same category, exclude current)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = async () => {
    setAdding(true);
    await new Promise(r => setTimeout(r, 400)); // micro-delay for feel
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`, { icon: "✦", duration: 2500 });
    setAdding(false);
  };

  const nextImg = () => setActiveImg(i => (i + 1) % product.images.length);
  const prevImg = () => setActiveImg(i => (i - 1 + product.images.length) % product.images.length);

  return (
    <div className="bg-nox-black min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-10"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] text-nox-gray hover:text-nox-accent tracking-widest uppercase transition-colors"
          >
            <ArrowLeft size={12} />
            Back to Shop
          </Link>
          <span className="text-nox-border">/</span>
          <span className="font-mono text-[10px] text-nox-muted tracking-widest uppercase">{product.name}</span>
        </motion.div>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-28">

          {/* ── LEFT: Image Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image */}
            <div className="product-bg-pattern relative aspect-square overflow-hidden group p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImg]}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <div className={`absolute top-4 left-4 px-3 py-1 font-mono text-[10px] tracking-widest font-bold z-10 ${
                  product.badge === "LIMITED" ? "bg-nox-red text-white" :
                  product.badge === "FOIL" ? "bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 text-black" :
                  "bg-nox-accent text-nox-white"
                }`}>
                  {product.badge}
                </div>
              )}

              {/* Nav arrows (only if multiple images) */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-nox-black/70 border border-nox-border flex items-center justify-center text-nox-gray hover:text-nox-accent hover:border-nox-accent transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-nox-black/70 border border-nox-border flex items-center justify-center text-nox-gray hover:text-nox-accent hover:border-nox-accent transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`product-bg-pattern relative w-20 h-20 overflow-hidden border-2 transition-all duration-200 p-1.5 ${
                      activeImg === i
                        ? "border-nox-accent"
                        : "border-nox-border hover:border-nox-muted"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-contain" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── RIGHT: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category tag */}
            <p className="font-mono text-[10px] tracking-[0.5em] text-nox-gray uppercase mb-3">
              ✦ {product.category}
            </p>

            {/* Product name */}
            <h1 className="font-display text-6xl md:text-7xl tracking-widest text-nox-white leading-none mb-4">
              {product.name}
            </h1>

            {/* Rating (decorative) */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={12} className="text-nox-accent fill-nox-accent" />
                ))}
              </div>
              <span className="font-mono text-[10px] text-nox-gray tracking-widest">5.0 (24 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-3xl text-nox-accent">
                {product.price.toFixed(2)} EGP
              </span>
              <span className="font-mono text-[10px] text-nox-muted tracking-widest">EGP / per sticker</span>
            </div>

            {/* Description */}
            <p className="text-nox-gray text-sm leading-relaxed mb-8 border-l-2 border-nox-border pl-4">
              {product.description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-px bg-nox-border mb-8">
              {[
                ["SIZE", product.dimensions],
                ["MATERIAL", product.material],
                ["FINISH", product.finish],
              ].map(([label, value]) => (
                <div key={label} className="bg-nox-card p-4">
                  <p className="font-mono text-[9px] text-nox-muted tracking-[0.3em] uppercase mb-1.5">{label}</p>
                  <p className="font-mono text-[11px] text-nox-light">{value}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <span key={tag} className="font-mono text-[9px] tracking-[0.2em] text-nox-gray uppercase border border-nox-border px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Qty selector */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center border border-nox-border">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-nox-gray hover:text-nox-white hover:bg-nox-muted transition-colors font-mono text-lg"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-11 h-11 flex items-center justify-center font-mono text-sm text-nox-white border-x border-nox-border">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-nox-gray hover:text-nox-white hover:bg-nox-muted transition-colors font-mono text-lg"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleAdd}
                loading={adding}
                className="flex-1 group"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </Button>
            </div>

            {/* Secondary action */}
            <Link href="/cart">
              <Button variant="secondary" size="md" className="w-full mb-8">
                View Cart
              </Button>
            </Link>

            {/* Trust badges */}
            <div className="border-t border-nox-border pt-6 grid grid-cols-2 gap-3">
              {[
                ["🚚", "Free shipping over 200 EGP"],
                ["🛡️", "Weatherproof guarantee"],
                ["✂️", "Die-cut precision"],
                ["🌍", "Ships worldwide"],
              ].map(([emoji, text]) => (
                <div key={text} className="flex items-center gap-2">
                  <span className="text-sm">{emoji}</span>
                  <span className="font-mono text-[10px] text-nox-gray tracking-wide">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div className="border-t border-nox-border pt-16">
            <p className="font-mono text-[10px] tracking-[0.4em] text-nox-gray uppercase mb-3">✦ Same Vibe</p>
            <h2 className="font-display text-5xl tracking-widest text-nox-white mb-10">YOU MIGHT LIKE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
