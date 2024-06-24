import RefundButton from "@/components/Booking/RefundButton";
import { BLUR_DATA_URL } from "@/constants";
import { BookingType } from "@/interface";
import { salePrice } from "@/utils";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const booking: BookingType = await getData(id);
  const canRefund = dayjs(booking?.checkIn).diff(dayjs(), "days") > 10;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-xl md:text-2xl font-semibold">예약 상세내역</h1>
      <div className="rounded-md border border-gray-300 p-6 mt-10">
        <section className="flex border-b gap-4 pb-6">
          <Image
            src={booking?.room?.images?.[0] || "/images/logo.png"}
            width={100}
            height={100}
            alt="숙소 이미지"
            className="rounded-md"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-sm">{booking?.room?.title}</h1>
            <p className="text-xs text-gray-500">
              {booking?.room?.category} |{" "}
              {salePrice(booking.dayPrice, booking.discounted).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              후기 {booking?.room?.comments?.length || 0}개
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-b pb-6">
          <h1 className="text-lg md:text-xl mt-4">여행 일정정보</h1>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">날짜</h3>
            <div className="text-gray-900">
              {dayjs(booking?.checkIn)?.format("YYYY-MM-DD")} ~{" "}
              {dayjs(booking?.checkOut)?.format("YYYY-MM-DD")}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">게스트</h3>
            <div className="text-gray-900">게스트 {booking?.guestCount} 명</div>
          </div>
        </section>
        <section className="flex flex-col gap-4 pb-6">
          <h1 className="text-lg md:text-xl mt-4">요금 세부정보</h1>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">숙박 일정</h3>
            <div className="text-gray-900">{booking?.totalDays}박</div>
          </div>
          {booking?.discounted && (
            <div className="flex justify-between items-center">
              <h3 className="font-bold">할인 정보</h3>
              <div className="text-rose-600">{booking?.events?.title}</div>
            </div>
          )}
          <div className="flex justify-between items-center">
            <h3 className="font-bold">총 금액</h3>
            <div className="text-gray-900">
              {booking?.discounted ? (
                <>
                  <span className="text-rose-600">{booking.discounted}%</span>
                  <span className="text-gray-300 decoration-slate-300 line-through mx-2">
                    {booking?.totalAmount.toLocaleString()}
                  </span>
                  <span>
                    {salePrice(
                      booking?.totalAmount,
                      booking?.discounted
                    ).toLocaleString()}{" "}
                    원
                  </span>
                </>
              ) : (
                <span>{booking?.totalAmount.toLocaleString()} 원</span>
              )}
            </div>
          </div>
        </section>
        <RefundButton booking={booking} canRefund={canRefund} />
      </div>
      <h1 className="text-xl md:text-2xl font-semibold mt-16">
        결제 상세 내역
      </h1>
      {booking?.payments && booking.payments.length > 0 ? (
        <>
          {booking.payments.map((payment) => (
            <div
              className="rounded-md border border-gray-300 p-6 mt-10"
              key={payment.id}
            >
              <div className="flex flex-col gap-6 pb-4 pt-2">
                <h3 className="font-semibold text-lg md:text-xl">주문 내역</h3>
                <div className="rounded-md border-black p-2 border-2 hover:bg-black/5">
                  <h3 className="font-semibold">주문</h3>
                  <p className="text-gray-800 text-sm mt-1">
                    {payment?.orderName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 pb-4 pt-2">
                <h3 className="font-semibold text-lg md:text-xl">결제 내역</h3>
                <div className="rounded-md border-black p-2 border-2 hover:bg-black/5">
                  <h3 className="font-semibold">결제 수단</h3>
                  <p className="text-gray-800 text-sm mt-1">
                    {payment?.method}
                  </p>
                </div>
                <div className="rounded-md border-black p-2 border-2 hover:bg-black/5">
                  <h3 className="font-semibold">결제 상태</h3>
                  <p className="text-gray-800 text-sm mt-1">
                    {payment?.status}
                  </p>
                  {/* <h3 className="font-semibold mt-2">상점 아이디 (MID)</h3>
                  <p className="text-gray-800 text-sm mt-1">
                    {payment?.mId || "-"}
                  </p> */}
                  <h3 className="font-semibold mt-2">카드 정보</h3>
                  <p className="text-gray-800 text-sm mt-1">
                    {payment?.cardNumber || "-"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 pb-4 pt-2">
                <h3 className="font-semibold text-lg md:text-xl">결제 금액</h3>
                <div className="rounded-md border-black p-2 border-2 hover:bg-black/5">
                  <p className="text-gray-800 text-sm mt-1">
                    {payment?.amount?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 pb-4 pt-2">
                <h3 className="font-semibold text-lg md:text-xl">결제 일시</h3>
                <div className="rounded-md border-black p-2 border-2 hover:bg-black/5">
                  <p className="text-gray-800 text-sm mt-1">
                    {dayjs(payment?.approvedAt)?.format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                </div>
              </div>

              <div>
                <a
                  target="_blank"
                  href={payment?.receiptUrl}
                  className="block text-center bg-gray-800 text-white hover:bg-gray-600 px-6 py-3 rounded-md"
                >
                  영수증 확인 (테스트 키로 인한 결제건 누락)
                </a>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="rounded-md border border-gray-300 p-6 mt-10 text-gray-600">
          결제 내역이 없습니다
        </div>
      )}
    </div>
  );
}

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
