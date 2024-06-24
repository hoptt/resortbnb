import RoomSearchFilter from "@/components/Form/RoomSearchFilter";
import MyRoom from "@/components/Room/RoomList/MyRoom";

export default function UserRooms() {
  return (
    <div className="max-w-7xl mx-auto mt-5 sm:mt-10">
      <h1 className="mb-5 text-lg md:text-2xl font-semibold">나의 숙소 관리</h1>
      <RoomSearchFilter />
      <MyRoom />
    </div>
  );
}
