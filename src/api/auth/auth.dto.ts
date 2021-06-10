import { ClientResponse } from "../common/common.dto";

// ==================== 로그인 ==================== //

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  userId: string;
  refreshToken: string;
  accessToken: string;
  exists: "email" | "username";
}

export type PostLoginResponse = ClientResponse<Partial<LoginResponseDTO> | null>;

// ==================== 회원가입 ==================== //

export type GenderType = "M" | "F";

export interface SignupRequestDTO {
  username: string;
  email: string;
  password: string;
  birthday: Date | null;
  gender: GenderType;
}

export interface SignupResponseDTO {
  exists: "email" | "username";
}

export type PostSignupResponse = ClientResponse<Partial<SignupResponseDTO> | null>;
