import { useMutation } from "react-query";
import { postLoginAPI, postSignupAPI } from "./auth.api";
import {
  LoginRequestDTO,
  PostLoginResponse,
  PostSignupResponse,
  SignupRequestDTO,
} from "./auth.dto";

export function useMutationLogin() {
  return useMutation<PostLoginResponse, any, LoginRequestDTO>((body) =>
    postLoginAPI(body)
  );
}

export function useMutationSignup() {
  return useMutation<PostSignupResponse, any, SignupRequestDTO>((body) =>
    postSignupAPI(body)
  );
}
