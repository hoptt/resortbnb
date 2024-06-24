"use client";
import { RoomType } from "@/interface";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useLikeButton } from "./_lib/useLikeButton";

export default function LikeButton({ room }: { room: RoomType }) {
  const { toggleLike, myLikeCheck } = useLikeButton(room);
  return (
    <>
      <button
        type="button"
        onClick={toggleLike}
        className="flex gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-black/10"
      >
        {myLikeCheck ? (
          <>
            <AiFillHeart className="text-red-500 hover:text-red-600" />
            <span className="underline">취소</span>
          </>
        ) : (
          <>
            <AiOutlineHeart className="hover:text-red-600" />
            <span className="underline">찜</span>
          </>
        )}
      </button>
    </>
  );
}
