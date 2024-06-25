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

export function useRoomLikeItem(
  like: LikeType,
  queryKey: (string | undefined | {})[]
) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLike = like.room.id === like.roomId;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateRoom(like.room.id),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey });

      const previousRoom =
        queryClient.getQueryData<InfiniteData<Array<LikeType>>>(queryKey);

      queryClient.setQueryData<InfiniteData<Array<LikeType>>>(
        queryKey,
        (old: any) => {
          const newData = old?.pages.map((page: { data: LikeType[] }) => ({
            ...page,
            data: page.data.map((preRoom: LikeType) => {
              const isChanged = preRoom.id === like.id;
              if (isChanged) {
                const hasLikeValue = preRoom.room.id === like.roomId;
                if (hasLikeValue) {
                  return {
                    ...preRoom,
                    roomId: 0,
                  };
                } else {
                  return {
                    ...preRoom,
                    roomId: preRoom.room.id,
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
    if (isLike) {
      const confirm = window.confirm("해당 숙소의 찜을 취소하시겠습니까?");
      if (confirm) mutate();
    } else {
      mutate();
    }
  };

  return { isLike, handleLike };
}
