/* eslint-disable @next/next/no-img-element */
"use client";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { CommentApiType } from "@/interface";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";
import "dayjs/locale/ko";
import React, { Fragment, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useInfiniteQuery } from "react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  roomId: number;
};

export default function CommentListModal({
  closeModal,
  isOpen,
  roomId,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {
    rootMargin: "10%",
    enableObserver: !!ref.current,
  });

  const isPageEnd = !!pageRef?.isIntersecting;
  const fetchComments = async ({ pageParam = 1 }) => {
    const { data } = await axios(
      `/api/comments?roomId=${roomId}&page=${pageParam}&limit=12`
    );

    return data as CommentApiType;
  };

  const {
    data: comments,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(["room-comment-infinite", roomId], fetchComments, {
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data?.length > 0 ? (lastPage?.page || 0) + 1 : undefined,
  });

  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      fetchNextPage();
    }
  }, [isPageEnd, hasNextPage, fetchNextPage]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-xl md:text-2xl font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    후기 전체 보기
                    <AiOutlineClose
                      className="cursor-pointer rounded-full p-2 hover:bg-black/5 mb-4 text-3xl"
                      onClick={closeModal}
                    />
                  </DialogTitle>

                  <div className="mt-8 flex flex-col gap-8 max-w-lg mb-5">
                    {comments?.pages?.map((page, index) => (
                      <React.Fragment key={index}>
                        {page.data.map((comment) => (
                          <div key={comment.id} className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                              <img
                                src={comment?.user?.image || "/images/logo.png"}
                                alt="profile img"
                                width={50}
                                height={50}
                                className="rounded-full"
                              />
                              <div>
                                <h1 className="font-semibold">
                                  {comment?.user?.name}
                                </h1>
                                <div className="text-gray-500 text-xs mt-1">
                                  {dayjs(comment?.createdAt).format(
                                    "YYYY-MM-DD HH:MM:ss"
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="max-w-lg text-gray-600 ml-2">
                              {comment?.body}
                            </div>
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  <div ref={ref} className="w-full h-[1px] z-10 touch-none" />
                  {/* {(hasNextPage || isFetching || isFetchingNextPage) && (
                    <Loader className="my-8" />
                  )} */}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
