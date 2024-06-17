"use client";

import { prevPathState } from "@/atom";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function PathStoreComponent() {
  const pathname = usePathname();
  const setPrevPath = useSetRecoilState(prevPathState);
  useEffect(() => {
    if (pathname !== "/signin") setPrevPath(encodeURIComponent(pathname));
  }, [pathname]);
  return null;
}
