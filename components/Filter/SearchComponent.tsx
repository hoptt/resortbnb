"use client";

import cn from "classnames";

import { detailFilterState, filterState } from "@/atom";
import { DESKTOP_WIDTH, FILTER_PATH, MEDIUM_WIDTH } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxDividerVertical } from "react-icons/rx";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchFilter } from ".";
import { checkPath } from "@/utils";

type Props = {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchComponent({
  showFilter,
  setShowFilter,
  setShowFilterModal,
}: Props) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const filterValue = useRecoilValue(filterState);
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState);
  const pathname = usePathname();

  useEffect(() => {
    const handlerClick = (e: Event) => {
      const target = e.target as HTMLElement;

      if (!target.closest('[data-toggle="chk-option"]')) {
        setDetailFilter(null);

        if (window.scrollY > 10) {
          setShowFilter(false);
        } else {
          if (!checkPath(pathname)) {
            setShowFilter(false);
          }
        }
      }
    };

    window.addEventListener("click", handlerClick);

    return () => {
      window.removeEventListener("click", handlerClick);
    };
  }, [pathname]);

  useEffect(() => {
    const scrollHandlerYpos = (e: Event) => {
      if (window.scrollY > 10) {
        setShowFilter(false);
      } else {
        setDetailFilter(null);
        if (window.innerWidth > DESKTOP_WIDTH && checkPath(pathname)) {
          setShowFilter(true);
        }
      }
    };

    window.addEventListener("scroll", scrollHandlerYpos);

    return () => {
      window.removeEventListener("scroll", scrollHandlerYpos);
    };
  }, [pathname]);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.scrollY > 10) {
        setShowFilter(false);
      } else {
        if (window.innerWidth > DESKTOP_WIDTH) {
          if (checkPath(pathname)) {
            setShowFilter(true);
          }
        } else {
          setShowFilter(false);
        }
      }
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [pathname]);

  useEffect(() => {
    if (!!showFilter && window.scrollY > 10) {
      document.body.classList.add("backdrop__after");
    } else {
      document.body.classList.remove("backdrop__after");
    }
  }, [showFilter]);

  return (
    <>
      {showFilter ? (
        <div className="sm:w-[340px] w-full relative hidden sm:block">
          <div className="flex justify-center gap-7 h-10 items-center">
            <button
              type="button"
              className="font-semibold underline underline-offset-8"
            >
              숙소
            </button>
          </div>
          <div
            ref={wrapperRef}
            className={cn(
              "w-[90%] sm:max-w-3xl flex flex-col sm:flex-row border bg-white border-gray-200 rounded-lg sm:rounded-full hover:shadow-lg cursor-pointer justify-between fixed top-20 inset-x-0 mx-auto",

              !!detailFilter
                ? "fb__shadow__inset !bg-stone-200/70"
                : "fb__shadow"
            )}
          >
            <div
              data-toggle="chk-option"
              className="grid grid-cols-1 sm:flex w-full relative mb-3 sm:mb-0"
            >
              <button
                type="button"
                data-cy="filter-location-btn"
                onClick={() => setDetailFilter("location")}
                className={cn(
                  "font-semibold text-xs rounded-full py-3 px-6 text-left fb__after",
                  {
                    "shadow-xl !bg-white": detailFilter === "location",
                    fb__after__right: detailFilter === "checkIn",
                  },
                  !!detailFilter ? "hover:bg-neutral-300" : "hover:bg-zinc-100"
                )}
              >
                여행지
                <div className="text-gray-500 text-xs mt-1">
                  {filterValue.location || "여행지 검색"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter("checkIn")}
                style={{ maxWidth: 150 }}
                className={cn(
                  "font-semibold text-xs rounded-full py-3 px-6 text-left fb__after",
                  {
                    "shadow-xl !bg-white": detailFilter === "checkIn",
                    fb__after__left: detailFilter === "location",
                    fb__after__right: detailFilter === "checkOut",
                  },
                  !!detailFilter ? "hover:bg-neutral-300" : "hover:bg-zinc-100"
                )}
              >
                체크인
                <div className="text-gray-500 text-xs mt-1">
                  {filterValue.checkIn || "날짜 추가"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter("checkOut")}
                style={{ maxWidth: 150 }}
                className={cn(
                  "font-semibold text-xs rounded-full py-3 px-6 text-left fb__after",
                  {
                    "shadow-xl !bg-white": detailFilter === "checkOut",
                    fb__after__left: detailFilter === "checkIn",
                    fb__after__right: detailFilter === "guest",
                  },
                  !!detailFilter ? "hover:bg-neutral-300" : "hover:bg-zinc-100"
                )}
              >
                체크아웃
                <div className="text-gray-500 text-xs mt-1">
                  {filterValue.checkOut || "날짜 추가"}
                </div>
              </button>
              <div
                className={cn(
                  "flex justify-between font-semibold text-xs rounded-full  py-3 pl-6 pr-4 text-left fb__after",
                  {
                    "shadow-xl !bg-white": detailFilter === "guest",
                    fb__after__left: detailFilter === "checkOut",
                  },
                  !!detailFilter ? "hover:bg-neutral-300" : "hover:bg-zinc-100"
                )}
                onClick={() => setDetailFilter("guest")}
              >
                <div>
                  여행자
                  <div className="text-gray-500 text-xs mt-1">
                    {`${filterValue.guest} 명` || "게스트 추가"}
                  </div>
                </div>
                <div className="sm:min-w-24">
                  <button
                    type="button"
                    data-cy="filter-submit-btn"
                    className="bg-rose-600 text-white rounded-full h-10 ml-auto flex items-center justify-center gap-1 px-2 py-2 hover:shadow hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.scrollY > 10) {
                        setShowFilter(false);
                      }
                      setDetailFilter(null);
                      if (filterValue.location) {
                        router.push(`/s/${filterValue.location}`);
                        return;
                      }
                      router.push("/");
                    }}
                  >
                    <AiOutlineSearch className="font-semibold text-xl my-auto" />
                    <div
                      style={{
                        ...(!!detailFilter
                          ? {
                              transform: "scale(1)",
                              width: 30,
                              transformOrigin: "left",
                            }
                          : { transform: "scale(0)", width: 0 }),
                        transition: ".2s",
                      }}
                    >
                      <span
                        style={{
                          ...(!!detailFilter
                            ? {
                                opacity: 1,
                              }
                            : { opacity: 0 }),

                          transition: "0.01s .1s",
                        }}
                      >
                        검색
                      </span>
                    </div>
                  </button>
                </div>
              </div>
              <SearchFilter />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={cn(
            "w-[300px] border py-1.5 flex border-gray-200 rounded-full shadow hover:shadow-lg cursor-pointer items-center justify-between pl-6 pr-2"
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (window.innerWidth < MEDIUM_WIDTH) {
              setShowFilterModal(true);
              return;
            }
            setShowFilter(true);
          }}
        >
          <div className="flex justify-center gap-1 cursor-pointer">
            <div className="my-auto font-semibold text-sm">어디든지</div>
            <RxDividerVertical className="text-gray-200 my-auto" />
            <div className="my-auto font-semibold text-sm">언제든</div>
            <RxDividerVertical className="text-gray-200 my-auto" />
            <div className="my-auto font-semibold text-sm">게스트</div>
          </div>
          <div
            id="filter-open-btn"
            data-cy="filter-open-btn"
            className="bg-rose-500 text-white flex items-center rounded-full w-7 h-7 sm:w-8 sm:h-8"
          >
            <AiOutlineSearch className="text-lg m-auto font-semibold" />
          </div>
        </button>
      )}
    </>
  );
}
