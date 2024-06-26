"use client";

import cn from "classnames";

import { detailFilterState, filterState } from "@/atom";
import { LOCATION_DATA } from "@/constants";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import FilterLayout from "./layout";

const DynamicCalendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

export const SearchFilter = () => {
  const detailFilter = useRecoilValue(detailFilterState);
  return (
    <>
      <FilterLayout
        data-cy="filter-location-wrapper"
        isShow={detailFilter === "location"}
      >
        <LocationFilter />
      </FilterLayout>
      <FilterLayout isShow={detailFilter === "checkIn"}>
        <CheckInFilter />
      </FilterLayout>
      <FilterLayout isShow={detailFilter === "checkOut"}>
        <CheckOutFilter />
      </FilterLayout>
      <FilterLayout isShow={detailFilter === "guest"}>
        <GuestFilter />
      </FilterLayout>
    </>
  );
};

export const SearchFilterMobile = () => {
  return (
    <div className="flex flex-col gap-10">
      <LocationFilter />
      <CheckInFilter />
      <CheckOutFilter />
      <GuestFilter />
    </div>
  );
};

const LocationFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const setDetailFilter = useSetRecoilState(detailFilterState);

  return (
    <div>
      <div className="text-sm font-semibold">지역으로 검색하기</div>
      <div className="flex flex-wrap gap-4 mt-4">
        {Object.keys(LOCATION_DATA).map((city) => (
          <button
            key={city}
            type="button"
            data-cy={`filter-location-${city}`}
            className={cn(
              "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-rose-500 focus:text-white",
              {
                "bg-rose-600 text-white hover:bg-rose-500":
                  filterValue.location === city,
              }
            )}
            onClick={() => {
              setFilterValue((prev) => ({ ...prev, location: city }));
              setDetailFilter("checkIn");
            }}
          >
            {city}
          </button>
        ))}
        <button
          className={cn(
            "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-rose-500 focus:text-white",
            {
              "bg-rose-600 text-white hover:bg-rose-500":
                filterValue.location === "",
            }
          )}
          onClick={() => {
            setFilterValue((prev) => ({
              ...prev,
              location: "",
            }));
            setDetailFilter("checkIn");
          }}
        >
          전체
        </button>
      </div>
    </div>
  );
};

const CheckInFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const setDetailFilter = useSetRecoilState(detailFilterState);
  const onChange = (e: any) => {
    setFilterValue((prev) => ({
      ...prev,
      checkIn: dayjs(e).format("YYYY-MM-DD"),
    }));
    setDetailFilter("checkOut");
  };
  return (
    <div>
      <div className="text-sm font-semibold">체크인 날짜 설정하기</div>
      <DynamicCalendar
        next2Label={null}
        prev2Label={null}
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={new Date()}
        value={filterValue.checkIn ? new Date(filterValue.checkIn) : null}
        formatDay={(locale, date) => dayjs(date).format("DD")}
      />
    </div>
  );
};
const CheckOutFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const setDetailFilter = useSetRecoilState(detailFilterState);
  const onChange = (e: any) => {
    setFilterValue((prev) => ({
      ...prev,
      checkOut: dayjs(e).format("YYYY-MM-DD"),
    }));
    setDetailFilter("guest");
  };
  return (
    <div>
      <div className="text-sm font-semibold">체크아웃 날짜 설정하기</div>
      <DynamicCalendar
        next2Label={null}
        prev2Label={null}
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={
          filterValue.checkIn ? new Date(filterValue.checkIn) : new Date()
        }
        value={filterValue.checkOut ? new Date(filterValue.checkOut) : null}
        formatDay={(locale, date) => dayjs(date).format("DD")}
      />
    </div>
  );
};
const GuestFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const [counter, setCounter] = useState<number>(filterValue.guest || 0);
  return (
    <div>
      <div className="text-sm font-semibold">게스트 수 추가하기</div>
      <div className="mt-4 border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center">
        <div>
          <div className="font-semibold text-sm">게스트 수 추가</div>
          <div className="text-gray-500 text-xs">숙박 인원을 입력해주세요</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="rounded-full w-8 h-8 disabled:border-gray-200 hover:border-black"
            disabled={counter <= 0}
            onClick={() => {
              setCounter((val) => val - 1);
              setFilterValue((prev) => ({ ...prev, guest: counter - 1 }));
            }}
          >
            <AiOutlineMinusCircle
              className={cn("m-auto", { "text-gray-200": counter <= 0 })}
            />
          </button>
          <div className="w-3 text-center">{counter}</div>
          <button
            type="button"
            className="rounded-full w-8 h-8 disabled:border-gray-200 hover:border-black"
            disabled={counter >= 20}
            onClick={() => {
              setCounter((val) => val + 1);
              setFilterValue((prev) => ({ ...prev, guest: counter + 1 }));
            }}
          >
            <AiOutlinePlusCircle
              className={cn("m-auto", { "text-gray-200": counter >= 20 })}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
