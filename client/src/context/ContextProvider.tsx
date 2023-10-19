"use client";
import React from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./authContext";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

type Props = { children: React.ReactNode };

function ContextProvider({ children }: Props) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children} </AuthProvider>
    </ApolloProvider>
  );
}

export default ContextProvider;
