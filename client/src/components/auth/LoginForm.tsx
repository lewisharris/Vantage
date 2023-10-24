"use client";
import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/utils";
import { useLogin } from "../../hooks/account";

type Props = {};
// fill out username
// fill out password
// submit data to back end for verification
// receive response
// set user context to token

export default function LoginForm({}: Props) {
  const { login } = useAuth();
  const handleSubmit = () => {
    loginUser({
      variables: {
        input: { email: "newcustomer@email.com", password: "password" }
      }
    });
  };

  const loginUser = useLogin({
    onCompleted: (data: any) => {
      {
        console.log(data);
      }
    },
    onError: (e: Error) => {
      console.log(e);
    }
  });

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          key={"login-form"}
          className="flex flex-col text-center grow items-center justify-center"
        >
          <form className="flex flex-col w-3/4 mb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              key={"login-email"}
              className="justify-between flex flex-row w-full my-2 border-b-2 border-solid border-slate-100"
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full mt-4 sm:mt-auto p-4"
              />
              <Image
                src="/assets/svg/person.svg"
                alt="email"
                width={0}
                height={0}
                className="opacity-50 h-4 w-auto m-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={"login-password"}
              className="justify-between flex flex-row w-full my-2 border-b-2 border-solid border-slate-100"
            >
              <input
                type="password"
                name="password"
                autoComplete="on"
                placeholder="Password"
                className="w-full mt-4 sm:mt-auto p-4"
              />
              <Image
                src="/assets/svg/lock.svg"
                alt="password"
                width={0}
                height={0}
                className="opacity-50 h-4 w-auto m-auto"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xs p-4 text-right text-slate-400"
            >
              Forgot password?
            </motion.button>
            <button
              type="submit"
              className="p-2 w-content bg-violet-600 text-white rounded-full"
              onClick={e => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Log in
            </button>
          </form>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-slate-700 text-sm"
            >
              OR
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              key={"login-google"}
              className="flex flex-row justify-start items-center py-4"
            >
              <Image
                src="/assets/svg/google.svg"
                alt="google-logo"
                width={0}
                height={0}
                className="h-6 sm:h-8 m-auto w-auto opacity-60"
              />
              <p className="ml-4 ">Sign in with Google</p>
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={"login-apple"}
              className="flex flex-row justify-start text-left items-center py-4"
            >
              <Image
                src="/assets/svg/apple.svg"
                alt="apple-logo"
                width={0}
                height={0}
                className="h-6 sm:h-8 m-auto w-auto opacity-60"
              />
              <p className="ml-4">Sign in with Apple</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-row justify-start text-left items-center py-4"
            >
              <Link href="/register" className="text-xs text-slate-400">
                Don&#39;t have an account?
                <span className="text-violet-800 underline ml-2">
                  Register now.
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
