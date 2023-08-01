import { createContext } from "react";
import { User } from "../../constants/responses";

export const UserContext = createContext<User & { isLoading: boolean }>({
  id: -1,
  createdAt: new Date(),
  name: "",
  email: "",
  password: "",
  isLoading: false,
});
