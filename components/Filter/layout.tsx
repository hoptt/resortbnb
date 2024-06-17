import { FilterLayoutProps } from "@/interface";
import cn from "classnames";

export default function FilterLayout({
  children,
  isShow,
  className,
  style,
  ...rest
}: FilterLayoutProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        className,
        "absolute top-[19rem] sm:top-[77px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl md:w-[780px] sm:w-[500px] cursor-default",
        {
          hidden: !isShow,
        }
      )}
      style={{
        ...style,
        borderRadius: "2rem",
        boxShadow: "0px 1px 11px -5px #8a8a8a",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
