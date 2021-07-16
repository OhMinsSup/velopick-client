import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

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
  const history = useHistory();
  const { addToast } = useToasts();

  return useMutation<PostSignupResponse, any, SignupRequestDTO>(
    (body) => postSignupAPI(body),
    {
      onSuccess: (res, variables, context) => {
        try {
          if (!res.ok) {
            addToast(res.message, {
              appearance: "error",
              autoDismiss: true,
            });
            return;
          }

          addToast("회원가입에 성공하였습니다. \n 로그인을 해주세요.", {
            appearance: "success",
            autoDismiss: true,
          });

          history.push("/login");
        } catch (error) {
          throw error;
        }
      },
      onError: (err, variables, context) => {
        addToast("회원가입에 실패하였습니다. \n 다시 시도 해주세요.", {
          appearance: "error",
          autoDismiss: true,
        });
      },
    }
  );
}
