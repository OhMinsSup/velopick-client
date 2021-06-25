import { useInfiniteQuery } from "react-query";
import { getkakaoKeywordSearchAPI } from "./kakao.api";
import { PAGE_NO, PAGE_SIZE } from "../common/common.contant";
import { createKey } from "../common/common.utils";

export function useKakaoKeywordSearchQuery(keyword?: string) {
  return useInfiniteQuery(
    createKey(getkakaoKeywordSearchAPI.name, keyword),
    ({ pageParam = PAGE_NO }) =>
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
        } = lastPage;

        const totalPage = pageable_count / PAGE_SIZE;
        const page = allPages.length;
        if (page < totalPage) return page + PAGE_NO;
        return undefined;
      },
    }
  );
}
