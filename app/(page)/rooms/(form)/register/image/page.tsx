import Stepper from "@/components/Form/Stepper";
import { RoomRegisterImage } from "@/components/Form/register";

export default function RoomRegisterImagePage() {
  return (
    <>
      <Stepper count={5} />
      <h1 className="mb-5 font-semibold text-lg md:text-2xl text-center">
        숙소의 사진을 추가해주세요
      </h1>
      <RoomRegisterImage />
    </>
  );
}
