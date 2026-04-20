"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Send, MapPin, Clock } from "lucide-react";
import Button from "@/components/Button";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
    toast.success("Message sent! We'll reply within 24h.", { icon: "✦", duration: 3000 });
  };

  return (
    <div className="bg-nox-black min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Page header */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-mono text-[10px] tracking-[0.5em] text-nox-gray uppercase mb-3"
          >
            ✦ Reach Out
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-display text-7xl md:text-9xl tracking-widest text-nox-white leading-none"
          >
            CONTACT
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* ── LEFT: Form (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-3"
          >
            {sent ? (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-start justify-center py-16"
              >
                <div className="w-16 h-16 border border-nox-accent flex items-center justify-center mb-8">
                  <span className="text-nox-accent text-2xl">✦</span>
                </div>
                <h2 className="font-display text-5xl tracking-widest text-nox-white mb-4">SENT.</h2>
                <p className="font-mono text-xs text-nox-gray tracking-widest mb-2">
                  We got your message, {form.name || "friend"}.
                </p>
                <p className="font-mono text-xs text-nox-muted mb-8">
                  Expect a reply within 24 hours via {form.email}.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="font-mono text-[10px] text-nox-gray hover:text-nox-accent tracking-widest uppercase transition-colors"
                >
                  ← Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.3em] text-nox-gray uppercase block mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={form.name}
                      onChange={setField("name")}
                      className="w-full bg-nox-dark border border-nox-border focus:border-nox-accent text-nox-white px-4 py-3 font-mono text-sm outline-none transition-colors placeholder:text-nox-muted"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.3em] text-nox-gray uppercase block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={setField("email")}
                      className="w-full bg-nox-dark border border-nox-border focus:border-nox-accent text-nox-white px-4 py-3 font-mono text-sm outline-none transition-colors placeholder:text-nox-muted"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono text-[10px] tracking-[0.3em] text-nox-gray uppercase block mb-2">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={setField("subject")}
                    className="w-full bg-nox-dark border border-nox-border focus:border-nox-accent text-nox-white px-4 py-3 font-mono text-sm outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a topic...</option>
                    <option value="order">Order Inquiry</option>
                    <option value="custom">Custom Design</option>
                    <option value="wholesale">Wholesale / Bulk</option>
                    <option value="collab">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[10px] tracking-[0.3em] text-nox-gray uppercase block mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={setField("message")}
                    className="w-full bg-nox-dark border border-nox-border focus:border-nox-accent text-nox-white px-4 py-3 font-mono text-sm outline-none transition-colors resize-none placeholder:text-nox-muted"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full group"
                >
                  Send Message
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="font-mono text-[9px] text-nox-muted tracking-widest text-center">
                  WE REPLY WITHIN 24 HOURS · NO SPAM EVER
                </p>
              </form>
            )}
          </motion.div>

          {/* ── RIGHT: Contact info (2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="lg:col-span-2 space-y-5"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-nox-gray uppercase mb-6">
              Direct Channels
            </p>

            {/* WhatsApp */}
            <a
              href="https://wa.me/201030498067?text=Hey%20Stick%20With%20Mou%2C%20I%20want%20to%20order%20stickers!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-nox-card border border-nox-border hover:border-nox-accent transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-nox-accent/10 border border-nox-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-nox-accent/20 transition-colors">
                <MessageCircle size={18} className="text-nox-accent" />
              </div>
              <div>
                <p className="font-mono text-xs text-nox-white tracking-[0.2em] uppercase mb-0.5">WhatsApp</p>
                <p className="font-mono text-[10px] text-nox-gray">01030498067</p>
                <p className="font-mono text-[9px] text-nox-muted mt-1">Fastest replies · Orders & support</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/stickwith.mou?igsh=b3F0bm4xbXp3OGg5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-nox-card border border-nox-border hover:border-nox-accent transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-nox-accent/10 border border-nox-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-nox-accent/20 transition-colors">
                <Instagram size={18} className="text-nox-accent" />
              </div>
              <div>
                <p className="font-mono text-xs text-nox-white tracking-[0.2em] uppercase mb-0.5">Instagram</p>
                <p className="font-mono text-[10px] text-nox-gray">@stickwith.mou</p>
                <p className="font-mono text-[9px] text-nox-muted mt-1">DMs open · New drops first</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 p-5 bg-nox-card border border-nox-border">
              <div className="w-10 h-10 bg-nox-muted/20 border border-nox-border flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-nox-gray" />
              </div>
              <div>
                <p className="font-mono text-xs text-nox-white tracking-[0.2em] uppercase mb-0.5">Based In</p>
                <p className="font-mono text-[10px] text-nox-gray">Cairo, Egypt 🇪🇬</p>
                <p className="font-mono text-[9px] text-nox-muted mt-1">Shipping worldwide</p>
              </div>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-4 p-5 bg-nox-card border border-nox-border">
              <div className="w-10 h-10 bg-nox-muted/20 border border-nox-border flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-nox-gray" />
              </div>
              <div>
                <p className="font-mono text-xs text-nox-white tracking-[0.2em] uppercase mb-0.5">Response Time</p>
                <p className="font-mono text-[10px] text-nox-gray">Within 24 hours</p>
                <p className="font-mono text-[9px] text-nox-muted mt-1">Sun – Thu · 10AM – 10PM (EET)</p>
              </div>
            </div>

            {/* FAQ note */}
            <div className="p-5 border border-nox-border bg-nox-accent/5">
              <p className="font-mono text-[10px] text-nox-accent tracking-widest uppercase mb-2">Custom Orders?</p>
              <p className="font-mono text-[10px] text-nox-gray leading-relaxed">
                We do bulk orders, custom designs, and brand packs. Drop us a WhatsApp or fill the form above with your brief.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
