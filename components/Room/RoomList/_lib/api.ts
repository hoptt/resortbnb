export const fetchRooms = async ({
  pageParam = 1,
  category,
}: {
  pageParam: number;
  category: string;
}) => {
  const limit = 24;

  const params = {
    limit: pageParam === 1 ? `${limit - 1}` : `${limit}`,
    page: `${pageParam}`,
    category: decodeURIComponent(category),
    filter: "true",
  };
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?${queryString}`
  );
  if (!response.ok) {
    throw new Error("데이터를 불러오는중 오류가 발생했습니다");
  }
  return response.json();
};
