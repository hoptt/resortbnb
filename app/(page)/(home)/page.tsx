import { AdvertiseBox } from "@/components/Advertise";
import CategoryList from "@/components/CategoryList";
import { Main } from "@/components/RoomList";

export default function Home() {
  return (
    <>
      <CategoryList />
      <Main>
        <AdvertiseBox />
      </Main>
    </>
  );
}
