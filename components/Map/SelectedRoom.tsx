"use client";

import { selectedRoomState } from "@/atom";
import { BLUR_DATA_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRecoilState } from "recoil";

export default function SelectedRoom() {
  const [selectedRoom, setSelectedRoom] = useRecoilState(selectedRoomState);
  return (
    <div className="absolute inset-x-0 mx-auto bottom-8 md:bottom-16 lg:bottom-32 rounded-lg shadow-lg max-w-[250px] md:max-w-sm z-10 w-full bg-white">
      {selectedRoom && (
        <div className="flex flex-col relative">
          <button
            type="button"
            onClick={() => setSelectedRoom(null)}
            className="absolute right-2 top-2 text-white text-2xl bg-black/20 rounded-full"
          >
            <AiOutlineCloseCircle />
          </button>
          <Link href={`/rooms/${selectedRoom.id}`}>
            <div className="rounded-lg-t md:h-[200px] overflow-hidden">
              <Image
                src={selectedRoom?.images[0]}
                width={384}
                height={384}
                alt="room image"
                className="rounded-t-lg"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div className="p-4 text-sm md:text-base font-semibold bg-white rounded-b-lg">
              <div className="mt-2">{selectedRoom.title}</div>
              <div className="mt-1 text-gray-400">
                {selectedRoom.base_address}
              </div>
              <div className="mt-1">
                {selectedRoom.price?.toLocaleString()}원{" "}
                <span className="text-gray-400"> /박</span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
