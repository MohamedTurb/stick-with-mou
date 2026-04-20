import "@/styles/globals.css";
import { CartProvider } from "@/hooks/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Stick With Mou",
  description: "Premium stickers. Dark, minimal, made to last.",
  keywords: "stickers, vinyl, premium, holographic, Stick With Mou",
  openGraph: {
    title: "Stick With Mou",
    description: "Premium stickers.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-nox-black text-nox-white antialiased">
        <CartProvider>
          <CustomCursor />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1A1A1A",
                color: "#FFFFFF",
                border: "1px solid #2A2A2A",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                borderRadius: "4px",
              },
              success: {
                iconTheme: { primary: "#D4AF37", secondary: "#0A0A0A" },
              },
            }}
          />
          <Navbar />
          <main className="page-wrapper">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
