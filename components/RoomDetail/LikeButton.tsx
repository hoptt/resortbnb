"use client";
import { RoomType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { useQuery } from "react-query";

export default function LikeButton({ room }: { room: RoomType }) {
  const { data: session } = useSession();
  const fetchRoom = async () => {
    const { data } = await axios(`/api/rooms?id=${room.id}`);
    return data as RoomType;
  };

  const { data: roomData, refetch } = useQuery<RoomType>(
    [`like-room`, room.id],
    fetchRoom,
    {
      enabled: !!room.id,
      refetchOnWindowFocus: false,
    }
  );
  const toggleLike = async () => {
    if (session?.user && room) {
      try {
        const like = await axios.post(`/api/likes`, {
          roomId: room.id,
        });
        if (like.status === 201) {
          toast.success("숙소를 찜했습니다");
        } else {
          toast.error("찜을 취소하였습니다");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("로그인 후 시도해주세요");
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={toggleLike}
        className="flex gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-black/10"
      >
        {roomData?.likes?.length ? (
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
