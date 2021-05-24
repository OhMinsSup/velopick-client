import { v4 as uuidv4 } from "uuid";
import markerItem from "./markerItem";

export class MarkerFactory {
  private id: string;

  private kakaoMap: kakao.maps.Map | null;

  private markers: markerItem[];

  constructor() {
    this.id = uuidv4();

    this.kakaoMap = null;

    this.markers = [];
  }

  setMap(map: kakao.maps.Map) {
    this.kakaoMap = map;
  }
}

let markerFactory: MarkerFactory | null = null;

export function createMarkerFactory() {
  return markerFactory || (markerFactory = new MarkerFactory());
}
