import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import omit from "lodash/omit";
import cn from "classnames";

import { useMutationSignup, GenderType } from "../api/auth";
import Head from "../components/ui/Head";

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[ㄱ-ㅎ가-힣a-z0-9-_]+$/, "잘못된 형식의 이름입니다.")
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
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),
  birthday: yup.date().required("생일을 입력해주세요."),
});

const defaultValues: FormFieldValue = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  gender: "M",
  birthday: new Date(),
};

const iptClassName =
  "w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-white focus:outline-none";

interface FormFieldValue {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthday: Date;
  gender: GenderType;
}

interface RegisterPageProps {}
const RegisterPage: React.FC<RegisterPageProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFieldValue>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
    criteriaMode: "firstError",
  });

  const { mutate } = useMutationSignup();

  const onSubmit = (data: FormFieldValue) => {
    const body = omit(
      { ...data, birthday: data.birthday.getTime() },
      "passwordConfirm"
    );

    mutate(body);
  };

  return (
    <>
      <Head
        title="회원가입 – Velopick"
        description="velopick에 회원가입 또는 로그인을 하여 나만의 장소를 추가하세요!"
      />
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

            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-5">
              회원가입
            </h1>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="username" className="block text-gray-700">
                  이름
                </label>
                <input
                  {...register("username")}
                  id="username"
                  type="text"
                  name="username"
                  placeholder="이름"
                  className={cn(iptClassName, {
                    "border-red-500": errors.username?.message,
                  })}
                  autoComplete="off"
                />
              </div>

              <div className="mt-1">
                <label htmlFor="email" className="block text-gray-700">
                  이메일
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="text"
                  name="email"
                  placeholder="이메일"
                  className={cn(iptClassName, {
                    "border-red-500": errors.email?.message,
                  })}
                  autoComplete="off"
                />
              </div>

              <div className="mt-1">
                <label htmlFor="password" className="block text-gray-700">
                  패스워드
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  className={cn(iptClassName, {
                    "border-red-500": errors.password?.message,
                  })}
                />
              </div>

              <div className="mt-1">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-gray-700"
                >
                  패스워드 확인
                </label>
                <input
                  {...register("passwordConfirm")}
                  id="passwordConfirm"
                  type="password"
                  name="passwordConfirm"
                  placeholder="비밀번호 확인"
                  className={cn(iptClassName, {
                    "border-red-500": errors.passwordConfirm?.message,
                  })}
                />
              </div>

              <div className="mt-1">
                <label htmlFor="genders" className="block text-gray-700">
                  성별
                </label>
                <select
                  id="gender"
                  {...register("gender")}
                  className={cn(iptClassName, {
                    "border-red-500": errors.gender?.message,
                  })}
                >
                  <option value="M">남자</option>
                  <option value="F">여자</option>
                </select>
              </div>

              <div className="mt-1">
                <label htmlFor="birthday" className="block text-gray-700">
                  생일
                </label>
                <input
                  {...register("birthday", {
                    valueAsDate: true,
                  })}
                  id="birthday"
                  type="date"
                  name="birthday"
                  className={cn(iptClassName, {
                    "border-red-500": errors.birthday?.message,
                  })}
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
