import { useInfiniteQuery } from "react-query";
import { getkakaoKeywordSearchAPI } from "./kakao.api";

export const PAGE_SIZE = 15;
export const QUERY_KEY = "getkakaoKeywordSearchAPI";

export const createKey = (keyword?: string) => [QUERY_KEY, keyword];

export function useKakaoKeywordSearchQuery(keyword?: string) {
  return useInfiniteQuery(
    createKey(keyword),
    ({ pageParam = 1 }) =>
      getkakaoKeywordSearchAPI({
        page: pageParam,
        query: keyword,
        size: PAGE_SIZE,
      }),
    {
      enabled: !!keyword,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.meta.is_end) return undefined;
        const {
          meta: { pageable_count },
          documents,
        } = lastPage;

        const totalPage = pageable_count / documents.length;
        const page = allPages.length;
        if (page < totalPage) return page + 1;
        return undefined;
      },
    }
  );
}
