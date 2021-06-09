import client from "../client";
import { LoginRequestDTO, PostLoginResponse } from "./auth.dto";

/**
 * Post Login API
 * @param {LoginRequestDTO} body
 */
export const postLoginAPI = async (body: LoginRequestDTO) => {
  const response = await client.post<PostLoginResponse>("auth", body);
  return response.data;
};
