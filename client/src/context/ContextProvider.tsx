"use client";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https:localhost:4000/graphql",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetCompanies {
        company {
          id
          username
          email
        }
      }
    `,
  })
  .then((result) => console.log(result));

type Props = { children: React.ReactNode };

function ContextProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ContextProvider;
