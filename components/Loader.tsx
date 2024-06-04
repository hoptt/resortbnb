import cn from "classnames";
import { GridLayout } from "./RoomList";

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
            "rounded-md w-full h-72 md:h-64 bg-gray-100 animate-pulse object-fit z-[0]",
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
