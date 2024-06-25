import { UserComments } from "@/components/Comment";

export default function MyCommentPage() {
  return (
    <div className="mt-5 md:mt-10 max-w-7xl mx-auto">
      <h1 className="font-semibold text-xl md:text-2xl mx-auto">
        나의 후기 리스트
      </h1>
      <div className="mt-1 md:mt-2 text-gray-500 mx-auto">
        내가 쓴 후기 리스트입니다
      </div>
      <UserComments />
    </div>
  );
}
