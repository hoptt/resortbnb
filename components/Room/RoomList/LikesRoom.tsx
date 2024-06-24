"use client";

import { Loader, LoaderGrid } from "@/components/Loader";
import { GridLayout, RoomItem } from "@/components/Room/RoomList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { LikeType } from "@/interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef } from "react";

import { useSession } from "next-auth/react";

export default function LikesRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const limit = 12;
  const { data: session } = useSession();
  const queryKey = ["likes", session?.user.id];
  const fetchLikes = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/likes?page=${pageParam}`,
      {
        params: {
          limit,
          page: pageParam,
        },
      }
    );
    return data;
  };

  const {
    data: likes,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: fetchLikes,
    getNextPageParam: (lastPage, pages) =>
      lastPage.data?.length >= limit ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  if (isError) throw new Error("데이터를 불러오는중 오류가 발생했습니다");
  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isPageEnd]);

  return (
    <>
      <GridLayout>
        {likes?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.totalCount === 0 && (
              <div className="mt-5 text-gray-400">
                조회된 찜한 데이터가 없습니다
              </div>
            )}
            {page.data.map((like: LikeType) => (
              <RoomItem
                key={like.id}
                room={like.room}
                optimisticKey={queryKey}
              />
            ))}
          </React.Fragment>
        ))}
        {(isLoading || isFetchingNextPage) && <LoaderGrid />}
      </GridLayout>

      <div className="touch-none w-full h-10 mb-10" ref={ref} />
    </>
  );
}
