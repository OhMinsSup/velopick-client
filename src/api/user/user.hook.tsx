import { useQuery } from "react-query";
import { getUserTagKeywordSearchAPI } from "./user.api";
import { createKey } from "../common/common.utils";
import { PAGE_SIZE } from "../common/common.contant";

export function useUserTagKeywordSearchQuery(keyword?: string) {
  return useQuery(
    createKey(getUserTagKeywordSearchAPI.name, keyword),
    () => getUserTagKeywordSearchAPI({ query: keyword, size: PAGE_SIZE }),
    {
      enabled: !!keyword,
    }
  );
}
