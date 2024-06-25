/* eslint-disable @next/next/no-img-element */
"use client";

import { LoaderUserInfo } from "@/components/Loader";
import { UserType } from "@/interface";
import { formatPhoneNumber } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const fetchUser = async () => {
    const { data } = await axios("/api/users");
    return data as UserType;
  };

  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!session?.user.id,
  });

  return (
    <>
      <div className="mt-5 md:mt-10 max-w-3xl mx-auto px-4">
        <div className="flex justify-between gap-4">
          <h1 className="text-2xl font-semibold">
            개인정보
            {user?.account?.[0].provider === "google" ? (
              <FcGoogle className="inline-block ml-2 text-lg" />
            ) : user?.account?.[0].provider === "naver" ? (
              <SiNaver className="inline-block ml-2 text-lg" />
            ) : user?.account?.[0].provider === "kakao" ? (
              <RiKakaoTalkFill className="inline-block ml-2 text-lg" />
            ) : (
              ""
            )}
          </h1>
          <button
            type="button"
            className="text-sm font-semibold underline px-4 pt-1.5 pb-1.5 rounded-md hover:bg-black/5"
            onClick={() => router.push("/users/edit")}
          >
            수정하기
          </button>
        </div>
        <div className="flex flex-col mt-5 md:mt-10 mb-28">
          {isPending ? (
            <LoaderUserInfo />
          ) : (
            <>
              <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
                <h1 className="font-semibold">이름</h1>
                <div className="text-gray-500 text-sm">{user?.name || "-"}</div>
              </div>
              <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
                <h1 className="font-semibold">이메일</h1>
                <div className="text-gray-500 text-sm">
                  {user?.email || "-"}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
                <h1 className="font-semibold">이미지</h1>
                <img
                  src={user?.image || "/images/user-icon.png"}
                  referrerPolicy="no-referrer"
                  width={50}
                  height={50}
                  alt="user img"
                  className="rounded-lg shadow"
                />
              </div>
              <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
                <h1 className="font-semibold">주소</h1>
                <div className="text-gray-500 text-sm">
                  {user?.address || "-"}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
                <h1 className="font-semibold">전화번호</h1>
                <div className="text-gray-500 text-sm">
                  {user?.phone ? formatPhoneNumber(user.phone) : "-"}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
                <h1 className="font-semibold">로그인한 SNS 정보</h1>
                <div className="text-gray-500 text-sm">
                  {user?.account?.[0].provider || "-"}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
                <h1 className="font-semibold">로그아웃</h1>
                <button
                  type="button"
                  className="text-gray-500 text-sm underline text-left inline-block hover:text-gray-700"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  로그아웃하기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
