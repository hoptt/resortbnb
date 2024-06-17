"use client";
import { prevPathState } from "@/atom";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";

export function useSignIn() {
  const { status } = useSession();
  const router = useRouter();
  const prevPath = useRecoilValue(prevPathState);
  const nextUrl = decodeURIComponent(prevPath || "/");

  const handleClickGoogle = () => {
    try {
      signIn("google", {
        callbackUrl: nextUrl,
      });
    } catch (e) {
      toast.error("다시 시도해주세요");
    }
  };
  const handleClickNaver = () => {
    try {
      signIn("naver", { callbackUrl: nextUrl });
    } catch (e) {
      toast.error("다시 시도해주세요");
    }
  };
  const handleClickKakao = () => {
    try {
      signIn("kakao", { callbackUrl: nextUrl });
    } catch (e) {
      toast.error("다시 시도해주세요");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return { handleClickGoogle, handleClickNaver, handleClickKakao };
}
