import Stepper from "@/components/Form/Stepper";
import RoomRegisterCategory from "@/components/Form/register";

export default function RoomRegisterCategoryPage() {
  return (
    <>
      <Stepper count={1} />
      <h1 className="mb-5 font-semibold text-lg md:text-2xl text-center">
        다음 중 숙소를 가장 잘 나타내는 것은 무엇인가요?
      </h1>
      <RoomRegisterCategory />
    </>
  );
}
