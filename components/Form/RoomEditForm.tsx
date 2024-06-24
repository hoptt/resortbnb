/* eslint-disable @next/next/no-img-element */
"use client";

import {
  CATEGORY_DATA,
  FeatureFormField,
  RoomEditField,
  RoomFeatureProps,
} from "@/constants";
import { RoomFormOptionalType, RoomType } from "@/interface";
import { storage } from "@/utils/firebaseApp";
import axios from "axios";
import cn from "classnames";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import AddressSearch from "./AddressSearch";

export default function RoomEditForm({ data }: { data: RoomType }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<string[] | null>(null);
  const [imageKeys, setImageKeys] = useState<string[] | null>(null);
  let newImageKeys: string[] = [];
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormOptionalType>();

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

  const onClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: keyof RoomFeatureProps
  ) => {
    setValue(title, e.target.checked);
  };

  async function uploadImages(images: string[] | null) {
    const uploadedImageUrls = [];
    if (!images) {
      toast.error("이미지를 한 장 이상 업로드 해주세요");
      return;
    }

    if (images === data.images) return data.images;

    try {
      await deleteImages();
      for (const imageFile of images) {
        // firebase 에 이미지 업로드 후 이미지 주소 가져오기
        const imageKey = uuidv4();
        const imageRef = ref(storage, `${session?.user?.id}/${imageKey}`);
        newImageKeys.push(imageKey);
        try {
          const data = await uploadString(imageRef, imageFile, "data_url");

          const imageUrl = await getDownloadURL(data.ref);
          uploadedImageUrls.push(imageUrl);
        } catch (error) {}
      }
      return uploadedImageUrls;
    } catch (e) {}
  }

  const deleteImages = () => {
    imageKeys?.forEach((key) => {
      const imageRef = ref(storage, `${session?.user.id}/${key}`);
      deleteObject(imageRef);
    });
    setImageKeys(null);
  };

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        const field = key as keyof RoomFormOptionalType;
        if (RoomEditField.includes(field)) setValue(field, data[field]);
      });
    }

    if (data.imageKeys) {
      setImageKeys(data.imageKeys);
    }

    if (data.images) {
      setImages(data.images);
    }
  }, [data]);

  return (
    <form
      className="sm:px-4 md:max-w-4xl mx-auto py-8 lg:mt-10 mb-20 flex flex-col gap-8"
      onSubmit={handleSubmit(async (res) => {
        try {
          const imageUrls = await uploadImages(images);
          if (!imageUrls) return;
          const result = await axios.patch(`/api/rooms?id=${data.id}`, {
            ...res,
            price:
              typeof res.price === "string"
                ? parseInt(
                    (res.price as unknown as string).replace(/,/g, ""),
                    10
                  )
                : res.price,
            images: imageUrls,
            imageKeys: newImageKeys.length > 0 ? newImageKeys : imageKeys,
          });

          if (result.status === 200) {
            toast.success("숙소를 수정했습니다");

            router.replace("/users/rooms");
          } else {
            toast.error("다시 시도해주세요");
          }
        } catch (e) {
          console.log(e);
          toast.error("데이터 수정 중 문제가 발생하였습니다");
        }
      })}
    >
      <h1 className="font-semibold text-2xl text-center">숙소 수정하기</h1>
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
          <span className="text-red-600 text-sm">숙소 이름을 입력해주세요</span>
        )}
        {errors.title && errors.title.type === "maxLength" && (
          <span className="text-red-600 text-sm">
            숙소 이름은 30자 이내로 작성해주세요
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-lg font-semibold">
          카테고리
        </label>
        <select
          {...register("category", { required: true })}
          className="outline-none p-2 border-b-gray-300 border-b focus:border-black"
        >
          <option value="">카테고리 선택</option>
          {CATEGORY_DATA.map((category) => (
            <option key={category.title} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        {errors.category && errors.category.type === "required" && (
          <span className="text-red-600 text-sm">
            숙소 카테고리를 선택해주세요
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
          <span className="text-red-600 text-sm">숙소 설명을 입력해주세요</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="text-lg font-semibold">
          숙소 가격 (1박 기준)
        </label>
        <input
          type="text"
          {...register("price", { required: true })}
          onChange={(e) => {
            const value = e.target.value;

            const numericValue = value.replace(/\D/g, "");

            const formattedValue = new Intl.NumberFormat("ko-KR").format(
              numericValue as any
            );

            e.target.value = formattedValue;
          }}
          placeholder="숙박 가격을 입력해주세요"
          className="outline-none p-2 border-b-gray-300 border-b focus:border-black"
        />
        {errors.price && errors.price.type === "required" && (
          <span className="text-red-600 text-sm">숙박 가격을 설정해주세요</span>
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
          <span className="text-red-600 text-sm">침실 설명을 입력해주세요</span>
        )}
        {errors.bedroomDesc && errors.bedroomDesc.type === "maxLength" && (
          <span className="text-red-600 text-sm">
            침실 설명은 100자 이내로 작성해주세요
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold">편의시설</label>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-3">
          {FeatureFormField.map((feature) => (
            <label
              key={feature.field}
              className={cn(
                "border-2 rounded-md hover:bg-black/5 p-3 text-center text-sm cursor-pointer",
                { "border-2 border-black": !!watch(feature.field) }
              )}
            >
              <input
                type="checkbox"
                onClick={(e: any) => onClick(e, feature.field)}
                placeholder={feature.field}
                {...register(feature.field)}
                className="hidden"
              />
              {feature.label}
            </label>
          ))}
        </div>
      </div>
      <AddressSearch register={register} errors={errors} setValue={setValue} />
      <input
        placeholder="상세 주소를 입력해주세요"
        {...register("detailed_address")}
        className="block w-full outline-none px-4 py-2 rounded-lg border-2 focus:border-black placeholder:text-gray-400"
      />
      <div className="flex flex-col gap-2">
        <div className="col-span-full">
          <label
            htmlFor="images"
            className="relative cursor-pointer rounded-md bg-white"
          >
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 hover:border-rose-600 px-6 py-10">
              <div className="text-center">
                <AiFillCamera className="mx-auto h-12 w-12 text-gray-300 hover:text-rose-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
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
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          뒤로가기
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="
rounded-lg bg-rose-600 hover:bg-rose-500 px-8 py-2.5 font-semibold text-white disabled:bg-gray-300"
        >
          수정하기
        </button>
      </div>
    </form>
  );
}
