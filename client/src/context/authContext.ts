import { createContext } from "react";

type AuthContext = {
  token: string | null;
};

export const AuthContext = createContext<AuthContext>({
  token: null
});
