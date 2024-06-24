"use client";

import { BLUR_DATA_URL } from "@/constants";
import { RoomType } from "@/interface";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  data: RoomType;
};

export default function ImageListModal({ closeModal, data, isOpen }: Props) {
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
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-xl md:text-2xl font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    이미지 전체 보기
                    <AiOutlineClose
                      className="cursor-pointer rounded-full p-2 hover:bg-black/5 mb-4 text-3xl"
                      onClick={closeModal}
                    />
                  </DialogTitle>
                  <div className="mt-10 mb-20 max-w-xl mx-auto flex flex-col gap-4">
                    {data?.images?.map((img) => (
                      <Image
                        key={img}
                        alt="room img"
                        src={img}
                        width={1000}
                        height={1000}
                        className="mx-auto"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    ))}
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      닫기
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
