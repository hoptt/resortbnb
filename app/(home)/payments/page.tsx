"use client";

import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAsync } from "react-use";
import { v4 as uuidv4 } from "uuid";
export default function PaymentPage() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const price = searchParams.get("totalAmount") || "0";
  const customerKey = searchParams.get("customerKey") || uuidv4();
  const totalDays = searchParams.get("totalDays") || "0";
  const roomTitle = searchParams.get("roomTitle") || "resortBnB";
  const bookingId = searchParams.get("bookingId");
  const roomId = searchParams.get("roomId");

  useAsync(async () => {
    // 결제 위젯 초기화
    // 비회원 결제 시 ANONYMOUS
    const paymentWidget = await loadPaymentWidget(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "",
      customerKey
    );

    // 결제 위젯 렌더링
    const paymentMethodWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      {
        value: parseInt(price),
      },
      {
        variantKey: "DEFAULT",
      }
    );

    // 이용약관 렌더링
    paymentWidget.renderAgreement("#agreement");

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidgetRef == null) return;

    // 금액 업데이트
    paymentMethodsWidget?.updateAmount(parseInt(price));
  }, [price]);

  return (
    <div className="max-w-2xl mx-auto px-4 my-20">
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-lg md:text-2xl font-semibold">확인 및 결제</h1>
        <p className="text-gray mb-4">
          결제 수단을 선택하고 결제를 진행해주세요. 환불금은 예약 취소 후 2~3일
          내에 결제한 카드로 입금됩니다. 동의하시는 경우에만 아래 버튼을 눌러
          예약을 결제하세요.
        </p>
        <div id="payment-widget" className="w-full" />
        <div id="agreement" className="w-full" />
        <div className="flex flex-col md:flex-row md:gap-2">
          <button
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;

              try {
                const uniqueOrderId = uuidv4();
                await paymentWidget
                  ?.requestPayment({
                    orderId: uniqueOrderId,
                    orderName: `${roomTitle?.slice(0, 10)}_${totalDays}박`,
                    customerName: session?.user.name || "익명",
                    customerEmail: session?.user.email || "",
                    successUrl: `${
                      process.env.NEXT_PUBLIC_API_URL
                    }/payments/request/${bookingId}/success?orderName=${roomTitle?.slice(
                      0,
                      10
                    )}_${totalDays}박`,
                    failUrl: `${process.env.NEXT_PUBLIC_API_URL}/payments/request/${bookingId}/fail?roomId=${roomId}`,
                  })
                  .catch(function (error) {
                    if (error.code === "INVALID_ORDER_NAME") {
                      // 유효하지 않은 'orderName' 처리하기
                      toast.error("유효하지 않은 주문명 입니다");
                    } else if (error.code === "INVALID_ORDER_ID") {
                      // 유효하지 않은 'orderId' 처리하기
                      toast.error("유효하지 않은 주문아이디 입니다");
                    } else {
                      toast.error(`${error.message}`);
                    }
                  });
                /* Promise 형식으로 작성 시 모바일에서 결제모듈 실행안되어서 바꿈 */

                // .then(async function (data) {
                //   // 성공 처리: 서버 측에서 결제 승인 API를 호출하세요
                //   // 1차 payment 데이터 생성
                // const res = await axios.post("/api/payments", {
                //   bookingId,
                //   amount: price,
                //   status: "IN_PROGRESS",
                //   orderId: uniqueOrderId,
                //   orderName: `${roomTitle?.slice(0, 10)}_${totalDays}박`,
                // });

                // if (res.status === 200 && data) {
                //   router.replace(
                //     `/payments/success?paymentKey=${data.paymentKey}&orderId=${data.orderId}&amount=${data.amount}`
                //   );
                // }
                // })
                // .catch(function (error) {
                //   // 에러 처리: 에러 목록을 확인하세요
                //   // https://docs.tosspayments.com/reference/error-codes#failurl로-전달되는-에러
                //   if (error.code === "USER_CANCEL") {
                //     // 결제 고객이 결제창을 닫았을 때 에러 처리
                //     toast.error("결제가 취소되었습니다");
                //   } else if (error.code === "INVALID_CARD_COMPANY") {
                //     // 유효하지 않은 카드 코드에 대한 에러 처리
                //     toast.error("유효하지 않은 카드 코드 입니다");
                //   } else {
                //     toast.error(error?.message || "다시 시도해주세요");
                //   }
                // });
              } catch (e) {
                console.error(e);
              }
            }}
            type="button"
            className="mt-8 bg-rose-600 hover:bg-rose-500 text-white rounded-md px-5 py-2.5 grow-[3]"
          >
            결제하기
          </button>
          <button
            type="button"
            className="mt-8 bg-gray-600 hover:bg-gray-500 text-white rounded-md px-5 py-2.5"
            onClick={() => {
              const uniqueOrderId = uuidv4();
              router.push(
                `/payments/fail?.code=${500}&message=${"다시 시도해주세요"}&orderId=${uniqueOrderId}`
              );
            }}
          >
            결제오류발생
          </button>
        </div>
      </div>
    </div>
  );
}
