import type { Metadata } from "next";
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
  title: "Zynger Club | Fried Chicken Cafe Kunnamkulam",
  description:
    "Zynger Club serves crispy fried chicken, burgers, loaded fries, wraps, pizza, shakes, mojitos and family meals in Kunnamkulam, Thrissur.",
  keywords: [
    "Zynger Club",
    "fried chicken Kunnamkulam",
    "Kunnamkulam restaurant",
    "Thrissur fast food",
    "burgers Kunnamkulam"
  ],
  openGraph: {
    title: "Zynger Club | Fried Chicken Cafe Kunnamkulam",
    description:
      "Zynger Club serves crispy fried chicken, burgers, loaded fries, wraps, pizza, shakes, mojitos and family meals in Kunnamkulam, Thrissur.",
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
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
