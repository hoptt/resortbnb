/* eslint-disable @next/next/no-img-element */
"use client";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { CommentType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

import dayjs from "dayjs";
import "dayjs/locale/ko";

import { BiChevronRight } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function UserComments() {
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const router = useRouter();
  const isPageEnd = !!pageRef?.isIntersecting;
  const { data: session } = useSession();
  const fetchComments = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `/api/comments?my=true&page=${pageParam}&limit=12`
    );
    return data;
  };

  const {
    data: comments,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["comments-infinite-user", session?.user.id],
    fetchComments,
    {
      getNextPageParam: (lastPage: any, pages) =>
        lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
    }
  );

  useEffect(() => {
    if (isPageEnd && hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isPageEnd]);
  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl max-w-7xl mx-auto px-4">
        나의 후기 리스트
      </h1>
      <div className="mt-2 text-gray-500 max-w-7xl mx-auto">
        내가 쓴 후기 리스트입니다
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {comments?.pages?.map((page, index) => (
          <React.Fragment key={index}>
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
                      {dayjs(comment?.createdAt).format("YYYY-MM-DD HH:MM:ss")}
                    </div>
                  </div>
                </div>
                <div className="max-w-lg text-gray-600 ml-2">
                  {comment?.body}
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/rooms/${comment.roomId}`)}
                  className="underline
                flex gap-1 items-center justify-start hover:text-gray-500 font-semibold"
                >
                  숙소 보기 <BiChevronRight className="text-xl" />
                </button>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="w-full h-[1px] touch-none mb-10" ref={ref} />
    </>
  );
}
