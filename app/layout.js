import "@/styles/globals.css";
import { CartProvider } from "@/hooks/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "NOX — Stick With Mou",
  description: "Premium streetwear stickers. Dark, minimal, made to last.",
  keywords: "stickers, streetwear, vinyl, NOX, premium, holographic",
  openGraph: {
    title: "NOX — Stick With Mou",
    description: "Premium streetwear stickers.",
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
                background: "#161616",
                color: "#f5f5f5",
                border: "1px solid #222222",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                borderRadius: "4px",
              },
              success: {
                iconTheme: { primary: "#e8ff00", secondary: "#080808" },
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
