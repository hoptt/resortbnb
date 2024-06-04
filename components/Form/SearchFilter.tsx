"use client";

import { searchState } from "@/atom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSetRecoilState } from "recoil";

export default function SearchFilter() {
  const setQ = useSetRecoilState(searchState);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-10">
      <div className="flex justify-center items-center w-full gap-2">
        <input
          type="search"
          placeholder="숙소명 검색"
          onChange={(e) => setQ({ q: e.target.value })}
          className="w-full block p-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-rose-500 text-gray-800"
        />
        <AiOutlineSearch className="w-6 h-6" />
      </div>
    </div>
  );
}
