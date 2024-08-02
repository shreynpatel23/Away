"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

type BannerContextType = {
  isPaidUser: boolean;
  setIsPaidUser: (status: boolean) => void;
};

const BannerContext = createContext<BannerContextType>({
  isPaidUser: false,
  setIsPaidUser: () => {},
});

export function BannerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isPaidUser, setIsPaidUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async (email: string) => {
      try {
        const response = await axios.post("/api/get-user", { email });
        if (response.status === 200) {
          setIsPaidUser(response.data.isPaidUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (status === "authenticated" && session?.user?.email) {
      fetchUserData(session.user.email);
    }
  }, [session, status]);

  return (
    <BannerContext.Provider value={{ isPaidUser, setIsPaidUser }}>
      {children}
    </BannerContext.Provider>
  );
}

export function useBannerContext() {
  return useContext(BannerContext);
}

