import { FilterLayoutProps } from "@/interface";
import cn from "classnames";

export default function FilterLayout({
  children,
  title,
  isShow,
  className,
  ...rest
}: FilterLayoutProps & React.HTMLAttributes<HTMLDivElement>) {
  const {} = rest;
  return (
    <div
      className={cn(
        className,
        "absolute top-[19rem] sm:top-[77px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl md:w-[780px] sm:w-[640px] rounded-xl",
        {
          hidden: !isShow,
        }
      )}
      {...rest}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}
