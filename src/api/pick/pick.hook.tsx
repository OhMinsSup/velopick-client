import { useQuery } from "react-query";
import { getTagKeywordSearchAPI } from "./pick.api";

export const PAGE_SIZE = 5;
export const QUERY_KEY = getTagKeywordSearchAPI.name;

export const createKey = (keyword?: string) => [QUERY_KEY, keyword];

export function useTagKeywordSearchQuery(keyword?: string) {
  return useQuery(
    createKey(keyword),
    () => getTagKeywordSearchAPI({ query: keyword, size: PAGE_SIZE }),
    {
      enabled: !!keyword,
    }
  );
}
