import { nanoid } from "nanoid";
import { kakaoMapClickManager } from "./kakaoMapClickManager";
import { Line } from "./Line";
import { MarkerManager } from "./MarkerManager";
import { KakaoPlace } from "./types";

export class MarkerFactory {
  private id: string;

  private kakaoMap: kakao.maps.Map | null;

  private unsubscribeKakaoMapClick?: () => void;

  // 마커들을 관리하는 매니저 객체
  private manager: MarkerManager;

  constructor() {
    this.id = nanoid();

    this.kakaoMap = null;

    this.manager = new MarkerManager();
  }

  get map() {
    return this.kakaoMap;
  }

  get allMarkers() {
    return this.manager.markers;
  }

  get allMarkerByIds() {
    return this.manager.markerIds;
  }

  get mappingMarker() {
    return this.manager.marker;
  }

  get totalMarkers() {
    return this.manager.totalMarkers;
  }

  // 경도, 위도 값을 이용해서 해당 위치의 LatLng 객체를 생성한다.
  generateLatLng = (
    lat: number | string,
    lng: number | string
  ): kakao.maps.LatLng => {
    return new kakao.maps.LatLng(Number(lat), Number(lng));
  };

  // 카카오맵을 저장한다.
  setMap(map: kakao.maps.Map): void {
    this.kakaoMap = map;
  }

  // 장소 리스트 정보를 현재 등록된 kakao map에 반영한다.
  async setPlaces(places: KakaoPlace[]) {
    const allMakers: any[] = [];
    for (const place of places) {
      const { x, y } = place;
      const latLng = this.generateLatLng(y, x);
      const marker = this.manager.makeMaker({
        place,
        latLng,
      });
      allMakers.push(marker);
    }

    // await Promise.all(fns.map((fn) => fn()));

    console.log("setPlaces => success", allMakers);
    Line.makeLine(this.kakaoMap!, allMakers);
  }

  mount(): void {
    if (!this.kakaoMap) return;
    console.log("mount => marker factory");

    // set event manager kakao
    kakaoMapClickManager.setKakaoMap(this.kakaoMap);
    // set marker manager kakao
    this.manager.setKakaoMap(this.kakaoMap);

    if (this.unsubscribeKakaoMapClick) {
      this.unsubscribeKakaoMapClick();
    }

    this.unsubscribeKakaoMapClick = kakaoMapClickManager.subscribe((event) => {
      console.count("event => call");
      this.manager.registerMarker(event.latLng);
    });
  }

  applyMarker(latLng: kakao.maps.LatLng | null) {
    console.log("applyMarker => latLng", latLng);
    this.manager.registerMarker(latLng);
  }

  unmount(): void {
    console.log("unmount => marker factory");
    this.unsubscribeKakaoMapClick?.();
    this.manager.destroy();
    this.kakaoMap = null;
  }
}

let markerFactory: MarkerFactory | null = null;

export function createMarkerFactory() {
  return markerFactory || (markerFactory = new MarkerFactory());
}
