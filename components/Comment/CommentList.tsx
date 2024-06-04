/* eslint-disable @next/next/no-img-element */
"use client";

import { CommentApiType } from "@/interface";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { Loader } from "../Loader";
import CommentListModal from "./CommentListModal";

export default function CommentList({
  comments,
  isLoading,
  roomId,
}: {
  comments: CommentApiType;
  isLoading: boolean;
  roomId: number;
}) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  return (
    <>
      <h1 className="font-semibold text-xl mb-2">
        후기 {comments?.totalCount || 0}개
      </h1>
      <div className="mt-8 grid md:grid-cols-2 gap-12">
        {isLoading ? (
          <Loader className="md:col-span-2" />
        ) : (
          (comments?.data || []).map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  src={comment.user.image || "/images/logo.png"}
                  alt="profile img"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h1 className="font-semibold">{comment.user.name}</h1>
                  <div className="text-gray-500 text-xs mt-1">
                    {dayjs(comment.createdAt).format("YYYY-MM-DD HH:MM:ss")}
                  </div>
                </div>
              </div>
              <div className="max-w-md text-gray-600 ml-2">{comment.body}</div>
              <button
                type="button"
                onClick={openModal}
                className="underline font-semibold flex gap-1 items-center justify-start ml-2"
              >
                더보기 <BiChevronRight className="text-xl" />
              </button>
            </div>
          ))
        )}
      </div>
      {comments?.totalCount > 0 && (
        <div className="mt-8 mb-20">
          <button
            type="button"
            onClick={openModal}
            className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5"
          >
            후기 {comments?.totalCount || 0}개 모두 보기
          </button>
        </div>
      )}

      {isOpenModal && (
        <CommentListModal
          isOpen={isOpenModal}
          closeModal={closeModal}
          roomId={roomId}
        />
      )}
    </>
  );
}
