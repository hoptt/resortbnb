import { RoomType, LikeType } from "@/interface";
import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import toast from "react-hot-toast";
import { updateRoom } from "../RoomDetail/_lib/api";

export function useRoomItem(
  room: RoomType,
  queryKey: (string | undefined | {})[]
) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLike =
    room.likes?.findIndex((a) => a.userId === session?.user.id) !== -1;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateRoom(room.id),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey });

      const previousRoom =
        queryClient.getQueryData<InfiniteData<Array<RoomType>>>(queryKey);

      queryClient.setQueryData<InfiniteData<Array<RoomType>>>(
        queryKey,
        (old: any) => {
          const newData = old?.pages.map((page: { data: RoomType[] }) => ({
            ...page,
            data: page.data.map((preRoom: RoomType) => {
              const isChanged = preRoom.id === room.id;
              if (isChanged) {
                const hasLikeValue =
                  preRoom.likes?.findIndex(
                    (a) => a.userId === session?.user.id
                  ) !== -1;
                if (hasLikeValue) {
                  return {
                    ...preRoom,
                    likes: [],
                  };
                } else {
                  const newLikeValue: LikeType = {
                    id: 0,
                    createdAt: "",
                    userId: session!.user.id,
                    roomId: room.id,
                    room,
                  };
                  return {
                    ...preRoom,
                    likes: [...preRoom.likes!, newLikeValue],
                  };
                }
              } else {
                return { ...preRoom };
              }
            }),
          }));
          return {
            ...old,
            pages: newData,
          };
        }
      );

      return { previousRoom };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.previousRoom);
      toast.error("오류 발생 다시 시도해주세요");
    },
    onSettled: (_, err) => {
      if (!err) toast.success("실제 데이터 반영 완료");
    },
  });

  const handleLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (status === "unauthenticated") {
      router.push("/signin", { scroll: false });
      return;
    }
    mutate();
  };

  return { isLike, handleLike };
}
