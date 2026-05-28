import type { Metadata } from "next";
import { CartProvider } from "@/components/CartProvider";
import { siteInfo } from "@/data/site";
import { Anton, Poppins } from "next/font/google";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display"
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zyngerclub.example"),
  title: `${siteInfo.name} | ${siteInfo.tagline} ${siteInfo.seoTitleSuffix}`,
  description: `${siteInfo.name} ${siteInfo.seoDescription}`,
  keywords: [siteInfo.name, ...siteInfo.seoKeywords],
  openGraph: {
    title: `${siteInfo.name} | ${siteInfo.tagline} ${siteInfo.seoTitleSuffix}`,
    description: `${siteInfo.name} ${siteInfo.seoDescription}`,
    images: ["/og-image.jpg"],
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
