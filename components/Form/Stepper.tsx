import cn from "classnames";

export default function Stepper({ count = 1, className = "" }) {
  return (
    <div className={cn("grid grid-cols-5 gap-3 h-1", className)}>
      {[...Array(count)]?.map((_, i) => (
        <div key={`active-${i}`} className="bg-black w-full rounded-md" />
      ))}
      {[...Array(5 - count)]?.map((_, i) => (
        <div key={`active-${i}`} className="bg-gray-300 w-full rounded-md" />
      ))}
    </div>
  );
}
