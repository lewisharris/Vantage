import { useState } from "react";

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
  const verifyUser = () => {
    const token = getItem("token");
    if (token) {
      return token;
    }
  };
  const login = (token: string) => {
    if (token) {
      setItem("token", token);
    }
    return;
  };
  const logout = () => {
    removeItem("token");
  };
  return { verifyUser, login, logout };
};
