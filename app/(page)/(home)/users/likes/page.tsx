import LikesRoom from "@/components/Room/RoomList/LikesRoom";

export default function UserLikes() {
  return (
    <div className="mt-5 md:mt-10 max-w-7xl mx-auto">
      <h1 className="font-semibold text-xl md:text-2xl mx-auto">
        찜한 숙소 리스트
      </h1>
      <div className="mt-1 md:mt-2 text-gray-500 mx-auto mb-10">
        찜한 숙소 리스트입니다.
      </div>
      <LikesRoom />
    </div>
  );
}
