import Stepper from "@/components/Form/Stepper";
import { RoomRegisterInfo } from "@/components/Form/register";

export default function RoomRegisterInfoPage() {
  return (
    <>
      <Stepper count={2} />
      <h1 className="mb-5 font-semibold text-lg md:text-2xl text-center">
        숙소의 기본 정보를 입력해주세요
      </h1>
      <RoomRegisterInfo />
    </>
  );
}
