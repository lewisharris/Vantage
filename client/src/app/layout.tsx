"use client";
import "./globals.css";
import ContextProvider from "../context/ContextProvider";

import { Inter } from "next/font/google";
import Navbar from "../components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <Navbar />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
