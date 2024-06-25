/* eslint-disable @next/next/no-img-element */
"use client";

import { roomFormState } from "@/atom";
import AddressSearch from "@/components/Form/AddressSearch";
import NextButton from "@/components/Form/NextButton";
import { CATEGORY_DATA, FormUrl } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import cn from "classnames";
import {
  AiFillCamera,
  AiOutlineCheckCircle,
  AiOutlineDesktop,
  AiOutlineWifi,
} from "react-icons/ai";
import { BsDoorClosed } from "react-icons/bs";
import { GiBarbecue } from "react-icons/gi";
import { LuWind, LuParkingCircle } from "react-icons/lu";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { PiMountainsDuotone, PiBathtub } from "react-icons/pi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/utils/firebaseApp";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

interface RoomAddressProps {
  base_address?: string;
  detailed_address?: string;
}

export function RoomRegisterAddress() {
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
      base_address: data?.base_address,
      detailed_address: data?.detailed_address,
    }));
    router.push(FormUrl.FEATURE);
  };

  useEffect(() => {
    router.prefetch(FormUrl.FEATURE);
  }, [router]);

  useEffect(() => {
    if (roomForm) {
      setValue("base_address", roomForm.base_address);
      setValue("detailed_address", roomForm.detailed_address);
    }
  }, [roomForm, setValue]);

  useEffect(() => {
    if (!roomForm?.title) router.replace("/");
  }, [roomForm, router]);
  return (
    <>
      <form
        className="flex flex-col gap-4 sm:px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AddressSearch
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <input
          placeholder="상세 주소를 입력해주세요"
          {...register("detailed_address")}
          className="col-span-4 block w-full outline-none px-4 py-2 rounded-lg border-2 focus:border-black placeholder:text-gray-400"
        />
        <NextButton type="submit" disabled={isSubmitting} />
      </form>
    </>
  );
}

export default function RoomRegisterCategory() {
  const router = useRouter();
  const [roomForm, setRoomForm] = useRecoilState(roomFormState);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSubmit = () => {
    setRoomForm((prev) => ({
      ...prev,
      category: selectedCategory,
    }));

    router.push(FormUrl.INFO);
  };

  useEffect(() => {
    setSelectedCategory(roomForm?.category || "");
  }, [roomForm]);

  useEffect(() => {
    router.prefetch(FormUrl.INFO);
  }, [router]);

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 sm:px-10">
          {CATEGORY_DATA?.map((category) => (
            <button
              type="button"
              key={category.title}
              onClick={() => setSelectedCategory(category.title)}
              className={cn(
                "border-2 hover:bg-black/5 rounded-md px-6 py-4 flex flex-col gap-2",
                { "border-2 border-black": selectedCategory === category.title }
              )}
            >
              <div className="text-2xl">
                <category.Icon />
              </div>
              <h1 className="font-semibold sm:text-lg">{category.title}</h1>
            </button>
          ))}
        </div>
      </section>
      <NextButton
        type="button"
        onClick={handleSubmit}
        disabled={!selectedCategory}
      />
    </>
  );
}

export interface RoomFeatureProps {
  freeCancel?: boolean;
  selfCheckIn?: boolean;
  officeSpace?: boolean;
  hasMountainView?: boolean;
  hasShampoo?: boolean;
  hasFreeLaundry?: boolean;
  hasAirConditioner?: boolean;
  hasWifi?: boolean;
  hasBarbeque?: boolean;
  hasFreeParking?: boolean;
}

