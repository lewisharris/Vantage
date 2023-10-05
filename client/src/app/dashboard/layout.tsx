import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardNavigation from "../../components/layout/DashboardNavigation";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VANTAGE",
  description: "dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
