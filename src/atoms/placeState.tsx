import { useCallback } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { KakaoPlace } from "../libs/marker/types";

export interface PlaceState extends KakaoPlace {}

const initialState: PlaceState[] = [];

const placeState = atom({
  key: "placeState",
  default: initialState,
});

export function usePlacesValue() {
  return useRecoilValue(placeState);
}

export function usePlacesState() {
  return useRecoilState(placeState);
}

export function usePlacesClearState() {
  const set = useSetRecoilState(placeState);

  const clear = useCallback(() => {
    set([]);
  }, [set]);

  const remove = useCallback(
    (id: string) => {
      set((prev) => prev.filter((place) => place.id !== id));
    },
    [set]
  );

  return { clear, remove };
}