export function RoomRegisterFeature() {
  const router = useRouter();
  const [roomForm, setRoomForm] = useRecoilState(roomFormState);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RoomFeatureProps>();
  const onSubmit = (data: RoomFeatureProps) => {
    setRoomForm((prev) => ({
      ...prev,
      freeCancel: data.freeCancel,
      selfCheckIn: data.selfCheckIn,
      officeSpace: data.officeSpace,
      hasMountainView: data.hasMountainView,
      hasShampoo: data.hasShampoo,
      hasFreeLaundry: data.hasFreeLaundry,
      hasAirConditioner: data.hasAirConditioner,
      hasWifi: data.hasWifi,
      hasBarbeque: data.hasBarbeque,
      hasFreeParking: data.hasFreeParking,
    }));
    router.push(FormUrl.IMAGE);
  };

  const onClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: keyof RoomFeatureProps
  ) => {
    setValue(title, e.target.checked);
  };

  useEffect(() => {
    if (roomForm) {
      setValue("freeCancel", roomForm?.freeCancel);
      setValue("selfCheckIn", roomForm?.selfCheckIn);
      setValue("officeSpace", roomForm?.officeSpace);
      setValue("hasMountainView", roomForm?.hasMountainView);
      setValue("hasShampoo", roomForm?.hasShampoo);
      setValue("hasFreeLaundry", roomForm?.hasFreeLaundry);
      setValue("hasAirConditioner", roomForm?.hasAirConditioner);
      setValue("hasWifi", roomForm?.hasWifi);
      setValue("hasBarbeque", roomForm?.hasBarbeque);
      setValue("hasFreeParking", roomForm?.hasFreeParking);
    }
  }, [roomForm, setValue]);

  useEffect(() => {
    router.prefetch(FormUrl.IMAGE);
  }, [router]);

  useEffect(() => {
    if (!roomForm?.base_address) router.replace("/");
  }, [roomForm, router]);
  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:px-10">
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("freeCancel") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "freeCancel")}
              {...register("freeCancel")}
              className="hidden"
            />
            <AiOutlineCheckCircle className="text-lg md:text-2xl" />
            무료 취소
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("selfCheckIn") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "selfCheckIn")}
              {...register("selfCheckIn")}
              className="hidden"
            />
            <BsDoorClosed className="text-lg md:text-2xl" />
            셀프 체크인
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("officeSpace") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "officeSpace")}
              {...register("officeSpace")}
              className="hidden"
            />
            <AiOutlineDesktop className="text-lg md:text-2xl" />
            사무시설
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("hasMountainView") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "hasMountainView")}
              {...register("hasMountainView")}
              className="hidden"
            />
            <PiMountainsDuotone className="text-lg md:text-2xl" />
            마운틴 뷰
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("hasShampoo") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "hasShampoo")}
              {...register("hasShampoo")}
              className="hidden"
            />
            <PiBathtub className="text-lg md:text-2xl" />
            샴푸 및 욕실 용품
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("hasFreeLaundry") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "hasFreeLaundry")}
              {...register("hasFreeLaundry")}
              className="hidden"
            />
            <MdOutlineLocalLaundryService className="text-lg md:text-2xl" />
            무료 세탁
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("hasAirConditioner") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "hasAirConditioner")}
              {...register("hasAirConditioner")}
              className="hidden"
            />
            <LuWind className="text-lg md:text-2xl" />
            에어컨
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("hasWifi") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "hasWifi")}
              {...register("hasWifi")}
              className="hidden"
            />
            <AiOutlineWifi className="text-lg md:text-2xl" />
            무료 와이파이
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("hasBarbeque") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "hasBarbeque")}
              {...register("hasBarbeque")}
              className="hidden"
            />
            <GiBarbecue className="text-lg md:text-2xl" />
            바베큐 시설
          </label>
          <label
            className={cn(
              "border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2 cursor-pointer",
              { "border-2 border-black": !!watch("hasFreeParking") }
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, "hasFreeParking")}
              {...register("hasFreeParking")}
              className="hidden"
            />
            <LuParkingCircle className="text-lg md:text-2xl" />
            무료 주차
          </label>
        </section>
        <NextButton type="submit" />
      </form>
    </>
  );
}

interface RoomImageProps {
  images?: string[];
}

export function RoomRegisterImage() {
  const router = useRouter();
  const { data: session } = useSession();
  const roomForm = useRecoilValue(roomFormState);
  const [images, setImages] = useState<string[] | null>(null);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const resetRoomForm = useResetRecoilState(roomFormState);
  let imageKeys: string[] = [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoomImageProps>();
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;
    setImages([]);

    Array.from(files).forEach((file: File) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
        const { result } = event.target as FileReader;
        if (result) {
          setImages((prev) =>
            prev ? [...prev, result.toString()] : [result.toString()]
          );
        }
      };
    });
  };

  async function uploadImages(images: string[] | null) {
    const uploadedImageUrls = [];
    if (!images) {
      toast.error("이미지를 한 장 이상 업로드 해주세요");
      return;
    }
    for (const imageFile of images) {
      // firebase 에 이미지 업로드 후 이미지 주소 가져오기
      const imageKey = uuidv4();
      const imageRef = ref(storage, `${session?.user?.id}/${imageKey}`);
      imageKeys.push(imageKey);
      try {
        const data = await uploadString(imageRef, imageFile, "data_url");

        const imageUrl = await getDownloadURL(data.ref);
        uploadedImageUrls.push(imageUrl);
      } catch (error) {}
    }

    return uploadedImageUrls;
  }

  const deleteImages = () => {
    imageKeys?.forEach((key) => {
      const imageRef = ref(storage, `${session?.user.id}/${key}`);
      deleteObject(imageRef);
    });
  };

  const onSubmit = async (data: RoomImageProps) => {
    try {
      setDisableSubmit(true);
      uploadImages(images)
        .then(async (imageUrls) => {
          if (!imageUrls) return;
          const result = await axios.post("/api/rooms", {
            ...roomForm,
            images: imageUrls,
            imageKeys,
          });
          if (result.status === 200) {
            toast.success("숙소를 등록했습니다");
            resetRoomForm();
            router.replace("/");
          } else {
            toast.error("데이터 생성 중 문제가 발생했습니다");
          }
        })
        .catch((e) => {
          toast.error("이미지 업로드 중 문제가 발생했습니다");
          deleteImages();
        });
    } catch (e) {
      toast.error("다시 시도해주세요");
    } finally {
      setDisableSubmit(false);
    }
  };

  useEffect(() => {
    if (!roomForm?.category || !roomForm?.title || !roomForm.base_address)
      router.replace("/");
  }, [roomForm, router]);
  return (
    <>
      <form
        className="flex flex-col gap-6 sm:px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-sm md:text-base text-gray-500 text-center">
          숙소 사진은 최대 5장까지 추가할 수 있습니다
        </p>
        <div className="flex flex-col gap-2">
          <div className="col-span-full">
            <label
              htmlFor="images"
              className="relative cursor-pointer rounded-md bg-white"
            >
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 hover:border-rose-600 px-6 py-10">
                <div className="text-center">
                  <AiFillCamera className="mx-auto h-12 w-12 text-gray-300 hover:text-rose-300" />
                  <div className="mt-4 flex flex-wrap text-sm leading-6 text-gray-600">
                    <span className="text-rose-500 hover:text-rose-600">
                      최대 5장의 사진을
                    </span>
                    <input
                      id="images"
                      type="file"
                      {...register("images")}
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileUpload}
                    />
                    <p className="pl-1">업로드 해주세요</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF 등 이미지 포맷만 가능합니다
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="mt-10 max-w-lg mx-auto flex flex-wrap gap-4">
          {images &&
            images?.map((image, idx) => (
              <img
                key={idx}
                alt="숙소 이미지"
                src={image}
                width={100}
                height={100}
                className="rounded-md"
              />
            ))}
        </div>
        <NextButton
          type="submit"
          text="완료"
          disabled={isSubmitting || disableSubmit}
        />
      </form>
    </>
  );
}

