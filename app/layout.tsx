import type { Metadata } from "next";
import { Quicksand, Playfair_Display } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Us 💞 — our little corner",
  description:
    "Our anniversary, her birthday, our notes, her wishes and her photos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

