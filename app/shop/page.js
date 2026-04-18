"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [isLoading] = useState(false); // In production, set true while fetching

  // Filter + sort products
  const filteredProducts = useMemo(() => {
    let result = activeCategory === "all"
      ? products
      : products.filter(p => p.category === activeCategory);

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="bg-nox-black min-h-screen pt-16">
      {/* Page Header */}
      <div className="border-b border-nox-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <SectionHeading
            label="Full Collection"
            title="SHOP ALL"
            subtitle={`${products.length} premium streetwear stickers. Ships worldwide.`}
          />
        </div>
      </div>

      {/* Filters + Sort */}
      <div className="sticky top-16 z-30 bg-nox-black/95 backdrop-blur-md border-b border-nox-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={14} className="text-nox-gray mr-1" />
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                className={`font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-nox-accent text-nox-accent bg-nox-accent/10"
                    : "border-nox-border text-nox-gray hover:border-nox-muted hover:text-nox-light"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-nox-dark border border-nox-border text-nox-gray font-mono text-[10px] tracking-widest uppercase px-4 py-2 focus:outline-none focus:border-nox-accent transition-colors appearance-none cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Result count */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[10px] text-nox-gray tracking-widest uppercase mb-8"
        >
          {filteredProducts.length} items {activeCategory !== "all" && `in "${activeCategory}"`}
        </motion.p>

        {/* Loading skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <p className="font-display text-6xl text-nox-border tracking-widest mb-4">EMPTY</p>
            <p className="font-mono text-xs text-nox-gray tracking-widest">
              No products in this category yet.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
