import axios from "axios";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import CheckAni from "@/components/Animation/CheckAni";

interface PaymentRequestProps {
  paymentKey: string;
  orderId: string;
  amount: string;
}

interface PaymentResponseProps {
  mId?: string;
  orderName?: string;
  approvedAt?: string;
  requestedAt?: string;
  status: string;
  receipt?: {
    url: string;
  };
  checkout?: {
    url?: string;
  };
  card?: {
    number?: string;
    cardType?: string;
  };
  type?: string;
  totalAmount: number;
  method?: "카드" | "가상계좌" | "계좌이체";
}

interface ParamsProps {
  searchParams: PaymentRequestProps;
}

interface Payment {
  payment?: PaymentResponseProps;
  redirect?: {
    destination?: string;
  };
}

export default async function PaymentSuccess({ searchParams }: ParamsProps) {
  const paymentKey = searchParams.paymentKey;
  const orderId = searchParams.orderId;
  const amount = searchParams.amount;

  const data: Payment = await getPayment({
    paymentKey,
    orderId,
    amount,
  });

  if (data?.redirect) {
    redirect(data.redirect?.destination || "/");
  }

  return (
    <>
      <div
        className="max-w-2xl mx-auto pt-5 lg:pt-20 pb-20 px-4"
        style={{
          animation: "show 0.5s both 4.5s",
        }}
      >
        <div className="flex flex-col gap-6 border-b pb-8">
          <h3 className="font-semibold text-lg md:text-2xl">주문 내역</h3>
          <div className="rounded-md border-black p-2 border-2 cursor-pointer hover:bg-black/5">
            <h3 className="font-semibold">주문</h3>
            <p className="text-gray-800 text-sm mt-1">
              {data?.payment?.orderName}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-b pb-8 pt-4">
          <h3 className="font-semibold text-lg md:text-2xl">결제 내역</h3>
          <div className="rounded-md border-black p-2 border-2 cursor-pointer hover:bg-black/5">
            <h3 className="font-semibold">결제 수단</h3>
            <p className="text-gray-800 text-sm mt-1">
              {data?.payment?.method}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-b pb-8 pt-4">
          <h3 className="font-semibold text-lg md:text-2xl">결제 금액</h3>
          <div className="rounded-md border-black p-2 border-2 cursor-pointer hover:bg-black/5">
            <p className="text-gray-800 text-sm mt-1">
              {data?.payment?.totalAmount?.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 pb-8 pt-4">
          <h3 className="font-semibold text-lg md:text-2xl">결제 일시</h3>
          <div className="rounded-md border-black p-2 border-2 cursor-pointer hover:bg-black/5">
            <p className="text-gray-800 text-sm mt-1">
              {dayjs(data?.payment?.approvedAt)?.format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a
            target="_blank"
            href={data?.payment?.receipt?.url}
            className="block text-center bg-gray-800 text-white hover:bg-gray-600 px-6 py-3 rounded-md"
          >
            영수증 확인 (테스트 키로 인한 결제건 누락)
          </a>
        </div>
        <div className="flex flex-col gap-6 border-b py-8">
          <a
            href="/users/bookings"
            className="bg-rose-600 hover:bg-rose-500 px-6 py-3 text-white rounded-md text-center"
          >
            예약 내역 확인
          </a>
        </div>
      </div>
      <CheckAni title="결제가 완료되었습니다" />
    </>
  );
}

async function getPayment({
  paymentKey,
  orderId,
  amount,
}: PaymentRequestProps) {
  try {
    const { data: payment } = await axios.post<PaymentResponseProps>(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.TOSS_CLIENT_SECRET}:`
          ).toString("base64")}`,
        },
      }
    );
    if (payment) {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
        orderId,
        paymentKey,
        amount,
        bookingStatus: "SUCCESS",
        status: payment.status,
        method: payment?.method,
        receiptUrl: payment?.receipt?.url,
        approvedAt: payment?.approvedAt,
        cardNumber: payment?.card?.number,
        cardType: payment?.card?.cardType,
        type: payment?.type,
        mId: payment?.mId,
        checkoutUrl: payment?.checkout?.url,
      });
    }

    return {
      payment,
    };
  } catch (e: any) {
    console.log(e);
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
      orderId,
      paymentKey,
      amount,
      bookingStatus: "FAILED",
      failureCode: e.code,
      failureMessage: e.message,
    });
    return {
      redirect: {
        destination: `/payments/fail?.code=${e.code}&message=${e.message}&orderId=${orderId}`,
      },
    };
  }
}
