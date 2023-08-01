import { UserContext } from "./context";
import { useState, useEffect } from "react";
import { User, GetUserResponse } from "@/lib/constants/responses";
import axios from "axios";
import { useRouter } from "next/router";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User & { isLoading: boolean }>({
    id: -1,
    createdAt: new Date(),
    name: "",
    email: "",
    password: "",
    isLoading: false,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser((oldUser) => {
          return { ...oldUser, isLoading: true };
        });

        const { data } = await axios.get<GetUserResponse>("/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        setUser({ ...data.user, isLoading: false });
      } catch (error) {
        setUser({
          id: -1,
          createdAt: new Date(),
          name: "",
          email: "",
          password: "",
          isLoading: false,
        });
      }
    };

    fetchUser();
  }, [router]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