interface RoomInfoProps {
  title?: string;
  desc?: string;
  price?: number;
  bedroomDesc?: string;
}

export function RoomRegisterInfo() {
  const router = useRouter();
  const [roomForm, setRoomForm] = useRecoilState(roomFormState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomInfoProps>();
  const onSubmit = (data: RoomInfoProps) => {
    setRoomForm((prev) => ({
      ...prev,
      title: data.title,
      desc: data.desc,
      bedroomDesc: data.bedroomDesc,
      price: parseInt((data.price as unknown as string).replace(/,/g, ""), 10),
    }));
    router.push(FormUrl.ADDRESS);
  };
  useEffect(() => {
    if (roomForm) {
      setValue("bedroomDesc", roomForm.bedroomDesc);
      setValue("title", roomForm.title);
      setValue("price", roomForm.price);
      setValue("desc", roomForm.desc);
    }
  }, [roomForm, setValue]);

  useEffect(() => {
    router.prefetch(FormUrl.ADDRESS);
  }, [router]);

  useEffect(() => {
    if (!roomForm?.category) router.replace("/");
  }, [roomForm, router]);
  return (
    <>
      <form
        className="flex flex-col gap-6 sm:px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            숙소 이름
          </label>
          <input
            {...register("title", { required: true, maxLength: 30 })}
            placeholder="숙소 이름을 입력해주세요"
            className="outline-none p-2 border-b-gray-300 border-b focus:border-black"
          />
          {errors.title && errors.title.type === "required" && (
            <span className="text-red-600 text-sm">
              숙소 이름을 입력해주세요
            </span>
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <span className="text-red-600 text-sm">
              숙소 이름은 30자 이내로 작성해주세요
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="text-lg font-semibold">
            숙소 설명
          </label>
          <textarea
            rows={3}
            {...register("desc", { required: true })}
            placeholder="숙소 설명을 입력해주세요"
            className="outline-none p-2 border-b-gray-300 border-b focus:border-black resize-none"
          />
          {errors.desc && errors.desc.type === "required" && (
            <span className="text-red-600 text-sm">
              숙소 설명을 입력해주세요
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-lg font-semibold">
            숙소 가격 (1박 기준)
          </label>
          <input
            type="text"
            {...register("price", { required: true })}
            placeholder="숙박 가격을 입력해주세요"
            onChange={(e) => {
              const value = e.target.value;

              const numericValue = value.replace(/\D/g, "");

              const formattedValue = new Intl.NumberFormat("ko-KR").format(
                numericValue as any
              );

              e.target.value = formattedValue;
            }}
            className="outline-none p-2 border-b-gray-300 border-b focus:border-black resize-none"
          />
          {errors.price && errors.price.type === "required" && (
            <span className="text-red-600 text-sm">
              숙박 가격을 설정해주세요
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bedroomDesc" className="text-lg font-semibold">
            침실 설명
          </label>
          <textarea
            rows={3}
            {...register("bedroomDesc", { required: true, maxLength: 100 })}
            placeholder="침실 설명을 입력해주세요"
            className="outline-none p-2 border-b-gray-300 border-b focus:border-black resize-none"
          />
          {errors.bedroomDesc && errors.bedroomDesc.type === "required" && (
            <span className="text-red-600 text-sm">
              침실 설명을 입력해주세요
            </span>
          )}
          {errors.bedroomDesc && errors.bedroomDesc.type === "maxLength" && (
            <span className="text-red-600 text-sm">
              침실 설명은 100자 이내로 작성해주세요
            </span>
          )}
        </div>
        <NextButton type="submit" disabled={isSubmitting} />
      </form>
    </>
  );
}
