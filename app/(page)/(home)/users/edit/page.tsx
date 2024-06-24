import UserEditForm from "@/components/Form/auth/UserEditForm";
export default async function UserEditPage() {
  return (
    <>
      <div className="space-y-12 max-w-3xl mx-auto">
        <div className="mt-10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            개인정보 수정
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            개인정보를 수정해주세요
          </p>
          <UserEditForm />
        </div>
      </div>
    </>
  );
}
