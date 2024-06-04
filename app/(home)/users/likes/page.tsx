"use client";

import CategoryList from "@/components/CategoryList";
import { Loader, LoaderGrid } from "@/components/Loader";
import { GridLayout, RoomItem } from "@/components/RoomList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { LikeType, RoomType } from "@/interface";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

import { MapButton } from "@/components/Map";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserLikes() {
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const { data: session } = useSession();
  const fetchLikes = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/likes?page=${pageParam}`,
      {
        params: {
          limit: 12,
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
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["likes", session?.user.id], fetchLikes, {
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  if (isError) throw new Error("에러 룸");
  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isPageEnd]);
  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl max-w-7xl mx-auto px-4">
        찜한 숙소 리스트
      </h1>
      <div className="mt-2 text-gray-500 max-w-7xl mx-auto px-4">
        찜한 숙소 리스트입니다.
      </div>
      <GridLayout>
        {isLoading || isFetching ? (
          <LoaderGrid />
        ) : (
          likes?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((like: LikeType) => (
                <RoomItem key={like.id} room={like.room} />
              ))}
            </React.Fragment>
          ))
        )}
      </GridLayout>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="touch-none w-full h-10 mb-10" ref={ref} />
    </>
  );
}
