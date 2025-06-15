import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import styles from "@/components/Navbar.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Authentication System",
  description: "A secure user authentication system with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="background-container"></div>
        <main className={styles.pageContainer}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
