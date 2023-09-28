"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function StageOne({ isVisible }) {
  return (
    <div className="min-w-screen min-h-screen flex-col justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
          key={2}
          className="m-auto text-2xl text-center"
        >
          <>
            <Link href="/register/stage-1">Back</Link>

            <div className="my-4 text-3xl bold">
              Choose a secure password...
            </div>
            <input className="my-4"></input>
            <Link
              href="/register/stage-2"
              className="text-cyan-900 p-2 my-8 rounded"
            >
              Next
            </Link>
          </>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
