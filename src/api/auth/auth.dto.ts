import { ClientResponse } from "../common/common.dto";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  userId: string;
  refreshToken: string;
  accessToken: string;
}

export type PostLoginResponse = ClientResponse<LoginResponseDTO | null>;
