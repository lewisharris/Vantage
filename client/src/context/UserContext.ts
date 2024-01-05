import { createContext } from "react";

const UserContext = createContext(localStorage.getItem("userId"));

export default UserContext;
