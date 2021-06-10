import client from "../client";
import {
  LoginRequestDTO,
  PostLoginResponse,
  PostSignupResponse,
} from "./auth.dto";

/**
 * Post Login API
 * @param {LoginRequestDTO} body
 */
export const postLoginAPI = async (body: LoginRequestDTO) => {
  const response = await client.post<PostLoginResponse>("auth/signin", body);
  return response.data;
};

export const postSignupAPI = async (body: any) => {
  const response = await client.post<PostSignupResponse>("auth/signup", body);
  return response.data;
};
