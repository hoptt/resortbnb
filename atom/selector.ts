import { selector } from "recoil";
import { filterState } from ".";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export const calculatedFilterState = selector({
  key: "FilterStateSelector",
  get: ({ get }) => {
    const filter = get(filterState);
    const checkInDate = filter.checkIn
      ? dayjs(filter.checkIn).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD");
    const checkOutDate = filter.checkOut ? dayjs(filter.checkOut) : dayjs();
    const guestCount = filter.guest || 1;
    const dayCount = checkOutDate?.diff(checkInDate, "days");

    return { dayCount, guestCount, checkInDate, checkOutDate };
  },
});
