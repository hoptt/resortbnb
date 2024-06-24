"use client";
import { filterState } from "@/atom";
import { Loader, LoaderGrid } from "@/components/Loader";
import { GridLayout, RoomItem } from "@/components/Room/RoomList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { RoomType } from "@/interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

export default function SaleRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const filterValue = useRecoilValue(filterState);
  const resetFilter = useResetRecoilState(filterState);
  const isPageEnd = !!pageRef?.isIntersecting;
  const limit = 24;
  const filterParams = {
    location: filterValue.location,
    category: filterValue.category,
    sale: true,
    filter: true,
  };
  const queryKey = ["roomsale", filterParams];
  const fetchSaleRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms`,
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
  } = useInfiniteQuery({
    queryKey,
    queryFn: fetchSaleRooms,
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

  useEffect(() => {
    resetFilter();
  }, []);

  return (
    <>
      <div className="gap-8 mt-20 md:mt-14 lg:mt-20 mb-20 sm:px-4 md:px-8 lg:px-16">
        <h1 className="text-xl font-semibold mb-5">
          <span className="text-rose-600 font-bold text-2xl">
            얼리버드 특가
          </span>{" "}
          특별 이벤트{" "}
          <span className="block">
            ( 최대
            <span className="text-rose-600 font-bold text-2xl ms-3 me-1">
              90%
            </span>{" "}
            의 할인을 받아보세요! )
          </span>
        </h1>
        <GridLayout>
          {(rooms?.pages || []).map((page, index) => (
            <React.Fragment key={index}>
              {page.totalCount === 0 && (
                <div className="mt-5 text-gray-400">
                  조회된 숙소 데이터가 없습니다
                </div>
              )}
              {page.data.map((room: RoomType) => (
                <RoomItem key={room.id} room={room} optimisticKey={queryKey} />
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
