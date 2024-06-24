import Stepper from "@/components/Form/Stepper";
import { RoomRegisterFeature } from "@/components/Form/register";

export default function RoomRegisterFeaturePage() {
  return (
    <>
      <Stepper count={4} />
      <h1 className="mb-5 font-semibold text-lg md:text-2xl text-center">
        숙소의 편의시설 정보를 추가해주세요
      </h1>
      <RoomRegisterFeature />
    </>
  );
}
