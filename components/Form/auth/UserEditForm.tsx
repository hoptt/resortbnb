"use client";

import { LoaderUserEdit, PrimaryLoader } from "@/components/Loader";
import { UserType } from "@/interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export interface UserEditProps {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function UserEditForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { isLoading: isSubmitting },
  } = useForm<UserEditProps>();

  const fetchUser = async () => {
    const { data } = await axios("/api/users");

    return data as UserType;
  };

  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!session?.user.id,
  });

  const onSubmit = async (data: UserEditProps) => {
    try {
      const { status } = await axios.put("/api/users", {
        name: data.name,
        phone: data.phone,
        email: user?.email,
        address: data.address,
      });
      if (status === 200) {
        toast.success("정보를 수정했습니다");
        queryClient.invalidateQueries({ queryKey: ["user-form"] });
        router.replace("/users/info");
      } else {
        toast.error("다시 시도해주세요");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("name", user?.name || "");
      setValue("email", user?.email || "");
      setValue("phone", user?.phone || "");
      setValue("address", user?.address || "");
    }
  }, [user, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {isPending ? (
          <LoaderUserEdit />
        ) : (
          <>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  disabled={true}
                  type="email"
                  {...register("email")}
                  readOnly
                  className="block w-full border-0 focus:border-black/20 disabled:bg-gray-100 py-1.5 px-2 text-gray-900 outline-none  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이름
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="block w-full border-b-[1px] border-0 border-black/10 focus:border-black/20 py-1.5 px-2 text-gray-900 outline-none  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                전화번호
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  className="block w-full border-b-[1px] border-0 border-black/10 focus:border-black/20 py-1.5 px-2 text-gray-900 outline-none  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <input hidden name="id" value={user?.id} readOnly />

            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                주소
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  className="block w-full border-b-[1px] border-0 border-black/10 focus:border-black/20 py-1.5 px-2 text-gray-900 outline-none  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6 max-w-3xl mx-auto">
                <button
                  disabled={isSubmitting}
                  className="rounded-md bg-rose-600 px-16 disabled:bg-rose-300 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                >
                  수정하기
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
