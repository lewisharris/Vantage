"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";

type Props = {};

export default function LoginForm({}: Props) {
  const CREATE_COMPANY_MUTATION = gql`
    mutation createCompany($input: CreateNewCompanyInput!) {
      createNewCompany(input: $input) {
        id
        name
        teams {
          id
        }
      }
    }
  `;
  const REGISTER_USER_MUTATION = gql`
    mutation registerUser($input: RegisterUserInput!) {
      id
      first_name
    }
  `;

  const GET_COMPANIES_QUERY = gql`
    query {
      companies {
        id
        name
      }
    }
  `;

  const [getCompanies, { loading, data, error }] = useLazyQuery(
    GET_COMPANIES_QUERY
  );
  console.log(data);

  const [
    createCompany,
    { loading: companyLoading, data: companyData, error: companyError }
  ] = useMutation(CREATE_COMPANY_MUTATION, {
    errorPolicy: "all",
    onCompleted: data => {
      if (data) {
        console.log(`${data} is the data`);
      }
    }
  });

  const [
    createNewUser,
    { loading: newUserLoading, data: newUserData, error: newUserError }
  ] = useMutation(CREATE_COMPANY_MUTATION, {
    errorPolicty: "all",
    onCompleted: data => {
      if (data) {
        console.log(`${newUserData} is the data`);
      }
    }
  });

  return (
    <>
      {companyError ? <div>{companyError.message}</div> : null}
      <button
        onClick={() => {
          createCompany({
            variables: {
              input: { name: "CompanyEight" }
            }
          });
        }}
      >
        Create Company
      </button>

      <button
        onClick={() => {
          getCompanies();
        }}
      >
        Get Companies
      </button>

      <button
        onClick={() => {
          createNewUser({
            variables: {
              input: {
                email: "newcustomer@email.com",
                companyId: "15c4849e-b614-4d39-a01c-90a59e5790ab",
                first_name: "lewis",
                last_name: "harris",
                access: "USER"
              }
            }
          });
        }}
      >
        Create New User
      </button>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          key={"login-form"}
          className="flex flex-col text-center grow items-center justify-center"
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email required!";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-3/4 mb-4"
              >
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
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
                {errors.email && touched.email && errors.email}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
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
                {errors.password && touched.password && errors.password}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-2 w-content bg-violet-600 text-white rounded-full"
                >
                  Log in
                </button>
              </form>
            )}
          </Formik>
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
