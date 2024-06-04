import { BLUR_DATA_URL } from "@/constants";
import { RoomType } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export function RoomItem({ room }: { room: RoomType }) {
  return (
    <div key={room.id}>
      <Link href={`/rooms/${room.id}`}>
        <div className="h-[320px] md:h-[240px] overflow-hidden relative z-0">
          <Image
            src={room?.images[0]}
            alt={room.title}
            placeholder="blur"
            style={{ objectFit: "cover" }}
            fill
            sizes="(min-width: 640px) 240px, 320px"
            blurDataURL={BLUR_DATA_URL}
            className="rounded-md w-full h-auto hover:shadow-lg"
          />
        </div>
        <div className="mt-2 font-semibold text-sm">{room.title}</div>
        <span
          data-cy="room-category"
          className="text-xs px-2 py-1 rounded-fill bg-black text-white mt-1"
        >
          {room.category}
        </span>
        <div className="mt-1 text-gray-400 text-sm" data-cy="room-address">
          {room.address}
        </div>
        <div className="mt-1 text-sm">
          {room.price.toLocaleString()}원{" "}
          <span className="text-gray-500"> /박</span>
        </div>
      </Link>
    </div>
  );
}

export function GridLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-20 sm:px-4 md:px-8 lg:px-16">
      {children}
    </div>
  );
}
