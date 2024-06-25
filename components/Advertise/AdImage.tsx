import { BLUR_DATA_URL } from "@/constants";
import Image from "next/image";
import React from "react";

export default function AdImage() {
  return (
    <Image
      src={"/images/ad.jpeg"}
      alt={"광고 이미지"}
      placeholder="blur"
      style={{ objectFit: "cover", filter: "blur(2px) brightness(0.5)" }}
      fill
      sizes="(min-width: 640px) 240px, 320px"
      blurDataURL={BLUR_DATA_URL}
      className="rounded-md w-full h-auto object-fit hover:shadow-lg"
    />
  );
}
