import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { useMutationSignup, GenderType } from "../api/auth";

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-z0-9-_]+$/, "잘못된 형식의 이름입니다.")
    .min(6, "최소 6자 이상을 입력하세요.")
    .max(16, "최대 16자 이하로 입력하세요.")
    .required("이름을 입력해주세요."),
  email: yup
    .string()
    .email("이메일 형식에 맞지 않습니다.")
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .min(6, "최소 6자 이상을 입력하세요.")
    .required("비밀번호를 입력해주세요."),
  birthday: yup.date().required("생일을 입력해주세요."),
});

interface FormFieldValue {
  username: string;
  email: string;
  password: string;
  birthday: Date | null;
  gender: GenderType;
}

interface RegisterPageProps {}
const RegisterPage: React.FC<RegisterPageProps> = () => {
  const { register, handleSubmit, reset } = useForm<FormFieldValue>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      gender: "M",
      birthday: null,
    },
  });

  const { addToast } = useToasts();
  const { mutateAsync } = useMutationSignup();

  const onSubmit = async (data: FormFieldValue) => {
    try {
      const result = await mutateAsync(data);
      if (!result.ok) {
        addToast(result.message, {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }

      if (!result.data) {
        addToast("회원가입에 실패하였습니다.", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }

      addToast("회원가입에 성공하였습니다. \n 로그인을 해주세요.", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      console.error(error);
      addToast("회원가입에 실패하였습니다", {
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
        <title>회원가입 – Velopick</title>
      </Helmet>
      <section className="flex flex-col md:flex-row h-screen items-center">
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
              회원가입
            </h1>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700">이름</label>
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  placeholder="이름"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-500 focus:bg-white focus:outline-none"
                  autoComplete="off"
                />
              </div>

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

              <div className="mt-4">
                <label className="block text-gray-700">성별</label>
                <select
                  {...register("gender")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-500 focus:bg-white focus:outline-none"
                >
                  <option value="M">남자</option>
                  <option value="F">여자</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">생일</label>
                <input
                  {...register("birthday", {
                    valueAsDate: true,
                  })}
                  type="date"
                  name="birthday"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-gray-700 focus:bg-gray-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                회원가입
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              계정이 있으신가요?{" "}
              <Link
                to="/login"
                className="text-amber-500 hover:text-amber-700 font-semibold"
              >
                로그인 하러가기
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
