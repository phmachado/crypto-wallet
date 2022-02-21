/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode, useEffect, useState } from "react";

import { db, IUser } from "../db";

type Props = {
  children: ReactNode;
};

type UserContextType = {
  currentUser: IUser | undefined;
  setCurrentUser: (user: IUser) => void;
};

const initialValue = {};

export const UserContext = createContext(initialValue as UserContextType);

export function UserContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<IUser>();

  async function fetchCurrentUser() {
    try {
      const currentUserEmail = localStorage.getItem("currentUser");
      const user = await db.user.where({ email: currentUserEmail }).toArray();
      setCurrentUser(user[0]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
