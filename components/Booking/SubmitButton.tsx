"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubmitButton({ title }: { title: string }) {
  const { status, data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guestCount = searchParams.get("guestCount");
  const totalAmount = searchParams.get("totalAmount");
  const totalDays = searchParams.get("totalDays");
  const discounted = searchParams.get("discounted");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/bookings`, {
        roomId: id,
        checkIn,
        checkOut,
        guestCount,
        totalAmount,
        totalDays,
        discounted,
        status: "PENDING",
      });

      if (res.status === 200) {
        router.replace(
          `/payments?customerKey=${session?.user.id}&roomTitle=${title}&checkIn=${checkIn}&checkOut=${checkOut}&guestCount=${guestCount}&totalAmount=${totalAmount}&totalDays=${totalDays}&roomId=${id}&bookingId=${res.data.id}&discounted=${res.data.discounted}`
        );
        // router.replace(`/users/bookings/${res.data.id}`);
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
