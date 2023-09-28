import React from "react";
import Link from "next/link";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="flex flex-row justify-end p-4 h-12">
      <Link
        href="/"
        className="text-2xl text-bold mt-1 sm:mt-auto text-violet-900 mr-auto items-center"
      >
        VANTAGE
      </Link>
      <Link href="/about" className="hidden sm:inline mx-8">
        How it works
      </Link>
      <Link href="/pricing" className="hidden sm:inline mx-8">
        Pricing
      </Link>
      <Link href="/login" className=" hidden sm:inline mx-8 text-violet-800">
        Sign in
      </Link>
      <div className="sm:hidden flex flex-col absolute right-0 top-0 p-4">
        <div className="my-1 w-8 h-1 bg-slate-700 rounded-full"></div>
        <div className="my-1 w-8 h-1 bg-slate-700 rounded-full"></div>
        <div className="my-1 w-8 h-1 bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
}
