import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useRouter } from "next/navigation";

export const useLocalStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
    setValue(value);
  };

  const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    setValue(value);
    return value;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { setItem, getItem, removeItem };
};

export const useAuth = () => {
  const { getItem, setItem, removeItem } = useLocalStorage();
  const { push } = useRouter();
  const [user, setUser] = useContext(UserContext);

  const loggedIn = () => {
    console.log(user);
    const localToken = getItem("token");
    if (!localToken || !user) {
      removeItem("token");
      setUser("");
      push("/login");
    }
  };

  const login = (token: string, userID: string) => {
    if (token && userID) {
      setItem("token", token);
      setItem("userID", userID);
      setUser(userID);
      push("/dashboard");
    }
  };

  const logout = () => {
    push("/login");
    setUser("");
    removeItem("token");
    removeItem("UserID");
  };
  return { loggedIn, login, logout };
};
