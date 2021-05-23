import { atom, useRecoilState, useRecoilValue } from "recoil";

export interface PlaceState {}

const initialState: PlaceState = {};

const placeState = atom({
  key: "placeState",
  default: initialState,
});

export function usePlaceValue() {
  return useRecoilValue(placeState);
}

export function usePlaceState() {
  return useRecoilState(placeState);
}
