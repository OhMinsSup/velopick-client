import { atom, useRecoilState, useRecoilValue } from "recoil";
import { KakaoPlaceSearchResult } from "../libs/marker/markerFactory";

export interface PlacePositionState {
  lat: number;
  lng: number;
}

export interface PlaceState extends KakaoPlaceSearchResult {}

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
