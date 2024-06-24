import MyPage from "@/components/MyPage";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import cn from "classnames";

export default async function UserMyPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="mt-5 sm:mt-10 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-semibold">계정</h1>
      <div className="flex gap-2 mt-2 text-lg flex-wrap">
        <div className="font-semibold">{session?.user?.name || "사용자"}</div>
        <div className="font-semibold">·</div>
        <div
          className={cn(
            "",
            session?.user?.email ? "text-gray-700" : "text-gray-300"
          )}
        >
          {session?.user?.email || "이메일 정보가 없습니다"}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-12 mb-20">
        <MyPage />
      </div>
    </div>
  );
}
