"use client";
import { filterState } from "@/atom";
import { Loader, LoaderGrid, MapLoading } from "@/components/Loader";
import { GridLayout, RoomItem } from "@/components/Room/RoomList";
import { DEFAULT_LAT, DEFAULT_LNG, GEO_LOCATION_DATA } from "@/constants";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { RoomType } from "@/interface";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import CategoryList from "../../CategoryList";
type Props = {
  params: {
    location: string;
  };
};

const DyanmicSearchMap = dynamic(() => import("@/components/Map/SearchMap"), {
  ssr: false,
  loading: () => <MapLoading className="h-screen" />,
});

export default function SearchRoom({ params }: Props) {
  const location = decodeURIComponent(params.location);
  const lat = GEO_LOCATION_DATA[location]?.lat || DEFAULT_LAT;
  const lng = GEO_LOCATION_DATA[location]?.lng || DEFAULT_LNG;
  const ref = useRef<HTMLDivElement>(null);
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const limit = 24;
  const filterParams = {
    location: location,
    category: filterValue.category,
    filter: true,
  };
  const queryKey = ["roomsearched", filterParams];
  const fetchSearchedRooms = async ({ pageParam = 1 }) => {
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
    queryFn: fetchSearchedRooms,
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
    setFilterValue((prev) => ({
      ...prev,
      location,
    }));
  }, []);

  return (
    <>
      <CategoryList />
      <div className="flex gap-8 mt-14 lg:mt-20 mb-20 sm:px-4 md:px-8 lg:px-16">
        <div className="flex flex-col w-full">
          <GridLayout isSearch={true}>
            {(rooms?.pages || []).map((page, index) => (
              <React.Fragment key={index}>
                {page.totalCount === 0 && (
                  <div className="mt-5 text-gray-400">
                    조회된 숙소 데이터가 없습니다
                  </div>
                )}
                {page.data.map((room: RoomType) => (
                  <RoomItem
                    key={room.id}
                    room={room}
                    optimisticKey={queryKey}
                  />
                ))}
              </React.Fragment>
            ))}

            {(isLoading || isFetchingNextPage) && <LoaderGrid />}
          </GridLayout>
          {(isFetching || hasNextPage || isFetchingNextPage) && (
            <Loader className="mt-20" />
          )}
        </div>
        <div className="hidden 3xl:block sticky top-20 right-0 w-full h-full 3xl:max-w-[700px]">
          <DyanmicSearchMap lat={lat} lng={lng} />
        </div>
      </div>
      <div className="touch-none w-full h-10 mb-10" ref={ref} />
    </>
  );
}
