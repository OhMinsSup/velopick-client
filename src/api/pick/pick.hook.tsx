import { useQuery } from "react-query";
import { getTagKeywordSearchAPI } from "./pick.api";
import { createKey } from "../common/common.utils";
import { PAGE_SIZE } from "../common/common.contant";

export function useTagKeywordSearchQuery(keyword?: string) {
  return useQuery(
    createKey(getTagKeywordSearchAPI.name, keyword),
    () => getTagKeywordSearchAPI({ query: keyword, size: PAGE_SIZE }),
    {
      enabled: !!keyword,
    }
  );
}
