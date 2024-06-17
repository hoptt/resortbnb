import { CATEGORY_DATA } from "@/constants";
import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCategoryList() {
  return (
    <div className="fixed top-20 lg:relative lg:top-16 inset-x-0 w-full bg-white z-10">
      <div className="flex gap-8 mx-auto filter__scroll overflow-x-scroll w-full flex-nowrap">
        {CATEGORY_DATA.map((_, idx) => (
          <Fragment key={idx}>
            <Skeleton width={50} height={60} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
