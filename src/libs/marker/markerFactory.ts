import { v4 as uuidv4 } from "uuid";
import { kakaoMapClickManager } from "./kakaoMapClickManager";

export class MarkerFactory {
  private id: string;

  private kakaoMap: kakao.maps.Map | null;

  private markerObject: Map<string, kakao.maps.Marker>;

  private markerObjects: kakao.maps.Marker[];

  private unsubscribeKakaoMapClick?: () => void;

  constructor() {
    this.id = uuidv4();

    this.kakaoMap = null;

    this.markerObjects = [];

    this.markerObject = new Map<string, kakao.maps.Marker>();
  }

  setMap(map: kakao.maps.Map) {
    this.kakaoMap = map;
  }

  mount(): void {
    if (!this.kakaoMap) return;
    // set manager kakao map objects
    kakaoMapClickManager.setKakaoMap(this.kakaoMap);

    this.unsubscribeKakaoMapClick = kakaoMapClickManager.subscribe((event) => {
      this.handleClickMap(event);
    });
  }

  unmount(): void {
    this.unsubscribeKakaoMapClick?.();

    // clear markers
    if (this.markerObjects.length) {
      this.markerObjects.forEach((marker) => {
        kakao.maps.event.removeListener(
          marker,
          "click",
          this.handleClickMarker
        );
        marker.setMap(null);
      });
    }

    this.markerObject.clear();
    this.markerObjects = [];
  }

  handleClickMarker = (event: any) => {
    console.log("event", event);
  };

  handleClickMap = (event: any) => {
    this.makeAddMarker(event.latLng);
  };

  makeAddMarker = (
    data: kakao.maps.LatLng | null,
    lat?: number,
    lng?: number
  ) => {
    let latLng: kakao.maps.LatLng | null;
    if (!data && lat && lng) {
      latLng = new kakao.maps.LatLng(lat, lng);
    } else {
      latLng = data || null;
    }

    if (!latLng) return;

    const marker = new kakao.maps.Marker({
      position: latLng,
    });

    // 지도에 마커를 표시합니다
    marker.setMap(this.kakaoMap);

    // 생성한 마커를 캐시형태로 저장한다.
    const markerObjectId = uuidv4();

    this.markerObject.set(markerObjectId, marker);
    this.markerObjects.push(marker);

    console.log("markerObject", this.markerObject);
    console.log("markerObjects", this.markerObjects);

    kakao.maps.event.addListener(marker, "click", this.handleClickMarker);
  };
}

let markerFactory: MarkerFactory | null = null;

export function createMarkerFactory() {
  return markerFactory || (markerFactory = new MarkerFactory());
}
