import Stepper from "@/components/Form/Stepper";
import { RoomRegisterAddress } from "@/components/Form/register";

export default function RoomRegisterAddressPage() {
  return (
    <>
      <Stepper count={3} />
      <h1 className="mb-5 font-semibold text-lg md:text-2xl text-center">
        숙소의 위치를 입력해주세요
      </h1>
      <RoomRegisterAddress />
    </>
  );
}
