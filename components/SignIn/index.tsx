"use client";

import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { useSignIn } from "./useSignIn";

export function SignInComponent() {
  const { handleClickGoogle, handleClickNaver, handleClickKakao } = useSignIn();
  return (
    <div className="max-w-xl mx-auto pt-5 pb-12 sm:pt-10 sm:pb-24">
      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-semibold text-center">
          로그인 또는 회원가입
        </h1>
        <hr className="border-b-gray-300" />
        <div className="text-xl md:text-2xl font-semibold">
          resortbnb 에 오신 것을 환영합니다.
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        SNS 계정을 이용해서 로그인 또는 회원가입을 해주세요.
      </div>
      <div className="flex flex-col gap-5 mt-8 sm:mt-16">
        <button
          type="button"
          onClick={handleClickGoogle}
          className="relative border border-gray-400 rounded-md py-3 text-sm hover:bg-black/[0.05] text-center font-semibold"
        >
          <FcGoogle className="absolute left-5 text-xl my-auto inset-y-0" />
          구글로 로그인하기
        </button>
        <button
          type="button"
          onClick={handleClickKakao}
          className="relative border border-gray-400 rounded-md py-3 text-sm hover:bg-black/[0.05] text-center font-semibold"
        >
          <RiKakaoTalkFill className="absolute left-5 text-xl text-yellow-950 my-auto inset-y-0" />
          카카오로 로그인하기
        </button>
        <button
          type="button"
          onClick={handleClickNaver}
          disabled
          className="relative border border-gray-200 rounded-md py-3 text-gray-300 text-sm text-center font-semibold disabled:bg-gray-100/50 cursor-not-allowed"
        >
          <SiNaver className="absolute left-6 text-lg text-gray-300 my-auto inset-y-0" />
          네이버 (심사 중)
        </button>
      </div>
    </div>
  );
}
