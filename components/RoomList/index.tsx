"use client";

import { BLUR_DATA_URL } from "@/constants";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { RoomApiType, RoomType } from "@/interface";
import { salePrice } from "@/utils";
import axios from "axios";
import cn from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import { useInfiniteQuery } from "react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Loader, LoaderGrid } from "../Loader";
import { MapButton } from "../Map";
import ShareButton from "../RoomDetail/ShareButton";

export function Main({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const limit = 24;

  const fetchRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?page=${pageParam}`,
      {
        params: {
          limit: pageParam === 1 ? limit - 1 : limit,
          page: pageParam,
        },
      }
    );
    return data as RoomApiType;
  };

  const {
    data: rooms,
    isError,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["rooms"], fetchRooms, {
    getNextPageParam: (lastPage, pages) =>
      lastPage.data?.length >= (lastPage.page === 1 ? limit - 1 : limit)
        ? lastPage.page + 1
        : undefined,
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
      <div className="mt-14 md:mt-10 lg:mt-20 mb-20 sm:px-4 md:px-8 lg:px-16">
        <GridLayout>
          {rooms && <>{children}</>}

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
      </div>
      <MapButton onClick={() => router.push("/map")} />
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="touch-none w-full h-10 mb-10" ref={ref} />
    </>
  );
}

export function RoomItem({ room }: { room: RoomType }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);
  const handleLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (status === "unauthenticated") {
      router.push("/signin", { scroll: false });
      return;
    }
    const like = await axios.post(`/api/likes`, {
      roomId: room.id,
    });

    if (like.status === 201) {
      toast.success("숙소를 찜했습니다");
      setIsLike(true);
    } else {
      toast.error("찜을 취소하였습니다");
      setIsLike(false);
    }
  };

  useEffect(() => {
    setIsLike(
      room.likes?.findIndex((a) => a.userId === session?.user.id) !== -1
    );
  }, [room.likes?.length]);
  return (
    <div key={room.id}>
      <Link href={`/rooms/${room.id}`} prefetch={false}>
        <Swiper
          navigation
          pagination
          modules={[Navigation, Pagination]}
          className="overflow-hidden relative z-0 rounded-md "
          style={{ aspectRatio: "20/19" }}
        >
          {room?.images.length > 0 &&
            room?.images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={image}
                  alt={room.title}
                  placeholder="blur"
                  style={{ objectFit: "cover" }}
                  fill
                  sizes="(min-width: 640px) 240px, 320px"
                  blurDataURL={BLUR_DATA_URL}
                  className="w-full h-auto object-fit hover:shadow-lg"
                />
              </SwiperSlide>
            ))}
          {!room.guestPreferences && (
            <button
              type="button"
              className="absolute top-3 left-3 z-30 text-sm font-semibold bg-white rounded-full shadow-xl px-3 py-1 hover:bg-gray-200"
              style={{ lineHeight: "17px" }}
            >
              게스트 선호
            </button>
          )}

          <div className="flex absolute top-2 right-3 z-30">
            <ShareButton data={room}>
              <div className="flex justify-center items-center w-[19px] h-[19px] rounded-lg bg-gray-300 opacity-30 hover:opacity-80">
                <CiShare1 className="text-gray-900" />
              </div>
            </ShareButton>
            <button type="button" onClick={handleLike} className="text-xl">
              {isLike ? (
                <>
                  <AiFillHeart className="text-red-500 hover:text-red-600" />
                </>
              ) : (
                <>
                  <AiOutlineHeart className="text-gray-300 hover:text-red-600" />
                </>
              )}
            </button>
          </div>
        </Swiper>

        <div className="mt-2 mb-1 font-semibold text-base">{room.title}</div>
        <span
          data-cy="room-category"
          className="text-xs px-2 py-1 bg-gray-200 text-gray-400 mt-1"
        >
          {room.category}
        </span>
        <div className="mt-1 text-gray-400 text-sm" data-cy="room-address">
          {room.address}
        </div>
        <div className="mt-1 text-base">
          {room.sale ? (
            <>
              <span className="text-rose-600">{room.sale}%</span>
              <span className="text-gray-300 decoration-slate-300 line-through mx-2">
                ₩{room.price.toLocaleString()}원{" "}
              </span>
              <span className="">
                ₩{salePrice(room.price, room.sale).toLocaleString()}원{" "}
              </span>
            </>
          ) : (
            <span>₩{room.price.toLocaleString()}원 </span>
          )}

          <span className="text-gray-500"> /박</span>
        </div>
      </Link>
    </div>
  );
}

export function GridLayout({
  children,
  isSearch = false,
}: {
  children: ReactNode;
  isSearch?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 sm:grid-cols-2 gap-8",
        isSearch
          ? "lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-4"
          : "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6"
      )}
    >
      {children}
    </div>
  );
}
