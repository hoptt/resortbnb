"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center h-[60vh] flex flex-col justify-center">
      <div>
        <h2 className="text-3xl font-semibold text-rose-700">에러 발생</h2>
        <p className="text-gray-400 text-xs max-w-lg mx-auto mt-8">
          {error?.message || "없음"}
        </p>
        <div className="mt-8">
          <button
            type="button"
            className="bg-rose-700 hover:shadow-lg text-white rounded-xl px-4 py-2.5"
            onClick={() => reset()}
          >
            다시 시도하기
          </button>
        </div>
      </div>
    </div>
  );
}
