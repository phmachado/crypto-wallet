/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode, useState } from "react";

import { IUser } from "../db";

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
  console.log(currentUser);

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
