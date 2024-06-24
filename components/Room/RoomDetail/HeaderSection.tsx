"use client";
import { BLUR_DATA_URL } from "@/constants";
import { RoomType } from "@/interface";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import ImageListModal from "./ImageListModal";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

export default function HeaderSection({ data }: { data: RoomType }) {
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  return (
    <>
      <h1 className="text-lg md:text-3xl font-medium px-4">{data?.title}</h1>
      <div className="flex w-full justify-between items-center px-4">
        <a href="#hosting-place" className="underline text-xs md:text-sm mt-2">
          {data?.base_address}
        </a>
        <div className="flex gap-2 text-xs md:text-sm mt-2">
          <ShareButton data={data}>
            <CiShare1 />
            <span className="underline">공유하기</span>
          </ShareButton>
          <LikeButton room={data} />
        </div>
      </div>

      <div className="mt-6 relative">
        <div className="h-[520px] overflow-hidden gallery">
          {data?.images.slice(0, 5)?.map((img, idx) => (
            <div
              key={img}
              className={`w-full relative gallery__item gallery__item__${data?.images.length}--${idx + 1}`}
            >
              <Image
                src={img}
                className="md:rounded-lg gallery__img"
                alt="room img"
                fill
                sizes="(min-width: 640px) 240px, 320px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          ))}
        </div>
        {data?.images.length > 1 && (
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="absolute right-6 bottom-8 bg-white px-4 py-1.5 text-black rounded-md text-sm border-black flex gap-2 items-center hover:shadow-lg"
          >
            <AiOutlineUnorderedList />
            사진 모두 보기
          </button>
        )}
      </div>
      <ImageListModal
        isOpen={showImageModal}
        data={data}
        closeModal={() => setShowImageModal(false)}
      />
    </>
  );
}
