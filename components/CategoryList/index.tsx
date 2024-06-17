"use client";

import { filterState } from "@/atom";
import { CATEGORY_DATA, DESKTOP_WIDTH } from "@/constants";
import cn from "classnames";
import { useEffect, useRef } from "react";
import { BiReset } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDraggable } from "react-use-draggable-scroll";
import { useRecoilState } from "recoil";
import "./category.css";

export default function CategoryList() {
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const scrollRightRef = useRef<HTMLButtonElement>(null);
  const scrollLeftRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(ref);
  useEffect(() => {
    if (!ref?.current) return;

    const instance = ref.current;

    const scrollHandlerXpos = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.scrollLeft > 50) {
        scrollLeftRef.current?.classList.remove("remove");
        scrollLeftRef.current?.classList.add("show");
      } else {
        scrollLeftRef.current?.classList.remove("show");
        scrollLeftRef.current?.classList.add("remove");
      }

      if (target.scrollWidth - 50 <= target.offsetWidth + target.scrollLeft) {
        scrollRightRef.current?.classList.remove("show");
        scrollRightRef.current?.classList.add("remove");
      } else {
        scrollRightRef.current?.classList.remove("remove");
        scrollRightRef.current?.classList.add("show");
      }
    };

    const scrollHandlerYpos = (e: Event) => {
      if (window.innerWidth < DESKTOP_WIDTH) {
        wrapperRef.current?.classList.remove("category__relative");
        wrapperRef.current?.classList.add("category__fixed");
        if (window.scrollY > 10) {
          wrapperRef.current?.classList.add("wrapper__shadow");
        } else {
          wrapperRef.current?.classList.remove("wrapper__shadow");
        }
        return;
      }
      wrapperRef.current?.classList.remove("lg:relative");
      wrapperRef.current?.classList.remove("lg:top-16");
      if (window.scrollY > 10) {
        wrapperRef.current?.classList.remove("category__relative");
        wrapperRef.current?.classList.add("category__fixed");
        wrapperRef.current?.classList.add("wrapper__shadow");
      } else {
        wrapperRef.current?.classList.remove("category__fixed");
        wrapperRef.current?.classList.remove("wrapper__shadow");
        wrapperRef.current?.classList.add("category__relative");
      }
    };

    instance.addEventListener("scroll", scrollHandlerXpos);
    document.addEventListener("scroll", scrollHandlerYpos);

    return () => {
      instance.removeEventListener("scroll", scrollHandlerXpos);
      document.removeEventListener("scroll", scrollHandlerYpos);
    };
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      wrapperRef.current?.classList.remove("wrapper__shadow");
      if (window.innerWidth < DESKTOP_WIDTH) {
        wrapperRef.current?.classList.remove("category__relative");
        wrapperRef.current?.classList.add("category__fixed");
      } else {
        if (window.scrollY > 10) {
          wrapperRef.current?.classList.remove("category__relative");
          wrapperRef.current?.classList.add("category__fixed");
        } else {
          wrapperRef.current?.classList.remove("category__fixed");
          wrapperRef.current?.classList.add("category__relative");
        }
      }
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <div
      ref={wrapperRef}
      className={cn(
        "fixed top-20 lg:relative lg:top-16 inset-x-0 w-full bg-white z-10"
      )}
      style={{ transition: ".2s top" }}
    >
      <div className="relative">
        <button
          ref={scrollLeftRef}
          type="button"
          className="scroll__shadow left remove"
          onClick={(e) => {
            const moveTo = -ref.current.offsetWidth + ref.current.scrollLeft;
            ref.current.scrollTo({
              left: moveTo,
              behavior: "smooth",
            });
          }}
        >
          <div className="scroll__btn left-2">
            <IoIosArrowBack />
          </div>
        </button>
        <button
          ref={scrollRightRef}
          type="button"
          className="scroll__shadow right"
          onClick={(e) => {
            const moveTo = ref.current.offsetWidth + ref.current.scrollLeft;
            ref.current.scrollTo({
              left: moveTo,
              behavior: "smooth",
            });
          }}
        >
          <div className="scroll__btn right-2">
            <IoIosArrowForward />
          </div>
        </button>
        <div
          className="flex gap-5 mx-auto filter__scroll overflow-x-scroll w-full flex-nowrap"
          {...events}
          ref={ref}
        >
          <button
            data-cy="category-filter-all"
            className="flex-none justify-center gap-2 md:gap-3 w-16 text-center"
            onClick={() => {
              setFilterValue((prev) => ({
                ...prev,
                category: "",
              }));
            }}
          >
            <div
              className={cn(
                "flex flex-col justify-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-700 cursor-pointer",
                {
                  "!text-black underline decoration-2 underline-offset-8":
                    filterValue.category === "",
                }
              )}
            >
              <div className="text-2xl mx-auto">
                <BiReset />
              </div>
              <div className="text-xs">전체</div>
            </div>
          </button>
          {CATEGORY_DATA.map((category, idx) => (
            <button
              key={category.title}
              data-cy={`category-filter-${category.title}`}
              type="button"
              onClick={() =>
                setFilterValue((prev) => ({
                  ...prev,
                  category: category.title,
                }))
              }
              className={cn(
                "min-w-16 flex-none text-gray-500 hover:text-gray-700 gap-3 justify-center text-center py-4",
                {
                  "!text-black underline decoration-2 underline-offset-8":
                    filterValue.category === category.title,
                }
              )}
            >
              <div className="flex flex-col justify-center gap-1">
                <div className="text-2xl mx-auto">
                  <category.Icon />
                </div>
                <div className="text-xs font-semibold text-center">
                  {category.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
