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

export interface KakaoPlace {
  id: string;
  name: string | null;
  category: string | null;
  category_code: string | null;
  address_name: string;
  x: string;
  y: string;
}

export interface NomalizedKakaoPlaceParams {
  latLng: kakao.maps.LatLng;
  search?: KakaoPlaceSearchResult;
  address_name?: string;
}
