"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import DashboardNavigation from "../../components/layout/DashboardNavigation";
import Navbar from "@/components/layout/Navbar";
import { AuthContext } from "@/context/authContext";
const inter = Inter({ subsets: ["latin"] });
import { redirect, useRouter } from "next/navigation";
import React, { useContext } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const auth = useContext(AuthContext);
  if (!auth.user) {
    push("/login");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="bg-slate-100 flex flex-row max-h-screen w-screen">
          <DashboardNavigation />
          {children}
        </div>
      </body>
    </html>
  );
}
