"use client";

import { salePrice } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubmitButton({
  title,
  id,
}: {
  title: string;
  id: number;
}) {
  const { status, data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const dayCount = searchParams.get("totalDays");
  const guestCount = searchParams.get("guestCount");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const roomInfo = await axios(`/api/rooms?id=${id}`);

      if (roomInfo.status !== 200)
        throw new Error("정보를 불러오는데 실패했습니다.");

      // 세일 적용된 가격 (실제 결제가)
      const saleTotalAmount =
        salePrice(roomInfo.data.price, roomInfo.data.sale) *
        Number(dayCount || 0);

      // 세일 적용 안된 가격
      const totalAmount = roomInfo.data.price * Number(dayCount || 0);

      if (saleTotalAmount <= 0 || totalAmount <= 0)
        throw new Error("결제 처리중 오류가 발생했습니다. 다시 시도해주세요");

      const res = await axios.post(`/api/bookings`, {
        roomId: id,
        checkIn,
        checkOut,
        guestCount,
        totalAmount,
        dayPrice: roomInfo.data.price,
        totalDays: dayCount,
        eventId: roomInfo.data.eventId,
        discounted: roomInfo.data.sale,
        status: "PENDING",
      });
      if (res.status !== 200)
        throw new Error("결제 정보를 저장하는데 실패했습니다");
      if (res.status === 200) {
        router.replace(
          `/payments?customerKey=${session?.user.id}&roomTitle=${title}&checkIn=${checkIn}&checkOut=${checkOut}&guestCount=${guestCount}&totalAmount=${saleTotalAmount}&totalDays=${dayCount}&roomId=${id}&bookingId=${res.data.id}&discounted=${res.data.discounted}`
        );
      } else {
        toast.error("다시 시도해주세요");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        type="button"
        disabled={status === "unauthenticated" || isLoading}
        onClick={handleSubmit}
        className="bg-rose-600 hover:bg-rose-500 px-6 py-3 text-white rounded-md w-full disabled:bg-gray-300"
      >
        확인 및 결제
      </button>
    </div>
  );
}
