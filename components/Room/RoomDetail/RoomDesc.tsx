"use client";

import Modal from "@/components/Modal";
import { useState } from "react";

export default function RoomDesc({ desc }: { desc: string }) {
  const [isShowMore, setIsShowMore] = useState(false);
  return (
    <>
      <div className="py-8 px-4 border-b border-gray-300 leading-8 text-gray-800 ellipsis__p">
        <h1 className="font-semibold text-xl mb-2">숙소 설명</h1>
        <div className="ellipsis__c">{desc}</div>
        <div
          className="text-blue-500 mt-2 cursor-pointer max-w-fit"
          onClick={() => {
            setIsShowMore(true);
          }}
        >
          더보기 {">"}
        </div>
      </div>

      <Modal
        isOpen={isShowMore}
        title="숙소 설명"
        closeModal={() => setIsShowMore(false)}
      >
        <div className="whitespace-pre-line mt-5">{desc}</div>
      </Modal>
    </>
  );
}
