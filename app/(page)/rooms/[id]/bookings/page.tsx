import SubmitButton from "@/components/Booking/SubmitButton";
import { BLUR_DATA_URL } from "@/constants";
import { BookingParams, RoomType } from "@/interface";
import { salePrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BookingPage({
  params,
  searchParams,
}: BookingParams) {
  const id = params.id;
  const checkIn = searchParams.checkIn;
  const checkOut = searchParams.checkOut;
  const guestCount = searchParams.guestCount;
  const totalDays = searchParams.totalDays;
  const data: RoomType = await getData(id);
  if (data === null) redirect("/");
  return (
    <div className="mt-5 lg:mt-28 mb-28 max-w-6xl mx-auto">
      <h1 className="font-semibold text-xl md:text-3xl">예약 확인 및 결제</h1>
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-6 border-t md:border-b mt-8 md:mb-8 pt-8 md:pb-8">
          <h2 className="text-lg md:text-2xl font-semibold">예약 정보</h2>
          <div>
            <h3>날짜</h3>
            <div className="text-sm mt-1 text-gray-800">
              {checkIn} ~ {checkOut}
            </div>
          </div>
          <div>
            <h3>게스트</h3>
            <div className="text-sm mt-1 text-gray-800">
              게스트 {guestCount} 명
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-y my-8 py-8">
          <h2 className="text-lg md:text-2xl font-semibold">숙소 정보</h2>

          <div className="flex border-b gap-4 pb-6">
            <Image
              src={data?.images?.[0] || "/images/logo.png"}
              width={100}
              height={100}
              alt="숙소 이미지"
              className="rounded-md"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            <div className="flex flex-col justify-between">
              <Link href={`/rooms/${data.id}`}>
                <h1 className="text-sm">{data?.title}</h1>
              </Link>
              <p className="text-xs text-gray-500">
                {data?.category} |{" "}
                {salePrice(data.price, data.sale).toLocaleString()}원 /박
              </p>
            </div>
          </div>
          <h2 className="text-lg md:text-2xl font-semibold">요금 세부 정보</h2>
          <div>
            <h3>숙박 일수</h3>
            <div className="text-sm mt-1 text-gray-800">{totalDays} 박</div>
          </div>
          <div>
            <h3>총 합계</h3>
            <div className="text-lg font-bold mt-1 text-gray-800">
              {Number(
                salePrice(data.price, data.sale) * Number(totalDays || 0)
              ).toLocaleString()}{" "}
              원
            </div>
          </div>
          <SubmitButton title={data.title} id={data.id} />
        </div>
      </div>
    </div>
  );
}

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
