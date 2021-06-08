import { atom } from "recoil";

export interface UsersState {
  id: number;
  name: string;
  thumbnail?: string;
}

const usersState = atom<UsersState[]>({
  key: "usersState",
  default: [],
});
