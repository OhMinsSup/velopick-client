import { useCallback } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";

export interface UsersState {
  id: number;
  name: string;
  thumbnail?: string;
}

const usersState = atom<UsersState[]>({
  key: "usersState",
  default: [],
});

export function useUserValue() {
  return useRecoilValue(usersState);
}

export function useUserAction() {
  const [users, setUsers] = useRecoilState(usersState);

  const changeUser = useCallback(
    (tags: UsersState[]) => {
      setUsers(tags);
    },
    [users]
  );

  const removeUser = useCallback(
    (tagId: number) => {
      const nextTags = users.filter((t) => t.id !== tagId);
      setUsers(nextTags);
    },
    [users]
  );

  const insertUser = useCallback(
    (tag: UsersState) => {
      setUsers((oldTags) => [...oldTags, tag]);
    },
    [users]
  );

  return { changeUser, insertUser, removeUser };
}
