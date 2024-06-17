"use client";

import { PrimaryLoader } from "@/components/Loader";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentRequestSuccessPage() {
  const params = useParams();
  const bookingId = params.id;
  const searchParams = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const paymentType = searchParams.get("paymentType");
  const orderName = searchParams.get("orderName");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const router = useRouter();

  const createPayment = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments`,
        {
          bookingId,
          amount,
          status: "IN_PROGRESS",
          orderId,
          orderName,
        }
      );
      if (res.status === 200) {
        router.replace(
          `/payments/success?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createPayment();
  }, []);

  return (
    <>
      <PrimaryLoader />
    </>
  );
}
