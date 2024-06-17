"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function PaymentRequestFail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const message = searchParams.get("message");
  const roomId = searchParams.get("roomId");
  useEffect(() => {
    if (code === "USER_CANCEL") {
      // 결제 고객이 결제창을 닫았을 때 에러 처리
      toast.error("결제가 취소되었습니다");
    } else if (code === "INVALID_CARD_COMPANY") {
      // 유효하지 않은 카드 코드에 대한 에러 처리
      toast.error("유효하지 않은 카드 코드 입니다");
    } else {
      toast.error(message || "다시 시도해주세요");
    }

    router.replace(`/rooms/${roomId}`);
  }, []);
  return null;
}
