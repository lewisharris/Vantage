"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import DashboardNavigation from "../../components/layout/DashboardNavigation";
import Navbar from "@/components/layout/Navbar";
const inter = Inter({ subsets: ["latin"] });
import { redirect, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const token = useContext(AuthContext);
  if (!token) {
    push("/login");
  }

  return (
    <>
      <Navbar />
      <div className="bg-slate-100 flex flex-row max-h-screen w-screen">
        <DashboardNavigation />
        {children}
      </div>
    </>
  );
}
