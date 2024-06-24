"use client";

import { FaqType } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import { fetchFaqs } from "./_lib/api";

export function FaqsList() {
  const { data } = useQuery<FaqType[]>({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });
  return (
    <>
      {data?.map((faq) => (
        <div
          key={faq.id}
          className="py-5 border-b border-b-gray-200 items-center font-semibold"
        >
          <div>{faq.title}</div>
          <div className="text-gray-600 font-normal mt-2">{faq.desc}</div>
        </div>
      ))}
    </>
  );
}
