import users from "../json/users.json";

export interface UserTagKeywordSearchParams {
  query?: string;
  size: number;
}

export const getUserTagKeywordSearchAPI = async (
  params: UserTagKeywordSearchParams
) => {
  const response = await Promise.resolve({ data: users });
  return response.data;
};
