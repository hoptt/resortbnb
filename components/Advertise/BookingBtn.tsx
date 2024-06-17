"use client";
export default function BookingBtn() {
  return (
    <button
      type="button"
      onClick={() => (window.location.href = "/exclusive-deals")}
      className="w-full mt-10 bg-rose-600 hover:bg-rose-500 text-white rounded-md disabled:bg-gray-300 px-5 py-2.5"
    >
      할인 숙소 보러가기
    </button>
  );
}
