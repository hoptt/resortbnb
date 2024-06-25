import { BLUR_DATA_URL } from "@/constants";
import Link from "next/link";
import { AdTimer } from "../Timer";
import Image from "next/image";
import { AdvertiseContent, getEvents } from ".";

export default async function AdvertiseBox({
  children,
}: {
  children: React.ReactNode;
}) {
  const { term: expired }: { term: string } = await getEvents();
  return (
    <div>
      <Link href={`/advertise`} prefetch={false} scroll={false}>
        <div
          className="relative overflow-hidden rounded-md"
          style={{ aspectRatio: "20/19" }}
        >
          {children}
          <div className="absolute top-0 left-0 w-full px-3 my-2">
            <AdTimer expiryTime={expired} />
            <div className="text-white">
              <AdvertiseContent />
            </div>
          </div>
        </div>
        <div className="mt-2 mb-1 font-semibold text-base">
          지금 바로 예약하세요!
        </div>
        <span
          data-cy="room-category"
          className="text-xs px-2 py-1 bg-yellow-100 text-gray-400 mt-1"
        >
          Ad
        </span>
        <div className="mt-1 text-gray-400 text-sm"></div>
      </Link>
    </div>
  );
}
