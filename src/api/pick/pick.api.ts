import tags from "../json/tags.json";

export interface TagKeywordSearchParams {
  query?: string;
  size: number;
}

export const getTagKeywordSearchAPI = async (
  params: TagKeywordSearchParams
) => {
  const response = await Promise.resolve({ data: tags });
  return response.data;
};
