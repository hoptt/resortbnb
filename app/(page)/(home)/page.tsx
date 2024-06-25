import AdImage from "@/components/Advertise/AdImage";
import CategoryList from "@/components/CategoryList";
import { PrimaryLoader } from "@/components/Loader";
import { Main } from "@/components/Room/RoomList";
import { fetchRooms } from "@/components/Room/RoomList/_lib/api";
import queryClient from "@/query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const DynamicAdvertiseBox = dynamic(
  () => import("@/components/Advertise/AdvertiseBox"),
  {
    ssr: false,
    loading: () => (
      <div>
        <div
          className="relative overflow-hidden rounded-md"
          style={{ aspectRatio: "20/19" }}
        >
          <AdImage />
        </div>
        <div className="w-[150px] mt-3 h-5 bg-gray-100" />
        <div className="w-[100px] mt-3 h-5 bg-gray-100" />
      </div>
    ),
  }
);
export default async function Home() {
  const limit = 24;
  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["rooms"],
      queryFn: ({ pageParam }) => fetchRooms({ pageParam, category: "" }),
      getNextPageParam: (lastPage: any, pages: any) =>
        lastPage.data?.length >= (lastPage.page === 1 ? limit - 1 : limit)
          ? lastPage.page + 1
          : undefined,
      initialPageParam: 1,
    });
  } catch (e) {
    console.log(e);
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <CategoryList />
      <HydrationBoundary state={dehydratedState}>
        <Main>
          <DynamicAdvertiseBox>
            <AdImage />
          </DynamicAdvertiseBox>
        </Main>
      </HydrationBoundary>
    </>
  );
}
