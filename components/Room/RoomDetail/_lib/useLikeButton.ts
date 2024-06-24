"use client";

import { LikeType, RoomType } from "@/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateRoom } from "./api";

export function useLikeButton(room: RoomType) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();

  const fetchRoom = async () => {
    const { data } = await axios(`/api/rooms?id=${room.id}`);
    return data as RoomType;
  };

  const { data: roomData, refetch } = useQuery<RoomType>({
    queryKey: [`like-room`, room.id],
    queryFn: fetchRoom,
    enabled: !!room.id,
  });

  const { status, mutate } = useMutation({
    mutationFn: () => updateRoom(room.id),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [`like-room`, room.id] });

      const previousRoom = queryClient.getQueryData<RoomType>([
        `like-room`,
        room.id,
      ]);

      queryClient.setQueryData<RoomType>([`like-room`, room.id], (old) => {
        const oldLikeValue = old?.likes?.filter(
          (a) => a.userId !== session?.user.id
        )!;

        const hasLikeValue =
          old?.likes?.findIndex((a) => a.userId === session?.user.id) !== -1;
        const newLikeValue: LikeType = {
          id: 0,
          createdAt: "",
          userId: session!.user.id,
          roomId: room.id,
          room,
        };
        const deleteValue = {
          ...old!,
          likes: [...oldLikeValue],
        };

        const createValue = {
          ...old!,
          likes: [...oldLikeValue, newLikeValue],
        };

        return hasLikeValue ? deleteValue : createValue;
      });

      return { previousRoom, newTodo };
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData([`like-room`, room.id], context?.previousRoom);
      toast.error("오류 발생 다시 시도해주세요");
    },
    onSettled: (_, err) => {
      if (!err) toast.success("실제 데이터 반영 완료");
    },
  });

  const toggleLike = async () => {
    if (session?.user && room) {
      try {
        mutate();
      } catch (e) {
        console.log(e);
      }
    } else {
      router.push("/signin", { scroll: false });
    }
  };

  const myLikeCheck =
    roomData &&
    roomData.likes?.findIndex((a) => a.userId === session?.user.id) !== -1;

  return { toggleLike, myLikeCheck };
}
