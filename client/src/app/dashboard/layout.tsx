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
        <div className="bg-slate-100 flex flex-row max-h-screen w-screen">
          <DashboardNavigation />
          <div className="items-center flex flex-row text-xl absolute top-0 right-0 p-4 bg-white w-screen justify-between h-14">
            <div>VANTAGE</div>
            <button className="text-sm">Log out</button>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
