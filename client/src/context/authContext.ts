import { createContext } from "react";

type AuthContext = {
  userID: string | null;
};

export const AuthContext = createContext<AuthContext>({
  userID: null
});
