"use client";
import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import UserContext from "./UserContext";
import { setContext } from "apollo-link-context";

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

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    </ApolloProvider>
  );
};

export default ContextProvider;
