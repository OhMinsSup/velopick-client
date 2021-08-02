import { nanoid } from "nanoid";
import { KakaoPlace, KakaoPlaceSearchResult } from "./types";

class Marker {
  // marker instance id
  private id: string;
  // kakao 맵
  private map: kakao.maps.Map;
  // 카카오 마커 인스턴스
  private marker: kakao.maps.Marker;
  // 카카오 마커 인스턴스의 위치
  private position: kakao.maps.LatLng;
  // 카카오 마커 인스턴스의 주소
  private address: string;
  // 장소 정보
  private placeInfo: Pick<KakaoPlace, "name" | "category" | "category_code">;

  private callback: (instace: Marker) => void;

  constructor({
    map,
    placeInfo,
    position,
    address,
    callback,
  }: {
    map: kakao.maps.Map;
    placeInfo: KakaoPlaceSearchResult | null;
    position: kakao.maps.LatLng;
    address: string;
    callback: (instace: Marker) => void;
  }) {
    this.id = nanoid(10);

    this.map = map;
    // 마커를 클린한 latLng로 마커를 생성한다.
    this.marker = new kakao.maps.Marker({
      map: this.map ?? undefined,
      position,
    });
    this.marker.setTitle(placeInfo?.place_name ?? address);
    this.position = position;
    this.address = address;
    this.placeInfo = {
      name: placeInfo?.place_name ?? null,
      category: placeInfo?.category_group_name ?? null,
      category_code: placeInfo?.category_group_code ?? null,
    };
    this.callback = callback;

    this.addEventListener();
  }

  get markerId(): string {
    return this.id;
  }

  addEventListener = () => {
    kakao.maps.event.addListener(this.marker, "click", this.handleClickMarker);
  };

  removeEventListener = () => {
    kakao.maps.event.removeListener(
      this.marker,
      "click",
      this.handleClickMarker
    );
  };

  private handleClickMarker = () => {
    // 이벤트 해제
    this.removeEventListener();
    if (
      !this.callback ||
      (this.callback && typeof this.callback !== "function")
    ) {
      return;
    }
    this.callback(this);
  };

  toJSON() {
    return {
      id: this.id,
      ...this.placeInfo,
      address_name: this.address,
      x: this.position.getLng().toString(),
      y: this.position.getLat().toString(),
    };
  }
}

export default Marker;
