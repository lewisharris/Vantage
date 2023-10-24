"use client";
import Link from "next/link";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import Card from "../../components/dashboard/Card";
import { Loader } from "next/dynamic";

export default function Admin() {
  const REGISTER_USER_MUTATION = gql`
    mutation registerUser($input: RegisterUserInput!) {
      registerUser(input: $input) {
        id
        first_name
      }
    }
  `;

  const [registerUser, { loading, data, error }] = useMutation(
    REGISTER_USER_MUTATION,
    {
      errorPolicy: "all",
      onCompleted: (data) => {
        if (data) {
          console.log(`${data} is the data`);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return (
    <div className="flex flex-row w-screen h-screen items-center justify-center">
      <Card>
        <button
          onClick={() => {
            registerUser({
              variables: {
                input: {
                  email: "newcustomer2@email.com",
                  companyId: "15c4849e-b614-4d39-a01c-90a59e5790ab",
                  first_name: "lauren",
                  username: "loz",
                  last_name: "mcnicoll",
                  password: "password",
                  access: "USER",
                },
              },
            });
          }}
        >
          Create New User
        </button>
        {loading ? <p>Loading</p> : null}
        {error ? <p>{error.message}</p> : null}
      </Card>
      <div className="hidden grow w-3/6 sm:flex flex-row items-center justify-center"></div>
    </div>
  );
}
