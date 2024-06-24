export const fetchUser = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("데이터를 불러오는중 오류가 발생했습니다");
  }
  return response.json();
};
