import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

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

export function UserContextProvider({ children }: Props): JSX.Element {
  const [currentUser, setCurrentUser] = useState<IUser>();

  // Salvando as informações do usuário logado
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const currentUserEmail = localStorage.getItem("currentUser");
        const user = await db.user.where({ email: currentUserEmail }).toArray();
        setCurrentUser(user[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCurrentUser();
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser, setCurrentUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
