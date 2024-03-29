'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "./_context/CartContext";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en" className="dark">
          <Head>
            <title>e-commerce app</title>
            <meta name="description" content="Generated by Alaa Eldeyn" />
          </Head>
          <body className={inter.className}>
            <Header />
            {children}
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
