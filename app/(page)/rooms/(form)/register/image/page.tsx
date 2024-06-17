"use client";

import { roomFormState } from "@/atom";
import NextButton from "@/components/Form/NextButton";
import Stepper from "@/components/Form/Stepper";
import { storage } from "@/utils/firebaseApp";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState, useResetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

interface RoomImageProps {
  images?: string[];
}

export default function RoomRegisterImage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [roomForm, setRoomForm] = useRecoilState(roomFormState);
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
  return (
    <>
      <Stepper count={5} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 사진을 추가해주세요
        </h1>
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
