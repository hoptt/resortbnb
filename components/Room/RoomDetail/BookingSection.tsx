"use client";

import { filterState } from "@/atom";
import { RoomType } from "@/interface";
import { useRecoilState, useRecoilValue } from "recoil";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { ChangeEventHandler } from "react";
import { calculatedFilterState } from "@/atom/selector";
import { useRouter } from "next/navigation";
import { salePrice } from "@/utils";
import { useSession } from "next-auth/react";
export default function BookingSection({ data }: { data: RoomType }) {
  const { status } = useSession();
  const router = useRouter();
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const { dayCount, guestCount } = useRecoilValue(calculatedFilterState);

  const totalAmount = salePrice(data.price, data.sale) * dayCount;
  const checkFormValid = totalAmount > 0 && guestCount > 0;

  const handleSubmit = () => {
    if (status === "authenticated") {
      router.push(
        `/rooms/${data.id}/bookings?checkIn=${
          filterValue.checkIn || dayjs().format("YYYY-MM-DD")
        }&checkOut=${filterValue.checkOut || dayjs().format("YYYY-MM-DD")}&guestCount=${guestCount}&totalDays=${dayCount}`
      );
    } else {
      router.push("/signin", { scroll: false });
    }
  };

  const onChangeCheckIn: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterValue((prev) => ({
      ...prev,
      checkIn: e?.target?.value,
    }));
  };
  const onChangeCheckOut: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterValue((prev) => ({
      ...prev,
      checkOut: e?.target?.value,
    }));
  };
  const onChangeGuest: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFilterValue((prev) => ({
      ...prev,
      guest: Number(e?.target?.value),
    }));
  };

  return (
    <div className="w-full">
      <div className="mt-8 shadow-lg rounded-lg border border-gray-300 px-6 py-8 md:sticky md:top-20">
        <div className="text-gray-600 flex justify-between items-center">
          <div>
            {data.sale ? (
              <>
                <span className="text-rose-600">{data.sale}%</span>
                <span className="text-gray-300 decoration-slate-300 line-through mx-2">
                  {data.price.toLocaleString()}원{" "}
                </span>
                <div className="flex items-end gap-1">
                  <span className="font-semibold text-lg md:text-xl text-black">
                    {salePrice(data.price, data.sale).toLocaleString()}원{" "}
                  </span>
                  <span className=" text-gray-500">/박</span>
                </div>
              </>
            ) : (
              <div className="flex items-end gap-1">
                <span className="font-semibold text-lg md:text-xl text-black">
                  {data.price.toLocaleString()}원{" "}
                </span>
                <span className=" text-gray-500">/박</span>
              </div>
            )}
          </div>
        </div>
        <form className="mt-2">
          <div className="mt-2">
            <label className="text-xs font-semibold" htmlFor="checkin-input">
              체크인
            </label>
            <input
              type="date"
              id="checkin-input"
              value={filterValue.checkIn || dayjs().format("YYYY-MM-DD")}
              min={dayjs().format("YYYY-MM-DD")}
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1"
              onChange={onChangeCheckIn}
            />
          </div>
          <div className="mt-2">
            <label className="text-xs font-semibold" htmlFor="checkout-input">
              체크아웃
            </label>
            <input
              type="date"
              id="checkout-input"
              value={filterValue.checkOut || dayjs().format("YYYY-MM-DD")}
              min={filterValue.checkIn || dayjs().format("YYYY-MM-DD")}
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1"
              onChange={onChangeCheckOut}
            />
          </div>
          <div className="mt-2">
            <label className="text-xs font-semibold" htmlFor="guest-input">
              인원
            </label>
            <select
              id="guest-input"
              onChange={onChangeGuest}
              value={filterValue.guest}
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1"
            >
              {[...Array(20)]?.map((_, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <button
              type="button"
              disabled={!checkFormValid}
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-md py-2.5 w-full disabled:bg-gray-300"
              onClick={handleSubmit}
            >
              예약하기
            </button>
            <p className="text-center text-gray-600 mt-4 text-xs md:text-sm">
              예약 확정 전에는 요금이 청부되지 않습니다.
            </p>
          </div>
        </form>
        <div className="mt-4 flex flex-col gap-2 border-b border-b-gray-300 pb-4 text-xs md:text-sm">
          <div className="flex justify-between">
            <div className="text-gray-600 underline underline-offset-4">
              {salePrice(data.price, data.sale).toLocaleString()} x {dayCount}박
            </div>
            <div className="text-gray-500">₩{totalAmount.toLocaleString()}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-600 underline underline-offset-4">
              resort bnb 수수료
            </div>
            <div className="text-gray-500">₩0</div>
          </div>
          <div className="flex justify-between mt-6">
            <div>총 합계</div>
            <div>₩{totalAmount?.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
