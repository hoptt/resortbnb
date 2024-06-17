"use client";

import { searchState } from "@/atom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSetRecoilState } from "recoil";

export default function RoomSearchFilter() {
  const setQ = useSetRecoilState(searchState);

  const debounce = (callback: Function, delay = 1000) => {
    let timerId: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const handleDebounceSearch = (value: string) => {
    setQ({ q: value });
  };

  const debouncedSearch = debounce(handleDebounceSearch, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e?.target.value);
  };
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-10">
      <div className="flex justify-center items-center w-full gap-2">
        <input
          type="search"
          placeholder="숙소명 검색"
          onChange={handleInputChange}
          className="w-full block p-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-rose-500 text-gray-800"
        />
        <AiOutlineSearch className="w-6 h-6" />
      </div>
    </div>
  );
}