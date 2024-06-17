"use client";

import { RoomType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export function useLikeButton(room: RoomType) {
  const router = useRouter();
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
      router.push("/signin", { scroll: false });
    }
  };

  const myLikeCheck =
    roomData &&
    roomData?.likes?.findIndex((a) => a.userId === session?.user.id) !== -1;

  return { toggleLike, roomData, myLikeCheck };
}
