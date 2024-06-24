import BookingList from "@/components/Booking/BookingList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 예약 리스트",
};

export default async function BookingsPage() {
  return (
    <div className="mt-5 sm:mt-10 max-w-7xl mx-auto px-4">
      <h1 className="font-semibold text-lg md:text-2xl">나의 예약 리스트</h1>
      <p className="mt-2 text-gray-500">나의 예약 일정을 확인해보세요</p>
      <div className="mb-20 mt-10 flex flex-col">
        <BookingList />
      </div>
    </div>
  );
}
