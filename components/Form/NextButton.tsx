export default function NextButton({
  text = "다음",
  onClick,
  disabled = false,
  type = "button",
}: {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="relative sm:fixed sm:bottom-10 inset-x-0 rounded-full w-full sm:w-[160px] mx-auto bg-black text-white py-3 bottom-[-20px] sm:px-6 sm:py-4 hover:bg-black/70 disabled:bg-gray-300"
    >
      {text}
    </button>
  );
}
