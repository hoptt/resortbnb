"use client";
import { Loader, LoaderGrid } from "@/components/Loader";
import { GridLayout, RoomItem } from "@/components/RoomList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { RoomType } from "@/interface";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

export default function SaleRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const limit = 24;
  const filterParams = {
    sale: true,
  };
  const fetchRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?page=${pageParam}`,
      {
        params: {
          limit,
          page: pageParam,

          ...filterParams,
        },
      }
    );
    return data;
  };

  const {
    data: rooms,
    isError,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["roomsb", filterParams], fetchRooms, {
    getNextPageParam: (lastPage, pages) =>
      lastPage.data?.length >= limit ? lastPage.page + 1 : undefined,
    refetchOnWindowFocus: false,
  });

  if (isError) throw new Error("에러 룸");
  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isPageEnd]);

  return (
    <>
      <div className="gap-8 mt-14 md:mt-10 lg:mt-20 mb-20 sm:px-4 md:px-8 lg:px-16">
        <h1 className="text-xl font-semibold mb-5">
          <span className="text-rose-600 font-bold text-2xl">
            얼리버드 특가
          </span>{" "}
          특별 이벤트 ( 최대
          <span className="text-rose-600 font-bold text-2xl mx-1">90%</span> 의
          할인을 받아보세요! )
        </h1>
        <GridLayout>
          {(rooms?.pages || []).map((page, index) => (
            <React.Fragment key={index}>
              {page.data.length === 0 && (
                <div className="mt-5">조회된 숙소 데이터가 없습니다</div>
              )}
              {page.data.map((room: RoomType) => (
                <RoomItem key={room.id} room={room} />
              ))}
            </React.Fragment>
          ))}

          {(isLoading || isFetchingNextPage) && <LoaderGrid />}
        </GridLayout>
        {(isFetching || hasNextPage || isFetchingNextPage) && (
          <Loader className="mt-20" />
        )}
      </div>
      <div className="touch-none w-full h-10 mb-10" ref={ref} />
    </>
  );
}
