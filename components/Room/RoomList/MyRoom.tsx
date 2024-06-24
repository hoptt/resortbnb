"use client";

import { searchState } from "@/atom";
import { LoaderMyRoom } from "@/components/Loader";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { RoomType } from "@/interface";
import { storage } from "@/utils/firebaseApp";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { deleteObject, ref } from "firebase/storage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";

export default function MyRoom() {
  const observerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pageRef = useIntersectionObserver(observerRef, {});
  const limit = 15;
  const isPageEnd = !!pageRef?.isIntersecting;
  const { data: session } = useSession();
  const searchStateValue = useRecoilValue(searchState);

  const searchParams = {
    q: searchStateValue.q,
  };

  const fetchMyRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios(`/api/rooms?my=true`, {
      params: {
        limit,
        page: pageParam,
        ...searchParams,
      },
    });

    return data;
  };

  const {
    data: rooms,
    isError,
    hasNextPage,
    isPending,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["rooms-user", session?.user.id, searchParams],
    queryFn: fetchMyRooms,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data?.length >= limit ? lastPage.page + 1 : undefined,
    enabled: !!session?.user.id,
    initialPageParam: 1,
  });

  async function deleteImages(imageKeys: string[] | null) {
    if (imageKeys) {
      imageKeys.forEach((imageKey) => {
        const imageRef = ref(storage, `${session?.user.id}/${imageKey}`);
        deleteObject(imageRef);
      });
    }

    return imageKeys;
  }

  const handleDelete = async (data: RoomType) => {
    const confirm = window.confirm("해당 숙소를 삭제하시겠습니까?");

    if (confirm && data) {
      try {
        // await deleteImages(data.imageKeys || null);
        const result = await axios.patch(`/api/rooms?id=${data.id}&use=N`);

        if (result.status === 200) {
          toast.success("숙소를 삭제했습니다");
          refetch();
        } else {
          toast.error("데이터 삭제 중 문제가 발생하였습니다");
        }
      } catch (e) {
        toast.error("다시 시도해주세요");
      }
    }
  };
  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isPageEnd]);

  useEffect(() => {
    router.refresh();
  }, []);

  if (!!isError) {
    throw new Error("room API fetching error");
  }

  if (isPending) return <LoaderMyRoom />;
  return (
    <>
      {rooms.pages[0].totalCount === 0 ? (
        <>
          <div className="mt-5 text-gray-400">
            조회된 숙소 데이터가 없습니다
          </div>
        </>
      ) : (
        <>
          <div className="overflow-auto">
            <table className="text-sm text-left text-gray-500 overflow-x-scroll table-auto">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th scope="col" className="py-4 px-6 min-w-[120px]">
                    숙소
                  </th>
                  <th scope="col" className="py-4 px-6 min-w-[300px]">
                    주소
                  </th>
                  <th scope="col" className="py-4 px-6 min-w-[120px]">
                    카테고리
                  </th>
                  <th scope="col" className="py-4 px-6 min-w-[120px]">
                    가격
                  </th>
                  <th scope="col" className="py-4 px-6 min-w-[200px]">
                    생성 날짜
                  </th>
                  <th scope="col" className="py-4 px-6 min-w-[200px]">
                    수정 날짜
                  </th>
                  <th scope="col" className="py-4 px-6 min-w-[100px]">
                    상세보기
                  </th>
                  <th scope="col" className="py-4 px-6 min-w-[80px]">
                    수정
                  </th>
                  <th scope="col" className="py-4 px-6 min-w-[80px]">
                    삭제
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms?.pages?.map((page, idx) => (
                  <React.Fragment key={idx}>
                    {page?.data.map((room: RoomType) => (
                      <tr key={room.id} className="bg-white border-b">
                        <td className="px-6 py-4">{room.title}</td>
                        <td className="px-6 py-4">{room.base_address}</td>
                        <td className="px-6 py-4">{room.category}</td>
                        <td className="px-6 py-4">
                          {room.price?.toLocaleString()} 원
                        </td>
                        <td className="px-6 py-4">
                          {dayjs(room.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </td>
                        <td className="px-6 py-4">
                          {dayjs(room.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                        </td>
                        <td className="px-6 py-4 min-w-[80px]">
                          <Link
                            href={`/rooms/${room.id}`}
                            className="font-medium text-gray-600 hover:underline"
                          >
                            보기
                          </Link>
                        </td>
                        <td className="px-6 py-4 min-w-[80px]">
                          <Link
                            href={`/rooms/edit/${room.id}`}
                            className="font-medium text-gray-600 hover:underline"
                          >
                            수정
                          </Link>
                        </td>
                        <td className="px-6 py-4 min-w-[80px]">
                          <button
                            type="button"
                            className="font-medium text-gray-600 hover:underline"
                            onClick={() => handleDelete(room)}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="w-full touch-none h-1 mb-5" ref={observerRef} />
          </div>
        </>
      )}
    </>
  );
}
