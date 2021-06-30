import { useCallback } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { KakaoPlaceSearchResult } from "../libs/marker/markerFactory";

export interface PlaceState extends KakaoPlaceSearchResult {}

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

  const placesClear = useCallback(() => {
    set([]);
  }, [set]);

  return { placesClear };
}
