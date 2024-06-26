import RoomEditForm from "@/components/Form/RoomEditForm";
import { RoomType } from "@/interface";

interface ParamsProps {
  params: { id: string };
}

export default async function RoomEdit({ params: { id } }: ParamsProps) {
  const data: RoomType = await getData(id);

  return <RoomEditForm data={data} />;
}

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
