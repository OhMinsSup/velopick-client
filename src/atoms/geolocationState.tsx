import { atom, useRecoilState, useRecoilValue } from "recoil";

export interface GeolocationState {
  latitude: number;
  longitude: number;
}

const initialState: GeolocationState = {
  latitude: 0,
  longitude: 0,
};

const geolocationState = atom<GeolocationState>({
  key: "geolocationState",
  default: initialState,
});

export function useGeolocationValue() {
  return useRecoilValue(geolocationState);
}

export function useGeolocationState() {
  return useRecoilState(geolocationState);
}
