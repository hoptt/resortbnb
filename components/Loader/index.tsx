import { BLUR_DATA_URL } from "@/constants";
import cn from "classnames";
import { Fragment } from "react";

export function Loader({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn("flex gap-4 justify-center h-5", className)}>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
    </div>
  );
}

export function LoaderGrid({
  className,
  style,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      {[...Array(12)].map((e, i) => (
        <div key={i}>
          <div
            {...rest}
            className={cn(
              "rounded-md w-full  bg-gray-100 animate-pulse object-fit z-[0]",
              className
            )}
            style={{ ...style, aspectRatio: "20/19" }}
          />
          <div className="w-[65%] mt-3 h-5 bg-gray-100" />
          <div className="w-[50%] mt-2 h-3 bg-gray-100" />
          <div className="w-[35%] mt-2 h-4 bg-gray-100" />
        </div>
      ))}
    </>
  );
}

export function LoaderBooking({ className = "" }: { className?: string }) {
  return (
    <div>
      {[...Array(3)].map((e, i) => (
        <div
          key={i}
          className={cn(
            "w-full h-[240px] [&:not(:first-child)]:mt-5 bg-gray-100",
            className
          )}
        />
      ))}
    </div>
  );
}

export function LoaderUserEdit() {
  return (
    <>
      <div className="sm:col-span-4 bg-gray-100 h-[60px]"></div>
      <div className="sm:col-span-3 bg-gray-100 h-[60px]"></div>
      <div className="sm:col-span-3 bg-gray-100 h-[60px]"></div>
      <div className="col-span-full bg-gray-100 h-[60px]"></div>
    </>
  );
}

export function LoaderUserInfo() {
  return (
    <>
      <div className="flex flex-col gap-2 bg-gray-100 h-[80px] my-4" />
      <div className="flex flex-col gap-2 bg-gray-100 h-[80px] mb-4" />
      <div className="flex flex-col gap-2 bg-gray-100 h-[80px] mb-4" />
      <div className="flex flex-col gap-2 bg-gray-100 h-[80px] mb-4" />
      <div className="flex flex-col gap-2 bg-gray-100 h-[80px] mb-4" />
    </>
  );
}

export function LoaderMyRoom() {
  return (
    <>
      <div className="w-full bg-gray-100 h-[200px]" />
    </>
  );
}

export function LoaderComments({ className = "" }: { className?: string }) {
  return (
    <>
      {[...Array(4)].map((e, i) => (
        <div
          key={i}
          className={cn("w-full h-[100px] bg-gray-100", className)}
        />
      ))}
    </>
  );
}

export const LoaderRoomDetail = () => {
  return (
    <>
      <div className="w-[30%] h-[30px] bg-gray-100 mb-5" />
      <div className="aspect-square sm:aspect-auto sm:h-[520px] overflow-hidden gallery">
        {Array.from({ length: 4 }).map((img, idx) => (
          <div
            key={idx}
            className={`w-full md:rounded-lg bg-gray-100 relative gallery__item gallery__item__${4}--${idx + 1}`}
          >
            <div className="gallery__img" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-1">
          <div className="h-[30px] bg-gray-100 mb-3" />
          <div className="w-[75%] h-[30px] bg-gray-100" />
        </div>
        <div />
        <div className="w-[75%] h-[30px] col-span-1 bg-gray-100 ms-auto" />
      </div>
    </>
  );
};

export function FullPageLoader() {
  return (
    <div className="fixed w-full inset-x-0 h-screen bg-black/60 z-[15] flex flex-col justify-center top-0">
      <div className="animate-spin w-10 h-10 rounded-full text-gray-400 border-[4px] border-t-transparent border-current m-auto" />
    </div>
  );
}
export function MapLoading({ className }: { className: string }) {
  return (
    <div
      className={cn("w-full opacity-50 relative", className)}
      style={{ backgroundImage: `url(${BLUR_DATA_URL})` }}
    >
      <div className="pos__center">
        지도를 불러오는 중입니다
        <Loader className="mt-4" />
      </div>
    </div>
  );
}

export function PrimaryLoader({ className }: { className?: string }) {
  return (
    <div className="min-h-screen flex flex-col justify-center z-50">
      <div className="flex gap-5 items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></div>
        <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></div>
        <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></div>
      </div>
    </div>
  );
}
