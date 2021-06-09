import { useMutation } from "react-query";
import { postLoginAPI } from "./auth.api";
import { LoginRequestDTO, PostLoginResponse } from "./auth.dto";

export function useMutationLogin() {
  return useMutation<PostLoginResponse, any, LoginRequestDTO>((body) =>
    postLoginAPI(body)
  );
}
