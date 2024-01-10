"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import DashboardNavigation from "../../components/layout/DashboardNavigation";
import Navbar from "@/components/layout/Navbar";
const inter = Inter({ subsets: ["latin"] });
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useAuth } from "../../hooks/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    loggedIn();
  }, []);
  const { loggedIn } = useAuth();

  return (
    <>
      <div className="bg-slate-100 flex flex-row w-screen overflow-scroll">
        <DashboardNavigation />
        {children}
      </div>
    </>
  );
}
