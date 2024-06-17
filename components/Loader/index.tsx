import { BLUR_DATA_URL } from "@/constants";
import cn from "classnames";

export function Loader({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn("flex gap-4 justify-center", className)}>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
    </div>
  );
}

export function LoaderGrid({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      {[...Array(12)].map((e, i) => (
        <div
          key={i}
          {...rest}
          className={cn(
            "rounded-md w-full h-[320px] md:h-[240px] xl:h-[320px] bg-gray-100 animate-pulse object-fit z-[0]",
            className
          )}
        />
      ))}
    </>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed w-full inset-x-0 h-screen bg-black/60 z-[15] flex flex-col justify-center top-0">
      <div className="animate-spin w-10 h-10 rounded-full text-gray-400 border-[4px] border-t-transparent border-current m-auto" />
    </div>
  );
}
export function MapLoading() {
  return (
    <div
      className="w-full h-screen opacity-50 relative"
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
