"use client";
import React, { useState, useContext } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/utils";
import UserContext from "../../context/UserContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
interface Props {}

export default function Hamburger({}: Props): ReactElement {
  const { logout } = useAuth();
  const [user] = useContext(UserContext);
  const pathname = usePathname();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const toggleBurgerAnimation = () => setBurgerOpen(!burgerOpen);

  const handleMobileLogOut = () => {
    logout();
    toggleBurgerAnimation();
  };
  return (
    <>
      <button
        className="sm:hidden flex flex-col absolute right-0 top-0 p-4 z-40"
        onClick={toggleBurgerAnimation}
      >
        <span
          className={`transition-transform my-1 w-8 h-1 bg-slate-700 rounded-full ${
            burgerOpen ? "-rotate-45 translate-y-3" : ""
          }`}
        ></span>
        <span
          className={`transition-transform my-1 w-8 h-1 bg-slate-700 rounded-full ${
            burgerOpen ? "rotate-40 opacity-0" : ""
          }`}
        ></span>
        <span
          className={`transition-transform my-1 w-8 h-1 bg-slate-700 rounded-full  ${
            burgerOpen ? "rotate-45 -translate-y-3" : ""
          } `}
        ></span>
      </button>
      <AnimatePresence>
        {burgerOpen ? (
          <motion.div
            className={`transition-opacity overflow-hidden sm:hidden absolute top-0 left-0 bg-white w-screen h-screen max-h-screen z-10 flex flex-col justify-start pt-24 text-right gap-y-8 ${
              burgerOpen ? "opacity-100" : "opacity-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 1 }}
            key="hamburger-overlay"
          >
            {user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                key={"mobile-login-button"}
              >
                <Link
                  href="/login"
                  className="mx-8 text-violet-800 z-30"
                  onClick={handleMobileLogOut}
                >
                  Log out
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, translateX: 20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.4 }}
                  key={"mobile-how-it-works-button"}
                >
                  <Link
                    href="/about"
                    className="mx-8 text-xl z-30"
                    onClick={toggleBurgerAnimation}
                  >
                    How it works
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, translateX: 40 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.4 }}
                  key={"mobile-pricing-button"}
                >
                  <Link
                    href="/pricing"
                    className="mx-8 text-xl z-30"
                    onClick={toggleBurgerAnimation}
                  >
                    Pricing
                  </Link>
                </motion.div>
                {pathname === "/login" ? (
                  <motion.div
                    initial={{ opacity: 0, translateX: 60 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.4 }}
                    key={"mobile-register-button"}
                  >
                    <Link
                      href="/register"
                      className="mx-8 text-violet-800 text-xl z-30"
                      onClick={toggleBurgerAnimation}
                    >
                      Register your interest
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, translateX: 80 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.4 }}
                    key={"mobile-login-button"}
                  >
                    <Link
                      href="/login"
                      className="mx-8 text-violet-800 text-xl z-30"
                      onClick={toggleBurgerAnimation}
                    >
                      Sign in
                    </Link>
                  </motion.div>
                )}
              </>
            )}
            <motion.div
              className="w-[600px] h-1/2 bg-pink-100 absolute bottom-0 left-0 z-20 rounded-t-full m-0 "
              initial={{ translateX: 0, translateY: 300 }}
              animate={{ translateX: 0, translateY: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ translateX: 0, translateY: 300 }}
            ></motion.div>
            <motion.div
              className="w-[600px] h-1/2 bg-indigo-200 absolute bottom-0 left-0 z-20 rounded-t-full m-0 "
              initial={{ translateX: 0, translateY: 300 }}
              animate={{ translateX: 0, translateY: 50 }}
              transition={{ duration: 0.4 }}
              exit={{ translateX: 0, translateY: 300 }}
            ></motion.div>
            <motion.div
              className="w-[600px] h-1/2 bg-indigo-300 absolute bottom-0 left-0 z-20 rounded-t-full m-0 "
              initial={{ translateX: 0, translateY: 300 }}
              animate={{ translateX: 0, translateY: 100 }}
              transition={{ duration: 0.3 }}
              exit={{ translateX: 0, translateY: 300 }}
            ></motion.div>
          </motion.div>
        ) : null}{" "}
      </AnimatePresence>
    </>
  );
}
