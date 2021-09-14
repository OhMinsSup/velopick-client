import { nanoid } from "nanoid";
import { KakaoPlace, KakaoPlaceSearchResult } from "./types";

export class Marker {
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
  // 순서
  private seq: number;

  private removeCallback: (instace: Marker) => void;

  constructor({
    map,
    placeInfo,
    position,
    address,
    seq,
    removeCallback,
  }: {
    map: kakao.maps.Map;
    placeInfo: KakaoPlaceSearchResult | null;
    position: kakao.maps.LatLng;
    address: string;
    seq: number;
    removeCallback: (instace: Marker) => void;
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
    this.seq = seq;
    this.placeInfo = {
      name: placeInfo?.place_name ?? null,
      category: placeInfo?.category_group_name ?? null,
      category_code: placeInfo?.category_group_code ?? null,
    };
    this.removeCallback = removeCallback;

    this.addEventListener();
  }

  get markerId(): string {
    return this.id;
  }

  getPosition() {
    return this.position;
  }

  getAddress() {
    return this.address;
  }

  getSeq() {
    return this.seq;
  }

  getPlaceInfo() {
    return this.placeInfo;
  }

  private addEventListener = () => {
    // add kakao marker event listener
    kakao.maps.event.addListener(this.marker, "click", this.handleClickMarker);
  };

  private removeEventListener = () => {
    // remove kakao marker event listener
    kakao.maps.event.removeListener(
      this.marker,
      "click",
      this.handleClickMarker
    );
  };

  private handleClickMarker = () => {
    try {
      // 이벤트 해제
      this.removeEventListener();
      if (
        !this.removeCallback ||
        (this.removeCallback && typeof this.removeCallback !== "function")
      ) {
        throw new Error("callback is not a function");
      }
      this.removeCallback(this);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  destroy() {
    this.removeEventListener();
  }

  setMarkerId(id: string) {
    try {
      if (!id) {
        const error = new Error();
        error.name = "marker validation";
        error.message = "marker id is empty";
      }
      this.id = id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      ...this.placeInfo,
      address_name: this.address,
      seq: this.seq,
      x: this.position.getLng().toString(),
      y: this.position.getLat().toString(),
    };
  }
}
