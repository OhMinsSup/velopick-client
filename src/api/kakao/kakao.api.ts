import axios from "axios";
import qs from "qs";
import { KakaoKeywordSearhModel } from "./kakao.typedef";

const KAKAO_DOMAIN = "https://dapi.kakao.com";

export interface KakaoKeywordSearchParams {
  query?: string;
  page?: number;
  size?: number;
}

/**
 * @description 카카오 키워드 검색하기
 * @param {KakaoKeywordSearchParams} params
 */
export const getkakaoKeywordSearchAPI = async (
  params: KakaoKeywordSearchParams
) => {
  const query = qs.stringify(params);
  const response = await axios.get<KakaoKeywordSearhModel>(
    `${KAKAO_DOMAIN}/v2/local/search/keyword?${query}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
      },
    }
  );

  return response.data;
};
