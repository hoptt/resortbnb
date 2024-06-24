"use client";

import { RoomFormOptionalType } from "@/interface";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";

interface AddressProps {
  setValue: UseFormSetValue<RoomFormOptionalType>;
  register: UseFormRegister<RoomFormOptionalType>;
  errors: FieldErrors<RoomFormOptionalType>;
}

export default function AddressSearch({
  register,
  errors,
  setValue,
}: AddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("base_address", fullAddress);
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="base_address" className="text-lg font-semibold">
          숙소 위치
        </label>
        <div className="grid md:grid-cols-4 gap-3 md:gap-6">
          <input
            readOnly
            placeholder="주소를 입력해주세요"
            {...register("base_address", { required: true })}
            className="col-span-3 block w-full outline-none px-4 py-2 rounded-lg border-2 focus:border-black read-only:bg-gray-300 read-only:text-gray-700 placeholder:text-gray-400
          "
          />
          <button
            type="button"
            className="col-start-3 sm:col-start-4 bg-rose-600 hover:bg-rose-500 py-1.5 px-2 rounded text-white"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            주소 검색
          </button>
        </div>
        {errors.base_address && errors.base_address.type === "required" && (
          <span className="text-red-600 text-sm">숙소 위치를 입력해주세요</span>
        )}
      </div>
      {isOpen && (
        <div className="mt-4 border border-gray-300 w-full rounded-md p-2 max-w-lg mx-auto">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
