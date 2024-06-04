"use client";

import { roomFormState } from "@/atom";
import AddressSearch from "@/components/Form/AddressSearch";
import NextButton from "@/components/Form/NextButton";
import Stepper from "@/components/Form/Stepper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

interface RoomAddressProps {
  address?: string;
}

export default function RoomRegisterAddress() {
  const router = useRouter();
  const [roomForm, setRoomForm] = useRecoilState(roomFormState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomAddressProps>();
  const onSubmit = (data: RoomAddressProps) => {
    setRoomForm((prev) => ({
      ...prev,
      address: data?.address,
    }));
    router.push("/rooms/register/feature");
  };

  useEffect(() => {
    if (roomForm) {
      setValue("address", roomForm.address);
    }
  }, [roomForm, setValue]);
  return (
    <>
      <Stepper count={2} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 위치를 입력해주세요
        </h1>
        <AddressSearch
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <NextButton type="submit" disabled={isSubmitting} />
      </form>
    </>
  );
}
