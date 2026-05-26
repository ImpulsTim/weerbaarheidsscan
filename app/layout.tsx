import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Energie Weerbaarheidsscan | Impuls Zeeland",
  description:
    "Ontdek hoe weerbaar jouw bedrijf is tegen energieprijzen, netcongestie en externe onzekerheid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${barlow.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-anthracite">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
