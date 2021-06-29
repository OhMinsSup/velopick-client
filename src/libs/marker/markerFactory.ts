import { v4 as uuidv4 } from "uuid";
import head from "lodash/head";
import { kakaoMapClickManager } from "./kakaoMapClickManager";

export interface KakaoCoord2Address {
  address: Address;
  road_address: RoadAddress | null;
}

export interface Address {
  address_name: string;
  main_address_no: string;
  mountain_yn?: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  zip_code: string;
}

export interface RoadAddress {
  address_name: string;
  building_name: string;
  main_building_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  sub_building_no: string;
  underground_yn: "Y" | "N";
  zone_no: string;
}

export interface KakaoPlaceSearchResult {
  markerId?: number;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export class MarkerFactory {
  private id: string;

  private kakaoMap: kakao.maps.Map | null;

  private markerObject: Map<number, kakao.maps.Marker>;

  private markerObjects: kakao.maps.Marker[];

  private placeObject: Map<number, KakaoPlaceSearchResult>;

  private placeObjects: KakaoPlaceSearchResult[];

  private unsubscribeKakaoMapClick?: () => void;

  constructor() {
    this.id = uuidv4();

    this.kakaoMap = null;

    this.markerObjects = [];

    this.markerObject = new Map<number, kakao.maps.Marker>();

    this.placeObjects = [];

    this.placeObject = new Map<number, any>();
  }

  get kakaoMapObj() {
    return this.kakaoMap;
  }

  get markerMaps() {
    return this.markerObject;
  }

  get placeMaps() {
    return this.placeObject;
  }

  get markers() {
    return this.markerObjects;
  }

  get places() {
    return this.placeObjects;
  }

  generateLatLng = (lat: number | string, lng: number | string) => {
    return new kakao.maps.LatLng(Number(lat), Number(lng));
  };

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
        kakao.maps.event.removeListener(marker, "click", () => {
          this.handleClickMarker(marker);
        });
        marker.setMap(null);
      });
    }

    this.kakaoMap = null;
    this.markerObject.clear();
    this.markerObjects = [];
  }

  private handleClickMarker = (selectMarker: kakao.maps.Marker) => {
    for (const obj of this.markerObject.entries()) {
      const [key, item] = obj;
      if (item === selectMarker) {
        kakao.maps.event.removeListener(selectMarker, "click", () => {
          this.handleClickMarker(selectMarker);
        });
        selectMarker.setMap(null);

        this.markerObject.delete(key);
        this.placeObject.delete(key);
        this.placeObjects = this.placeObjects.filter(
          (place) => place.markerId !== key
        );
      }
    }
  };

  private handleClickMap = (event: any) => {
    this.makeAddMarker(event.latLng);
  };

  private handleCallbackPlacesSearch = (
    result: KakaoPlaceSearchResult[],
    status: kakao.maps.services.Status,
    markerId: number
  ) => {
    if (status !== kakao.maps.services.Status.OK) return;
    const headResult = head(result);
    console.log(result);
    console.log(headResult);
    if (!headResult) return;

    // 생성한 장소를 캐시형태로 저장한다. (마커 아이디를 key로 해서 저장)
    this.placeObject.set(markerId, headResult);

    const obj = { ...headResult, markerId };
    this.placeObjects.push(obj);
  };

  private handleCallbackCoord2Address = (
    result: KakaoCoord2Address[],
    status: kakao.maps.services.Status,
    markerId: number
  ) => {
    if (status !== kakao.maps.services.Status.OK) return;
    const headResult = head(result);
    if (!headResult) return;

    const {
      address: { address_name },
    } = headResult;
    const places = new kakao.maps.services.Places();

    places.keywordSearch(address_name, (result, status) =>
      this.handleCallbackPlacesSearch(result, status, markerId)
    );
  };

  makeAddMarker = (latLng: kakao.maps.LatLng | null) => {
    if (!latLng) return;

    const marker = new kakao.maps.Marker({
      map: this.kakaoMap ?? undefined,
      position: latLng,
    });

    const lastId = this.markerObject.size + 1;

    // 생성한 마커를 캐시형태로 저장한다.
    this.markerObject.set(lastId, marker);
    this.markerObjects.push(marker);

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(latLng.getLng(), latLng.getLat(), (result, status) =>
      this.handleCallbackCoord2Address(result, status, lastId)
    );

    kakao.maps.event.addListener(marker, "click", () =>
      this.handleClickMarker(marker)
    );
  };
}

let markerFactory: MarkerFactory | null = null;

export function createMarkerFactory() {
  return markerFactory || (markerFactory = new MarkerFactory());
}
