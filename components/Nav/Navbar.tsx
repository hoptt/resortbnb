/* eslint-disable @next/next/no-img-element */
"use client";

import { filterState } from "@/atom";
import { DESKTOP_WIDTH, FILTER_PATH, FormUrl } from "@/constants";
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

  const [showFilter, setShowFilter] = useState<boolean>(false);

  useLayoutEffect(() => {
    setShowFilter(() => {
      if (window.innerWidth > DESKTOP_WIDTH) {
        if (window.scrollY > 10) {
          return false;
        } else {
          if (FILTER_PATH.includes(pathname)) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    });
  }, [pathname]);

  const { status, data: session } = useSession();
  const filterValue = useRecoilValue(filterState);
  const router = useRouter();

  return (
    <nav
      className={cn(
        "h-20 z-[20] border border-b-gray w-full shadow-sm p-4 sm:px-10 flex justify-between items-start fixed top-0 bg-white",
        {
          "!h-44": showFilter,
        }
      )}
    >
      <div className="sm:grow sm:basis-0 font-semibold text-lg sm:text-xl text-rose-500 sm:flex sm:gap-2">
        <MdModeOfTravel className="text-2xl sm:text-4xl" />
        <Link href="/" className="my-auto block">
          Resort bnb
        </Link>
      </div>

      <SearchComponent
        setShowFilter={setShowFilter}
        setShowFilterModal={setShowFilterModal}
        showFilter={showFilter}
      />

      <div className="grow basis-0 hidden md:flex gap-4 align-middle relative justify-end">
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

        <button
          id="menu-btn"
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex gap-3 rounded-full border border-gray-20 shadow-sm px-4 py-3 my-auto hover:shadow-lg"
        >
          <AiOutlineMenu />

          {status === "authenticated" && session?.user?.image ? (
            <img
              src={session?.user?.image}
              alt="profile img"
              className="rounded-full w-4 h-4 my-auto"
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
