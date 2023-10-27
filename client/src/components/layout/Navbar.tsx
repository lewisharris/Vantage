"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/utils";
import UserContext from "../../context/UserContext";
import Hamburger from "./Hamburger";

type Props = {};

export default function Navbar({}: Props) {
  const { logout } = useAuth();
  const [user] = useContext(UserContext);
  const pathname = usePathname();
  return (
    <div className="flex flex-row justify-end p-4 h-14 fixed top-0 left-0 w-full bg-white relative">
      <Link
        href="/"
        className="text-2xl text-bold mt-1 sm:mt-auto text-violet-900 mr-auto items-center"
      >
        VANTAGE
      </Link>
      {user ? (
        <Link
          href="/login"
          className="hidden sm:inline mx-8 text-violet-800"
          onClick={() => logout()}
        >
          Log out
        </Link>
      ) : (
        <>
          <Link
            href="/about"
            className="hidden sm:inline mx-8 hover:border-b-2 hover:border-black"
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className="hidden sm:inline mx-8 hover:border-b-2 hover:border-black"
          >
            Pricing
          </Link>
          {pathname === "/login" ? (
            <Link
              href="/register"
              className="hidden sm:inline mx-8  text-violet-800"
            >
              Register
            </Link>
          ) : (
            <Link href="/login" className="hidden sm:inline mx-8 ">
              Sign in
            </Link>
          )}
        </>
      )}
      <Hamburger />
    </div>
  );
}
