import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import { useToasts } from "react-toast-notifications";

import { useMutationLogin } from "../api/auth";
import storage, { USER } from "../libs/storage";

import { undrawJoin } from "../assets/images";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("이메일 형식에 맞지 않습니다.")
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .min(6, "최소 6자 이상을 입력하세요.")
    .required("비밀번호를 입력해주세요."),
});

interface FormFieldValue {
  email: string;
  password: string;
}

interface LoginPageProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  const { register, handleSubmit, reset } = useForm<FormFieldValue>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { addToast } = useToasts();
  const { mutateAsync } = useMutationLogin();

  const onSubmit = async (data: FormFieldValue) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await mutateAsync(body);
      if (!result.ok) {
        addToast(result.message, {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }

      if (!result.data) {
        addToast("로그인에 실패하였습니다.", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }

      addToast("로그인에 성공하였습니다.", {
        appearance: "success",
        autoDismiss: true,
      });

      storage.setItem(USER, result.data);
    } catch (error) {
      console.error(error);
      addToast("로그인에 실패하였습니다", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <>
      <Helmet>
        <title>로그인 – Velopick</title>
      </Helmet>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-gray-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src={undrawJoin}
            className="w-full h-full object-fill"
            alt="Login Page"
          />
        </div>

        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl font-bold text-brand-blue md:text-brand-black">
              <Link
                to="/"
                className="flex flex-row items-center justify-center"
              >
                <span className="font-mono">Velopick</span>
              </Link>
            </h1>

            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              로그인
            </h1>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700">이메일</label>
                <input
                  {...register("email")}
                  type="text"
                  name="email"
                  placeholder="이메일"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-500 focus:bg-white focus:outline-none"
                  autoComplete="off"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">패스워드</label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="text-right mt-2">
                <Link
                  to="/"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  비밀번호 찾기
                </Link>
              </div>

              <button
                type="submit"
                className="w-full block bg-gray-700 focus:bg-gray-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                로그인
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <button
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <FcGoogle />
                <span className="ml-4">구글로 로그인하기</span>
              </div>
            </button>

            <p className="mt-8">
              계정이 없으신가요?{" "}
              <Link
                to="/register"
                className="text-amber-500 hover:text-amber-700 font-semibold"
              >
                회원가입 하러가기
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
