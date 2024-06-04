"use client";

import { RoomType } from "@/interface";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import axios from "axios";
import { useQuery } from "react-query";

export default function Comment({ room }: { room: RoomType }) {
  const fetchComments = async () => {
    const { data } = await axios(`/api/comments?roomId=${room.id}&limit=6`);

    return data;
  };

  const {
    data: comments,
    refetch,
    isLoading,
  } = useQuery([`room-comment`, room.id], fetchComments, {
    enabled: !!room.id,
  });
  return (
    <div className="border-b border-gray-300 py-8 px-4">
      <CommentList comments={comments} isLoading={isLoading} roomId={room.id} />
      <CommentForm room={room} refetch={refetch} />
    </div>
  );
}
