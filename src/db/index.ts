import Dexie, { Table } from "dexie";

interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
  balance: number;
  history: { date: string; operation: string; value: number }[] | [];
}

export class AppDB extends Dexie {
  user!: Table<IUser, number>;

  constructor() {
    super("AppDB");
    this.version(1).stores({
      user: "++id,email,name,password,balance,history",
    });
  }
}

export const db = new AppDB();
