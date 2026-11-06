import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Anuma · AI agents for Indian manufacturers",
  description:
    "Every enquiry, from every channel, handled until it's paid. Inside the ERP you already run. Tally, SAP, Odoo, Zoho, Dynamics and ERPNext.",
  metadataBase: new URL("https://anuma.co.in"),
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
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={plexSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
