/* eslint-disable @next/next/no-img-element */
"use client";

import { CommentApiType, CommentType, RoomType } from "@/interface";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderComments } from "../Loader";
import { useEffect, useRef, useState } from "react";
import CommentListModal from "./CommentListModal";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRouter } from "next/navigation";
import React from "react";
import { BiChevronRight } from "react-icons/bi";

export function UserComments() {
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const router = useRouter();
  const isPageEnd = !!pageRef?.isIntersecting;
  const limit = 12;
  const { data: session } = useSession();
  const fetchComments = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `/api/comments?my=true&page=${pageParam}&limit=${limit}`
    );
    return data;
  };

  const {
    data: comments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments-infinite-user", session?.user.id],
    queryFn: fetchComments,
    getNextPageParam: (lastPage: any, pages) =>
      lastPage.data?.length >= limit ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (isPageEnd && hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isPageEnd]);

  return (
    <>
      <div className="mt-12 grid md:grid-cols-2 gap-12">
        {comments?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.totalCount === 0 && (
              <div className="mt-5 text-gray-400">
                조회된 후기 데이터가 없습니다
              </div>
            )}
            {page.data.map((comment: CommentType) => (
              <div key={comment.id} className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <img
                    src={comment?.user?.image || "/images/logo.png"}
                    alt="profile img"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h1 className="font-semibold">{comment?.user?.name}</h1>
                    <div className="text-gray-500 text-xs mt-1">
                      {dayjs(comment?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                  </div>
                </div>
                <div className="max-w-lg text-gray-600 ml-2 whitespace-pre-line break-words">
                  {comment?.body}
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/rooms/${comment.roomId}`)}
                  className="underline flex gap-1 items-center justify-start hover:text-gray-500 font-semibold"
                >
                  숙소 보기 <BiChevronRight className="text-xl" />
                </button>
              </div>
            ))}
          </React.Fragment>
        ))}
        {(isLoading || isFetchingNextPage) && <LoaderComments />}
      </div>
      <div className="w-full h-[1px] touch-none mb-10" ref={ref} />
    </>
  );
}

export function Comment({ room }: { room: RoomType }) {
  const fetchComments = async () => {
    const { data } = await axios(`/api/comments?roomId=${room.id}&limit=6`);

    return data;
  };

  const {
    data: comments,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`room-comment`, room.id],
    queryFn: fetchComments,
    enabled: !!room.id,
  });
  return (
    <div className="border-b border-gray-300 py-8 px-4">
      <CommentList comments={comments} isLoading={isLoading} roomId={room.id} />
      <CommentForm room={room} refetch={refetch} />
    </div>
  );
}

function CommentList({
  comments,
  isLoading,
  roomId,
}: {
  comments: CommentApiType;
  isLoading: boolean;
  roomId: number;
}) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  return (
    <>
      <h1 className="font-semibold text-xl mb-2">
        후기 {comments?.totalCount || 0}개
      </h1>
      {comments?.totalCount > 0 && (
        <>
          <div className="mt-8 grid md:grid-cols-2 gap-12">
            {isLoading ? (
              <LoaderComments />
            ) : (
              (comments?.data || []).map((comment) => (
                <div key={comment.id} className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src={comment.user.image || "/images/logo.png"}
                      alt="profile img"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h1 className="font-semibold">{comment.user.name}</h1>
                      <div className="text-gray-500 text-xs mt-1">
                        {dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                      </div>
                    </div>
                  </div>
                  <div className="max-w-md text-gray-600 ml-2 whitespace-pre-line break-words">
                    {comment.body}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {comments?.totalCount > 6 && (
        <div className="mt-8 mb-20">
          <button
            type="button"
            onClick={openModal}
            className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5"
          >
            후기 {comments?.totalCount || 0}개 모두 보기
          </button>
        </div>
      )}

      {isOpenModal && (
        <CommentListModal
          isOpen={isOpenModal}
          closeModal={closeModal}
          roomId={roomId}
        />
      )}
    </>
  );
}

function CommentForm({
  room,
  refetch,
}: {
  room: RoomType;
  refetch: () => void;
}) {
  const { status } = useSession();
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    if (!comment) {
      toast.error("댓글을 작성해주세요");
      return;
    }
    const res = await axios.post("/api/comments", {
      body: comment,
      roomId: room.id,
    });

    if (res.status === 200) {
      toast.success("댓글을 생성했습니다");
      setComment("");
      refetch();
    } else {
      toast.error("다시 시도해주세요");
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };
  return (
    <form className="mt-8">
      {status === "authenticated" && (
        <>
          <textarea
            rows={3}
            onChange={onChange}
            name="comment"
            value={comment}
            required
            placeholder="후기를 작성해주세요..."
            className="w-full block min-h-[120px] resize-none 
        border rounded-md bg-transparent py-2.5 px-4 placeholder:text-gray-400 text-sm leading-6 outline-none focus:border-black"
          />
          <div className="flex flex-row-reverse mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-2.5 text-sm
            font-semibold shadow-sm rounded-md"
            >
              작성하기
            </button>
          </div>
        </>
      )}
    </form>
  );
}
