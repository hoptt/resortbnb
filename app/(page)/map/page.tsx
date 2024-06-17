import { FullPageLoader } from "@/components/Loader";
import Map from "@/components/Map";
import SelectedRoom from "@/components/Map/SelectedRoom";

export default function MapPage() {
  return (
    <>
      <Map fallback={<FullPageLoader />} />
      <SelectedRoom />
    </>
  );
}
