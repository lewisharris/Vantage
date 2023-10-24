"use client";
import React, { useContext } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthContext } from "./authContext";

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

const ContextProvider = ({ children }: Props) => {
  const token = useContext(AuthContext);
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={token}>{children}</AuthContext.Provider>
    </ApolloProvider>
  );
};

export default ContextProvider;
