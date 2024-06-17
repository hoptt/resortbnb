"use client";
import { BookingType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useInfiniteQuery } from "react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { BiChevronRight } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BLUR_DATA_URL } from "@/constants";

export default function BookingsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const limit = 5;
  const fetchBookings = async ({ pageParam = 1 }) => {
    const { data } = await axios(`/api/bookings`, {
      params: {
        limit,
        page: pageParam,
        userId: session?.user.id,
      },
    });
    return data;
  };

  const {
    data: bookings,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["bookings-user", session?.user.id], fetchBookings, {
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data?.length >= limit ? lastPage.page + 1 : undefined,
    enabled: !!session?.user.id,
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="font-semibold text-lg md:text-2xl">나의 예약 리스트</h1>
      <p className="mt-2 text-gray-500">나의 예약 일정을 확인해보세요</p>
      <div className="mb-20 mt-10 flex flex-col">
        {bookings?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.length === 0 && (
              <div className="mt-5">조회된 예약 데이터가 없습니다</div>
            )}
            {page.data.map((booking: BookingType) => (
              <div
                key={booking.id}
                className="flex flex-col gap-6 border-b pb-8 hover:bg-black/5 p-6"
              >
                <h1 className="font-semibold text-lg md:text-xl">
                  {booking?.status === "SUCCESS"
                    ? "예약된 여행"
                    : "취소된 여행"}
                </h1>
                <div className="flex gap-4 items-center w-full justify-between">
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
                        <h2 className="font-semibold">
                          {booking?.room?.title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-700">
                          {booking?.room?.address}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {dayjs(booking?.checkIn).format("YYYY년 MM월 DD일")} -{" "}
                          {dayjs(booking?.checkOut).format("YYYY년 MM월 DD일")}{" "}
                          | {booking?.guestCount} 명 |{" "}
                          {booking?.totalAmount?.toLocaleString()} 원
                        </p>
                      </div>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => router.push(`/rooms/${booking?.roomId}`)}
                    className="flex gap-1 items-center underline hover:text-gray-500"
                  >
                    숙소 보기
                    <BiChevronRight className="text-xl" />
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/users/bookings/${booking?.id}`)
                    }
                    className="text-white bg-rose-600 hover:bg-rose-500 px-4 py-2.5 rounded-md"
                  >
                    예약내역 확인
                  </button>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
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
      </div>
    </div>
  );
}
