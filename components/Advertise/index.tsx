import { AdTimer } from "../Timer";
import BookingBtn from "./BookingBtn";
export async function getEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events?type=sale`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function AdvertiseComponent() {
  const { term: expired }: { term: string } = await getEvents();
  return (
    <div className="max-w-xl mx-auto pt-2 pb-6 sm:pb-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-semibold text-center">
          타임 특가 할인 이벤트
        </h1>
        <hr className="border-b-gray-300" />
        <div className="text-xl md:text-2xl font-semibold">
          한정된 시간동안 진행되는 이벤트!!
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        지금 이벤트에 참여하여 할인가를 만나보세요
      </div>
      <div className="mt-8">
        <AdTimer expiryTime={expired} hasDigit={false} />
        <AdvertiseContent />
      </div>
      <BookingBtn />
    </div>
  );
}

export const AdvertiseContent = () => {
  return (
    <>
      <p className="text-xl font-semibold mb-1">
        단 일주일, 기간 한정 혜택 증정
      </p>
      <span>
        신규 숙소들을{" "}
        <span className="text-lg text-rose-500 font-semibold">
          얼리버드 특가{" "}
        </span>
        로 만나보세요!
      </span>
      <p className="mt-5">
        최대{" "}
        <span className="text-xl mx-1 text-rose-500 font-semibold">90%</span>{" "}
        할인 혜택을 놓치지 마세요!
      </p>
    </>
  );
};
