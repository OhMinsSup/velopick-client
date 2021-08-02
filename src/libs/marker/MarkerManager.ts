import { nanoid } from "nanoid";
import head from "lodash/head";
import { KakaoCoord2Address, KakaoPlaceSearchResult } from "./types";
import Marker from "./Marker";

class MarkerManager {
  // marker manager id
  private id: string;
  // 마커 정보를 mapping 값으로 저장
  private mappingMarker: Map<string, Marker>;
  // 전체 마커 정보
  private allMarkers: Marker[];
  // 전체 마커 정보 id 정보
  private allMarkerByIds: string[];
  // kakao 맵
  private map: kakao.maps.Map | null;

  // 현재 위치 정보
  private latLat: kakao.maps.LatLng | null;
  // 현재 주소 (도로명 주소)
  private address: string;

  constructor() {
    this.id = nanoid();

    this.map = null;
    this.allMarkers = [];
    this.allMarkerByIds = [];

    this.mappingMarker = new Map<string, Marker>();

    this.latLat = null;
    this.address = "";
  }

  get kakaoMap() {
    return this.map;
  }

  get marker() {
    return this.mappingMarker;
  }

  get markers() {
    return this.allMarkers;
  }

  get markerIds() {
    return this.allMarkerByIds;
  }

  // 마커 추가
  makeMarker(latLng: kakao.maps.LatLng | null) {
    if (!latLng) return;
    // 현재 위치 정보 저장
    this.latLat = latLng;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      latLng.getLng(),
      latLng.getLat(),
      this.handleCoord2Address
    );
  }

  private handleCoord2Address = async (
    result: KakaoCoord2Address[],
    status: kakao.maps.services.Status
  ) => {
    if (status !== kakao.maps.services.Status.OK) return;
    const data = head(result);
    if (!data) return;

    const {
      address: { address_name },
    } = data;

    // 현재 주소 저장
    this.address = address_name;

    const places = new kakao.maps.services.Places();
    places.keywordSearch(address_name, this.handleSearch);
  };

  private handleSearch = (
    result: KakaoPlaceSearchResult[],
    status: kakao.maps.services.Status
  ) => {
    const check = [
      kakao.maps.services.Status.OK,
      kakao.maps.services.Status.ZERO_RESULT,
    ];
    if (!check.includes(status)) return;
    if (!this.kakaoMap || !this.latLat) return;

    const data = head(result);
    const marker = new Marker({
      map: this.kakaoMap,
      placeInfo: data ?? null,
      position: this.latLat,
      address: this.address,
      callback: (data) => {
        this.mappingMarker.delete(data.markerId);
        this.allMarkers = this.allMarkers.filter(
          (instance) => instance.markerId !== data.markerId
        );
        this.allMarkerByIds = this.allMarkerByIds.filter(
          (id) => id !== data.markerId
        );
      },
    });

    // 생성한 마커를 캐시형태로 저장한다.
    this.mappingMarker.set(marker.markerId, marker);
    this.allMarkers.push(marker);
    this.allMarkerByIds.push(marker.markerId);
  };
}

export default MarkerManager;
