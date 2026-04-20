"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowRight, ArrowLeft, Lock } from "lucide-react";
import { useCartContext } from "@/hooks/CartContext";
import CartItem from "@/components/CartItem";
import Button from "@/components/Button";

export default function CartPage() {
  const { cartItems, totalItems, totalPrice, clearCart, isLoaded } = useCartContext();

  const freeShippingThreshold = 200;
  const shippingFee = 50;
  const shipping = totalPrice >= freeShippingThreshold ? 0 : totalPrice === 0 ? 0 : shippingFee;
  const orderTotal = totalPrice + shipping;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - totalPrice);
  const whatsappNumber = "201030498067";

  const handleWhatsAppCheckout = () => {
    if (!cartItems.length) return;

    const message = encodeURIComponent(
      [
        "Hello Stick With Mou, I want to place this order:",
        "",
        ...cartItems.map((item) => `${item.name} x${item.quantity}`),
        "",
        `Items: ${totalItems}`,
        `Subtotal: ${totalPrice.toFixed(2)} EGP`,
        `Shipping: ${shipping === 0 ? "FREE" : `${shipping.toFixed(2)} EGP`}`,
        `Total: ${orderTotal.toFixed(2)} EGP`,
      ].join("\n")
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  // Don't render until localStorage is hydrated
  if (!isLoaded) {
    return (
      <div className="bg-nox-black min-h-screen pt-16 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-nox-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-nox-black min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] text-nox-gray uppercase mb-2">✦ Review Order</p>
            <h1 className="font-display text-6xl tracking-widest text-nox-white">
              YOUR CART
            </h1>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="font-mono text-[10px] text-nox-muted hover:text-nox-red tracking-[0.2em] uppercase transition-colors pb-1"
            >
              Clear All
            </button>
          )}
        </motion.div>

        {/* ── EMPTY STATE ── */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-32"
          >
            {/* Big empty icon */}
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 border-2 border-nox-border flex items-center justify-center mx-auto">
                <ShoppingBag size={36} className="text-nox-muted" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-nox-border rounded-full" />
            </div>

            <h2 className="font-display text-5xl text-nox-border tracking-widest mb-3">EMPTY</h2>
            <p className="font-mono text-xs text-nox-gray tracking-widest mb-2">Your cart has no stickers yet.</p>
            <p className="font-mono text-xs text-nox-muted tracking-widest mb-10">Go explore the collection.</p>

            <Link href="/shop">
              <Button variant="primary" size="lg">
                Shop Now
              </Button>
            </Link>
          </motion.div>

        ) : (
          /* ── CART WITH ITEMS ── */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Item list */}
            <div className="lg:col-span-2">
              {/* Free shipping progress bar */}
              {freeShippingRemaining > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-nox-card border border-nox-border"
                >
                  <p className="font-mono text-[10px] text-nox-gray tracking-widest mb-3">
                    Add <span className="text-nox-accent">{freeShippingRemaining.toFixed(2)} EGP</span> more for free shipping
                  </p>
                  <div className="h-0.5 bg-nox-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-nox-accent"
                    />
                  </div>
                </motion.div>
              )}

              {/* Items */}
              <div className="space-y-3">
                <AnimatePresence>
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Back to shop */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-mono text-[10px] text-nox-gray hover:text-nox-accent tracking-widest uppercase mt-6 transition-colors"
              >
                <ArrowLeft size={12} />
                Continue Shopping
              </Link>
            </div>

            {/* ── ORDER SUMMARY ── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-nox-card border border-nox-border p-6 sticky top-24"
              >
                <h2 className="font-mono text-[11px] tracking-[0.3em] text-nox-gray uppercase mb-6">
                  Order Summary
                </h2>

                {/* Line items */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-mono text-[11px] text-nox-gray">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-mono text-[11px] text-nox-light">{totalPrice.toFixed(2)} EGP</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-mono text-[11px] text-nox-gray">Shipping</span>
                    <span className="font-mono text-[11px]">
                      {shipping === 0
                        ? <span className="text-nox-accent">FREE</span>
                        : <span className="text-nox-light">{shipping.toFixed(2)} EGP</span>
                      }
                    </span>
                  </div>
                </div>

                {/* Divider + Total */}
                <div className="border-t border-nox-border pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-[11px] text-nox-gray">Total</span>
                    <span className="font-mono text-2xl text-nox-accent">{orderTotal.toFixed(2)} EGP</span>
                  </div>
                  <p className="font-mono text-[9px] text-nox-muted mt-1">EGP · Taxes may apply at checkout</p>
                </div>

                {/* CTA */}
                <Button
                  variant="primary"
                  size="md"
                  className="w-full group mb-3"
                  onClick={handleWhatsAppCheckout}
                  disabled={!cartItems.length}
                >
                  Proceed to Checkout
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Lock size={10} className="text-nox-muted" />
                  <p className="font-mono text-[9px] text-nox-muted tracking-widest uppercase">
                    Secure Checkout · Free Returns
                  </p>
                </div>

                {/* Payment icons (text placeholder) */}
                <div className="mt-5 pt-4 border-t border-nox-border flex items-center justify-center gap-3">
                  {["VISA", "MC", "PAYPAL", "STRIPE"].map(p => (
                    <span key={p} className="font-mono text-[8px] text-nox-muted border border-nox-border px-2 py-1">
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
