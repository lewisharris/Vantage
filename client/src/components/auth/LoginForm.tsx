"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/utils";
import { useLoginAdmin } from "../../hooks/account";
import { AdminLogin } from "../../types/auth";
import { useRouter } from "next/navigation";
import UserContext from "../../context/UserContext";

export default function LoginForm() {
  const { push } = useRouter();
  const { login } = useAuth();
  const [user] = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user) {
      push("/dashboard");
    }
  }, []);
  const [onLogin, { data, loading, error }] = useLoginAdmin({
    onCompleted: (data: AdminLogin) => {
      const { token, id } = data?.loginAdmin;
      login(token, id);
      push("/dashboard");
    },
    onError: error => {
      return error;
    }
  });

  if (error) {
    console.log(error);
  }

  const handleSubmit = () => {
    onLogin({
      variables: {
        input: { email, password: password }
      }
    });
  };

  const handleChange = event => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

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
          <form className="flex flex-col w-3/4 mb-4 ">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              key={"login-email"}
              className="justify-between flex flex-row items-center w-full my-2  border-b-2 border-solid border-slate-100 focus-within:border-slate-100"
            >
              <input
                type="email"
                value={email}
                name="login-email"
                placeholder="Email"
                disabled={false}
                onChange={handleChange}
                className="mt-4 sm:mt-auto p-4 grow bg-transparent"
              />
              <Image
                src="/assets/svg/person.svg"
                alt="email"
                width={0}
                height={0}
                className="opacity-50 w-4 grow-0"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={"login-password"}
              className="justify-between items-center flex flex-row w-full my-2 border-b-2 border-solid border-slate-100"
            >
              <input
                type="password"
                autoComplete=""
                value={password}
                name="login-password"
                placeholder="Password"
                disabled={false}
                onChange={handlePasswordChange}
                className={`mt-4 sm:mt-auto p-4 grow`}
              />

              <Image
                src="/assets/svg/lock.svg"
                alt="password"
                width={0}
                height={0}
                className="opacity-50 w-4"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="ml-auto text-xs p-4 text-slate-400"
            >
              Forgot password?
            </motion.button>
            {error ? (
              <p className="h-8 italic text-red-500">{error.message}</p>
            ) : (
              <p className="h-8"></p>
            )}
            <button
              type="submit"
              className={`p-2 w-content ${
                loading ? "bg-violet-300" : "bg-violet-600"
              } text-white rounded-full`}
              onClick={event => {
                event.preventDefault();
                handleSubmit();
              }}
              disabled={loading ? true : false}
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
              className="flex flex-row justify-start sm:text-left items-center py-4"
            >
              <Image
                src="/assets/svg/google.svg"
                alt="google-logo"
                width={0}
                height={0}
                className="h-6 mx-4 sm:h-8 sm:m-auto w-auto opacity-20"
              />
              <p className="sm:mx-4 text-gray-300 grow sm:grow-0">
                Sign in with Google
              </p>
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={"login-apple"}
              className="flex flex-row justify-start sm:text-left items-center py-4"
            >
              <Image
                src="/assets/svg/apple.svg"
                alt="apple-logo"
                width={0}
                height={0}
                className="h-6 mx-4 sm:h-8 sm:m-auto w-auto opacity-20"
              />
              <p className="sm:mx-4 text-gray-300 grow sm:grow-0">
                Sign in with Apple
              </p>
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
                  Register your interest now.
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
