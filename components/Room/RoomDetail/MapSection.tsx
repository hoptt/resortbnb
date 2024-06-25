import { RoomType } from "@/interface";
import DetailRoomMap from "../../Map/DetailRoomMap";

export default function MapSection({ data }: { data: RoomType }) {
  return (
    <div
      id="hosting-place"
      className="py-8 sm:px-4 border-b border-gray-300 leading-8 text-gray-800"
    >
      <h1 className="font-semibold text-xl mb-2">호스팅 지역</h1>
      <div className="mt-8">
        <DetailRoomMap data={data} />
      </div>
      <div className="mt-8 font-semibold">{data?.base_address}</div>
      <div className="mt-3 text-gray-600 whitespace-pre-line break-words break-keep">
        {data?.desc}
      </div>
    </div>
  );
}
