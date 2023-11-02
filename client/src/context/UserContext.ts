import { createContext } from "react";

const UserContext = createContext(localStorage.getItem("userID"));

export default UserContext;
