import Dexie, { Table } from "dexie";

export interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
  real: number;
  btc: number;
  brita: number;
  history:
    | { id: string; date: string; operation: string; value: number }[]
    | [];
}

export class AppDB extends Dexie {
  user!: Table<IUser, number>;

  constructor() {
    super("AppDB");
    this.version(1).stores({
      user: "++id,email,name,password,real,btc,brita,history",
    });
  }
}

export const db = new AppDB();
