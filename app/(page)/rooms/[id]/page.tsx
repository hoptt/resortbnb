import { Loader } from "@/components/Loader";
import FeatureSection from "@/components/RoomDetail/FeatureSection";
import HeaderSection from "@/components/RoomDetail/HeaderSection";
import type { ParamsProps, RoomType } from "@/interface";
import type { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";

export default async function RoomPage({ params }: ParamsProps) {
  const { id } = params;
  const data: RoomType = await getData(id);
  const Comment = dynamic(() => import("@/components/Comment"), {
    loading: () => <Loader />,
  });

  const MapSection = dynamic(
    () => import("@/components/RoomDetail/MapSection"),
    {
      loading: () => <Loader />,
      ssr: false,
    }
  );
  return (
    <div className="mb-20 max-w-6xl mx-auto">
      <HeaderSection data={data} />
      <FeatureSection data={data} />
      <Comment room={data} />
      <MapSection data={data} />
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
