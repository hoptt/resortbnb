import { LikeType } from "@/interface";
import axios from "axios";

export const updateRoom = async (roomId: number) => {
  const { data } = await axios.post(`/api/likes`, {
    roomId,
  });

  return data as LikeType;
};
