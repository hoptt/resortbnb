"use client";

import CategoryList from "@/components/CategoryList";
import { Loader, LoaderGrid } from "@/components/Loader";
import { GridLayout, RoomItem } from "@/components/RoomList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { RoomType } from "@/interface";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

import { MapButton } from "@/components/Map";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { filterState } from "@/atom";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const filterValue = useRecoilValue(filterState);
  const router = useRouter();
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const filterParams = {
    location: filterValue.location,
    category: filterValue.category,
  };

  const fetchRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?page=${pageParam}`,
      {
        params: {
          limit: 12,
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
  } = useInfiniteQuery(["rooms", filterParams], fetchRooms, {
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
      <CategoryList />
      <GridLayout>
        {isLoading || isFetching ? (
          <LoaderGrid />
        ) : (
          rooms?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((room: RoomType) => (
                <RoomItem key={room.id} room={room} />
              ))}
            </React.Fragment>
          ))
        )}
      </GridLayout>
      <MapButton onClick={() => router.push("/map")} />
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="touch-none w-full h-10 mb-10" ref={ref} />
    </>
  );
}
