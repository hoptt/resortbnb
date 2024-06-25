"use client";
import { LoaderBooking } from "@/components/Loader";
import { BLUR_DATA_URL } from "@/constants";
import { BookingType } from "@/interface";
import { salePrice } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { fetchBookings } from "./_lib/api";

export default function BookingList() {
  const router = useRouter();
  const limit = 5;

  const {
    data: bookings,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["bookings-user"],
    queryFn: fetchBookings,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data?.length >= limit ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  return (
    <>
      {bookings?.pages?.map((page, index) => (
        <React.Fragment key={index}>
          {page.totalCount === 0 && (
            <div className="mt-5 text-gray-400">
              조회된 예약 데이터가 없습니다
            </div>
          )}
          {page.data.map((booking: BookingType) => (
            <div
              key={booking.id}
              className="flex flex-col gap-6 border-b hover:bg-black/5 md:px-6 py-6"
            >
              <h1 className="font-semibold text-lg md:text-xl">
                {booking?.status === "SUCCESS" ? "예약된 여행" : "취소된 여행"}
              </h1>
              <div className="flex flex-col md:flex-row gap-4 md:items-center w-full justify-between">
                <Link href={`/rooms/${booking?.roomId}`} prefetch={false}>
                  <div className="flex items-center gap-4">
                    <Image
                      className="rounded-md"
                      src={booking?.room?.images?.[0] || "/images/logo.png"}
                      width={80}
                      height={80}
                      quality={30}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      alt="숙소 이미지"
                    />
                    <div>
                      <h2 className="font-semibold">{booking?.room?.title}</h2>

                      <p className="mt-1 text-sm text-gray-700">
                        {booking?.room?.base_address}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {dayjs(booking?.checkIn).format("YYYY년 MM월 DD일")} -{" "}
                        {dayjs(booking?.checkOut).format("YYYY년 MM월 DD일")} |{" "}
                        {booking?.guestCount} 명 |{" "}
                        {salePrice(
                          booking?.totalAmount,
                          booking?.discounted
                        ).toLocaleString()}{" "}
                        원
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => router.push(`/rooms/${booking?.roomId}`)}
                  className="hidden md:flex gap-1 items-center underline hover:text-gray-500"
                >
                  숙소 보기
                  <BiChevronRight className="text-xl" />
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => router.push(`/users/bookings/${booking?.id}`)}
                  className="text-white bg-rose-600 hover:bg-rose-500 text-sm md:text-base py-2 px-4 md:py-2.5 rounded-md"
                >
                  예약내역 확인
                </button>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
      {(isLoading || isFetchingNextPage) && <LoaderBooking />}
      {hasNextPage && (
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            className="mt-8 bg-black px-5 py-3.5 shadow-sm hover:shadow-xl rounded-full text-white"
          >
            예약내역 더 불러오기
          </button>
        </div>
      )}
    </>
  );
}
