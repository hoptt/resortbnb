/* eslint-disable @next/next/no-img-element */
"use client";

import { filterState, prevPathState } from "@/atom";
import { DESKTOP_WIDTH, FormUrl } from "@/constants";
import { checkPath } from "@/utils";
import cn from "classnames";
import "dayjs/locale/ko";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { MdModeOfTravel } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { SearchFilterMobile } from "../Filter";
import SearchComponent from "../Filter/SearchComponent";
import Modal from "../Modal";
import "./nav.css";
const LOGOUT_USER_MENU = [
  {
    id: 1,
    title: "로그인",
    url: "/signin",
  },
  {
    id: 2,
    title: "회원가입",
    url: "/signin",
  },
  {
    id: 3,
    title: "FAQ",
    url: "/faqs",
  },
];

const LOGIN_USER_MENU = [
  { id: 1, title: "마이페이지", url: "/users/mypage" },
  {
    id: 2,
    title: "FAQ",
    url: "/faqs",
  },
  {
    id: 3,
    title: "로그아웃",
    url: "#",
    signOut: true,
  },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const pathname = usePathname();
  const prevPath = useRecoilValue(prevPathState);
  const nextUrl = decodeURIComponent(prevPath || "/");

  const [showFilter, setShowFilter] = useState<boolean>(false);
  useLayoutEffect(() => {
    setShowFilter(() => {
      if (window.innerWidth > DESKTOP_WIDTH) {
        if (window.scrollY > 10) {
          return false;
        } else {
          if (!checkPath(nextUrl)) return false;
          if (checkPath(pathname)) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    });
  }, [pathname, nextUrl]);

  const { status, data: session } = useSession();
  const filterValue = useRecoilValue(filterState);
  const router = useRouter();

  return (
    <nav
      className={cn(
        "h-20 z-[20] gap-3 border border-b-gray w-full shadow-sm p-4 sm:px-10 flex justify-between items-center sm:items-start fixed top-0 bg-white",
        {
          "!h-44": showFilter,
        }
      )}
    >
      <div className="lg:grow lg:basis-0 font-semibold text-lg text-rose-500">
        <Link
          href="/"
          className="flex-col lg:flex-row sm:flex lg:gap-2 max-w-fit"
        >
          <MdModeOfTravel className="text-2xl lg:text-4xl" />
          <span className="my-auto hidden sm:block lg:text-xl">Resort bnb</span>
        </Link>
      </div>

      <SearchComponent
        setShowFilter={setShowFilter}
        setShowFilterModal={setShowFilterModal}
        showFilter={showFilter}
      />

      <div className="lg:grow basis-0 lg:flex gap-4 align-middle relative justify-end items-center">
        <div className="hidden lg:block">
          {status === "authenticated" ? (
            <Link
              href={FormUrl.CATEGORY}
              className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-50"
            >
              당신의 공간을 등록해주세요
            </Link>
          ) : (
            <Link
              href={`/signin`}
              scroll={false}
              className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-50"
            >
              로그인 해주세요
            </Link>
          )}
        </div>
        <button
          id="menu-btn"
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="w-[40px] sm:w-[80px] flex gap-3 rounded-full border border-gray-20 lg:shadow-sm p-2 sm:px-4 sm:py-3 my-auto hover:shadow-lg ms-auto sm:ms-0"
        >
          <AiOutlineMenu className="hidden sm:block" />

          {status === "authenticated" && session?.user?.image ? (
            <img
              src={session?.user?.image}
              referrerPolicy="no-referrer"
              alt="profile img"
              className="rounded-full sm:w-4 sm:h-4 my-auto"
            />
          ) : (
            <AiOutlineUser />
          )}
        </button>

        {showMenu && (
          <div className="border border-gray-200 shadow-lg py-2 flex flex-col absolute top-12 right-0 bg-white w-60 rounded-lg">
            {status === "authenticated"
              ? LOGIN_USER_MENU.map((menu) => (
                  <button
                    key={menu.id}
                    type="button"
                    className="h-10 hover:bg-gray-50 pl-3 text-sm text-gray-700 text-left"
                    onClick={() => {
                      setShowMenu(false);
                      if (menu.signOut) {
                        signOut({ callbackUrl: pathname });
                        return;
                      }
                      router.push(menu.url);
                    }}
                  >
                    {menu.title}
                  </button>
                ))
              : LOGOUT_USER_MENU.map((menu) => (
                  <button
                    key={menu.id}
                    type="button"
                    className="h-10 hover:bg-gray-50 pl-3 text-sm text-gray-700 text-left"
                    onClick={() => {
                      setShowMenu(false);
                      if (menu.title === "로그인") {
                        router.push(menu.url, { scroll: false });
                        return;
                      }
                      router.push(menu.url);
                    }}
                  >
                    {menu.title}
                  </button>
                ))}
          </div>
        )}
      </div>

      <Modal
        title="숙소 검색"
        isOpen={showFilterModal}
        closeModal={() => setShowFilterModal(false)}
      >
        <SearchFilterMobile />
        <button
          type="button"
          data-cy="filter-submit-btn"
          onClick={() => {
            setShowFilterModal(false);
            if (filterValue.location) {
              router.push(`/s/${filterValue.location}`);
              return;
            }
            router.push("/");
          }}
          className="bg-rose-600 text-white rounded-lg mt-4 ml-auto flex justify-center hover:shadow hover:bg-red-500 w-48 py-2"
        >
          검색
        </button>
      </Modal>
    </nav>
  );
}
