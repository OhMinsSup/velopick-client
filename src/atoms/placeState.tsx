import { atom, useRecoilState, useRecoilValue } from "recoil";

export interface PlacePositionState {
  lat: number;
  lng: number;
}

export interface PlaceState {
  lat: number;
  lng: number;
}

const initialState: PlaceState[] = [];

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
