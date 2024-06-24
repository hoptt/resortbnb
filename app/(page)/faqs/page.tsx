import { FaqsList } from "@/components/Faqs";
import { fetchFaqs } from "@/components/Faqs/_lib/api";
import queryClient from "@/query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import cn from "classnames";
import { inter } from "../../fonts";
export default async function Faqs() {
  try {
    await queryClient.prefetchQuery({
      queryKey: ["faqs"],
      queryFn: fetchFaqs,
    });
  } catch (e) {
    console.log(e);
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={cn("max-w-5xl mx-auto", inter.className)}>
      <h1 className="text-lg md:text-3xl font-semibold">FAQ</h1>
      <p className="mt-2 text-gray-600">도움말 내용을 확인해주세요.</p>
      <div className="mt-8 flex flex-col mb-10">
        <HydrationBoundary state={dehydratedState}>
          <FaqsList />
        </HydrationBoundary>
      </div>
    </div>
  );
}
