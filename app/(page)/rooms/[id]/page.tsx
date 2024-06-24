import { Comment } from "@/components/Comment";
import { LoaderRoomDetail, MapLoading } from "@/components/Loader";
import FeatureSection from "@/components/Room/RoomDetail/FeatureSection";
import HeaderSection from "@/components/Room/RoomDetail/HeaderSection";
import type { ParamsProps, RoomType } from "@/interface";
import type { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const MapSection = dynamic(
  () => import("@/components/Room/RoomDetail/MapSection"),
  {
    loading: () => <MapLoading className="h-[400px] mt-8" />,
    ssr: false,
  }
);
export default async function RoomPage({ params }: ParamsProps) {
  const { id } = params;
  const data: RoomType = await getData(id);

  if (data === null) redirect("/");
  return (
    <div className="mb-20 max-w-6xl mx-auto">
      <Suspense fallback={<LoaderRoomDetail />}>
        <HeaderSection data={data} />
        <FeatureSection data={data} />
        <Comment room={data} />
        <MapSection data={data} />
      </Suspense>
    </div>
  );
}

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export async function generateMetadata(
  { params }: ParamsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const room = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  const prevKeywords = (await parent).keywords || [];

  return {
    title: `Resortbnb 숙소 - ${room?.title}`,
    description: room?.description || "Resortbnb 로 여행을 계획해보세요",
    keywords: [room?.category, ...prevKeywords],
  };
}
