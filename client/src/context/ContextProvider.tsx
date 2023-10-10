"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

type Props = { children: React.ReactNode };

function ContextProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ContextProvider;
