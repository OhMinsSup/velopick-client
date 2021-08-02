import { nanoid } from "nanoid";
import head from "lodash/head";
import { kakaoMapClickManager } from "./kakaoMapClickManager";
import {
  KakaoCoord2Address,
  KakaoPlace,
  KakaoPlaceSearchResult,
  NomalizedKakaoPlaceParams,
} from "./types";

export class MarkerFactory {
  private id: string;

  private kakaoMap: kakao.maps.Map | null;

  private markerObject: Map<string, kakao.maps.Marker>;

  private markerObjects: kakao.maps.Marker[];

  private placeObject: Map<string, KakaoPlace>;

  private placeObjects: KakaoPlace[];

  private unsubscribeKakaoMapClick?: () => void;

  constructor() {
    this.id = nanoid();

    this.kakaoMap = null;

    this.markerObjects = [];

    this.markerObject = new Map<string, kakao.maps.Marker>();

    this.placeObjects = [];

    this.placeObject = new Map<string, any>();
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
  setPlaces(places: KakaoPlace[]): void {
    for (const place of places) {
      const { x, y } = place;
      const latLng = this.generateLatLng(y, x);
      this.makeAddMarker(latLng);
      this.placeObject.set(place.id, place);
    }
  }

  mount(): void {
    if (!this.kakaoMap) return;
    // set manager kakao map objects
    kakaoMapClickManager.setKakaoMap(this.kakaoMap);

    if (this.unsubscribeKakaoMapClick) {
      console.log("mount => unsubscribeKakaoMapClick");
      this.unsubscribeKakaoMapClick();
    }

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
    this.placeObject.clear();
    this.placeObjects = [];
  }

  private handleClickMarker = (selectMarker: kakao.maps.Marker) => {
    for (const obj of this.markerObject.entries()) {
      const [id, item] = obj;
      if (item === selectMarker) {
        kakao.maps.event.removeListener(selectMarker, "click", () => {
          this.handleClickMarker(selectMarker);
        });
        selectMarker.setMap(null);

        this.markerObject.delete(id);
        this.placeObject.delete(id);
        this.placeObjects = this.placeObjects.filter(
          (place) => place.id !== id
        );
      }
    }
  };

  private handleClickMap = (event: any) => {
    console.count("event => call");
    this.makeAddMarker(event.latLng);
  };

  private handleCallbackPlacesSearch = (
    result: KakaoPlaceSearchResult[],
    status: kakao.maps.services.Status,
    latLng: kakao.maps.LatLng,
    address_name: string
  ) => {
    const check = [
      kakao.maps.services.Status.OK,
      kakao.maps.services.Status.ZERO_RESULT,
    ];
    if (!check.includes(status)) return;

    const data = head(result);
    // 마커를 클린한 latLng로 마커를 생성한다.
    const marker = new kakao.maps.Marker({
      map: this.kakaoMap ?? undefined,
      position: latLng,
    });
    marker.setTitle(data?.place_name ?? address_name);

    const place = this.nomalizeKakaoPlace({
      latLng,
      address_name,
      search: data,
    });
    if (!place) return;

    // 생성한 마커를 캐시형태로 저장한다.
    this.markerObject.set(place.id, marker);
    this.markerObjects.push(marker);

    // 생성한 장소를 캐시형태로 저장한다. (마커 아이디를 key로 해서 저장)
    this.placeObject.set(place.id, place);
    this.placeObjects.push(place);

    kakao.maps.event.addListener(marker, "click", () =>
      this.handleClickMarker(marker)
    );
  };

  private handleCallbackCoord2Address = (
    result: KakaoCoord2Address[],
    status: kakao.maps.services.Status,
    latLng: kakao.maps.LatLng
  ) => {
    if (status !== kakao.maps.services.Status.OK) return;
    const data = head(result);
    if (!data) return;

    const {
      address: { address_name },
    } = data;

    const places = new kakao.maps.services.Places();
    places.keywordSearch(address_name, (result, status) =>
      this.handleCallbackPlacesSearch(result, status, latLng, address_name)
    );
  };

  makeAddMarker = (latLng: kakao.maps.LatLng | null) => {
    if (!latLng) return;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(latLng.getLng(), latLng.getLat(), (result, status) =>
      this.handleCallbackCoord2Address(result, status, latLng)
    );
  };

  nomalizeKakaoPlace = ({
    latLng,
    address_name,
    search,
  }: NomalizedKakaoPlaceParams): KakaoPlace | null => {
    let id = nanoid(10);
    // 이미 존재하는 장소인 경우에는 추가를 안한다.
    const validPlace = this.placeObjects.findIndex((place) => place.id === id);
    if (validPlace !== -1) {
      console.log(`reduplication => places(index: ${validPlace})`);
      id = nanoid(10);
    }

    if (search) {
      return {
        id,
        name: search.place_name,
        category: search.category_group_name,
        category_code: search.category_group_code,
        address_name: search.address_name,
        x: search.x,
        y: search.y,
      };
    }

    if (!search && address_name) {
      return {
        id,
        name: null,
        category: null,
        category_code: null,
        address_name,
        x: latLng.getLng().toString(),
        y: latLng.getLat().toString(),
      };
    }

    return null;
  };
}

let markerFactory: MarkerFactory | null = null;

export function createMarkerFactory() {
  return markerFactory || (markerFactory = new MarkerFactory());
}
