import Link from "next/link";
import React from "react";
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { BsHouseAdd, BsHouseCheck, BsBookmark } from "react-icons/bs";

export default function MyPage() {
  return (
    <>
      <Link
        href="/users/info"
        className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
      >
        <AiOutlineUser className="text-xl md:text-3xl" />
        <div>
          <h1 className="font-semibold">개인정보</h1>
          <h2 className="text-sm text-gray-500">개인정보 및 연락처</h2>
        </div>
      </Link>
      <Link
        href="/rooms/register/category"
        className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
      >
        <BsHouseAdd className="text-xl md:text-3xl" />
        <div>
          <h1 className="font-semibold">숙소 등록</h1>
          <h2 className="text-sm text-gray-500">나의 숙소 등록하기</h2>
        </div>
      </Link>
      <Link
        href="/users/rooms"
        className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
      >
        <BsHouseCheck className="text-xl md:text-3xl" />
        <div>
          <h1 className="font-semibold">숙소 관리</h1>
          <h2 className="text-sm text-gray-500">나의 숙소 관리하기</h2>
        </div>
      </Link>
      <Link
        href="/users/likes"
        className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
      >
        <AiOutlineHeart className="text-xl md:text-3xl" />
        <div>
          <h1 className="font-semibold">찜한 숙소</h1>
          <h2 className="text-sm text-gray-500">찜한 숙소 모아보기</h2>
        </div>
      </Link>
      <Link
        href="/users/comments"
        className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
      >
        <AiOutlineComment className="text-xl md:text-3xl" />
        <div>
          <h1 className="font-semibold">나의 댓글</h1>
          <h2 className="text-sm text-gray-500">나의 댓글 모아보기</h2>
        </div>
      </Link>
      <Link
        href="/users/bookings"
        className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
      >
        <BsBookmark className="text-xl md:text-3xl" />
        <div>
          <h1 className="font-semibold">나의 예약</h1>
          <h2 className="text-sm text-gray-500">나의 예약 모아보기</h2>
        </div>
      </Link>
    </>
  );
}
