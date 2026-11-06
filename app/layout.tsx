import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Anuma · AI agents for Indian manufacturers",
  description:
    "Every enquiry, from every channel, handled until it's paid. Inside the ERP you already run. Tally, SAP, Odoo, Zoho, Dynamics and ERPNext.",
  metadataBase: new URL("https://anuma.co.in"),
  alternates: { types: { "text/markdown": "/anuma.md" } },
  openGraph: {
    title: "Anuma · AI agents for Indian manufacturers",
    description: "Every enquiry, from every channel, handled until it's paid. Inside the ERP you already run.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f4f6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
